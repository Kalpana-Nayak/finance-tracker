import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./Dashboard.css";

const CATEGORIES = ["Food", "Transport", "Shopping", "Bills", "Health", "Salary", "Freelance", "Investment", "Other"];

export default function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [summary, setSummary] = useState({ total_income: 0, total_expense: 0, balance: 0 });
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({ amount: "", type: "expense", category: "Food" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const [sumRes, txRes] = await Promise.all([
        api.get("/summary"),
        api.get("/transactions"),
      ]);
      setSummary(sumRes.data);
      setTransactions(txRes.data.reverse()); // newest first
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        navigate("/login");
      }
    }
  }, [logout, navigate]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0) {
      return setError("Enter a valid amount");
    }
    setLoading(true);
    try {
      await api.post("/transaction", {
        amount: Number(form.amount),
        type: form.type,
        category: form.category,
      });
      setSuccess("Transaction added!");
      setForm({ amount: "", type: "expense", category: "Food" });
      fetchData();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add transaction");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => { logout(); navigate("/login"); };

  const fmt = (n) => `₹${Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;

  return (
    <div className="dash-container">
      {/* NAVBAR */}
      <nav className="dash-nav">
        <span className="dash-brand">💰 Finance Tracker</span>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </nav>

      <main className="dash-main">
        {/* SUMMARY CARDS */}
        <section className="summary-grid">
          <div className="summary-card balance">
            <p className="card-label">Balance</p>
            <p className="card-value">{fmt(summary.balance)}</p>
          </div>
          <div className="summary-card income">
            <p className="card-label">↑ Income</p>
            <p className="card-value">{fmt(summary.total_income)}</p>
          </div>
          <div className="summary-card expense">
            <p className="card-label">↓ Expenses</p>
            <p className="card-value">{fmt(summary.total_expense)}</p>
          </div>
        </section>

        <div className="dash-body">
          {/* ADD TRANSACTION FORM */}
          <section className="add-card">
            <h2 className="section-title">Add Transaction</h2>

            {error && <div className="msg error">{error}</div>}
            {success && <div className="msg success">{success}</div>}

            <form onSubmit={handleSubmit} className="add-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Amount (₹)</label>
                  <input
                    type="number"
                    name="amount"
                    placeholder="0.00"
                    value={form.amount}
                    onChange={handleChange}
                    min="1"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Type</label>
                  <select name="type" value={form.type} onChange={handleChange}>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={form.category} onChange={handleChange}>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button type="submit" className="add-btn" disabled={loading}>
                {loading ? "Adding..." : "+ Add Transaction"}
              </button>
            </form>
          </section>

          {/* TRANSACTION LIST */}
          <section className="tx-card">
            <h2 className="section-title">Recent Transactions</h2>

            {transactions.length === 0 ? (
              <div className="empty-state">No transactions yet. Add one above!</div>
            ) : (
              <div className="tx-list">
                {transactions.map((tx) => (
                  <div key={tx.id} className={`tx-item ${tx.type}`}>
                    <div className="tx-left">
                      <span className="tx-icon">
                        {tx.type === "income" ? "↑" : "↓"}
                      </span>
                      <div>
                        <p className="tx-category">{tx.category}</p>
                        <p className="tx-date">
                          {new Date(tx.date || tx.created_at).toLocaleDateString("en-IN", {
                            day: "2-digit", month: "short", year: "numeric"
                          })}
                        </p>
                      </div>
                    </div>
                    <p className={`tx-amount ${tx.type}`}>
                      {tx.type === "income" ? "+" : "-"}{fmt(tx.amount)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
// import { useEffect, useState } from "react";
// import axios from "axios";

// function Dashboard() {
//   const [data, setData] = useState({});
//   const [transactions, setTransactions] = useState([]);

//   const [amount, setAmount] = useState("");
//   const [type, setType] = useState("income");
//   const [category, setCategory] = useState("");

//   const token = localStorage.getItem("token");

//   const fetchData = async () => {
//     try {
//       const res1 = await axios.get("http://localhost:5000/api/summary", {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       const res2 = await axios.get("http://localhost:5000/api/transactions", {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       setData(res1.data);
//       setTransactions(res2.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const addTransaction = async () => {
//     try {
//       await axios.post(
//         "http://localhost:5000/api/transactions",
//         { amount, type, category },
//         {
//           headers: { Authorization: `Bearer ${token}` }
//         }
//       );

//       alert("Added!");
//       fetchData(); // 🔥 refresh instantly
//     } catch (err) {
//       alert("Error adding transaction");
//     }
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial" }}>
//       <h2>Dashboard</h2>
//       <button onClick={() => {
//         localStorage.removeItem("token");
//         window.location.reload();
//       }}>
//         Logout
//       </button>
//       <p>Income: {data.total_income || 0}</p>
//       <p>Expense: {data.total_expense || 0}</p>
//       <p>Balance: {data.balance || 0}</p>

//       <h3>Add Transaction</h3>
//       <input placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
//       <select onChange={(e) => setType(e.target.value)}>
//         <option value="income">Income</option>
//         <option value="expense">Expense</option>
//       </select>
//       <input placeholder="Category" onChange={(e) => setCategory(e.target.value)} />
//       <button onClick={addTransaction}>Add</button>

//       <h3>Transactions</h3>
//       <ul>
//         {transactions.map((t) => (
//           <li key={t.id}>
//             {t.type} - ₹{t.amount} ({t.category})
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Dashboard;