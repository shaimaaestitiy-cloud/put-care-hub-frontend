export default function ServicesInventory() {
  const items = [
    { name: "Antibiotics Injection", category: "Medicine", price: "8 JD", quantity: 42 },
    { name: "Rabies Vaccine", category: "Medicine", price: "15 JD", quantity: 20 },
    { name: "Deworming Tablets", category: "Medicine", price: "5 JD", quantity: 60 },
    { name: "Pet Shampoo", category: "Supplies", price: "6 JD", quantity: 15 },
    { name: "Cat Collar", category: "Accessories", price: "4 JD", quantity: 30 },
    { name: "Dog Leash", category: "Accessories", price: "7 JD", quantity: 18 },
  ];

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Services & Inventory
        </h1>
        <p className="text-gray-500 mb-8">
          Medicines, injections, and pet supplies
        </p>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                  Item Name
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                  Category
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                  Price
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-600">
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.name} className="border-b border-gray-50 last:border-0">
                  <td className="px-6 py-4 text-gray-800 font-medium">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{item.category}</td>
                  <td className="px-6 py-4 text-gray-800 text-left" dir="ltr">
                    {item.price}
                  </td>
                  <td className="px-6 py-4 text-gray-800">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}