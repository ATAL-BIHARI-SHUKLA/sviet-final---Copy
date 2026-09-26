import { Mic, Users } from "lucide-react";

import type { EventSpeaker } from "@/components/events/types";

type EventsSpeakersSectionProps = {
  speakers: EventSpeaker[];
};

export function EventsSpeakersSection({
  speakers,
}: EventsSpeakersSectionProps) {
  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="mx-auto w-full max-w-360 px-4 md:px-6">
        <div className="rounded-2xl bg-gradient-to-r from-[#0f2a6d] to-[#1d4ed8] p-6 text-white md:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-white/90">
              <Mic className="h-3.5 w-3.5" />
              Guest Voices
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-white/90">
              <Users className="h-3.5 w-3.5" />
              Industry Connect
            </span>
          </div>

          <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
            Leaders Who Shared Their Insights at SVGOI
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-white/85 md:text-base">
            Our events welcome practitioners, founders, and domain experts who
            mentor students through practical insights and career-focused
            conversations.
          </p>

          <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {speakers.map((speaker, index) => (
              <article
                key={`${speaker.name}-${index}`}
                className="rounded-xl border border-white/20 bg-white/10 p-4"
              >
                <h3 className="text-lg font-semibold leading-snug text-white">
                  {speaker.name}
                </h3>
                <p className="mt-1 text-sm text-white/85">
                  {speaker.designation || "Guest Speaker"}
                </p>
                <p className="text-sm text-white/75">
                  {speaker.company || "SVGOI Event"}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
