"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OwnerDashboard() {
  const router = useRouter();

  const [petCount, setPetCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);

  useEffect(() => {
    // Get saved pets
    const savedPets = JSON.parse(
      localStorage.getItem("pets") || "[]"
    );

    setPetCount(savedPets.length);

    // Get saved appointments
    const savedAppointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );

    // Count only Pending and Confirmed appointments
    const upcomingAppointments = savedAppointments.filter(
      (appointment: { status: string }) =>
        appointment.status === "Pending" ||
        appointment.status === "Confirmed"
    );

    setAppointmentCount(upcomingAppointments.length);
  }, []);

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
            onClick={() => router.push("/owner/dashboard/pets")}
            className="hover:bg-white/10 rounded-xl px-4 py-3 cursor-pointer"
          >
            🐶 My Pets
          </div>

          <div
            onClick={() =>
              router.push("/owner/dashboard/appointments")
            }
            className="hover:bg-white/10 rounded-xl px-4 py-3 cursor-pointer"
          >
            📅 Appointments
          </div>

          <div className="hover:bg-white/10 rounded-xl px-4 py-3 cursor-pointer">
            🩺 Medical Records
          </div>

         <div
  onClick={() => router.push("/owner/dashboard/services")}
  className="hover:bg-white/10 rounded-xl px-4 py-3 cursor-pointer"
>
  ✂️ Services
</div>

          <div className="hover:bg-white/10 rounded-xl px-4 py-3 cursor-pointer">
            🤖 AI Assistant
          </div>

        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">

        <div className="mb-10">
          <p className="text-[#E8874A] font-semibold mb-2">
            🐾 Pet Owner Dashboard
          </p>

          <h2 className="text-4xl font-bold text-[#315C4B]">
            Welcome back!
          </h2>

          <p className="text-gray-500 mt-2">
            Everything your pet needs, all in one place.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* My Pets */}
          <div
            onClick={() => router.push("/owner/dashboard/pets")}
            className="bg-white rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition"
          >
            <div className="text-3xl mb-3">🐶</div>

            <p className="text-gray-500">
              My Pets
            </p>

            <h3 className="text-3xl font-bold text-[#315C4B] mt-1">
              {petCount}
            </h3>
          </div>

          {/* Upcoming Appointments */}
          <div
            onClick={() =>
              router.push("/owner/dashboard/appointments")
            }
            className="bg-white rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition"
          >
            <div className="text-3xl mb-3">📅</div>

            <p className="text-gray-500">
              Upcoming Appointments
            </p>

            <h3 className="text-3xl font-bold text-[#315C4B] mt-1">
              {appointmentCount}
            </h3>
          </div>

          {/* Health Status */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="text-3xl mb-3">❤️</div>

            <p className="text-gray-500">
              Health Status
            </p>

            <h3 className="text-xl font-bold text-[#315C4B] mt-2">
              All Good
            </h3>
          </div>

        </div>

      </main>
    </div>
  );
}