export default function Revenue() {
  const summary = [
    { label: "Total Revenue Today", value: "312 JD", icon: "💰" },
    { label: "Cash Payments", value: "180 JD", icon: "💵" },
    { label: "Card Payments", value: "132 JD", icon: "💳" },
    { label: "Total Sales Count", value: "27", icon: "🧾" },
  ];

  const staffRevenue = [
    { name: "Dr. Sara Ahmad", cash: "95 JD", sales: "140 JD" },
    { name: "Mohammad Younes", cash: "60 JD", sales: "110 JD" },
    { name: "Lina Odeh", cash: "25 JD", sales: "62 JD" },
  ];

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-2">Revenue</h1>
        <p className="text-gray-500 mb-8">Cash, sales, and financial summary</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {summary.map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <p className="text-2xl font-bold text-gray-800 text-left" dir="ltr">
                {item.value}
              </p>
              <p className="text-sm text-gray-500">{item.label}</p>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Revenue by Staff
        </h2>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                  Staff Name
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                  Cash
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                  Sales
                </th>
              </tr>
            </thead>
            <tbody>
              {staffRevenue.map((s) => (
                <tr key={s.name} className="border-b border-gray-50 last:border-0">
                  <td className="px-6 py-4 text-gray-800 font-medium">
                    {s.name}
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-left" dir="ltr">
                    {s.cash}
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-left" dir="ltr">
                    {s.sales}
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