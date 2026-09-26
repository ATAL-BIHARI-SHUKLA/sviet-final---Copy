"use client";

import Link from "next/link";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  BookOpen,
  CalendarDays,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  TrendingUp,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";

type AdminLayoutProps = {
  children: ReactNode;
  title?: string;
};

type AuthUser = {
  firstName: string;
  lastName: string;
  role: string;
};

type AuthMeResponse = {
  ok?: boolean;
  data?: {
    user?: AuthUser;
  };
};

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/applications", label: "Applications", icon: FileText },
  { href: "/admin/programs", label: "Programs", icon: BookOpen },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/placements", label: "Placements", icon: TrendingUp },
];

function titleFromPathname(pathname: string) {
  if (pathname === "/admin") {
    return "Dashboard";
  }
  if (pathname.startsWith("/admin/leads/")) {
    return "Lead Details";
  }
  if (pathname.startsWith("/admin/leads")) {
    return "Leads";
  }
  if (pathname.startsWith("/admin/applications")) {
    return "Applications";
  }
  if (pathname.startsWith("/admin/programs")) {
    return "Programs";
  }
  if (pathname.startsWith("/admin/events")) {
    return "Events";
  }
  if (pathname.startsWith("/admin/placements")) {
    return "Placements";
  }
  return "Admin";
}

export function AdminLayout({ children, title }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const pageTitle = useMemo(
    () => title ?? titleFromPathname(pathname),
    [pathname, title],
  );

  useEffect(() => {
    let active = true;

    async function loadMe() {
      try {
        const response = await fetch("/api/auth/me", { cache: "no-store" });
        const payload = (await response
          .json()
          .catch(() => null)) as AuthMeResponse | null;

        if (!active) {
          return;
        }

        if (!response.ok || !payload?.ok || !payload.data?.user) {
          router.push("/admin/login");
          return;
        }

        setUser(payload.data.user);
      } catch {
        if (active) {
          router.push("/admin/login");
        }
      }
    }

    loadMe();

    return () => {
      active = false;
    };
  }, [router]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  async function handleLogout() {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.push("/admin/login");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {menuOpen ? (
        <button
          type="button"
          aria-label="Close menu overlay"
          className="fixed inset-0 z-30 bg-slate-900/50 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-60 transform bg-[#1e293b] text-slate-100 transition-transform duration-200 md:translate-x-0 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-700 px-5 py-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-300">
              SVGOI
            </p>
            <p className="text-lg font-semibold text-white">CRM</p>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="rounded-md p-1 text-slate-200 hover:bg-slate-700 md:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="space-y-1 px-3 py-4">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === item.href
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-200 hover:bg-slate-700"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="min-h-screen md:pl-60">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
          <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="rounded-md p-1 text-slate-700 hover:bg-slate-100 md:hidden"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-semibold text-slate-900">
                {pageTitle}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right md:block">
                <p className="text-sm font-semibold text-slate-800">
                  {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
                </p>
                <p className="text-sm uppercase tracking-wide text-slate-500">
                  {user?.role ?? ""}
                </p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </header>

        <main className="min-h-[calc(100vh-65px)] bg-white p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
