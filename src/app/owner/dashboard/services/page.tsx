"use client";

import { useRouter } from "next/navigation";

export default function OwnerServices() {
  const router = useRouter();

  const services = [
    {
      id: 1,
      icon: "🩺",
      name: "Veterinary Checkup",
      description: "General health examination for your pet.",
    },
    {
      id: 2,
      icon: "💉",
      name: "Vaccination",
      description: "Keep your pet protected with essential vaccines.",
    },
    {
      id: 3,
      icon: "🛁",
      name: "Pet Bath",
      description: "Professional bathing and cleaning service.",
    },
    {
      id: 4,
      icon: "✂️",
      name: "Grooming",
      description: "Hair trimming and grooming for your pet.",
    },
    {
      id: 5,
      icon: "🐾",
      name: "Nail Trimming",
      description: "Safe and professional nail trimming.",
    },
    {
      id: 6,
      icon: "🦷",
      name: "Dental Care",
      description: "Dental examination and oral care.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFF9F1]">
      <main className="max-w-6xl mx-auto px-6 py-10">

        <button
          onClick={() => router.push("/owner/dashboard")}
          className="text-[#315C4B] font-semibold mb-6 hover:underline"
        >
          ← Back to Dashboard
        </button>

        <div className="mb-10">
          <p className="text-[#E8874A] font-semibold mb-2">
            🐾 Pet Owner
          </p>

          <h1 className="text-4xl font-bold text-[#315C4B]">
            Pet Care Services
          </h1>

          <p className="text-gray-500 mt-2">
            Explore the services available for your pet.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="text-5xl mb-4">
                {service.icon}
              </div>

              <h2 className="text-xl font-bold text-[#315C4B]">
                {service.name}
              </h2>

              <p className="text-gray-500 mt-2">
                {service.description}
              </p>

              <button
                onClick={() =>
                  router.push(
                    `/owner/dashboard/appointments/book?service=${encodeURIComponent(
                      service.name
                    )}`
                  )
                }
                className="mt-6 bg-[#E8874A] text-white px-4 py-2 rounded-xl font-semibold hover:opacity-90"
              >
                Book Service
              </button>
            </div>
          ))}

        </div>

      </main>
    </div>
  );
}