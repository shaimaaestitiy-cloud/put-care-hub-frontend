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

type Clinic = {
  id: number;
  name: string;
  city: string;
  area: string;
  doctor: string;
  rating: number;
  reviews: number;
  phone: string;
  services: string[];
};

type Appointment = {
  id: number;
  petId: number;
  petName: string;
  date: string;
  time: string;
  reason: string;
  status: string;
  clinic: string;
  location: string;
  services: string[];
};

// Cities and areas
const locations: Record<string, string[]> = {
  Amman: ["Khalda", "Sweileh", "Abdoun", "Jubeiha"],
  Zarqa: ["New Zarqa", "City Center", "Russeifa"],
  Irbid: ["University Street", "City Center", "Al Husn"],
};

// Veterinary services
const services = [
  "Veterinary Checkup",
  "Vaccination",
  "Pet Bath",
  "Grooming",
  "Nail Trimming",
  "Dental Care",
];

// Demo clinic information
const clinics: Clinic[] = [
  {
    id: 1,
    name: "Happy Paws Veterinary Clinic",
    city: "Amman",
    area: "Khalda",
    doctor: "Dr. Ahmad",
    rating: 4.8,
    reviews: 124,
    phone: "0790000001",
    services: [
      "Veterinary Checkup",
      "Vaccination",
      "Grooming",
      "Pet Bath",
    ],
  },
  {
    id: 2,
    name: "Pawfect Care Clinic",
    city: "Amman",
    area: "Sweileh",
    doctor: "Dr. Sara",
    rating: 4.7,
    reviews: 89,
    phone: "0790000002",
    services: [
      "Veterinary Checkup",
      "Dental Care",
      "Pet Bath",
      "Nail Trimming",
    ],
  },
  {
    id: 3,
    name: "Pet Care Veterinary Center",
    city: "Zarqa",
    area: "New Zarqa",
    doctor: "Dr. Omar",
    rating: 4.6,
    reviews: 76,
    phone: "0790000003",
    services: [
      "Veterinary Checkup",
      "Vaccination",
      "Dental Care",
    ],
  },
  {
    id: 4,
    name: "Little Paws Clinic",
    city: "Zarqa",
    area: "City Center",
    doctor: "Dr. Lina",
    rating: 4.9,
    reviews: 156,
    phone: "0790000004",
    services: [
      "Veterinary Checkup",
      "Vaccination",
      "Grooming",
      "Pet Bath",
      "Nail Trimming",
    ],
  },
  {
    id: 5,
    name: "Healthy Pets Clinic",
    city: "Irbid",
    area: "University Street",
    doctor: "Dr. Yousef",
    rating: 4.8,
    reviews: 112,
    phone: "0790000005",
    services: [
      "Veterinary Checkup",
      "Vaccination",
      "Pet Bath",
      "Grooming",
      "Dental Care",
    ],
  },
];

// Return emoji based on the saved pet type
function getPetEmoji(type: string) {
  const emojis: Record<string, string> = {
    dog: "🐶",
    cat: "🐱",
    bird: "🐦",
    rabbit: "🐰",
    other: "🐾",
  };

  return emojis[type?.toLowerCase()] || "🐾";
}

export default function BookAppointment() {
  const router = useRouter();

  // Booking steps
  const [step, setStep] = useState(1);

  // Location
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");

  // Clinic
  const [clinicId, setClinicId] = useState<number | null>(null);

  // Appointment
  const [pets, setPets] = useState<Pet[]>([]);
  const [petId, setPetId] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  // Load previously registered pets
  useEffect(() => {
    const savedPets: Pet[] = JSON.parse(
      localStorage.getItem("pets") || "[]"
    );

    setPets(savedPets);

    // Preselect service when coming from Services page
    const params = new URLSearchParams(window.location.search);
    const service = params.get("service");

    if (service && services.includes(service)) {
      setSelectedServices([service]);
    }
  }, []);

  // Clinics in selected area
  const filteredClinics = clinics.filter(
    (clinic) => clinic.city === city && clinic.area === area
  );

  // Alternative clinics in the same city
  const otherClinics = clinics.filter(
    (clinic) => clinic.city === city && clinic.area !== area
  );

  const selectedClinic = clinics.find(
    (clinic) => clinic.id === clinicId
  );

  const selectedPet = pets.find(
    (pet) => pet.id === Number(petId)
  );

  const availableServices = services.filter((service) =>
    selectedClinic?.services.includes(service)
  );

  function searchClinics() {
    if (!city || !area) {
      alert("Please select a city and area.");
      return;
    }

    setStep(2);
  }

  function chooseClinic(id: number) {
    const chosenClinic = clinics.find(
      (clinic) => clinic.id === id
    );

    if (!chosenClinic) return;

    setClinicId(id);

    // Remove services unavailable at the selected clinic
    setSelectedServices((current) =>
      current.filter((service) =>
        chosenClinic.services.includes(service)
      )
    );

    setStep(3);
  }

  function toggleService(service: string) {
    setSelectedServices((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service]
    );
  }

  function continueToReview() {
    if (!selectedPet || selectedServices.length === 0) {
      alert("Please select a pet and at least one service.");
      return;
    }

    if (!date || !time) {
      alert("Please select a date and time.");
      return;
    }

    if (new Date(`${date}T${time}`) <= new Date()) {
      alert("Please choose a future date and time.");
      return;
    }

    setStep(4);
  }

  function confirmBooking() {
    if (
      !selectedClinic ||
      !selectedPet ||
      selectedServices.length === 0 ||
      !date ||
      !time ||
      new Date(`${date}T${time}`) <= new Date()
    ) {
      alert("Please complete your appointment details.");
      return;
    }

    const newAppointment: Appointment = {
      id: Date.now(),
      petId: selectedPet.id,
      petName: selectedPet.name,
      date,
      time,
      reason:
        selectedServices.join(", ") +
        (notes ? ` - ${notes}` : ""),
      status: "Pending",
      clinic: selectedClinic.name,
      location: `${selectedClinic.city}, ${selectedClinic.area}`,
      services: selectedServices,
    };

    const savedAppointments: Appointment[] = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );

    localStorage.setItem(
      "appointments",
      JSON.stringify([...savedAppointments, newAppointment])
    );

    router.push("/owner/dashboard/appointments");
  }

  // Reusable clinic card
  function ClinicCard({ clinic }: { clinic: Clinic }) {
    return (
      <div className="rounded-2xl border-2 border-gray-200 p-5 transition hover:border-[#315C4B]">
        <div className="flex flex-col gap-4 sm:flex-row">

          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#FFF9F1] text-4xl">
            🏥
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-bold text-[#315C4B]">
              {clinic.name}
            </h3>

            <p className="mt-2 text-sm text-gray-600">
              📍 {clinic.area}, {clinic.city}
            </p>

            <p className="mt-2 text-sm text-gray-600">
              👨‍⚕️ {clinic.doctor} — Veterinarian
            </p>

            <p className="mt-2 text-sm text-gray-700">
              ⭐ <strong>{clinic.rating}</strong>/5
              <span className="ml-2 text-gray-500">
                ({clinic.reviews} reviews)
              </span>
            </p>

            <p className="mt-2 text-sm text-gray-600">
              📞 {clinic.phone}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {clinic.services.map((service) => (
                <span
                  key={service}
                  className="rounded-full bg-green-50 px-3 py-1 text-xs text-[#315C4B]"
                >
                  {service}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={() => chooseClinic(clinic.id)}
              className="mt-5 rounded-xl bg-[#315C4B] px-6 py-3 font-semibold text-white hover:bg-[#254838]"
            >
              Select Clinic →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF9F1] px-4 py-10">
      <div className="mx-auto max-w-4xl">

        <button
          type="button"
          onClick={() =>
            router.push("/owner/dashboard/appointments")
          }
          className="mb-6 font-semibold text-[#315C4B] hover:underline"
        >
          ← Back to Appointments
        </button>

        <div className="rounded-3xl bg-white p-5 shadow-md sm:p-8">

          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-3 text-5xl">🐾</div>

            <h1 className="text-3xl font-bold text-[#315C4B]">
              Book Appointment
            </h1>

            <p className="mt-2 text-gray-500">
              Find the right veterinary care for your pet
            </p>
          </div>

          {/* Progress */}
          <div className="mb-10 grid grid-cols-4 gap-2">
            {[
              "Location",
              "Clinic",
              "Appointment",
              "Confirm",
            ].map((title, index) => (
              <div key={title} className="text-center">
                <div
                  className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full font-bold ${
                    step >= index + 1
                      ? "bg-[#315C4B] text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {index + 1}
                </div>

                <p className="mt-2 text-xs text-[#315C4B] sm:text-sm">
                  {title}
                </p>
              </div>
            ))}
          </div>

          {/* STEP 1: LOCATION */}
          {step === 1 && (
            <div className="space-y-6">

              <div>
                <h2 className="text-xl font-bold text-[#315C4B]">
                  📍 Select Your Location
                </h2>

                <p className="mt-2 text-gray-500">
                  Choose your city and area to find veterinary clinics.
                </p>
              </div>

              <div>
                <label className="mb-2 block font-semibold text-[#315C4B]">
                  Select City
                </label>

                <select
                  value={city}
                  onChange={(e) => {
                    setCity(e.target.value);
                    setArea("");
                    setClinicId(null);
                  }}
                  className="w-full rounded-xl border border-gray-300 p-3"
                >
                  <option value="">Choose a city</option>

                  {Object.keys(locations).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block font-semibold text-[#315C4B]">
                  Select Area
                </label>

                <select
                  value={area}
                  disabled={!city}
                  onChange={(e) => {
                    setArea(e.target.value);
                    setClinicId(null);
                  }}
                  className="w-full rounded-xl border border-gray-300 p-3 disabled:bg-gray-100"
                >
                  <option value="">
                    {city ? "Choose an area" : "Select city first"}
                  </option>

                  {city &&
                    locations[city].map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                </select>
              </div>

              <button
                type="button"
                onClick={searchClinics}
                className="w-full rounded-xl bg-[#315C4B] px-6 py-3 font-semibold text-white hover:bg-[#254838]"
              >
                🔍 Find Veterinary Clinics
              </button>

            </div>
          )}

          {/* STEP 2: CLINICS */}
          {step === 2 && (
            <div className="space-y-5">

              <div>
                <h2 className="text-xl font-bold text-[#315C4B]">
                  🏥 Veterinary Clinics
                </h2>

                <p className="mt-2 text-gray-500">
                  Results for {city} — {area}
                </p>

                <p className="mt-1 text-sm text-gray-400">
                  Demo clinic information for project preview
                </p>
              </div>

              {filteredClinics.length > 0 ? (
                <div className="space-y-4">
                  {filteredClinics.map((clinic) => (
                    <ClinicCard key={clinic.id} clinic={clinic} />
                  ))}
                </div>
              ) : (
                <div className="space-y-5">

                  <div className="rounded-2xl bg-[#FFF9F1] p-6 text-center">
                    <div className="mb-3 text-4xl">🐾</div>

                    <h3 className="font-bold text-[#315C4B]">
                      No clinics found in {area}
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                      Explore other veterinary clinics in {city}.
                    </p>
                  </div>

                  {otherClinics.length > 0 && (
                    <div className="space-y-4">

                      <h3 className="text-xl font-bold text-[#315C4B]">
                        🏥 Other Clinics in {city}
                      </h3>

                      {otherClinics.map((clinic) => (
                        <ClinicCard key={clinic.id} clinic={clinic} />
                      ))}

                    </div>
                  )}

                  {otherClinics.length === 0 && (
                    <p className="text-center text-gray-500">
                      No other clinics are available in this city.
                    </p>
                  )}

                </div>
              )}

              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-[#315C4B]"
              >
                ← Change Location
              </button>

            </div>
          )}

          {/* STEP 3: APPOINTMENT */}
          {step === 3 && selectedClinic && (
            <div className="space-y-7">

              <div>
                <h2 className="text-xl font-bold text-[#315C4B]">
                  🐾 Appointment Details
                </h2>

                <p className="mt-2 text-gray-500">
                  Choose your pet, services and appointment time.
                </p>
              </div>

              {/* Selected Clinic */}
              <div className="rounded-2xl bg-[#FFF9F1] p-5">
                <p className="text-sm text-gray-500">
                  Selected Clinic
                </p>

                <h3 className="mt-1 font-bold text-[#315C4B]">
                  🏥 {selectedClinic.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {selectedClinic.area}, {selectedClinic.city}
                </p>
              </div>

              {/* Choose Your Pet */}
              <div>
                <h3 className="mb-3 text-xl font-bold text-[#315C4B]">
                  Choose Your Pet
                </h3>

                {pets.length === 0 ? (
                  <div className="rounded-xl bg-[#FFF9F1] p-5">
                    <p className="mb-3 text-gray-600">
                      You haven't added any pets yet.
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        router.push("/owner/dashboard/pets/add")
                      }
                      className="rounded-xl bg-[#315C4B] px-5 py-3 text-white"
                    >
                      + Add Pet
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {pets.map((pet) => (
                      <button
                        key={pet.id}
                        type="button"
                        onClick={() => setPetId(String(pet.id))}
                        className={`rounded-2xl border-2 p-5 text-left transition ${
                          petId === String(pet.id)
                            ? "border-[#315C4B] bg-green-50"
                            : "border-gray-200 hover:border-[#315C4B]"
                        }`}
                      >
                        {/* Pet emoji and name */}
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">
                            {getPetEmoji(pet.type)}
                          </span>

                          <span className="text-lg font-bold text-[#315C4B]">
                            {pet.name}
                          </span>
                        </div>

                        {/* Saved pet information */}
                        <div className="mt-3 space-y-1 text-sm text-gray-500">

                          <p>
                            <span className="font-medium">Type:</span>{" "}
                            {pet.type}
                          </p>

                          {pet.breed && (
                            <p>
                              <span className="font-medium">Breed:</span>{" "}
                              {pet.breed}
                            </p>
                          )}

                          {pet.age && (
                            <p>
                              <span className="font-medium">Age:</span>{" "}
                              {pet.age}
                            </p>
                          )}

                          {pet.gender && (
                            <p>
                              <span className="font-medium">Gender:</span>{" "}
                              {pet.gender}
                            </p>
                          )}

                          {pet.weight && (
                            <p>
                              <span className="font-medium">Weight:</span>{" "}
                              {pet.weight} kg
                            </p>
                          )}

                        </div>

                        {petId === String(pet.id) && (
                          <p className="mt-3 text-sm font-semibold text-[#315C4B]">
                            ✓ Selected
                          </p>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Services */}
              <div>
                <h3 className="mb-2 font-bold text-[#315C4B]">
                  Select Services
                </h3>

                <p className="mb-4 text-sm text-gray-500">
                  You can select more than one service.
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {availableServices.map((service) => (
                    <label
                      key={service}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 ${
                        selectedServices.includes(service)
                          ? "border-[#315C4B] bg-green-50"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedServices.includes(service)}
                        onChange={() => toggleService(service)}
                        className="h-5 w-5 accent-[#315C4B]"
                      />

                      <span className="text-[#315C4B]">
                        {service}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block font-semibold text-[#315C4B]">
                    Appointment Date
                  </label>

                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 p-3"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold text-[#315C4B]">
                    Appointment Time
                  </label>

                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 p-3"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="mb-2 block font-semibold text-[#315C4B]">
                  Additional Notes (Optional)
                </label>

                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us anything important about your pet..."
                  className="w-full resize-none rounded-xl border border-gray-300 p-3"
                />
              </div>

              {/* Navigation */}
              <div className="flex flex-wrap justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="rounded-xl border border-gray-300 px-6 py-3 text-[#315C4B]"
                >
                  ← Back to Clinics
                </button>

                <button
                  type="button"
                  onClick={continueToReview}
                  className="rounded-xl bg-[#315C4B] px-7 py-3 font-semibold text-white"
                >
                  Continue to Review →
                </button>
              </div>

            </div>
          )}

          {/* STEP 4: CONFIRM */}
          {step === 4 && (
            <div className="space-y-6">

              <h2 className="text-xl font-bold text-[#315C4B]">
                ✅ Review Your Appointment
              </h2>

              <div className="space-y-4 rounded-2xl bg-[#FFF9F1] p-6">

                <p>
                  <strong>Clinic:</strong> {selectedClinic?.name}
                </p>

                <p>
                  <strong>Veterinarian:</strong> {selectedClinic?.doctor}
                </p>

                <p>
                  <strong>Location:</strong>{" "}
                  {selectedClinic?.area}, {selectedClinic?.city}
                </p>

                <p>
                  <strong>Pet:</strong>{" "}
                  {selectedPet && getPetEmoji(selectedPet.type)}{" "}
                  {selectedPet?.name}
                </p>

                <p>
                  <strong>Services:</strong>{" "}
                  {selectedServices.join(", ")}
                </p>

                <p>
                  <strong>Date:</strong> {date}
                </p>

                <p>
                  <strong>Time:</strong> {time}
                </p>

                {notes && (
                  <p>
                    <strong>Notes:</strong> {notes}
                  </p>
                )}

              </div>

              <p className="text-center text-sm text-gray-500">
                Your appointment will be saved as Pending.
              </p>

              <div className="flex flex-wrap justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-[#315C4B]"
                >
                  ← Back
                </button>

                <button
                  type="button"
                  onClick={confirmBooking}
                  className="rounded-xl bg-[#315C4B] px-7 py-3 font-semibold text-white"
                >
                  Confirm Booking ✓
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </main>
  );
}