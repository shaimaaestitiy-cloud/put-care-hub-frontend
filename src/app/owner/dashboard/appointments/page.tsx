"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Appointment = {
  id: number;
  petId: number;
  petName: string;
  date: string;
  time: string;
  reason: string;
  status: string;
};

export default function OwnerAppointments() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const savedAppointments: Appointment[] = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );

    setAppointments(savedAppointments);
  }, []);

  function handleCancel(appointmentId: number) {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );

    if (!confirmCancel) return;

    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === appointmentId
        ? { ...appointment, status: "Cancelled" }
        : appointment
    );

    localStorage.setItem(
      "appointments",
      JSON.stringify(updatedAppointments)
    );

    setAppointments(updatedAppointments);
  }

  return (
    <div className="min-h-screen bg-[#FFF9F1]">
      <main className="max-w-5xl mx-auto px-6 py-10">

        <button
          onClick={() => router.push("/owner/dashboard")}
          className="text-[#315C4B] font-semibold mb-6 hover:underline"
        >
          ← Back to Dashboard
        </button>

        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[#E8874A] font-semibold mb-2">
              📅 Pet Owner
            </p>

            <h1 className="text-4xl font-bold text-[#315C4B]">
              Appointments
            </h1>

            <p className="text-gray-500 mt-2">
              View and manage your pet appointments.
            </p>
          </div>

          <button
            onClick={() =>
              router.push("/owner/dashboard/appointments/book")
            }
            className="bg-[#E8874A] text-white px-5 py-3 rounded-xl font-semibold hover:opacity-90"
          >
            + Book Appointment
          </button>
        </div>

        {appointments.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm p-10 text-center">
            <div className="text-5xl mb-4">📅</div>

            <h2 className="text-2xl font-bold text-[#315C4B]">
              No appointments yet
            </h2>

            <p className="text-gray-500 mt-2">
              Book an appointment for your pet.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white rounded-2xl shadow-sm p-6"
              >
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="text-[#E8874A] font-semibold">
                      📅 {appointment.date} • {appointment.time}
                    </p>

                    <h2 className="text-xl font-bold text-[#315C4B] mt-2">
                      🐾 {appointment.petName}
                    </h2>

                    <p className="text-gray-600 mt-2">
                      <span className="font-semibold">Reason:</span>{" "}
                      {appointment.reason}
                    </p>

                    <p className="text-gray-500 mt-2">
                      <span className="font-semibold">Status:</span>{" "}
                      {appointment.status}
                    </p>
                  </div>

                  {appointment.status !== "Cancelled" && (
                    <button
                      onClick={() => handleCancel(appointment.id)}
                      className="self-start bg-red-500 text-white px-4 py-2 rounded-xl font-semibold hover:opacity-90"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}