# 💰 Personal Finance Tracker

A simple and responsive full-stack Personal Finance Tracker application built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). Users can track their **income** and **expenses**, visualize spending by category, and view recent transactions.

---

## 🚀 Features

- 📥 Add transactions with amount, type (Income/Expense), category, date, and description
- 📊 View **Category-wise Expense Chart**
- 📋 See **Recent Transactions** in a clean, styled layout
- 💹 Auto calculation of **Total Income** and **Total Expenses**
- ⚙️ Form validation using **Zod** and **React Hook Form**
- 🛡️ Backend validation using **Mongoose**

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
Khushi Jain
Frontend Developer & MERN Stack Enthusiast 🌟

📃 License
This project is licensed under the MIT License.


---

### ✅ Notes:
- Replace `screenshots/*.png` with actual screenshot file names if you add them.
- Don’t forget to add `.env` files for both frontend and backend as explained.
- Let me know if you want to deploy this to **Render**, **Vercel**, or **Netlify** and need a deployment section added.

