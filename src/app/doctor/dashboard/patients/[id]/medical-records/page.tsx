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

export default function DoctorMedicalRecords({
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

  function handleDelete(recordId: number) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this medical record?"
    );

    if (!confirmDelete) return;

    const updatedRecords = records.filter(
      (record) => record.id !== recordId
    );

    localStorage.setItem(
      `medical-records-${id}`,
      JSON.stringify(updatedRecords)
    );

    setRecords(updatedRecords);
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
              🩺 Patient Health
            </p>

            <h1 className="text-4xl font-bold text-[#315C4B]">
              Medical Records
            </h1>

            <p className="text-gray-500 mt-2">
              View and manage this patient's medical history.
            </p>
          </div>

          <button
            onClick={() =>
              router.push(
                `/doctor/dashboard/patients/${id}/medical-records/add`
              )
            }
            className="bg-[#E8874A] text-white px-5 py-3 rounded-xl font-semibold hover:opacity-90"
          >
            + Add Medical Record
          </button>
        </div>

        {records.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm p-10 text-center">
            <div className="text-5xl mb-4">🩺</div>

            <h2 className="text-2xl font-bold text-[#315C4B]">
              No medical records yet
            </h2>

            <p className="text-gray-500 mt-2">
              Add the patient's first medical record.
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

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() =>
                      router.push(
                        `/doctor/dashboard/patients/${id}/medical-records/${record.id}/edit`
                      )
                    }
                    className="bg-[#E8874A] text-white px-4 py-2 rounded-xl font-semibold hover:opacity-90"
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() => handleDelete(record.id)}
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