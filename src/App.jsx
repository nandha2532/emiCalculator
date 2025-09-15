import React, { useState } from "react";
import "./App.css";

function App() {
  const [loanAmount, setLoanAmount] = useState("");
  const [months, setMonths] = useState("");
  const [currentMonth, setCurrentMonth] = useState("");
  const [results, setResults] = useState([]);
  const [showFull, setShowFull] = useState(false);

  const calculateEMI = () => {
    if (!loanAmount || !months) return;

    const monthlyPrincipal = loanAmount / months;
    const resultsArr = [];

    for (let i = 1; i <= months; i++) {
      const interest = ((months - i + 1) * 100); // sample logic, same as your excel
      const total = monthlyPrincipal + interest;
      resultsArr.push({
        month: i,
        principal: monthlyPrincipal,
        interest,
        total,
      });
    }

    setResults(resultsArr);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Loan EMI Calculator</h1>

      {/* Inputs */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="number"
          placeholder="Loan Amount (Rs)"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="number"
          placeholder="Number of Months"
          value={months}
          onChange={(e) => setMonths(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <input
          type="number"
          placeholder="Current Month"
          value={currentMonth}
          onChange={(e) => setCurrentMonth(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />
        <button
          onClick={calculateEMI}
          style={{ width: "100%", padding: "10px", background: "#007bff", color: "white", border: "none", borderRadius: "5px" }}
        >
          Calculate
        </button>
      </div>

      {/* Current Month Result */}
      {currentMonth && results.length > 0 && results[currentMonth - 1] && (
        <div>
          <h2 style={{ marginTop: "20px" }}>Result for Month {currentMonth}</h2>
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
              <tr>
                <td>{results[currentMonth - 1].month}</td>
                <td>₹{results[currentMonth - 1].principal.toFixed(0)}</td>
                <td>₹{results[currentMonth - 1].interest.toFixed(0)}</td>
                <td className="total">₹{results[currentMonth - 1].total.toFixed(0)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Full Calculation */}
      {results.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => setShowFull(!showFull)}
            style={{ background: "none", color: "#007bff", border: "none", cursor: "pointer" }}
          >
            {showFull ? "Hide Full Calculation" : "Show Full Calculation"}
          </button>

          {showFull && (
            <table className="result-table" style={{ marginTop: "10px" }}>
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Principal</th>
                  <th>Interest</th>
                  <th>Total EMI</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, idx) => (
                  <tr key={idx}>
                    <td>{r.month}</td>
                    <td>₹{r.principal.toFixed(0)}</td>
                    <td>₹{r.interest.toFixed(0)}</td>
                    <td className="total">₹{r.total.toFixed(0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
