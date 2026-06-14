import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState({});
  const [transactions, setTransactions] = useState([]);

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const res1 = await axios.get("http://localhost:5000/api/summary", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const res2 = await axios.get("http://localhost:5000/api/transactions", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setData(res1.data);
      setTransactions(res2.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const addTransaction = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/transactions",
        { amount, type, category },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert("Added!");
      fetchData(); // 🔥 refresh instantly
    } catch (err) {
      alert("Error adding transaction");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Dashboard</h2>
      <button onClick={() => {
        localStorage.removeItem("token");
        window.location.reload();
      }}>
        Logout
      </button>
      <p>Income: {data.total_income || 0}</p>
      <p>Expense: {data.total_expense || 0}</p>
      <p>Balance: {data.balance || 0}</p>

      <h3>Add Transaction</h3>
      <input placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
      <select onChange={(e) => setType(e.target.value)}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input placeholder="Category" onChange={(e) => setCategory(e.target.value)} />
      <button onClick={addTransaction}>Add</button>

      <h3>Transactions</h3>
      <ul>
        {transactions.map((t) => (
          <li key={t.id}>
            {t.type} - ₹{t.amount} ({t.category})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;