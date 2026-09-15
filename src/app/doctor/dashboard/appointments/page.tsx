export default function TodaysAppointments() {
  const appointments = [
    {
      owner: "Ahmad Khalil",
      pet: "Max (Dog)",
      time: "9:00 AM",
      type: "Regular Checkup",
      status: "Confirmed",
    },
    {
      owner: "Lina Saleh",
      pet: "Whiskers (Cat)",
      time: "10:30 AM",
      type: "Vaccination",
      status: "Confirmed",
    },
    {
      owner: "Omar Nasser",
      pet: "Rocky (Dog)",
      time: "11:15 AM",
      type: "Emergency",
      status: "Pending",
    },
    {
      owner: "Rana Fares",
      pet: "Milo (Cat)",
      time: "1:00 PM",
      type: "Follow-up",
      status: "Confirmed",
    },
    {
      owner: "Yousef Hamdan",
      pet: "Bella (Dog)",
      time: "2:30 PM",
      type: "Regular Checkup",
      status: "Pending",
    },
  ];

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Today&apos;s Appointments
        </h1>
        <p className="text-gray-500 mb-8">View and manage today&apos;s bookings</p>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                  Owner
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                  Pet
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                  Time
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                  Type
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a.owner} className="border-b border-gray-50 last:border-0">
                  <td className="px-6 py-4 text-gray-800 font-medium">
                    {a.owner}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{a.pet}</td>
                  <td className="px-6 py-4 text-gray-600">{a.time}</td>
                  <td className="px-6 py-4 text-gray-600">{a.type}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        a.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}