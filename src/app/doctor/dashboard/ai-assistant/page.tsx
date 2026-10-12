"use client";

import { useState } from "react";

type Message = {
  role: "doctor" | "assistant";
  text: string;
};

export default function AIAssistant() {
  const [species, setSpecies] = useState("Dog");
  const [age, setAge] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hello Doctor! Enter the pet's details and symptoms, and I will suggest possible conditions and next steps.",
    },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim() || loading) return;

    const question = `Species: ${species}${age ? `, Age: ${age} years` : ""}. Symptoms: ${symptoms}`;
    const updated: Message[] = [...messages, { role: "doctor", text: question }];
    setMessages(updated);
    setSymptoms("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();
      const text = res.ok ? data.reply : `Error: ${data.error ?? "Something went wrong"}`;
      setMessages((prev) => [...prev, { role: "assistant", text }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Error: could not reach the server." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-2">AI Assistant</h1>
        <p className="text-gray-500 mb-8">
          Get help with diagnosing medical cases
        </p>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 h-96 overflow-y-auto flex flex-col gap-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap ${
                m.role === "doctor"
                  ? "bg-primary text-white self-end"
                  : "bg-gray-100 text-gray-800 self-start"
              }`}
            >
              {m.text}
            </div>
          ))}
          {loading && (
            <div className="bg-gray-100 text-gray-500 self-start px-4 py-3 rounded-2xl text-sm">
              Analyzing...
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Species
              </label>
              <select
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Dog</option>
                <option>Cat</option>
                <option>Bird</option>
                <option>Rabbit</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age (years)
              </label>
              <input
                type="number"
                min="0"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g. 3"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Symptoms
            </label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Describe the symptoms, e.g. vomiting for 2 days, loss of appetite..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-dark disabled:opacity-60"
          >
            Ask AI Assistant
          </button>
        </form>
      </div>
    </main>
  );
}