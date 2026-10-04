"use client";

import { useRouter } from "next/navigation";

export default function DoctorDashboard() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#FFF9F1] flex">

      {/* Sidebar */}
      <aside className="w-64 min-h-screen bg-[#315C4B] text-white p-6">
        <h1 className="text-2xl font-bold mb-10">
          🐾 Pet Care Hub
        </h1>

        <nav className="space-y-3">

          <div className="bg-white/15 rounded-xl px-4 py-3">
            🏠 Dashboard
          </div>

          <div
            onClick={() =>
              router.push("/doctor/dashboard/clinic-info")
            }
            className="hover:bg-white/10 rounded-xl px-4 py-3 cursor-pointer"
          >
            🏥 Clinic Information
          </div>

          <div
            onClick={() =>
              router.push("/doctor/dashboard/patients")
            }
            className="hover:bg-white/10 rounded-xl px-4 py-3 cursor-pointer"
          >
            🐾 Patients
          </div>

          <div
            onClick={() =>
              router.push("/doctor/dashboard/appointments")
            }
            className="hover:bg-white/10 rounded-xl px-4 py-3 cursor-pointer"
          >
            📅 Appointments
          </div>

          <div
            onClick={() =>
              router.push("/doctor/dashboard/services")
            }
            className="hover:bg-white/10 rounded-xl px-4 py-3 cursor-pointer"
          >
            💊 Services & Inventory
          </div>

          <div
            onClick={() =>
              router.push("/doctor/dashboard/staff")
            }
            className="hover:bg-white/10 rounded-xl px-4 py-3 cursor-pointer"
          >
            👥 Staff
          </div>

          <div
            onClick={() =>
              router.push("/doctor/dashboard/revenue")
            }
            className="hover:bg-white/10 rounded-xl px-4 py-3 cursor-pointer"
          >
            💰 Revenue
          </div>

          <div className="hover:bg-white/10 rounded-xl px-4 py-3 cursor-pointer">
            🤖 AI Assistant
          </div>

        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">

        {/* Header */}
        <div className="mb-10">
          <p className="text-[#E8874A] font-semibold mb-2">
            🩺 Veterinarian Dashboard
          </p>

          <h2 className="text-4xl font-bold text-[#315C4B]">
            Welcome, Doctor
          </h2>

          <p className="text-gray-500 mt-2">
            Here's your clinic overview.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Clinic */}
          <div
            onClick={() =>
              router.push("/doctor/dashboard/clinic-info")
            }
            className="bg-white rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition"
          >
            <div className="text-4xl mb-4">🏥</div>

            <h3 className="text-xl font-bold text-[#315C4B]">
              Clinic Information
            </h3>

            <p className="text-gray-500 mt-2">
              Staff, working hours, and clinic details.
            </p>
          </div>

          {/* Patients */}
          <div
            onClick={() =>
              router.push("/doctor/dashboard/patients")
            }
            className="bg-white rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition"
          >
            <div className="text-4xl mb-4">🐾</div>

            <h3 className="text-xl font-bold text-[#315C4B]">
              Patients
            </h3>

            <p className="text-gray-500 mt-2">
              View pets and manage their health records.
            </p>
          </div>

          {/* Appointments */}
          <div
            onClick={() =>
              router.push("/doctor/dashboard/appointments")
            }
            className="bg-white rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition"
          >
            <div className="text-4xl mb-4">📅</div>

            <h3 className="text-xl font-bold text-[#315C4B]">
              Today's Appointments
            </h3>

            <p className="text-gray-500 mt-2">
              View and manage today's bookings.
            </p>
          </div>

          {/* Services */}
          <div
            onClick={() =>
              router.push("/doctor/dashboard/services")
            }
            className="bg-white rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition"
          >
            <div className="text-4xl mb-4">💊</div>

            <h3 className="text-xl font-bold text-[#315C4B]">
              Services & Inventory
            </h3>

            <p className="text-gray-500 mt-2">
              Medicines, injections, and pet supplies.
            </p>
          </div>

          {/* Staff */}
          <div
            onClick={() =>
              router.push("/doctor/dashboard/staff")
            }
            className="bg-white rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition"
          >
            <div className="text-4xl mb-4">👥</div>

            <h3 className="text-xl font-bold text-[#315C4B]">
              Staff Overview
            </h3>

            <p className="text-gray-500 mt-2">
              Employees, shifts, and daily performance.
            </p>
          </div>

          {/* Revenue */}
          <div
            onClick={() =>
              router.push("/doctor/dashboard/revenue")
            }
            className="bg-white rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition"
          >
            <div className="text-4xl mb-4">💰</div>

            <h3 className="text-xl font-bold text-[#315C4B]">
              Revenue
            </h3>

            <p className="text-gray-500 mt-2">
              Cash, sales, and financial summary.
            </p>
          </div>

          {/* AI */}
          <div className="bg-white rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition">
            <div className="text-4xl mb-4">🤖</div>

            <h3 className="text-xl font-bold text-[#315C4B]">
              AI Assistant
            </h3>

            <p className="text-gray-500 mt-2">
              Get help with diagnosing medical cases.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}