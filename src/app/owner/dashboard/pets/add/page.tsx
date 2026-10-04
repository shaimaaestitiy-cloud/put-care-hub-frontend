"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddPet() {
  const router = useRouter();

  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newPet = {
      id: Date.now(),
      name: petName,
      type: petType,
      breed: breed,
      age: age,
      gender: gender,
      weight: weight,
    };

    const savedPets = JSON.parse(
      localStorage.getItem("pets") || "[]"
    );

    savedPets.push(newPet);

    localStorage.setItem(
      "pets",
      JSON.stringify(savedPets)
    );

    router.push("/owner/dashboard/pets");
  }

  return (
    <div className="min-h-screen bg-[#FFF9F1]">
      <main className="max-w-3xl mx-auto px-6 py-12">

        <button
          onClick={() => router.push("/owner/dashboard/pets")}
          className="text-[#315C4B] font-semibold mb-6 hover:underline"
        >
          ← Back to My Pets
        </button>

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <div className="text-center mb-8">
            <div className="text-5xl mb-3">🐾</div>

            <h1 className="text-3xl font-bold text-[#315C4B]">
              Add New Pet
            </h1>

            <p className="text-gray-500 mt-2">
              Tell us a little about your pet.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Pet Name */}
            <div>
              <label className="block text-sm font-semibold text-[#315C4B] mb-2">
                Pet Name
              </label>

              <input
                type="text"
                required
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="Enter pet name"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#E8874A]"
              />
            </div>

            {/* Type and Breed */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <label className="block text-sm font-semibold text-[#315C4B] mb-2">
                  Pet Type
                </label>

                <select
                  required
                  value={petType}
                  onChange={(e) => setPetType(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#E8874A]"
                >
                  <option value="">Choose pet type</option>
                  <option value="dog">Dog 🐶</option>
                  <option value="cat">Cat 🐱</option>
                  <option value="bird">Bird 🐦</option>
                  <option value="rabbit">Rabbit 🐰</option>
                  <option value="other">Other 🐾</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#315C4B] mb-2">
                  Breed
                </label>

                <input
                  type="text"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  placeholder="Enter breed"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#E8874A]"
                />
              </div>

            </div>

            {/* Age, Gender and Weight */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

              <div>
                <label className="block text-sm font-semibold text-[#315C4B] mb-2">
                  Age
                </label>

                <input
                  type="number"
                  min="0"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Enter age"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#E8874A]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#315C4B] mb-2">
                  Gender
                </label>

                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#E8874A]"
                >
                  <option value="">Choose gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#315C4B] mb-2">
                  Weight (kg)
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter weight"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#E8874A]"
                />
              </div>

            </div>

            {/* Pet Photo */}
            <div>
              <label className="block text-sm font-semibold text-[#315C4B] mb-2">
                Pet Photo
              </label>

              <input
                type="file"
                accept="image/*"
                className="w-full border border-dashed border-gray-300 rounded-xl px-4 py-4 text-gray-500"
              />
            </div>

            {/* Add Pet Button */}
            <button
              type="submit"
              className="w-full bg-[#315C4B] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Add Pet 🐾
            </button>

          </form>
        </div>
      </main>
    </div>
  );
}