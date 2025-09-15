import React, { useState } from "react";

export default function EMICalculator() {
  const [amount, setAmount] = useState(10000);
  const [months, setMonths] = useState(5);
  const [emiData, setEmiData] = useState([]);

  const calculateEMI = () => {
    const principalPerMonth = amount / months;
    let interest = 200;
    let interestDecrement = interest / (months - 1);
    let table = [];

    for (let i = 0; i < months; i++) {
      const currentInterest = Math.round(interest - interestDecrement * i);
      const total = Math.round(principalPerMonth + currentInterest);
      table.push({
        month: i + 1,
        principal: Math.round(principalPerMonth),
        interest: currentInterest,
        total,
      });
    }
    setEmiData(table);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center">Women Group EMI Calculator</h1>

      <div className="bg-white p-4 rounded-xl shadow-md grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Loan Amount (Rs)</label>
          <input
            type="number"
            className="border p-2 w-full rounded"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Number of Months</label>
          <input
            type="number"
            className="border p-2 w-full rounded"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
          />
        </div>

        <div className="col-span-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={calculateEMI}>
            Calculate
          </button>
        </div>
      </div>

      {emiData.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">Month</th>
                <th className="px-4 py-2 border">Principal</th>
                <th className="px-4 py-2 border">Interest</th>
                <th className="px-4 py-2 border">Total EMI</th>
              </tr>
            </thead>
            <tbody>
              {emiData.map((row) => (
                <tr key={row.month} className="text-center">
                  <td className="border px-4 py-2">{row.month}</td>
                  <td className="border px-4 py-2">₹{row.principal}</td>
                  <td className="border px-4 py-2">₹{row.interest}</td>
                  <td className="border px-4 py-2 font-semibold">₹{row.total}</td>
                </tr>
              ))}
              <tr className="bg-gray-200 font-bold">
                <td className="border px-4 py-2" colSpan={3}>
                  Total Payment
                </td>
                <td className="border px-4 py-2">
                  ₹{emiData.reduce((sum, row) => sum + row.total, 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
      }
          
