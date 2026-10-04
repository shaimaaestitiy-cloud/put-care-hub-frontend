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

export default function EditMedicalRecord({
  params,
}: {
  params: Promise<{ id: string; recordId: string }>;
}) {
  const router = useRouter();
  const { id, recordId } = use(params);

  const [date, setDate] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [notes, setNotes] = useState("");
  const [recordFound, setRecordFound] = useState(true);

  useEffect(() => {
    const savedRecords: MedicalRecord[] = JSON.parse(
      localStorage.getItem(`medical-records-${id}`) || "[]"
    );

    const selectedRecord = savedRecords.find(
      (record) => record.id === Number(recordId)
    );

    if (!selectedRecord) {
      setRecordFound(false);
      return;
    }

    setDate(selectedRecord.date);
    setDiagnosis(selectedRecord.diagnosis);
    setTreatment(selectedRecord.treatment);
    setNotes(selectedRecord.notes || "");
  }, [id, recordId]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const savedRecords: MedicalRecord[] = JSON.parse(
      localStorage.getItem(`medical-records-${id}`) || "[]"
    );

    const updatedRecords = savedRecords.map((record) =>
      record.id === Number(recordId)
        ? {
            ...record,
            date,
            diagnosis,
            treatment,
            notes,
          }
        : record
    );

    localStorage.setItem(
      `medical-records-${id}`,
      JSON.stringify(updatedRecords)
    );

    router.push(
      `/doctor/dashboard/patients/${id}/medical-records`
    );
  }

  if (!recordFound) {
    return (
      <div className="min-h-screen bg-[#FFF9F1] flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🩺</div>

          <h2 className="text-2xl font-bold text-[#315C4B]">
            Medical record not found
          </h2>

          <button
            onClick={() =>
              router.push(
                `/doctor/dashboard/patients/${id}/medical-records`
              )
            }
            className="mt-5 text-[#E8874A] font-semibold hover:underline"
          >
            ← Back to Medical Records
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
              `/doctor/dashboard/patients/${id}/medical-records`
            )
          }
          className="text-[#315C4B] font-semibold mb-6 hover:underline"
        >
          ← Back to Medical Records
        </button>

        <div className="bg-white rounded-3xl shadow-sm p-8">

          <div className="text-center mb-8">
            <div className="text-5xl mb-3">✏️</div>

            <h1 className="text-3xl font-bold text-[#315C4B]">
              Edit Medical Record
            </h1>

            <p className="text-gray-500 mt-2">
              Update the patient's medical information.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-semibold text-[#315C4B] mb-2">
                Visit Date
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
                Diagnosis
              </label>

              <input
                type="text"
                required
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#E8874A]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#315C4B] mb-2">
                Treatment
              </label>

              <textarea
                required
                value={treatment}
                onChange={(e) => setTreatment(e.target.value)}
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#E8874A] resize-none"
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