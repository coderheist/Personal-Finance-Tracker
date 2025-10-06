Personal Finance Tracker (MERN Stack)

A modern and responsive Personal Finance Tracker web application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).
This app helps users manage their income and expenses, track spending patterns, and visualize financial data through interactive charts — all in one secure dashboard.

🚀 Features

✅ User Authentication (Signup/Login using JWT or Firebase Auth)
✅ Add, Edit, Delete Transactions with category & amount tracking
✅ Filter by Date, Type, and Category
✅ Dynamic Expense Visualization with Pie & Bar Charts
✅ Responsive Dashboard UI (Tailwind CSS)
✅ Secure REST APIs (Node.js + Express + MongoDB)
✅ Real-time Aggregations for Income vs Expense
✅ Deployed Frontend & Backend (Vercel / Render / MongoDB Atlas)

🧩 Tech Stack
Layer	Technology Used
Frontend	React.js, Tailwind CSS, Axios, Recharts
Backend	Node.js, Express.js
Database	MongoDB (Mongoose ODM)
Authentication	Firebase Auth / JWT
Deployment	Vercel (Frontend), Render (Backend), MongoDB Atlas (Database)
📁 Folder Structure
finance-tracker/
│
├── client/                   # React Frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Dashboard, Login, Signup, Analytics
│   │   ├── context/          # Global state (Auth, Transactions)
│   │   └── App.jsx
│   └── package.json
│
├── server/                   # Express Backend
│   ├── models/               # MongoDB Schemas (User, Transaction)
│   ├── routes/               # API Routes
│   ├── controllers/          # Route Handlers
│   ├── middleware/           # JWT & Error Middleware
│   ├── server.js             # Entry Point
│   └── package.json
│
└── README.md

⚙️ Setup Instructions
🔧 1. Clone the Repository
git clone https://github.com/yourusername/finance-tracker.git
cd finance-tracker

🖥️ 2. Setup the Backend
cd server
npm install


Create a .env file:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000


Run the server:

npm start

💻 3. Setup the Frontend
cd ../client
npm install
npm run dev

🧠 Key Functionalities
🔹 User Authentication

Login and Signup using JWT or Firebase Authentication

Protected routes in both frontend and backend

🔹 Transactions Management

Add, edit, delete, and view transactions

Filter by date, type (income/expense), and category

🔹 Analytics & Visualization

Real-time summary of income vs expenses

Pie/Bar charts for category-wise spending using Recharts

🔹 Security & Performance

Passwords hashed using bcrypt

Protected APIs with JWT middleware

Optimized MongoDB queries & indexes

📊 Dashboard Preview
Feature	Screenshot
Login Page	(Add screenshot link)
Dashboard Overview	(Add screenshot link)
Expense Chart	(Add screenshot link)
☁️ Deployment
Service	Description
Frontend	Deployed on Vercel

Backend	Hosted on Render

Database	Cloud MongoDB via MongoDB Atlas
🔒 Environment Variables

Create a .env file in your server/ folder with:

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
PORT=5000


If using Firebase:

VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain

🧩 API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	User login
GET	/api/transactions	Get all user transactions
POST	/api/transactions	Add new transaction
PUT	/api/transactions/:id	Update a transaction
DELETE	/api/transactions/:id	Delete a transaction
📈 Future Enhancements

🔹 Budget limit and alerts
🔹 Monthly PDF expense reports
🔹 Recurring transactions
🔹 AI-based financial insights
🔹 Dark/Light theme toggle

🧑‍💻 Author

👤 Archit Jain
💼 MERN Stack Developer | AI Integrations | Interview Prep Enthusiast
📧 architjain@email.com

🌐 LinkedIn
 • GitHub

⭐ Contribute

Feel free to fork, open issues, and contribute to improve the project.

git clone https://github.com/yourusername/finance-tracker.git
git checkout -b feature/new-feature
git push origin feature/new-feature

📝 License

This project is licensed under the MIT License.
