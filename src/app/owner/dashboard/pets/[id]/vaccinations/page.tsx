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

export default function Vaccinations({
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

  return (
    <div className="min-h-screen bg-[#FFF9F1]">
      <main className="max-w-5xl mx-auto px-6 py-10">

        <button
          onClick={() =>
            router.push(`/owner/dashboard/pets/${id}`)
          }
          className="text-[#315C4B] font-semibold mb-6 hover:underline"
        >
          ← Back to Pet Profile
        </button>

        <div className="flex items-center justify-between mb-8">

          <div>
            <p className="text-[#E8874A] font-semibold mb-2">
              💉 Pet Health
            </p>

            <h1 className="text-4xl font-bold text-[#315C4B]">
              Vaccinations
            </h1>

            <p className="text-gray-500 mt-2">
              Keep track of your pet's vaccinations.
            </p>
          </div>
        </div>

        {vaccinations.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm p-10 text-center">

            <div className="text-5xl mb-4">
              💉
            </div>

            <h2 className="text-2xl font-bold text-[#315C4B]">
              No vaccinations yet
            </h2>

            <p className="text-gray-500 mt-2">
              Vaccination records will appear here.
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

              </div>
            ))}

          </div>
        )}

      </main>
    </div>
  );
}