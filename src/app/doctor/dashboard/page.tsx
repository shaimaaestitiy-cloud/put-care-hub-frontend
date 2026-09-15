import Link from "next/link";

export default function DoctorDashboard() {
  const sections = [
    {
      title: "Clinic Information",
      description: "Staff, working hours, and clinic details",
      icon: "🏥",
      href: "/doctor/dashboard/clinic-info",
    },
    {
      title: "Today's Appointments",
      description: "View and manage today's bookings",
      icon: "📅",
      href: "/doctor/dashboard/appointments",
    },
    {
      title: "Services & Inventory",
      description: "Medicines, injections, and pet supplies",
      icon: "💊",
      href: "/doctor/dashboard/services",
    },
    {
      title: "Staff Overview",
      description: "Employees, shifts, and daily performance",
      icon: "👥",
      href: "/doctor/dashboard/staff",
    },
    {
      title: "Revenue",
      description: "Cash, sales, and financial summary",
      icon: "💰",
      href: "/doctor/dashboard/revenue",
    },
    {
      title: "AI Assistant",
      description: "Get help with diagnosing medical cases",
      icon: "🤖",
      href: "/doctor/dashboard/ai-assistant",
    },
  ];

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Welcome, Doctor
        </h1>
        <p className="text-gray-500 mb-8">Here's your clinic overview</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => (
            <Link
              href={section.href}
              key={section.title}
              className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition cursor-pointer border border-gray-100 block"
            >
              <div className="text-3xl mb-3">{section.icon}</div>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {section.title}
              </h2>
              <p className="text-sm text-gray-500">{section.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}