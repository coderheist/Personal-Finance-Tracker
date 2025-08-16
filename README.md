# 💰 Personal Finance Tracker

A modern and responsive full-stack Personal Finance Tracker application built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) with **Tailwind CSS**. Users can securely manage their finances, track transactions, and visualize spending patterns.

---

## 🚀 Core Features

### 🔐 Authentication
- **User registration and login** with JWT-based authentication
- **Secure session management** with token-based authorization
- **Protected routes** and API endpoints

### 💰 Transaction Management
- **Add, edit, and delete transactions** with:
  - 💵 Amount
  - 🔄 Type (Income/Expense)
  - 🏷️ Category (user-defined)
  - 📅 Date
  - 📝 Description
- **Real-time transaction list** with sorting and filtering

### 🗂️ Category Management
- **Create, edit, and delete categories**
- **User-specific categories** for personalized organization
- **Dynamic category selection** in transaction forms

### 📊 Dashboard Analytics
- **Category-wise expense visualization** using Chart.js
- **Total income and expenses** with automatic calculations
- **Recent transactions overview**
- **Upcoming scheduled transactions** display

### 🗓️ Scheduled Transactions
- **Create recurring transactions** (daily, weekly, monthly)
- **Automatic transaction generation** based on schedule
- **Dashboard reminders** for upcoming scheduled transactions

### 🔔 Notifications
- **Real-time notifications** for scheduled transactions
- **User-specific notification system**
- **Clean notification management interface**

### 👥 Groups & Profile
- **User profile management** with personal information
- **Group functionality** for shared expense tracking
- **Export/Import capabilities** for data management

---

## 🛠️ Tech Stack

### Frontend:
- **React.js** - Modern UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Chart.js** - Data visualization
- **React Hooks** - State management

### Backend:
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

---

## 📦 Project Structure

```
Personal-Finance-Tracker/
│
├── backend/
│   ├── controllers/         # Business logic
│   │   ├── authController.js
│   │   ├── transactionController.js
│   │   ├── categoryController.js
│   │   ├── scheduledTransactionController.js
│   │   └── ...
│   ├── models/              # Database schemas
│   │   ├── User.js
│   │   ├── Transaction.js
│   │   ├── ScheduledTransaction.js
│   │   └── Group.js
│   ├── routes/              # API endpoints
│   ├── middleware/          # Authentication & validation
│   ├── utils/               # Database connection
│   └── index.js             # Server entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── TransactionForm.jsx
│   │   │   ├── TransactionList.jsx
│   │   │   ├── Charts.jsx
│   │   │   └── Header.jsx
│   │   ├── pages/           # Main application pages
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Categories.jsx
│   │   │   ├── ScheduledTransactions.jsx
│   │   │   └── ...
│   │   ├── services/        # API integration
│   │   │   └── api.js
│   │   ├── utils/           # Utility functions
│   │   ├── App.jsx          # Main application component
│   │   └── index.js         # React entry point
│   └── public/              # Static assets
│
└── README.md
```

---

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Git

### 🖥️ Backend Setup
```bash
cd backend
npm install

# Create .env file with:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# PORT=5000

npm run dev
```

### 🎨 Frontend Setup
```bash
cd frontend
npm install

# Create .env file with:
# REACT_APP_API_BASE_URL=http://localhost:5000/api

npm start
```

### 🚀 Running the Application
1. Start the backend server: `npm run dev` (in backend directory)
2. Start the frontend: `npm start` (in frontend directory)
3. Open your browser to `http://localhost:3000`

---

## 🎨 UI/UX Features

- **Modern Tailwind CSS design** with professional styling
- **Fully responsive** layout for all devices
- **Smooth animations** and transitions
- **Intuitive navigation** between features
- **Clean and minimal** interface design
- **Professional color schemes** and gradients

---

## � Security Features

- **JWT-based authentication** with secure token handling
- **Password hashing** using bcryptjs
- **Protected API routes** with middleware validation
- **User-specific data isolation**
- **Environment variable configuration** for sensitive data

---

## 📊 Data Visualization

- **Interactive charts** for expense analysis
- **Category-wise spending breakdown**
- **Income vs. expense comparisons**
- **Trend analysis** with Chart.js integration

---

## 🧑‍💻 Author

Archit Jain 
Full-Stack Developer & MERN Stack Enthusiast 🌟

---

## � License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Thanks to the open-source community
- Chart.js for data visualization
- Tailwind CSS for styling framework
- MongoDB team for the database solution
