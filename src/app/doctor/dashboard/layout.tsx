"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const items = [
  { label: "Dashboard", icon: "🏠", href: "/doctor/dashboard" },
  { label: "Clinic Information", icon: "🏥", href: "/doctor/dashboard/clinic-info" },
  { label: "Patients", icon: "🐾", href: "/doctor/dashboard/patients" },
  { label: "Appointments", icon: "📅", href: "/doctor/dashboard/appointments" },
  { label: "Services & Inventory", icon: "💊", href: "/doctor/dashboard/services" },
  { label: "Staff", icon: "👥", href: "/doctor/dashboard/staff" },
  { label: "Revenue", icon: "💰", href: "/doctor/dashboard/revenue" },
  { label: "AI Assistant", icon: "🤖", href: "/doctor/dashboard/ai-assistant" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);

  const isHome = pathname === "/doctor/dashboard";

  // نحدد الصفحة اللي رح يرجع لها زر Back حسب مكانك
  const segments = pathname.split("/").filter(Boolean); // ["doctor","dashboard","patients",...]
  let backHref = "/doctor/dashboard";
  let backLabel = "Dashboard";

  if (segments.length > 3) {
    // صفحة جوا قسم (مثلاً patients/add) → نرجع لصفحة القسم
    backHref = "/" + segments.slice(0, 3).join("/");
    const section = items.find((i) => i.href === backHref);
    backLabel = section ? section.label : "Previous page";
  }

  const handleLogout = () => {
    setShowLogout(false);
    router.push("/doctor/login");
  };

  return (
    <div className="min-h-screen bg-[#FFF9F1] flex">
      {/* Sidebar */}
      <aside className="w-64 h-screen sticky top-0 bg-[#315C4B] text-white p-6 shrink-0 flex flex-col">
        <h1 className="text-2xl font-bold mb-10">🐾 Pet Care Hub</h1>

        <nav className="space-y-3">
          {items.map((item) => {
            const active =
              item.href === "/doctor/dashboard"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-xl px-4 py-3 ${
                  active ? "bg-white/15" : "hover:bg-white/10"
                }`}
              >
                {item.icon} {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={() => setShowLogout(true)}
          className="mt-auto w-full text-left rounded-xl px-4 py-3 bg-white/10 hover:bg-red-500/80 transition"
        >
          🚪 Logout
        </button>
      </aside>

      {/* Page content */}
      <div className="flex-1 min-w-0">
        {!isHome && (
          <div className="px-10 pt-8">
            <Link
              href={backHref}
              className="text-[#315C4B] font-semibold hover:underline"
            >
              ← Back to {backLabel}
            </Link>
          </div>
        )}
        {children}
      </div>

      {/* Logout confirmation */}
      {showLogout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm text-center">
            <div className="text-4xl mb-3">🚪</div>
            <h2 className="text-xl font-bold text-[#315C4B] mb-2">Log out?</h2>
            <p className="text-gray-500 mb-6">
              Are you sure you want to log out of your account?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogout(false)}
                className="flex-1 border border-gray-300 rounded-lg py-2 font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 bg-red-500 text-white rounded-lg py-2 font-medium hover:bg-red-600"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}