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

export default function DoctorVaccinations({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);

  useEffect(() => {
    const savedVaccinations: Vaccination[] = JSON.parse(
      localStorage.getItem(`vaccinations-${id}`) || "[]"
    );

    setVaccinations(savedVaccinations);
  }, [id]);

  function handleDelete(vaccinationId: number) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this vaccination?"
    );

    if (!confirmDelete) return;

    const updatedVaccinations = vaccinations.filter(
      (vaccination) => vaccination.id !== vaccinationId
    );

    localStorage.setItem(
      `vaccinations-${id}`,
      JSON.stringify(updatedVaccinations)
    );

    setVaccinations(updatedVaccinations);
  }

  return (
    <div className="min-h-screen bg-[#FFF9F1]">
      <main className="max-w-5xl mx-auto px-6 py-10">

        <button
          onClick={() =>
            router.push(`/doctor/dashboard/patients/${id}`)
          }
          className="text-[#315C4B] font-semibold mb-6 hover:underline"
        >
          ← Back to Patient Profile
        </button>

        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[#E8874A] font-semibold mb-2">
              💉 Patient Health
            </p>

            <h1 className="text-4xl font-bold text-[#315C4B]">
              Vaccinations
            </h1>

            <p className="text-gray-500 mt-2">
              View and manage this patient's vaccinations.
            </p>
          </div>

          <button
            onClick={() =>
              router.push(
                `/doctor/dashboard/patients/${id}/vaccinations/add`
              )
            }
            className="bg-[#E8874A] text-white px-5 py-3 rounded-xl font-semibold hover:opacity-90"
          >
            + Add Vaccination
          </button>
        </div>

        {vaccinations.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm p-10 text-center">
            <div className="text-5xl mb-4">💉</div>

            <h2 className="text-2xl font-bold text-[#315C4B]">
              No vaccinations yet
            </h2>

            <p className="text-gray-500 mt-2">
              Add the patient's first vaccination.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {vaccinations.map((vaccination) => (
              <div
                key={vaccination.id}
                className="bg-white rounded-2xl shadow-sm p-6"
              >
                <p className="text-[#E8874A] font-semibold">
                  💉 {vaccination.date}
                </p>

                <h2 className="text-xl font-bold text-[#315C4B] mt-2">
                  {vaccination.vaccineName}
                </h2>

                {vaccination.nextDose && (
                  <p className="text-gray-600 mt-3">
                    <span className="font-semibold">
                      Next Dose:
                    </span>{" "}
                    {vaccination.nextDose}
                  </p>
                )}

                {vaccination.notes && (
                  <p className="text-gray-500 mt-2">
                    <span className="font-semibold">
                      Notes:
                    </span>{" "}
                    {vaccination.notes}
                  </p>
                )}

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() =>
                      router.push(
                        `/doctor/dashboard/patients/${id}/vaccinations/${vaccination.id}/edit`
                      )
                    }
                    className="bg-[#E8874A] text-white px-4 py-2 rounded-xl font-semibold hover:opacity-90"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(vaccination.id)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-xl font-semibold hover:opacity-90"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}