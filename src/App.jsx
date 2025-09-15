import React, { useState } from "react";
import "./App.css";

function App() {
  const [loanAmount, setLoanAmount] = useState("");
  const [months, setMonths] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [calculation, setCalculation] = useState([]);
  const [showFull, setShowFull] = useState(false);

  const calculateEMI = () => {
    if (!loanAmount || !months) return;

    const principalPerMonth = loanAmount / months;
    const interestRate = 0.02; // 2% simple interest reducing

    let result = [];
    let remaining = loanAmount;

    for (let i = 1; i <= months; i++) {
      const interest = Math.round((remaining * interestRate) / months);
      const total = Math.round(principalPerMonth + interest);
      result.push({
        month: i,
        principal: Math.round(principalPerMonth),
        interest,
        total,
      });
      remaining -= principalPerMonth;
    }

    setCalculation(result);
  };

  const getCurrentMonthData = () => {
    if (!currentMonth || !calculation.length) return null;
    return calculation.find((c) => c.month === parseInt(currentMonth));
  };

  const currentData = getCurrentMonthData();

  return (
    <div className="container">
      <h1>Loan EMI Calculator</h1>

      <div className="form">
        <input
          type="number"
          placeholder="Enter Loan Amount"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter Number of Months"
          value={months}
          onChange={(e) => setMonths(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter Current Month"
          value={currentMonth}
          onChange={(e) => setCurrentMonth(e.target.value)}
        />
        <button onClick={calculateEMI}>Calculate</button>
      </div>

      {currentData && (
        <div className="current-result">
          <h2>Result for Month {currentData.month}</h2>
          <table className="result-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Principal</th>
                <th>Interest</th>
                <th>Total EMI</th>
              </tr>
            </thead>
            <tbody>
              <tr className="highlight">
                <td>{currentData.month}</td>
                <td>₹{currentData.principal}</td>
                <td>₹{currentData.interest}</td>
                <td className="total">₹{currentData.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {calculation.length > 0 && (
        <p
          className="show-link"
          onClick={() => setShowFull(!showFull)}
        >
          {showFull ? "Hide Full Calculation" : "Show Full Calculation"}
        </p>
      )}

      {showFull && (
        <table className="result-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Principal</th>
              <th>Interest</th>
              <th>Total EMI</th>
            </tr>
          </thead>
          <tbody>
            {calculation.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
                <td>{row.month}</td>
                <td>₹{row.principal}</td>
                <td>₹{row.interest}</td>
                <td className="total">₹{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
