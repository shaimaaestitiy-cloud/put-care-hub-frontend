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

export default function MyPets() {
  const router = useRouter();
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    const savedPets = JSON.parse(
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
    <div className="min-h-screen bg-[#FFF9F1] flex">

      {/* Sidebar */}
      <aside className="w-64 min-h-screen bg-[#315C4B] text-white p-6">
        <h1 className="text-2xl font-bold mb-10">
          🐾 Pet Care Hub
        </h1>

        <nav className="space-y-3">

          <div
            onClick={() => router.push("/owner/dashboard")}
            className="hover:bg-white/10 rounded-xl px-4 py-3 cursor-pointer"
          >
            🏠 Dashboard
          </div>

          <div className="bg-white/15 rounded-xl px-4 py-3">
            🐶 My Pets
          </div>

          <div className="hover:bg-white/10 rounded-xl px-4 py-3 cursor-pointer">
            📅 Appointments
          </div>

          <div className="hover:bg-white/10 rounded-xl px-4 py-3 cursor-pointer">
            🩺 Medical Records
          </div>

          <div className="hover:bg-white/10 rounded-xl px-4 py-3 cursor-pointer">
            ✂️ Services
          </div>

          <div className="hover:bg-white/10 rounded-xl px-4 py-3 cursor-pointer">
            🤖 AI Assistant
          </div>

        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">

        <div className="flex items-center justify-between mb-8">

          <div>
            <p className="text-[#E8874A] font-semibold mb-2">
              🐾 Pet Owner
            </p>

            <h2 className="text-4xl font-bold text-[#315C4B]">
              My Pets
            </h2>

            <p className="text-gray-500 mt-2">
              Manage your pets and their information.
            </p>
          </div>

          <button
            onClick={() =>
              router.push("/owner/dashboard/pets/add")
            }
            className="bg-[#E8874A] text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            + Add New Pet
          </button>

        </div>

        {/* No Pets */}
        {pets.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 shadow-sm text-center">

            <div className="text-5xl mb-4">
              🐾
            </div>

            <h3 className="text-xl font-bold text-[#315C4B]">
              No pets yet
            </h3>

            <p className="text-gray-500 mt-2">
              Add your first pet to get started.
            </p>

          </div>
        ) : (

          /* Pet Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {pets.map((pet) => (
              <div
  key={pet.id}
  onClick={() =>
    router.push(`/owner/dashboard/pets/${pet.id}`)
  }
  className="bg-white rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition"
>

                <div className="text-5xl mb-4">
                  {getPetIcon(pet.type)}
                </div>

                <h3 className="text-2xl font-bold text-[#315C4B]">
                  {pet.name}
                </h3>

                <div className="text-gray-500 mt-4 space-y-2">

                  <p>
                    <span className="font-semibold">
                      Type:
                    </span>{" "}
                    {pet.type}
                  </p>

                  {pet.breed && (
                    <p>
                      <span className="font-semibold">
                        Breed:
                      </span>{" "}
                      {pet.breed}
                    </p>
                  )}

                  {pet.age && (
                    <p>
                      <span className="font-semibold">
                        Age:
                      </span>{" "}
                      {pet.age}
                    </p>
                  )}

                  {pet.gender && (
                    <p>
                      <span className="font-semibold">
                        Gender:
                      </span>{" "}
                      {pet.gender}
                    </p>
                  )}

                  {pet.weight && (
                    <p>
                      <span className="font-semibold">
                        Weight:
                      </span>{" "}
                      {pet.weight} kg
                    </p>
                  )}

                </div>

              </div>
            ))}

          </div>
        )}

      </main>
    </div>
  );
}