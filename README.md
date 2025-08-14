# 💰 Personal Finance Tracker

A simple and responsive full-stack Personal Finance Tracker application built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). Users can track their **income** and **expenses**, visualize spending by category, and view recent transactions.

---

## 🚀 Features
🔐 User authentication (login, signup, JWT-based session management)

💰 Add, edit, and delete transactions (income/expense) with:

💵 Amount

🔄 Type (Income/Expense)

🏷️ Category (dynamic, user-defined)

📅 Date

📝 Description

🗂️ Category management:

➕ Create, ✏️ edit, and ❌ delete categories

👤 Categories are user-specific

📊 Dashboard with analytics:

📈 Category-wise expense chart (visualization)

💹 Total income and total expenses (auto-calculated)

🗓️ Monthly/weekly summaries

📜 Recent transactions list (styled, sortable)

🚨 Budget notifications:

🎯 Set budget limits per category

⚠️ Receive alerts when limits are exceeded

✅ Form validation:

🖥️ Frontend: Zod + React Hook Form

🗄️ Backend: Mongoose schema validation

📱 Responsive UI:

🎨 Professional CSS with gradients, shadows, rounded corners, transitions

📱 Mobile-friendly layout

📤 Export transactions to CSV or PDF

🔍 Filter transactions by date range, category, or type

🌐 RESTful API (Express.js backend)

🛡️ Secure API endpoints (JWT authentication)

🪛 Error handling and user feedback (toasts, alerts)

⚙️ Environment variable support (.env for frontend/backend)

🗂️ Modern folder structure (MERN best practices)

🚀 Easy deployment and Git integration

---

## 🛠️ Tech Stack

### Frontend:
- React.js
- React Hook Form
- Zod
- Axios
- Chart.js

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- dotenv

---

## 📦 Folder Structure

personal-finance-tracker/
│
├── backend/
│ ├── models/Transaction.js # Mongoose model
│ ├── routes/transactionRoutes.js # Express routes
│ ├── controllers/transactionController.js
│ └── server.js # Express entry point
│
├── frontend/
│ ├── src/
│ │ ├── components/ # TransactionForm, TransactionList, Charts
│ │ ├── services/api.js # Axios calls
│ │ ├── utils/validationSchema.js
│ │ ├── App.js
│ │ └── index.js
│ └── .env # Frontend API URL
│
└── README.md

---

## 🔧 Installation & Setup

### 🖥️ Backend (Node.js + Express + MongoDB)
```bash
cd backend
npm install
# Create a .env file with the following:
# MONGO_URI=<your-mongodb-connection-string>
# PORT=5000

npm run dev
cd frontend
npm install
# Create a .env file:
# REACT_APP_API_BASE_URL=http://localhost:5000/api

npm start

✨ Future Improvements
🧠 Add authentication for users

📁 Export transactions to CSV or PDF

📅 Filter by date range

📱 Make mobile responsive

🙌 Acknowledgments
Thanks to the open-source community and resources like React Hook Form, Chart.js, and MongoDB.

🧑‍💻 Author
Archit Jain
Frontend Developer & MERN Stack Enthusiast 🌟

📃 License
This project is licensed under the MIT License.
