"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { AdminLayout } from "@/components/admin/admin-layout";

type EventStatus = "upcoming" | "ongoing" | "completed";

type AdminSpeaker = {
  id?: string;
  name: string;
  photo: string | null;
  designation: string | null;
  company: string | null;
  bio: string | null;
  linkedin: string | null;
  twitter: string | null;
  displayOrder: number;
};

type AdminEvent = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  venue: string | null;
  images: string[];
  driveGalleryUrl: string | null;
  startDate: string;
  endDate: string | null;
  category: string;
  isFeatured: boolean;
  createdAt: string;
  status: EventStatus;
  speakers: AdminSpeaker[];
};

type EventsResponse = {
  ok?: boolean;
  data?: AdminEvent[];
  error?: { message?: string };
};

type SpeakerDraft = {
  name: string;
  photo: string;
  designation: string;
  company: string;
  bio: string;
  linkedin: string;
  twitter: string;
  displayOrder: number;
};

type EventFormState = {
  title: string;
  slug: string;
  description: string;
  image: string;
  venue: string;
  images: string[];
  driveGalleryUrl: string;
  startDate: string;
  endDate: string;
  category: string;
  isFeatured: boolean;
  speakers: AdminSpeaker[];
};

const DEFAULT_SPEAKER: SpeakerDraft = {
  name: "",
  photo: "",
  designation: "",
  company: "",
  bio: "",
  linkedin: "",
  twitter: "",
  displayOrder: 0,
};

const DEFAULT_FORM: EventFormState = {
  title: "",
  slug: "",
  description: "",
  image: "",
  venue: "",
  images: [],
  driveGalleryUrl: "",
  startDate: "",
  endDate: "",
  category: "tech",
  isFeatured: false,
  speakers: [],
};

function toDateTimeLocal(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const offsetMs = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
}

function toIsoString(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      resolve(typeof reader.result === "string" ? reader.result : "");
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<AdminEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<EventFormState>(DEFAULT_FORM);
  const [formError, setFormError] = useState<string | null>(null);

  const [statusFilter, setStatusFilter] = useState<"all" | EventStatus>("all");
  const [categoryFilter, setCategoryFilter] = useState<"all" | string>("all");

  // Speaker draft state
  const [speakerDraft, setSpeakerDraft] =
    useState<SpeakerDraft>(DEFAULT_SPEAKER);
  const [speakerDraftError, setSpeakerDraftError] = useState<string | null>(
    null,
  );
  const [showSpeakerForm, setShowSpeakerForm] = useState(false);

  // Gallery image URL draft
  const [imageUrlDraft, setImageUrlDraft] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const driveFileRef = useRef<HTMLInputElement>(null);

  async function loadEvents() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/events?take=100", {
        cache: "no-store",
      });
      const payload = (await response.json()) as EventsResponse;
      if (!response.ok || !payload.ok || !payload.data) {
        throw new Error(payload.error?.message ?? "Could not load events.");
      }
      setEvents(payload.data);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Could not load events.",
      );
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadEvents();
  }, []);

  const categories = useMemo(
    () =>
      Array.from(new Set(events.map((e) => e.category))).sort((a, b) =>
        a.localeCompare(b),
      ),
    [events],
  );

  const filteredEvents = useMemo(
    () =>
      events.filter((e) => {
        if (statusFilter !== "all" && e.status !== statusFilter) return false;
        if (categoryFilter !== "all" && e.category !== categoryFilter)
          return false;
        return true;
      }),
    [events, statusFilter, categoryFilter],
  );

  function startCreate() {
    setEditingId(null);
    setShowForm(true);
    setForm(DEFAULT_FORM);
    setFormError(null);
    setSpeakerDraft(DEFAULT_SPEAKER);
    setShowSpeakerForm(false);
    setImageUrlDraft("");
  }

  function startEdit(event: AdminEvent) {
    setEditingId(event.id);
    setShowForm(true);
    setForm({
      title: event.title,
      slug: event.slug,
      description: event.description,
      image: event.image,
      venue: event.venue ?? "",
      images: event.images ?? [],
      driveGalleryUrl: event.driveGalleryUrl ?? "",
      startDate: toDateTimeLocal(event.startDate),
      endDate: event.endDate ? toDateTimeLocal(event.endDate) : "",
      category: event.category,
      isFeatured: event.isFeatured,
      speakers: event.speakers ?? [],
    });
    setFormError(null);
    setSpeakerDraft(DEFAULT_SPEAKER);
    setShowSpeakerForm(false);
    setImageUrlDraft("");
  }

  function resetForm() {
    setEditingId(null);
    setShowForm(false);
    setForm(DEFAULT_FORM);
    setFormError(null);
    setSpeakerDraft(DEFAULT_SPEAKER);
    setShowSpeakerForm(false);
    setImageUrlDraft("");
  }

  async function handleCoverUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setFormError("Please select a valid image.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setFormError("Image must be under 2 MB.");
      return;
    }
    try {
      const base64 = await fileToBase64(file);
      setForm((prev) => ({ ...prev, image: base64 }));
    } catch {
      setFormError("Image upload failed.");
    }
  }

  async function handleDriveGalleryUpload(e: ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    if (selected.length === 0) return;

    const invalid = selected.filter((f) => !f.type.startsWith("image/"));
    if (invalid.length > 0) {
      setFormError("Only image files are allowed.");
      return;
    }

    setUploadingImage(true);
    setFormError(null);
    try {
      const files = await Promise.all(
        selected.map(async (file) => ({
          fileName: file.name,
          mimeType: file.type,
          fileBase64: (await fileToBase64(file)).split(",")[1],
        })),
      );

      const response = await fetch("/api/v1/drive/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ files }),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        data?: { viewUrl?: string }[];
        error?: { message?: string };
      };

      if (!response.ok || !result.ok || !result.data) {
        throw new Error(result.error?.message ?? "Upload failed. Please try again.");
      }

      const viewUrls = result.data
        .map((r) => r.viewUrl)
        .filter((u): u is string => Boolean(u));

      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...viewUrls],
      }));
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "Upload failed. Please try again.",
      );
    } finally {
      setUploadingImage(false);
      if (driveFileRef.current) driveFileRef.current.value = "";
    }
  }

  function addImageUrl() {
    const url = imageUrlDraft.trim();
    if (!url) return;
    setForm((prev) => ({ ...prev, images: [...prev.images, url] }));
    setImageUrlDraft("");
  }

  function removeImage(index: number) {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  }

  function addSpeaker() {
    if (!speakerDraft.name.trim()) {
      setSpeakerDraftError("Speaker name is required.");
      return;
    }
    setSpeakerDraftError(null);
    const newSpeaker: AdminSpeaker = {
      name: speakerDraft.name.trim(),
      photo: speakerDraft.photo.trim() || null,
      designation: speakerDraft.designation.trim() || null,
      company: speakerDraft.company.trim() || null,
      bio: speakerDraft.bio.trim() || null,
      linkedin: speakerDraft.linkedin.trim() || null,
      twitter: speakerDraft.twitter.trim() || null,
      displayOrder: speakerDraft.displayOrder,
    };
    setForm((prev) => ({ ...prev, speakers: [...prev.speakers, newSpeaker] }));
    setSpeakerDraft(DEFAULT_SPEAKER);
    setShowSpeakerForm(false);
  }

  function removeSpeaker(index: number) {
    setForm((prev) => ({
      ...prev,
      speakers: prev.speakers.filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);

    const startDate = toIsoString(form.startDate);
    const endDate = form.endDate ? toIsoString(form.endDate) : null;

    if (!startDate) {
      setFormError("Please provide a valid start date.");
      return;
    }
    if (form.endDate && !endDate) {
      setFormError("Please provide a valid end date.");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(
        editingId ? `/api/events/${editingId}` : "/api/events",
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: form.title,
            slug: form.slug.trim() || undefined,
            description: form.description,
            image: form.image,
            venue: form.venue.trim() || null,
            images: form.images,
            driveGalleryUrl: form.driveGalleryUrl.trim() || null,
            startDate,
            endDate,
            category: form.category,
            isFeatured: form.isFeatured,
            speakers: form.speakers,
          }),
        },
      );

      const payload = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: { message?: string };
      } | null;

      if (!response.ok || !payload?.ok) {
        setFormError(payload?.error?.message ?? "Could not save event.");
        return;
      }

      await loadEvents();
      resetForm();
    } catch {
      setFormError("Could not save event.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(eventId: string) {
    if (!window.confirm("Delete this event?")) return;
    setDeletingId(eventId);
    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
      });
      const payload = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: { message?: string };
      } | null;
      if (!response.ok || !payload?.ok) {
        setError(payload?.error?.message ?? "Could not delete event.");
        return;
      }
      setEvents((prev) => prev.filter((item) => item.id !== eventId));
      if (editingId === eventId) resetForm();
    } catch {
      setError("Could not delete event.");
    } finally {
      setDeletingId(null);
    }
  }

  const inputCls =
    "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400";
  const labelCls =
    "block text-xs font-semibold uppercase tracking-wide text-slate-500";

  return (
    <AdminLayout title="Events">
      <div className={`relative ${showForm ? "xl:pr-136" : ""}`}>
        <section className="min-w-0 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-900">
              Manage Events
            </h2>
            <button
              type="button"
              onClick={startCreate}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Add Event
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as "all" | EventStatus)
              }
              aria-label="Filter events by status"
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700"
            >
              <option value="all">All statuses</option>
              <option value="upcoming">Upcoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              aria-label="Filter events by category"
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700"
            >
              <option value="all">All categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {error ? (
            <p className="text-sm font-medium text-rose-600">{error}</p>
          ) : null}

          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    {[
                      "Title",
                      "Slug",
                      "Category",
                      "Start",
                      "Status",
                      "Featured",
                      "Actions",
                    ].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left font-semibold text-slate-600"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-8 text-center text-slate-500"
                      >
                        Loading events...
                      </td>
                    </tr>
                  ) : filteredEvents.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-8 text-center text-slate-500"
                      >
                        No events found.
                      </td>
                    </tr>
                  ) : (
                    filteredEvents.map((event) => (
                      <tr key={event.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-900">
                          {event.title}
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-slate-500">
                          {event.slug}
                        </td>
                        <td className="px-4 py-3 text-slate-600 capitalize">
                          {event.category}
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {new Date(event.startDate).toLocaleDateString(
                            "en-IN",
                            { day: "numeric", month: "short", year: "numeric" },
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                              event.status === "upcoming"
                                ? "bg-blue-50 text-blue-700"
                                : event.status === "ongoing"
                                  ? "bg-green-50 text-green-700"
                                  : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {event.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {event.isFeatured ? "Yes" : "—"}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => startEdit(event)}
                              className="rounded-md border border-slate-300 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(event.id)}
                              disabled={deletingId === event.id}
                              className="rounded-md border border-rose-200 px-2.5 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 disabled:opacity-60"
                            >
                              {deletingId === event.id ? "…" : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {showForm ? (
          <>
            <button
              type="button"
              aria-label="Close event form"
              className="fixed inset-0 top-16.25 z-40 bg-slate-900/40 xl:cursor-default"
              onClick={resetForm}
            />

            <aside className="fixed right-0 top-16.25 z-50 h-[calc(100vh-65px)] w-full overflow-y-auto border-l border-slate-200 bg-white shadow-2xl sm:max-w-md lg:max-w-lg xl:w-136">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
                <h3 className="text-base font-semibold text-slate-900">
                  {editingId ? "Edit Event" : "Create Event"}
                </h3>
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Close
                </button>
              </div>

              <form
                className="space-y-4 px-5 py-4 sm:px-6"
                onSubmit={handleSubmit}
              >
                <div>
                  <label className={labelCls}>Title *</label>
                  <input
                    value={form.title}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, title: e.target.value }))
                    }
                    type="text"
                    required
                    placeholder="Event title"
                    className={`mt-1 ${inputCls}`}
                  />
                </div>

                <div>
                  <label className={labelCls}>
                    Slug (auto-generated if empty)
                  </label>
                  <input
                    value={form.slug}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, slug: e.target.value }))
                    }
                    type="text"
                    placeholder="event-slug"
                    className={`mt-1 ${inputCls}`}
                  />
                </div>

                <div>
                  <label className={labelCls}>Description *</label>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, description: e.target.value }))
                    }
                    required
                    rows={3}
                    placeholder="Event description"
                    className={`mt-1 ${inputCls}`}
                  />
                </div>

                <div>
                  <label className={labelCls}>Cover Image *</label>
                  <input
                    value={form.image}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        image: e.target.value.trim(),
                      }))
                    }
                    type="text"
                    required
                    placeholder="Image URL"
                    className={`mt-1 ${inputCls}`}
                  />
                  <label className="mt-2 block">
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Or upload file (max 2 MB)
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      className="mt-1 block w-full text-xs text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-xs file:font-semibold"
                    />
                  </label>
                </div>

                <div>
                  <label className={labelCls}>Venue</label>
                  <input
                    value={form.venue}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, venue: e.target.value }))
                    }
                    type="text"
                    placeholder="Auditorium, SVGOI Campus"
                    className={`mt-1 ${inputCls}`}
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>Category *</label>
                    <input
                      value={form.category}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, category: e.target.value }))
                      }
                      type="text"
                      required
                      placeholder="tech, cultural, sports..."
                      className={`mt-1 ${inputCls}`}
                    />
                  </div>
                  <div className="flex items-end">
                    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50">
                      <input
                        type="checkbox"
                        checked={form.isFeatured}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            isFeatured: e.target.checked,
                          }))
                        }
                      />
                      <span className="font-semibold">Featured Event</span>
                    </label>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>Start Date *</label>
                    <input
                      value={form.startDate}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, startDate: e.target.value }))
                      }
                      type="datetime-local"
                      required
                      aria-label="Start date"
                      className={`mt-1 ${inputCls}`}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>End Date</label>
                    <input
                      value={form.endDate}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, endDate: e.target.value }))
                      }
                      type="datetime-local"
                      aria-label="End date"
                      className={`mt-1 ${inputCls}`}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelCls}>Gallery Images</label>
                  <div className="mt-1 flex flex-col gap-2 sm:flex-row">
                    <input
                      value={imageUrlDraft}
                      onChange={(e) => setImageUrlDraft(e.target.value)}
                      type="text"
                      placeholder="Paste image URL"
                      className={`${inputCls} flex-1`}
                    />
                    <button
                      type="button"
                      onClick={addImageUrl}
                      className="shrink-0 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 sm:w-auto"
                    >
                      Add
                    </button>
                  </div>

                  <label className="mt-2 block">
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Upload to Google Drive (select multiple)
                    </span>
                    <input
                      ref={driveFileRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleDriveGalleryUpload}
                      disabled={uploadingImage}
                      className="mt-1 block w-full text-xs text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-indigo-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-indigo-700 disabled:opacity-60"
                    />
                    {uploadingImage ? (
                      <p className="mt-1 text-xs text-indigo-600">
                        Uploading to Drive… this may take a moment.
                      </p>
                    ) : null}
                  </label>

                  {form.images.length > 0 ? (
                    <ul className="mt-2 space-y-1">
                      {form.images.map((url, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs"
                        >
                          <span className="flex-1 truncate text-slate-700">
                            {url}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeImage(i)}
                            className="shrink-0 font-bold text-rose-500 hover:text-rose-700"
                          >
                            ✕
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                <div>
                  <label className={labelCls}>Google Drive Gallery URL</label>
                  <input
                    value={form.driveGalleryUrl}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        driveGalleryUrl: e.target.value.trim(),
                      }))
                    }
                    type="text"
                    placeholder="https://drive.google.com/drive/folders/..."
                    className={`mt-1 ${inputCls}`}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className={labelCls}>
                      Speakers ({form.speakers.length})
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowSpeakerForm((v) => !v)}
                      className="text-xs font-semibold text-indigo-600 hover:underline"
                    >
                      {showSpeakerForm ? "Cancel" : "+ Add Speaker"}
                    </button>
                  </div>

                  {showSpeakerForm ? (
                    <div className="mt-2 space-y-2 rounded-xl border border-indigo-200 bg-indigo-50 p-3">
                      <input
                        value={speakerDraft.name}
                        onChange={(e) =>
                          setSpeakerDraft((p) => ({
                            ...p,
                            name: e.target.value,
                          }))
                        }
                        type="text"
                        placeholder="Name *"
                        className={inputCls}
                      />
                      <input
                        value={speakerDraft.designation}
                        onChange={(e) =>
                          setSpeakerDraft((p) => ({
                            ...p,
                            designation: e.target.value,
                          }))
                        }
                        type="text"
                        placeholder="Designation"
                        className={inputCls}
                      />
                      <input
                        value={speakerDraft.company}
                        onChange={(e) =>
                          setSpeakerDraft((p) => ({
                            ...p,
                            company: e.target.value,
                          }))
                        }
                        type="text"
                        placeholder="Company / Organization"
                        className={inputCls}
                      />
                      <input
                        value={speakerDraft.photo}
                        onChange={(e) =>
                          setSpeakerDraft((p) => ({
                            ...p,
                            photo: e.target.value,
                          }))
                        }
                        type="text"
                        placeholder="Photo URL"
                        className={inputCls}
                      />
                      <textarea
                        value={speakerDraft.bio}
                        onChange={(e) =>
                          setSpeakerDraft((p) => ({
                            ...p,
                            bio: e.target.value,
                          }))
                        }
                        rows={2}
                        placeholder="Bio"
                        className={inputCls}
                      />
                      <div className="grid gap-2 sm:grid-cols-2">
                        <input
                          value={speakerDraft.linkedin}
                          onChange={(e) =>
                            setSpeakerDraft((p) => ({
                              ...p,
                              linkedin: e.target.value,
                            }))
                          }
                          type="text"
                          placeholder="LinkedIn URL"
                          className={inputCls}
                        />
                        <input
                          value={speakerDraft.twitter}
                          onChange={(e) =>
                            setSpeakerDraft((p) => ({
                              ...p,
                              twitter: e.target.value,
                            }))
                          }
                          type="text"
                          placeholder="Twitter handle or URL"
                          className={inputCls}
                        />
                      </div>
                      <input
                        value={String(speakerDraft.displayOrder)}
                        onChange={(e) =>
                          setSpeakerDraft((p) => ({
                            ...p,
                            displayOrder: Number(e.target.value) || 0,
                          }))
                        }
                        type="number"
                        placeholder="Display order (0, 1, 2… )"
                        className={inputCls}
                      />
                      {speakerDraftError ? (
                        <p className="text-xs font-medium text-rose-600">
                          {speakerDraftError}
                        </p>
                      ) : null}
                      <button
                        type="button"
                        onClick={addSpeaker}
                        className="w-full rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                      >
                        Add Speaker
                      </button>
                    </div>
                  ) : null}

                  {form.speakers.length > 0 ? (
                    <ul className="mt-2 space-y-1">
                      {form.speakers.map((s, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs"
                        >
                          <div className="min-w-0 flex-1">
                            <span className="font-semibold text-slate-800">
                              {s.name}
                            </span>
                            {s.designation ? (
                              <span className="text-slate-500">
                                {" "}
                                · {s.designation}
                              </span>
                            ) : null}
                            {s.company ? (
                              <span className="text-slate-400">
                                {" "}
                                @ {s.company}
                              </span>
                            ) : null}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeSpeaker(i)}
                            className="shrink-0 font-bold text-rose-500 hover:text-rose-700"
                          >
                            ✕
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                {formError ? (
                  <p className="text-sm font-medium text-rose-600">
                    {formError}
                  </p>
                ) : null}

                <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                  >
                    {saving
                      ? "Saving…"
                      : editingId
                        ? "Update Event"
                        : "Create Event"}
                  </button>
                  {editingId ? (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 sm:w-auto"
                    >
                      Cancel
                    </button>
                  ) : null}
                </div>
              </form>
            </aside>
          </>
        ) : null}
      </div>
    </AdminLayout>
  );
}
