<div align="center">

# 💰 Finance Tracker

### A Full Stack Expense & Income Management System

Track your income, expenses, and financial health with a clean React interface and a secure Node.js backend.

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=jsonwebtokens)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</div>

---

# 📖 About

Finance Tracker is a full-stack web application that helps users manage their daily finances by recording income and expenses securely.

The application provides authentication, transaction management, balance calculation, and a responsive dashboard built using React.

---

# ✨ Features

✅ User Registration & Login

✅ Secure JWT Authentication

✅ Add Income

✅ Add Expenses

✅ Delete Transactions

✅ Real-time Balance Calculation

✅ Dashboard Overview

✅ MySQL Database Integration

✅ REST API

✅ Responsive User Interface

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router
- Axios
- CSS

## Backend

- Node.js
- Express.js
- JWT Authentication
- bcrypt.js

## Database

- MySQL

---

# 📂 Project Structure

```
finance-tracker
│
├── config
├── controllers
├── middleware
├── models
├── routes
├── finance-frontend
│ ├── public
│ ├── src
│ └── package.json
│
├── app.js
├── package.json
└── README.md
```

---

# 🚀 Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Kalpana-Nayak/finance-tracker.git

cd finance-tracker
```

---

## 2️⃣ Install Backend

```bash
npm install
```

---

## 3️⃣ Install Frontend

```bash
cd finance-frontend

npm install
```

---

## 4️⃣ Configure Environment Variables

Create a `.env` file inside the backend.

```
PORT=5000

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=your_password

DB_NAME=finance_tracker

JWT_SECRET=your_secret_key
```

---

## 5️⃣ Run Backend

```bash
npm start
```

---

## 6️⃣ Run Frontend

```bash
cd finance-frontend

npm start
```

---

# 💻 API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |

---

## Transactions

| Method | Endpoint |
|---------|----------|
| GET | /api/transactions |
| POST | /api/transactions |
| DELETE | /api/transactions/:id |

---

# 🔐 Authentication

The project uses **JWT (JSON Web Tokens)**.

After login:

- JWT Token is generated
- Stored in Local Storage
- Sent with every authenticated request

---

# 📊 Application Flow

```text
User

   │

   ▼

Login / Register

   │

   ▼

JWT Authentication

   │

   ▼

Dashboard

   │

   ├──────────────┐

   ▼              ▼

Add Income    Add Expense

   │              │

   └──────┬───────┘

          ▼

     MySQL Database

          ▼

Updated Dashboard
```

---

# 🌟 Future Improvements

- 📈 Expense Charts
- 📅 Monthly Reports
- 🌙 Dark Mode
- 📥 Export PDF
- 📤 Export Excel
- 💳 Category Filters
- 📱 Mobile Responsive Improvements

---

# 👩‍💻 Author

**Kalpana Nayak**

📧 Email: kalpananayak.11.33@gmail.com

💼 LinkedIn:
https://www.linkedin.com/in/kalpana-nayak-34616a296/

🐙 GitHub:
https://github.com/Kalpana-Nayak

---

# ⭐ Support

If you found this project useful,

⭐ Star this repository

🍴 Fork it

💡 Contribute

---

<div align="center">

## Thank You ❤️

Made with React • Node.js • Express • MySQL

</div>