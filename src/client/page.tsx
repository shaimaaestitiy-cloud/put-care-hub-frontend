import Link from "next/link";

export default function ClientPage() {
  return (
    <main className="min-h-screen bg-[#fdfbf7]">

      <section className="mx-auto max-w-6xl px-6 py-20">

        <div className="mb-14 text-center">

          <div className="mb-5 text-7xl">
            🐶 🐱
          </div>

          <h1 className="text-4xl font-extrabold text-[#1f2937]">
            Everything Your Pet Needs
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            Find veterinary clinics, book appointments and discover
            pets looking for a loving home.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-3">

          {/* Clinics */}
          <Link
            href="/clinics"
            className="rounded-3xl bg-white p-8 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
          >
            <div className="mb-4 text-5xl">
              🏥
            </div>

            <h2 className="text-xl font-bold text-[#2e7d5b]">
              Find Clinics
            </h2>

            <p className="mt-3 text-gray-500">
              Explore trusted veterinary clinics and their services.
            </p>
          </Link>

          {/* Booking */}
          <Link
            href="/booking"
            className="rounded-3xl bg-white p-8 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
          >
            <div className="mb-4 text-5xl">
              📅
            </div>

            <h2 className="text-xl font-bold text-[#2e7d5b]">
              Book Appointment
            </h2>

            <p className="mt-3 text-gray-500">
              Choose a clinic and reserve the appointment that works
              for you.
            </p>
          </Link>

          {/* Adoption */}
          <Link
            href="/adoption"
            className="rounded-3xl bg-white p-8 text-center shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
          >
            <div className="mb-4 text-5xl">
              🐾
            </div>

            <h2 className="text-xl font-bold text-[#2e7d5b]">
              Pet Adoption
            </h2>

            <p className="mt-3 text-gray-500">
              Meet pets searching for a new family and a loving home.
            </p>
          </Link>

        </div>

      </section>

    </main>
  );
}