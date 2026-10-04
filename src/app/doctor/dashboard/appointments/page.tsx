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

export default function DoctorAppointments() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const savedAppointments: Appointment[] = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );

    setAppointments(savedAppointments);
  }, []);

  function updateStatus(
    appointmentId: number,
    newStatus: string
  ) {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === appointmentId
        ? { ...appointment, status: newStatus }
        : appointment
    );

    localStorage.setItem(
      "appointments",
      JSON.stringify(updatedAppointments)
    );

    setAppointments(updatedAppointments);
  }

  function getStatusStyle(status: string) {
    if (status === "Confirmed") {
      return "bg-green-100 text-green-700";
    }

    if (status === "Completed") {
      return "bg-blue-100 text-blue-700";
    }

    if (status === "Cancelled") {
      return "bg-red-100 text-red-700";
    }

    return "bg-yellow-100 text-yellow-700";
  }

  return (
    <div className="min-h-screen bg-[#FFF9F1]">
      <main className="max-w-6xl mx-auto px-6 py-10">

        <button
          onClick={() => router.push("/doctor/dashboard")}
          className="text-[#315C4B] font-semibold mb-6 hover:underline"
        >
          ← Back to Dashboard
        </button>

        <div className="mb-8">
          <p className="text-[#E8874A] font-semibold mb-2">
            👨‍⚕️ Veterinarian
          </p>

          <h1 className="text-4xl font-bold text-[#315C4B]">
            Appointments
          </h1>

          <p className="text-gray-500 mt-2">
            View and manage pet appointments.
          </p>
        </div>

        {appointments.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm p-10 text-center">
            <div className="text-5xl mb-4">📅</div>

            <h2 className="text-2xl font-bold text-[#315C4B]">
              No appointments yet
            </h2>

            <p className="text-gray-500 mt-2">
              Appointments booked by pet owners will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">

            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white rounded-2xl shadow-sm p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                  <div>
                    <p className="text-[#E8874A] font-semibold">
                      📅 {appointment.date} • {appointment.time}
                    </p>

                    <h2 className="text-2xl font-bold text-[#315C4B] mt-2">
                      🐾 {appointment.petName}
                    </h2>

                    <p className="text-gray-600 mt-2">
                      <span className="font-semibold">
                        Reason:
                      </span>{" "}
                      {appointment.reason}
                    </p>

                    <div className="mt-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusStyle(
                          appointment.status
                        )}`}
                      >
                        {appointment.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">

                    {appointment.status === "Pending" && (
                      <button
                        onClick={() =>
                          updateStatus(
                            appointment.id,
                            "Confirmed"
                          )
                        }
                        className="bg-[#315C4B] text-white px-4 py-2 rounded-xl font-semibold hover:opacity-90"
                      >
                        ✓ Confirm
                      </button>
                    )}

                    {appointment.status === "Confirmed" && (
                      <button
                        onClick={() =>
                          updateStatus(
                            appointment.id,
                            "Completed"
                          )
                        }
                        className="bg-[#E8874A] text-white px-4 py-2 rounded-xl font-semibold hover:opacity-90"
                      >
                        ✓ Complete
                      </button>
                    )}

                    {appointment.status !== "Cancelled" &&
                      appointment.status !== "Completed" && (
                        <button
                          onClick={() =>
                            updateStatus(
                              appointment.id,
                              "Cancelled"
                            )
                          }
                          className="bg-red-500 text-white px-4 py-2 rounded-xl font-semibold hover:opacity-90"
                        >
                          ✕ Cancel
                        </button>
                      )}

                  </div>
                </div>
              </div>
            ))}

          </div>
        )}

      </main>
    </div>
  );
}