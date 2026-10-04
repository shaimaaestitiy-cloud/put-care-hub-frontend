"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type MedicalRecord = {
  id: number;
  date: string;
  diagnosis: string;
  treatment: string;
  notes: string;
};

export default function MedicalRecords({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  const [records, setRecords] = useState<MedicalRecord[]>([]);

  useEffect(() => {
    const savedRecords: MedicalRecord[] = JSON.parse(
      localStorage.getItem(`medical-records-${id}`) || "[]"
    );

    setRecords(savedRecords);
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

        <div className="mb-8">
          <p className="text-[#E8874A] font-semibold mb-2">
            🩺 Pet Health
          </p>

          <h1 className="text-4xl font-bold text-[#315C4B]">
            Medical Records
          </h1>

          <p className="text-gray-500 mt-2">
            View your pet's medical history.
          </p>
        </div>

        {records.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm p-10 text-center">
            <div className="text-5xl mb-4">🩺</div>

            <h2 className="text-2xl font-bold text-[#315C4B]">
              No medical records yet
            </h2>

            <p className="text-gray-500 mt-2">
              Medical records added by your veterinarian will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {records.map((record) => (
              <div
                key={record.id}
                className="bg-white rounded-2xl shadow-sm p-6"
              >
                <p className="text-[#E8874A] font-semibold">
                  {record.date}
                </p>

                <h2 className="text-xl font-bold text-[#315C4B] mt-2">
                  {record.diagnosis}
                </h2>

                <p className="text-gray-600 mt-3">
                  <span className="font-semibold">
                    Treatment:
                  </span>{" "}
                  {record.treatment}
                </p>

                {record.notes && (
                  <p className="text-gray-500 mt-2">
                    <span className="font-semibold">
                      Notes:
                    </span>{" "}
                    {record.notes}
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