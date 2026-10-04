"use client";

import { useEffect, useState } from "react";
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

export default function Patients() {
  const router = useRouter();
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    const savedPets: Pet[] = JSON.parse(
      localStorage.getItem("pets") || "[]"
    );

    setPets(savedPets);
  }, []);

  function getPetIcon(type: string) {
    if (type === "dog") return "🐶";
    if (type === "cat") return "🐱";
    if (type === "bird") return "🐦";
    if (type === "rabbit") return "🐰";
    return "🐾";
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
            Patients
          </h1>

          <p className="text-gray-500 mt-2">
            View pets and manage their health information.
          </p>
        </div>

        {pets.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm p-10 text-center">
            <div className="text-5xl mb-4">🐾</div>

            <h2 className="text-2xl font-bold text-[#315C4B]">
              No patients yet
            </h2>

            <p className="text-gray-500 mt-2">
              Registered pets will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {pets.map((pet) => (
              <div
                key={pet.id}
                onClick={() =>
                  router.push(
                    `/doctor/dashboard/patients/${pet.id}`
                  )
                }
                className="bg-white rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition"
              >
                <div className="text-5xl mb-4">
                  {getPetIcon(pet.type)}
                </div>

                <h2 className="text-2xl font-bold text-[#315C4B]">
                  {pet.name}
                </h2>

                <p className="text-gray-500 mt-2 capitalize">
                  {pet.type}
                  {pet.breed ? ` • ${pet.breed}` : ""}
                </p>

                <div className="mt-5 text-[#E8874A] font-semibold">
                  View Patient →
                </div>
              </div>
            ))}

          </div>
        )}

      </main>
    </div>
  );
}