export default function ClinicInformation() {
  const clinicDetails = {
    name: "Pet Care Hub Clinic",
    address: "Al-Rabieh Street, Amman, Jordan",
    phone: "+962 7 9123 4567",
    workingHours: "Saturday - Thursday, 8:00 AM - 6:00 PM",
  };

  const staffList = [
    { name: "Dr. Sara Ahmad", role: "Veterinarian" },
    { name: "Mohammad Younes", role: "Vet Assistant" },
    { name: "Lina Odeh", role: "Receptionist" },
  ];

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Clinic Information
        </h1>
        <p className="text-gray-500 mb-8">
          Staff, working hours, and clinic details
        </p>

        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Clinic Details
          </h2>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              <span className="font-medium text-gray-800">Name:</span>{" "}
              {clinicDetails.name}
            </p>
            <p>
              <span className="font-medium text-gray-800">Address:</span>{" "}
              {clinicDetails.address}
            </p>
            <p>
              <span className="font-medium text-gray-800">Phone:</span>{" "}
              {clinicDetails.phone}
            </p>
            <p>
              <span className="font-medium text-gray-800">
                Working Hours:
              </span>{" "}
              {clinicDetails.workingHours}
            </p>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Staff Members
        </h2>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                  Name
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((member) => (
                <tr
                  key={member.name}
                  className="border-b border-gray-50 last:border-0"
                >
                  <td className="px-6 py-4 text-gray-800 font-medium">
                    {member.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{member.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}