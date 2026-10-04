"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Vaccination = {
  id: number;
  vaccineName: string;
  date: string;
  nextDose: string;
  notes: string;
};

export default function EditVaccination({
  params,
}: {
  params: Promise<{ id: string; vaccinationId: string }>;
}) {
  const router = useRouter();
  const { id, vaccinationId } = use(params);

  const [vaccineName, setVaccineName] = useState("");
  const [date, setDate] = useState("");
  const [nextDose, setNextDose] = useState("");
  const [notes, setNotes] = useState("");
  const [vaccinationFound, setVaccinationFound] = useState(true);

  useEffect(() => {
    const savedVaccinations: Vaccination[] = JSON.parse(
      localStorage.getItem(`vaccinations-${id}`) || "[]"
    );

    const selectedVaccination = savedVaccinations.find(
      (vaccination) =>
        vaccination.id === Number(vaccinationId)
    );

    if (!selectedVaccination) {
      setVaccinationFound(false);
      return;
    }

    setVaccineName(selectedVaccination.vaccineName);
    setDate(selectedVaccination.date);
    setNextDose(selectedVaccination.nextDose || "");
    setNotes(selectedVaccination.notes || "");
  }, [id, vaccinationId]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const savedVaccinations: Vaccination[] = JSON.parse(
      localStorage.getItem(`vaccinations-${id}`) || "[]"
    );

    const updatedVaccinations = savedVaccinations.map(
      (vaccination) =>
        vaccination.id === Number(vaccinationId)
          ? {
              ...vaccination,
              vaccineName,
              date,
              nextDose,
              notes,
            }
          : vaccination
    );

    localStorage.setItem(
      `vaccinations-${id}`,
      JSON.stringify(updatedVaccinations)
    );

    router.push(
      `/doctor/dashboard/patients/${id}/vaccinations`
    );
  }

  if (!vaccinationFound) {
    return (
      <div className="min-h-screen bg-[#FFF9F1] flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">💉</div>

          <h2 className="text-2xl font-bold text-[#315C4B]">
            Vaccination not found
          </h2>

          <button
            onClick={() =>
              router.push(
                `/doctor/dashboard/patients/${id}/vaccinations`
              )
            }
            className="mt-5 text-[#E8874A] font-semibold hover:underline"
          >
            ← Back to Vaccinations
          </button>
        </div>
      </div>
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
              Edit Vaccination
            </h1>

            <p className="text-gray-500 mt-2">
              Update this patient's vaccination information.
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
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#E8874A] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#315C4B] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Save Changes ✓
            </button>

          </form>

        </div>
      </main>
    </div>
  );
}