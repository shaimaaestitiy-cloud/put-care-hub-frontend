"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";

type Vaccination = {
  id: number;
  vaccineName: string;
  date: string;
  nextDose: string;
  notes: string;
};

export default function AddVaccination({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  const [vaccineName, setVaccineName] = useState("");
  const [date, setDate] = useState("");
  const [nextDose, setNextDose] = useState("");
  const [notes, setNotes] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newVaccination: Vaccination = {
      id: Date.now(),
      vaccineName,
      date,
      nextDose,
      notes,
    };

    const savedVaccinations: Vaccination[] = JSON.parse(
      localStorage.getItem(`vaccinations-${id}`) || "[]"
    );

    savedVaccinations.push(newVaccination);

    localStorage.setItem(
      `vaccinations-${id}`,
      JSON.stringify(savedVaccinations)
    );

    router.push(
      `/doctor/dashboard/patients/${id}/vaccinations`
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F1]">
      <main className="max-w-3xl mx-auto px-6 py-10">

        <button
          onClick={() =>
            router.push(
              `/doctor/dashboard/patients/${id}/vaccinations`
            )
          }
          className="text-[#315C4B] font-semibold mb-6 hover:underline"
        >
          ← Back to Vaccinations
        </button>

        <div className="bg-white rounded-3xl shadow-sm p-8">

          <div className="text-center mb-8">
            <div className="text-5xl mb-3">💉</div>

            <h1 className="text-3xl font-bold text-[#315C4B]">
              Add Vaccination
            </h1>

            <p className="text-gray-500 mt-2">
              Add vaccination information for this patient.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-semibold text-[#315C4B] mb-2">
                Vaccine Name
              </label>

              <input
                type="text"
                required
                value={vaccineName}
                onChange={(e) => setVaccineName(e.target.value)}
                placeholder="Enter vaccine name"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#E8874A]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#315C4B] mb-2">
                Vaccination Date
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
                Next Dose
              </label>

              <input
                type="date"
                value={nextDose}
                onChange={(e) => setNextDose(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#E8874A]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#315C4B] mb-2">
                Notes
              </label>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Additional notes (optional)"
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#E8874A] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#315C4B] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Save Vaccination 💉
            </button>

          </form>

        </div>
      </main>
    </div>
  );
}