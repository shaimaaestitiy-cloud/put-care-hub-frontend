import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#315C4B] text-[#FFF9F1]">
      <div className="mx-auto max-w-7xl px-6 py-14">

        {/* Footer Sections */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* About */}
          <div>
            <h2 className="mb-5 text-2xl font-bold text-[#F4B183]">
              🐾 Pet Care Hub
            </h2>

            <p className="leading-7">
              Different Paws, Same Love.
              <br />
              Your trusted place for veterinary care,
              pet health, and happy pets.
            </p>

            <div className="mt-5 flex gap-3 text-2xl">
              <span>🐶</span>
              <span>🐱</span>
              <span>🐦</span>
              <span>🐰</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-xl font-bold text-[#F4B183]">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">
              <Link href="/" className="hover:text-[#F4B183]">
                Home
              </Link>

              <Link
                href="/owner/login"
                className="hover:text-[#F4B183]"
              >
                Pet Owner Login
              </Link>

              <Link
                href="/doctor/login"
                className="hover:text-[#F4B183]"
              >
                Veterinarian Login
              </Link>

              <Link
                href="/owner/dashboard/appointments/book"
                className="hover:text-[#F4B183]"
              >
                Book Appointment
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-5 text-xl font-bold text-[#F4B183]">
              Our Services
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                href="/owner/dashboard/services"
                className="hover:text-[#F4B183]"
              >
                Veterinary Checkup
              </Link>

              <Link
                href="/owner/dashboard/services"
                className="hover:text-[#F4B183]"
              >
                Vaccination
              </Link>

              <Link
                href="/owner/dashboard/services"
                className="hover:text-[#F4B183]"
              >
                Grooming
              </Link>

              <Link
                href="/owner/dashboard/services"
                className="hover:text-[#F4B183]"
              >
                Dental Care
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-xl font-bold text-[#F4B183]">
              Contact Us
            </h3>

            <div className="space-y-4">
              <p>📍 Jordan</p>
              <p>✉️ Contact details coming soon</p>
              <p>📞 Phone number coming soon</p>

              <p className="text-sm leading-6 text-white/75">
                We're here to help you give your pets
                the care they deserve.
              </p>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-white/20 pt-6 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Pet Care Hub.
            All Rights Reserved. 🐾
          </p>

          <p className="mt-2 text-xs text-white/60">
            Made with ❤️ for happy and healthy pets
          </p>
        </div>

      </div>
    </footer>
  );
}