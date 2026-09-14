import Image from "next/image";
import Link from "next/link";

function PawIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-10 w-10" aria-hidden="true">
      <ellipse cx="32" cy="42" rx="14" ry="11" fill="#f8b6ad" />
      <ellipse
        cx="14"
        cy="27"
        rx="6"
        ry="8"
        fill="#f8b6ad"
        transform="rotate(-25 14 27)"
      />
      <ellipse
        cx="26"
        cy="17"
        rx="6"
        ry="8"
        fill="#f8b6ad"
        transform="rotate(-8 26 17)"
      />
      <ellipse
        cx="39"
        cy="17"
        rx="6"
        ry="8"
        fill="#f8b6ad"
        transform="rotate(8 39 17)"
      />
      <ellipse
        cx="51"
        cy="27"
        rx="6"
        ry="8"
        fill="#f8b6ad"
        transform="rotate(25 51 27)"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-[calc(100vh-76px)] overflow-hidden bg-[#fffaf3]">

      {/* =========================
          BACKGROUND DECORATIONS
      ========================== */}

      <div className="pointer-events-none absolute left-[5%] top-[19%] hidden -rotate-6 text-center text-lg font-semibold italic leading-6 text-[#6b927f] xl:block">
        Pets Make
        <br />
        Life Brighter
        <div className="mt-1 text-2xl text-[#f1a062]">♡</div>
      </div>

      <div className="pointer-events-none absolute right-[5%] top-[19%] hidden rotate-6 text-center text-lg font-semibold italic leading-6 text-[#6b927f] xl:block">
        Care • Connect
        <br />
        Adopt Together
        <div className="mt-1 text-2xl text-[#f1a062]">♡</div>
      </div>

      <div className="pointer-events-none absolute left-[10%] top-[45%] hidden -rotate-12 text-5xl opacity-[0.08] xl:block">
        🐾
      </div>

      <div className="pointer-events-none absolute right-[10%] top-[44%] hidden rotate-12 text-5xl opacity-[0.08] xl:block">
        🐾
      </div>

      <div className="pointer-events-none absolute left-[15%] bottom-[18%] hidden rotate-12 text-3xl opacity-[0.08] xl:block">
        🐾
      </div>

      <div className="pointer-events-none absolute right-[15%] bottom-[18%] hidden -rotate-12 text-3xl opacity-[0.08] xl:block">
        🐾
      </div>

      {/* =========================
              MAIN CONTENT
      ========================== */}

      <section className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-5 pb-[82px] pt-3">

        {/* HERO */}

        <div className="text-center">
          <p className="text-xl font-bold italic text-[#4f8b73] md:text-2xl">
            Welcome to
          </p>

          <h1 className="mt-1 text-5xl font-black leading-[0.95] tracking-tight text-[#173f36] md:text-[58px]">
            Pet Care{" "}
            <span className="text-[#2e7d5b]">
              Hub
            </span>

            <span className="ml-2 font-normal text-[#ef9c66]">
              ♡
            </span>
          </h1>

          <p className="mt-2 text-lg font-semibold italic text-[#607b6c]">
            Different Roles, One Love for Pets ♡
          </p>
        </div>

        {/* =========================
                    CARDS
        ========================== */}

        <div className="mt-4 grid w-full max-w-[900px] gap-6 md:grid-cols-2">

          {/* =====================
                PET OWNER CARD
          ====================== */}

          <div className="overflow-hidden rounded-[28px] border border-white bg-[#f5faf4] shadow-[0_14px_35px_rgba(32,80,60,0.10)]">

            {/* IMAGE */}

            <div className="relative h-[205px] w-full overflow-hidden bg-[#e6f4ed]">

              <Image
                src="/pet-owner.jpeg"
                alt="Dog and cat"
                fill
                priority
                className="object-cover object-center"
              />

              {/* soft overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/[0.06] to-transparent" />

              <span className="absolute right-5 top-3 text-4xl text-white drop-shadow">
                ♡
              </span>

            </div>

            {/* CONTENT */}

            <div className="px-6 pb-5 pt-3 text-center">

              <h2 className="text-[26px] font-black leading-tight text-[#173f36]">
                I'm a Pet Owner
              </h2>

              <p className="mx-auto mt-1.5 max-w-sm text-sm leading-5 text-[#65736d]">
                Find trusted clinics, book appointments,
                <br />
                adopt a pet and more.
              </p>

              {/* BUTTON */}

              <Link
                href="/client"
                className="group relative mt-3 flex h-[54px] w-full items-center justify-center rounded-full bg-[#2c8061] pl-[68px] pr-12 font-bold text-white shadow-[0_8px_18px_rgba(35,128,95,0.25)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#216c50]"
              >

                <span className="absolute -left-1 flex h-[62px] w-[62px] items-center justify-center rounded-full bg-[#187659] shadow-md ring-4 ring-[#f5faf4]">
                  <PawIcon />
                </span>

                <span className="text-[15px]">
                  Continue as Pet Owner
                </span>

                <span className="absolute right-5 text-2xl transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>

              </Link>

            </div>
          </div>

          {/* =====================
              VETERINARIAN CARD
          ====================== */}

          <div className="overflow-hidden rounded-[28px] border border-white bg-[#fff9f1] shadow-[0_14px_35px_rgba(32,80,60,0.10)]">

            {/* IMAGE */}

            <div className="relative h-[205px] w-full overflow-hidden bg-[#fff0df]">

              <Image
                src="/vet-doctor.jpeg"
                alt="Veterinarian with a cat"
                fill
                priority
                className="object-cover object-[center_38%]"
              />

              {/* soft overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/[0.06] to-transparent" />

              <span className="absolute right-5 top-3 text-4xl text-white drop-shadow">
                ♡
              </span>

            </div>

            {/* CONTENT */}

            <div className="px-6 pb-5 pt-3 text-center">

              <h2 className="text-[26px] font-black leading-tight text-[#173f36]">
                I'm a Veterinarian
              </h2>

              <p className="mx-auto mt-1.5 max-w-sm text-sm leading-5 text-[#65736d]">
                Access your clinic dashboard, manage appointments
                <br />
                and patient records.
              </p>

              {/* BUTTON */}

              <Link
                href="/doctor/login"
                className="group relative mt-3 flex h-[54px] w-full items-center justify-center rounded-full bg-[#2c8061] pl-[68px] pr-12 font-bold text-white shadow-[0_8px_18px_rgba(35,128,95,0.25)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#216c50]"
              >

                <span className="absolute -left-1 flex h-[62px] w-[62px] items-center justify-center rounded-full bg-[#187659] shadow-md ring-4 ring-[#fff9f1]">
                  <PawIcon />
                </span>

                <span className="text-[15px]">
                  Continue as Veterinarian
                </span>

                <span className="absolute right-5 text-2xl transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>

              </Link>

            </div>
          </div>

        </div>

        {/* =========================
              BOTTOM MESSAGE
        ========================== */}

        <div className="relative z-20 mt-3 flex items-center gap-3 text-[#668c79]">

          <span className="text-lg opacity-30">
            🐾
          </span>

          <p className="text-center text-base font-semibold italic">
            A Kinder World for Every Pet ♡
          </p>

          <span className="text-lg opacity-30">
            🐾
          </span>

        </div>

      </section>

      {/* =========================
             SIDE BOTTOM TEXT
      ========================== */}

      <div className="pointer-events-none absolute bottom-[7%] left-[4%] z-10 hidden -rotate-3 text-center text-sm font-semibold italic leading-5 text-[#668c79] xl:block">
        Happy Pets
        <br />
        Happy People ♡
      </div>

      <div className="pointer-events-none absolute bottom-[7%] right-[4%] z-10 hidden rotate-3 text-center text-sm font-semibold italic leading-5 text-[#668c79] xl:block">
        Small Paws
        <br />
        Big Love ♡
      </div>

      {/* =========================
                BOTTOM WAVE
      ========================== */}

      <div className="pointer-events-none absolute bottom-0 left-0 z-0 h-[75px] w-full overflow-hidden">

        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="h-full w-full"
          aria-hidden="true"
        >

          <path
            d="
              M0,88
              C180,30 340,145 535,90
              C735,35 875,145 1060,88
              C1220,38 1350,68 1440,48
              L1440,160
              L0,160
              Z
            "
            fill="#dcebd9"
          />

          <path
            d="
              M0,125
              C220,78 390,150 590,118
              C800,85 1010,150 1205,112
              C1320,90 1390,95 1440,88
              L1440,160
              L0,160
              Z
            "
            fill="#c8dfc2"
            opacity="0.7"
          />

        </svg>

      </div>

    </main>
  );
}