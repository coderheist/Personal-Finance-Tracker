# 💰 Personal Finance Tracker

A simple and responsive full-stack Personal Finance Tracker application built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). Users can track their **income** and **expenses**, visualize spending by category, and view recent transactions.
Core Features Included:
🔐 Authentication - JWT-based login/signup system
💰 Transaction Management - Full CRUD operations for transactions
🗂️ Category Management - User-specific category creation and management
📊 Dashboard Analytics - Chart.js visualizations and calculations
🗓️ Scheduled Transactions - Recurring transaction functionality
🔔 Notifications - Real-time notification system
👥 Groups & Profile - User profile and group management
📤 Export/Import - Data management capabilities



Tech Stack Updated:
Added Tailwind CSS as the main styling framework
Removed outdated technologies (Zod, React Hook Form)
Added bcryptjs for password hashing
Updated to reflect the actual technologies used
Project Structure:
Updated to match your current folder structure
Included all the controllers, models, and routes you have
Reflected the actual component organization

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
