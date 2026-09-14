"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Adoption", href: "/adoption" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white px-6 py-4 flex items-center justify-between shadow-sm">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-2xl">🐾</span>
        <div className="flex flex-col leading-tight">
          <span className="text-xl font-bold text-primary">Pet Care Hub</span>
          <span className="text-xs text-gray-500">Happy Pets, Healthier Lives</span>
        </div>
      </Link>

      <div className="hidden md:flex gap-6 items-center">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-gray-700 hover:text-primary font-medium"
          >
            {link.name}
          </Link>
        ))}
      </div>

      <Link
        href="/get-started"
        className="hidden md:flex bg-primary text-white px-5 py-2 rounded-full items-center gap-2 hover:bg-primary-dark"
      >
        🐾 Get Started
      </Link>

      <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white flex flex-col items-center gap-4 py-4 md:hidden shadow-md">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.name}
            </Link>
          ))}
          <Link
            href="/get-started"
            className="bg-primary text-white px-5 py-2 rounded-full"
            onClick={() => setMenuOpen(false)}
          >
            🐾 Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}