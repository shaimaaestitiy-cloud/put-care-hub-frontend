"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Pet = {
  id: number;
  name: string;
  type: string;
  breed: string;
  age: string;
  gender: string;
  weight: string;
};

type Appointment = {
  id: number;
  petId: number;
  petName: string;
  date: string;
  time: string;
  reason: string;
  status: string;
};

export default function BookAppointment() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [pets, setPets] = useState<Pet[]>([]);
  const [petId, setPetId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    const savedPets: Pet[] = JSON.parse(
      localStorage.getItem("pets") || "[]"
    );

    setPets(savedPets);

    // Get selected service from the URL
    const selectedService = searchParams.get("service");

    if (selectedService) {
      setReason(selectedService);
    }
  }, [searchParams]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const selectedPet = pets.find(
      (pet) => pet.id === Number(petId)
    );

    if (!selectedPet) return;

    const newAppointment: Appointment = {
      id: Date.now(),
      petId: selectedPet.id,
      petName: selectedPet.name,
      date,
      time,
      reason,
      status: "Pending",
    };

    const savedAppointments: Appointment[] = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );

    savedAppointments.push(newAppointment);

    localStorage.setItem(
      "appointments",
      JSON.stringify(savedAppointments)
    );

    router.push("/owner/dashboard/appointments");
  }

  return (
    <div className="min-h-screen bg-[#FFF9F1]">
      <main className="max-w-3xl mx-auto px-6 py-10">

        <button
          onClick={() =>
            router.push("/owner/dashboard/appointments")
          }
          className="text-[#315C4B] font-semibold mb-6 hover:underline"
        >
          ← Back to Appointments
        </button>

        <div className="bg-white rounded-3xl shadow-sm p-8">

          <div className="text-center mb-8">
            <div className="text-5xl mb-3">📅</div>

            <h1 className="text-3xl font-bold text-[#315C4B]">
              Book Appointment
            </h1>

            <p className="text-gray-500 mt-2">
              Schedule a veterinary appointment for your pet.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-semibold text-[#315C4B] mb-2">
                Select Pet
              </label>

              <select
                required
                value={petId}
                onChange={(e) => setPetId(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#E8874A]"
              >
                <option value="">
                  Choose your pet
                </option>

                {pets.map((pet) => (
                  <option
                    key={pet.id}
                    value={pet.id}
                  >
                    {pet.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="block text-sm font-semibold text-[#315C4B] mb-2">
                  Appointment Date
                </label>

                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#E8874A]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#315C4B] mb-2">
                  Appointment Time
                </label>

                <input
                  type="time"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#E8874A]"
                />
              </div>

            </div>

            <div>
              <label className="block text-sm font-semibold text-[#315C4B] mb-2">
                Reason for Visit
              </label>

              <textarea
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Describe the reason for the appointment"
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#E8874A] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#315C4B] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Book Appointment 📅
            </button>

          </form>

        </div>
      </main>
    </div>
  );
}