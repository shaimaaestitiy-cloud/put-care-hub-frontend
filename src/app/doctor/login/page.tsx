"use client";

import { useState } from "react";

export default function DoctorLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // هون رح نضيف لاحقًا منطق التحقق من تسجيل الدخول
    console.log("Username:", username, "Password:", password);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <span className="text-4xl">🐾</span>
          <h1 className="text-2xl font-bold text-primary mt-2">
            Veterinarian Login
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Access your clinic dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-dark mt-2"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}