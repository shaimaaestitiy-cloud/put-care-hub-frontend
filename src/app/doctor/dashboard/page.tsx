"use client";

import { useRouter } from "next/navigation";

const cards = [
  { icon: "🏥", title: "Clinic Information", text: "Staff, working hours, and clinic details.", href: "/doctor/dashboard/clinic-info" },
  { icon: "🐾", title: "Patients", text: "View pets and manage their health records.", href: "/doctor/dashboard/patients" },
  { icon: "📅", title: "Today's Appointments", text: "View and manage today's bookings.", href: "/doctor/dashboard/appointments" },
  { icon: "💊", title: "Services & Inventory", text: "Medicines, injections, and pet supplies.", href: "/doctor/dashboard/services" },
  { icon: "👥", title: "Staff Overview", text: "Employees, shifts, and daily performance.", href: "/doctor/dashboard/staff" },
  { icon: "💰", title: "Revenue", text: "Cash, sales, and financial summary.", href: "/doctor/dashboard/revenue" },
  { icon: "🤖", title: "AI Assistant", text: "Get help with diagnosing medical cases.", href: "/doctor/dashboard/ai-assistant" },
];

export default function DoctorDashboard() {
  const router = useRouter();

  return (
    <main className="p-10">
      {/* Header */}
      <div className="mb-10">
        <p className="text-[#E8874A] font-semibold mb-2">
          🩺 Veterinarian Dashboard
        </p>
        <h2 className="text-4xl font-bold text-[#315C4B]">Welcome, Doctor</h2>
        <p className="text-gray-500 mt-2">Here's your clinic overview.</p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.href}
            onClick={() => router.push(card.href)}
            className="bg-white rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition"
          >
            <div className="text-4xl mb-4">{card.icon}</div>
            <h3 className="text-xl font-bold text-[#315C4B]">{card.title}</h3>
            <p className="text-gray-500 mt-2">{card.text}</p>
          </div>
        ))}
      </div>
    </main>
  );
}