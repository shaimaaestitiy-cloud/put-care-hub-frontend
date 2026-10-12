"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type DemoOwner = {
  id: string;
  name: string;
  email: string;
};

export default function OwnerRegister() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  // Hide password automatically after 10 seconds
  useEffect(() => {
    if (!showPassword) return;

    const timer = setTimeout(() => {
      setShowPassword(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, [showPassword]);

  // Hide confirm password automatically after 10 seconds
  useEffect(() => {
    if (!showConfirmPassword) return;

    const timer = setTimeout(() => {
      setShowConfirmPassword(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, [showConfirmPassword]);

  // Password requirements
  const rules = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];

  const strength = rules.filter(Boolean).length;
  const isPasswordValid = rules.every(Boolean);

  const strengthLabel =
    strength <= 2
      ? "Weak"
      : strength <= 4
      ? "Medium"
      : "Strong";

  const strengthColor =
    strength <= 2
      ? "bg-red-400"
      : strength <= 4
      ? "bg-yellow-400"
      : "bg-green-500";

  function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    // Validate name
    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    // Validate password
    if (!isPasswordValid) {
      setError("Please meet all password requirements.");
      return;
    }

    // Check password confirmation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Get existing demo accounts
    const savedAccounts: DemoOwner[] = JSON.parse(
      localStorage.getItem("petCareDemoOwners") || "[]"
    );

    // Check if email already exists
    const emailExists = savedAccounts.some(
      (account) =>
        account.email.toLowerCase() ===
        email.trim().toLowerCase()
    );

    if (emailExists) {
      setError("An account with this email already exists.");
      return;
    }

    // Create new demo account
    // Password is NOT stored in localStorage
    const newAccount: DemoOwner = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
    };

    // Save account only once
    localStorage.setItem(
      "petCareDemoOwners",
      JSON.stringify([...savedAccounts, newAccount])
    );

    // Start temporary demo session
    localStorage.setItem(
      "petCareDemoSession",
      JSON.stringify(newAccount)
    );

    // Go directly to dashboard
    router.push("/owner/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#FFF9F1] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🐾</div>

          <h1 className="text-3xl font-bold text-[#315C4B]">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Join Pet Care Hub today
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-[#315C4B] mb-2">
              Full Name
            </label>

            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              autoComplete="name"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#E8874A]"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-[#315C4B] mb-2">
              Email Address
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="owner@example.com"
              autoComplete="email"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#E8874A]"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-[#315C4B] mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                autoComplete="new-password"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-14 outline-none focus:border-[#E8874A]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#315C4B]"
              >
                {showPassword ? "◉" : "◎"}
              </button>
            </div>

            {/* Compact password requirements */}
            <p className="mt-2 text-xs text-gray-400">
              8+ characters · A-Z · a-z · 0-9 · @#!
            </p>

            {/* Password strength */}
            {password.length > 0 && (
              <div className="mt-3">
                <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${strengthColor}`}
                    style={{
                      width: `${(strength / 5) * 100}%`,
                    }}
                  />
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  Password strength:{" "}
                  <span className="font-semibold">
                    {strengthLabel}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold text-[#315C4B] mb-2">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                required
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm your password"
                autoComplete="new-password"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-14 outline-none focus:border-[#E8874A]"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                aria-label={
                  showConfirmPassword
                    ? "Hide password"
                    : "Show password"
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#315C4B]"
              >
                {showConfirmPassword ? "◉" : "◎"}
              </button>
            </div>

            {confirmPassword.length > 0 && (
              <p
                className={`mt-2 text-xs ${
                  password === confirmPassword
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {password === confirmPassword
                  ? "✓ Passwords match"
                  : "Passwords do not match"}
              </p>
            )}
          </div>

          {/* Error message */}
          {error && (
            <p
              role="alert"
              className="text-red-500 text-sm text-center"
            >
              {error}
            </p>
          )}

          {/* Create Account */}
          <button
            type="submit"
            className="w-full bg-[#315C4B] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            Create Account 🐾
          </button>
        </form>

        {/* Login link */}
        <div className="text-center mt-7">
          <p className="text-gray-500">
            Already have an account?
          </p>

          <button
            type="button"
            onClick={() => router.push("/owner/login")}
            className="text-[#E8874A] font-bold mt-1 hover:underline"
          >
            Sign In
          </button>
        </div>

        {/* Back Home */}
        <button
          type="button"
          onClick={() => router.push("/")}
          className="block mx-auto mt-6 text-sm text-gray-400 hover:text-[#315C4B]"
        >
          ← Back to Home
        </button>

      </div>
    </main>
  );
}