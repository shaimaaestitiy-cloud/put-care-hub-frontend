"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type DemoSession = {
  id: string;
  name: string;
  email: string;
};

type Appointment = {
  status: string;
};

export default function OwnerDashboard() {
  const router = useRouter();

  const [ownerName, setOwnerName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [petCount, setPetCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);

  useEffect(() => {
    // Check demo login session
    const savedSession = localStorage.getItem("petCareDemoSession");

    if (!savedSession) {
      router.replace("/owner/login");
      return;
    }

    try {
      const session: DemoSession = JSON.parse(savedSession);

      if (!session.id || !session.email) {
        throw new Error("Invalid session");
      }

      const firstName =
        session.name?.trim().split(/\s+/)[0] || "Pet Lover";

      setOwnerName(firstName);
    } catch {
      localStorage.removeItem("petCareDemoSession");
      router.replace("/owner/login");
      return;
    }

    // Get saved pets
    const savedPets = JSON.parse(
      localStorage.getItem("pets") || "[]"
    );

    setPetCount(savedPets.length);

    // Get saved appointments
    const savedAppointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );

    // Count Pending and Confirmed appointments
    const upcomingAppointments = savedAppointments.filter(
      (appointment: Appointment) =>
        appointment.status === "Pending" ||
        appointment.status === "Confirmed"
    );

    setAppointmentCount(upcomingAppointments.length);

    setIsLoading(false);
  }, [router]);

  // Logout function
  function handleLogout() {
    localStorage.removeItem("petCareDemoSession");

    setShowLogoutModal(false);

    router.replace("/owner/login");
  }

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFF9F1] flex items-center justify-center">
        <p className="text-[#315C4B] text-lg font-semibold">
          Loading your dashboard... 🐾
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F1] flex">

      {/* Sidebar */}
      <aside className="w-64 min-h-screen bg-[#315C4B] text-white p-6 flex flex-col">

        {/* Logo */}
        <h1 className="text-2xl font-bold mb-10">
          🐾 Pet Care Hub
        </h1>

        {/* Navigation */}
        <nav className="space-y-3">

          {/* Dashboard */}
          <div className="bg-white/15 rounded-xl px-4 py-3">
            🏠 Dashboard
          </div>

          {/* My Pets */}
          <button
            type="button"
            onClick={() =>
              router.push("/owner/dashboard/pets")
            }
            className="w-full text-left hover:bg-white/10 rounded-xl px-4 py-3 cursor-pointer transition"
          >
            🐶 My Pets
          </button>

          {/* Appointments */}
          <button
            type="button"
            onClick={() =>
              router.push("/owner/dashboard/appointments")
            }
            className="w-full text-left hover:bg-white/10 rounded-xl px-4 py-3 cursor-pointer transition"
          >
            📅 Appointments
          </button>

          {/* AI Assistant */}
          <div className="hover:bg-white/10 rounded-xl px-4 py-3">
            🤖 AI Assistant
          </div>

          {/* Logout - Directly below AI Assistant */}
          <button
            type="button"
            onClick={() => setShowLogoutModal(true)}
            className="w-full text-left hover:bg-white/10 rounded-xl px-4 py-3 transition"
          >
            🚪 Logout
          </button>

        </nav>

      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 p-10">

        {/* Welcome Section */}
        <div className="mb-10">

          <p className="text-[#E8874A] font-semibold mb-2">
            🐾 Pet Owner Dashboard
          </p>

          <h2 className="text-4xl font-bold text-[#315C4B]">
            Welcome back, {ownerName}! 👋
          </h2>

          <p className="text-gray-500 mt-2">
            Everything your pet needs, all in one place.
          </p>

        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* My Pets */}
          <div
            onClick={() =>
              router.push("/owner/dashboard/pets")
            }
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

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setShowLogoutModal(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            aria-describedby="logout-description"
            className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Icon */}
            <div className="w-20 h-20 bg-[#FFF9F1] rounded-full flex items-center justify-center mx-auto mb-5">
              <span className="text-5xl">🐾</span>
            </div>

            {/* Title */}
            <h2
              id="logout-title"
              className="text-2xl font-bold text-[#315C4B] mb-3"
            >
              Leaving so soon?
            </h2>

            {/* Message */}
            <p
              id="logout-description"
              className="text-gray-500 leading-relaxed mb-8"
            >
              Are you sure you want to log out?
              <br />
              You&apos;ll need to sign in again to access your account.
            </p>

            {/* Buttons */}
            <div className="flex gap-3">

              {/* Cancel */}
              <button
                type="button"
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              {/* Confirm Logout */}
              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 bg-[#315C4B] text-white py-3 rounded-xl font-semibold hover:bg-[#244638] transition"
              >
                Yes, Log Out
              </button>

            </div>

            {/* Small Footer */}
            <p className="text-xs text-gray-400 mt-6">
              🐾 See you again at Pet Care Hub!
            </p>

          </div>
        </div>
      )}

    </div>
  );
}