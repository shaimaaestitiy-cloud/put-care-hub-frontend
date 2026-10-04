"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Pet = {
  id: number;
  name: string;
  type: string;
  breed: string;
  age: string;
  gender: string;
  weight: string;
};

export default function PatientProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  const [pet, setPet] = useState<Pet | null>(null);

  useEffect(() => {
    const savedPets: Pet[] = JSON.parse(
      localStorage.getItem("pets") || "[]"
    );

    const selectedPet = savedPets.find(
      (item) => item.id === Number(id)
    );

    if (selectedPet) {
      setPet(selectedPet);
    }
  }, [id]);

  function getPetIcon(type: string) {
    if (type === "dog") return "🐶";
    if (type === "cat") return "🐱";
    if (type === "bird") return "🐦";
    if (type === "rabbit") return "🐰";
    return "🐾";
  }

  if (!pet) {
    return (
      <div className="min-h-screen bg-[#FFF9F1] flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🐾</div>

          <h2 className="text-2xl font-bold text-[#315C4B]">
            Patient not found
          </h2>

          <button
            onClick={() =>
              router.push("/doctor/dashboard/patients")
            }
            className="mt-5 text-[#E8874A] font-semibold hover:underline"
          >
            ← Back to Patients
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F1]">
      <main className="max-w-5xl mx-auto px-6 py-10">

        <button
          onClick={() =>
            router.push("/doctor/dashboard/patients")
          }
          className="text-[#315C4B] font-semibold mb-6 hover:underline"
        >
          ← Back to Patients
        </button>

        <div className="bg-white rounded-3xl shadow-sm p-8 mb-6">
          <div className="flex items-center gap-6">

            <div className="w-24 h-24 rounded-full bg-[#FFF3E8] flex items-center justify-center text-6xl">
              {getPetIcon(pet.type)}
            </div>

            <div>
              <p className="text-[#E8874A] font-semibold">
                👨‍⚕️ Patient Profile
              </p>

              <h1 className="text-4xl font-bold text-[#315C4B] mt-1">
                {pet.name}
              </h1>

              <p className="text-gray-500 mt-2 capitalize">
                {pet.type}
                {pet.breed ? ` • ${pet.breed}` : ""}
              </p>
            </div>

          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-8 mb-6">

          <h2 className="text-2xl font-bold text-[#315C4B] mb-6">
            Patient Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-[#FFF9F1] rounded-2xl p-5">
              <p className="text-gray-500 text-sm">
                Age
              </p>

              <p className="text-lg font-bold text-[#315C4B] mt-1">
                {pet.age ? `${pet.age} years` : "Not added"}
              </p>
            </div>

            <div className="bg-[#FFF9F1] rounded-2xl p-5">
              <p className="text-gray-500 text-sm">
                Gender
              </p>

              <p className="text-lg font-bold text-[#315C4B] mt-1 capitalize">
                {pet.gender || "Not added"}
              </p>
            </div>

            <div className="bg-[#FFF9F1] rounded-2xl p-5">
              <p className="text-gray-500 text-sm">
                Weight
              </p>

              <p className="text-lg font-bold text-[#315C4B] mt-1">
                {pet.weight ? `${pet.weight} kg` : "Not added"}
              </p>
            </div>

          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div
            onClick={() =>
              router.push(
                `/doctor/dashboard/patients/${id}/medical-records`
              )
            }
            className="bg-white rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition"
          >
            <div className="text-4xl mb-4">🩺</div>

            <h3 className="text-xl font-bold text-[#315C4B]">
              Medical Records
            </h3>

            <p className="text-gray-500 mt-2">
              View and manage this patient's medical history.
            </p>

            <p className="text-[#E8874A] font-semibold mt-4">
              Manage Records →
            </p>
          </div>

          <div
            onClick={() =>
              router.push(
                `/doctor/dashboard/patients/${id}/vaccinations`
              )
            }
            className="bg-white rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition"
          >
            <div className="text-4xl mb-4">💉</div>

            <h3 className="text-xl font-bold text-[#315C4B]">
              Vaccinations
            </h3>

            <p className="text-gray-500 mt-2">
              View and manage this patient's vaccinations.
            </p>

            <p className="text-[#E8874A] font-semibold mt-4">
              Manage Vaccinations →
            </p>
          </div>

        </div>

      </main>
    </div>
  );
}