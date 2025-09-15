import React, { useState } from "react";
import "./App.css";

function App() {
  const [loanAmount, setLoanAmount] = useState("");
  const [months, setMonths] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [calculation, setCalculation] = useState([]);
  const [showFull, setShowFull] = useState(false);
  const baseRate = 0.02; // 2% base used to match your sheet (adjust if needed)

  const formatCurrency = (n) => {
    if (n === null || n === undefined || Number.isNaN(n)) return "₹0";
    return "₹" + Number(n).toLocaleString("en-IN", { maximumFractionDigits: 0 });
  };

  const calculateEMI = () => {
    const loan = Number(loanAmount);
    const m = parseInt(months, 10);

    if (!loan || !m || m <= 0) {
      setCalculation([]);
      return;
    }

    const principalPerMonth = loan / m; // keep fractional internally, round for display
    const result = [];

    for (let i = 1; i <= m; i++) {
      // decreasing interest proportional to (months - i + 1)/months
      const interest = Math.round(loan * baseRate * ((m - i + 1) / m));
      const principal = Math.round(principalPerMonth);
      const total = Math.round(principal + interest);
      result.push({
        month: i,
        principal,
        interest,
        total,
      });
    }

    setCalculation(result);
    // keep showFull state as is (user controls)
  };

  const getCurrentMonthData = () => {
    const cm = parseInt(currentMonth, 10);
    if (!cm || calculation.length === 0) return null;
    if (cm < 1 || cm > calculation.length) return null;
    return calculation.find((c) => c.month === cm) || null;
  };

  const currentData = getCurrentMonthData();

  const totalPayment = calculation.reduce((s, r) => s + (r.total || 0), 0);

  return (
    <div className="container">
      <h1>Loan EMI Calculator</h1>

      <div className="form">
        <label htmlFor="loan">Loan Amount (₹)</label>
        <input
          id="loan"
          type="number"
          placeholder="Enter Loan Amount"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />

        <label htmlFor="months">Number of Months</label>
        <input
          id="months"
          type="number"
          placeholder="Enter Number of Months"
          value={months}
          onChange={(e) => setMonths(e.target.value)}
        />

        <label htmlFor="current">Current Month</label>
        <input
          id="current"
          type="number"
          placeholder="Enter Current Month"
          value={currentMonth}
          onChange={(e) => setCurrentMonth(e.target.value)}
        />

        <button onClick={calculateEMI}>Calculate</button>
      </div>

      {/* CURRENT MONTH RESULT */}
      {currentData ? (
        <div className="result-box">
          <h2>Result for Month {currentData.month}</h2>

          <table className="single-result-table">
            <tbody>
              <tr>
                <th>Month</th>
                <td>{currentData.month}</td>
              </tr>
              <tr>
                <th>Principal</th>
                <td>{formatCurrency(currentData.principal)}</td>
              </tr>
              <tr>
                <th>Interest</th>
                <td>{formatCurrency(currentData.interest)}</td>
              </tr>
              <tr className="green-row">
                <th>Total EMI</th>
                <td className="big-total">{formatCurrency(currentData.total)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        // If user entered a current month outside range, show a hint
        currentMonth && calculation.length > 0 && (
          <div className="note">Enter a Current Month between 1 and {calculation.length}</div>
        )
      )}

      {/* SHOW / HIDE FULL TABLE */}
      {calculation.length > 0 && (
        <p className="show-link" onClick={() => setShowFull(!showFull)}>
          {showFull ? "Hide Full Calculation" : "Show Full Calculation"}
        </p>
      )}

      {/* FULL TABLE */}
      {showFull && calculation.length > 0 && (
        <table className="result-table full">
          <thead>
            <tr>
              <th>Month</th>
              <th>Principal</th>
              <th>Interest</th>
              <th>Total EMI</th>
            </tr>
          </thead>
          <tbody>
            {calculation.map((row, idx) => (
              <tr key={row.month} className={idx % 2 === 0 ? "even" : "odd"}>
                <td>{row.month}</td>
                <td>{formatCurrency(row.principal)}</td>
                <td>{formatCurrency(row.interest)}</td>
                <td className="big-total">{formatCurrency(row.total)}</td>
              </tr>
            ))}

            {/* Total payment row */}
            <tr className="summary-row">
              <th colSpan={3}>Total Payment</th>
              <td className="green-big">{formatCurrency(totalPayment)}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
