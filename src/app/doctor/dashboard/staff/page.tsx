export default function StaffOverview() {
  const staff = [
    {
      name: "Dr. Sara Ahmad",
      role: "Veterinarian",
      shift: "8:00 AM - 4:00 PM",
      casesToday: 6,
      dayOff: "Friday",
    },
    {
      name: "Mohammad Younes",
      role: "Vet Assistant",
      shift: "9:00 AM - 5:00 PM",
      casesToday: 9,
      dayOff: "Saturday",
    },
    {
      name: "Lina Odeh",
      role: "Receptionist",
      shift: "8:30 AM - 4:30 PM",
      casesToday: 0,
      dayOff: "Friday",
    },
  ];

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Staff Overview
        </h1>
        <p className="text-gray-500 mb-8">
          Employees, shifts, and daily performance
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {staff.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {member.name}
              </h2>
              <p className="text-sm text-primary mb-4">{member.role}</p>

              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">Shift:</span> {member.shift}
                </p>
                <p>
                  <span className="font-medium">Cases Today:</span>{" "}
                  {member.casesToday}
                </p>
                <p>
                  <span className="font-medium">Day Off:</span>{" "}
                  {member.dayOff}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}