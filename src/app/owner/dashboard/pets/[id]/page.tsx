"use client";
import { useEffect, useState, use } from "react";
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
export default function PetDetails({
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
            Pet not found
          </h2>

          <button
            onClick={() => router.push("/owner/dashboard/pets")}
            className="mt-5 text-[#E8874A] font-semibold hover:underline"
          >
            ← Back to My Pets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF9F1]">

      <main className="max-w-5xl mx-auto px-6 py-10">

        <button
          onClick={() => router.push("/owner/dashboard/pets")}
          className="text-[#315C4B] font-semibold mb-6 hover:underline"
        >
          ← Back to My Pets
        </button>

        {/* Pet Header */}
        <div className="bg-white rounded-3xl shadow-sm p-8 mb-6">

          <div className="flex items-center gap-6">

            <div className="w-24 h-24 rounded-full bg-[#FFF3E8] flex items-center justify-center text-6xl">
              {getPetIcon(pet.type)}
            </div>

            <div>
              <p className="text-[#E8874A] font-semibold">
                🐾 Pet Profile
              </p>

              <h1 className="text-4xl font-bold text-[#315C4B] mt-1">
                {pet.name}
              </h1>
              <button
  onClick={() =>
    router.push(`/owner/dashboard/pets/${id}/edit`)
  }
  className="mt-3 bg-[#E8874A] text-white px-5 py-2 rounded-xl font-semibold hover:opacity-90 transition"
>
  ✏️ Edit Pet
</button>
<button
  onClick={() => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this pet?"
    );

    if (!confirmDelete) return;

    const savedPets: Pet[] = JSON.parse(
      localStorage.getItem("pets") || "[]"
    );

    const updatedPets = savedPets.filter(
      (item) => item.id !== Number(id)
    );

    localStorage.setItem(
      "pets",
      JSON.stringify(updatedPets)
    );

    router.push("/owner/dashboard/pets");
  }}
  className="mt-3 ml-3 bg-red-500 text-white px-5 py-2 rounded-xl font-semibold hover:opacity-90 transition"
>
  🗑️ Delete Pet
</button>

              <p className="text-gray-500 mt-2 capitalize">
                {pet.type}
                {pet.breed ? ` • ${pet.breed}` : ""}
              </p>
            </div>

          </div>
        </div>

        {/* Pet Information */}
        <div className="bg-white rounded-3xl shadow-sm p-8 mb-6">

          <h2 className="text-2xl font-bold text-[#315C4B] mb-6">
            Pet Information
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

        {/* Health Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          
          
<div
onClick={() =>
 router.push(`/owner/dashboard/pets/${id}/medical-records`)
  }
  className="bg-white rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition"
>
  <div className="text-4xl mb-4">🩺</div>

  <h3 className="text-xl font-bold text-[#315C4B]">
    Medical Records
  </h3>

  <p className="text-gray-500 mt-2">
    View your pet's medical history.
  </p>
</div>

          <div
  onClick={() =>
    router.push(`/owner/dashboard/pets/${id}/vaccinations`)
  }
  className="bg-white rounded-2xl p-6 shadow-sm cursor-pointer hover:shadow-md transition"
>
  <div className="text-4xl mb-4">💉</div>

  <h3 className="text-xl font-bold text-[#315C4B]">
    Vaccinations
  </h3>

  <p className="text-gray-500 mt-2">
    Keep track of vaccinations.
  </p>
</div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="text-4xl mb-4">📅</div>

            <h3 className="text-xl font-bold text-[#315C4B]">
              Appointments
            </h3>

            <p className="text-gray-500 mt-2">
              View upcoming appointments.
            </p>
          </div>

        </div>

      </main>
    </div>
  );
}