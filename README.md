# ✍️ Author Platform – Book Review Full Stack Application

Welcome to the **Author Platform**, a full-stack book review web application built using **React.js (frontend)** and **Node.js + Express.js + MongoDB (backend)**. This platform allows users to explore books, submit reviews, and interact with authors.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Axios, Tailwind CSS (or CSS)
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Database**: MongoDB Atlas
- **Version Control**: Git & GitHub

---
author-platform/
├── server(backend)/ # Express.js backend

│ ├── models/

│ ├── routes/

│ ├── controllers/

│ ├── .env.example

│ ├── server.js

│ └── package.json
│



├── frontend/ # React frontend

│ ├── src/

│ ├── public/

│ ├── .env.example

│ └── package.json

│
└── README.md




---

## ⚙️ How to Run the Project Locally

You’ll run the **frontend** and **backend** separately.

---

## 🚀 Backend Setup

### Step 1: Navigate to the backend folder

```bash
cd server
Step 2: Install backend dependencies
npm install

Step 3: Create .env file

Create a .env file in the backend folder using this template:


PORT=5000
MONGO_URI=your_mongodb_connection_string


Replace your_mongodb_connection_string with your actual MongoDB Atlas URI. It looks like:


mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/your-db-name?retryWrites=true&w=majority

✅ Make sure to whitelist your IP address in MongoDB Atlas.

Step 4: Start the backend server
npm start
The server will run at:
http://localhost:5000



🌐 Frontend Setup
Step 1: Navigate to the frontend folder
cd frontend


Step 2: Install frontend dependencies
npm install


Step 3: Create .env file(optional)
Create a .env file in the frontend folder:
VITE_API_URL=http://localhost:5000/api
This tells the frontend where to find the backend API.


Step 4: Start the frontend server
If you're using Vite:
npm run dev
Frontend will run at:
http://localhost:5173

📦 Install Global Tools (Optional)
If you don't have Vite or nodemon installed globally:
npm install -g nodemon
npm install -g vite
