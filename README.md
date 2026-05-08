# WorkGrid Task Manager

A full-stack MERN Task Management application built to manage tasks, teams, and real-time collaboration efficiently. The project includes secure authentication, task tracking, team management, and real-time updates using Socket.IO.

## 🚀 Features

* User Authentication & Authorization (JWT)
* Real-time communication with Socket.IO
* Create, Update, Delete Tasks
* Task Status Management
* Team Collaboration
* Responsive UI
* REST API Integration
* Protected Routes
* Role-based Access
* Modern React Frontend
* Express & MongoDB Backend

---

# 🛠️ Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* Axios
* React Router DOM
* Socket.IO Client

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* Socket.IO

---

# 📂 Project Structure

```bash
Workgrid-Task-Manager/
│
├── client/         # Frontend
├── server/         # Backend
├── package.json
└── README.md
```

---

# ⚙️ Environment Variables

## Frontend (.env)

```env
VITE_API_URL=https://your-backend-url.up.railway.app/api
VITE_SOCKET_URL=https://your-backend-url.up.railway.app
```

## Backend (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=https://your-frontend-url.up.railway.app
```

---

# 📦 Installation

## Clone Repository

```bash
git clone https://github.com/Ravitomar333/Workgrid-Task-Manager.git
cd Workgrid-Task-Manager
```

---

# ▶️ Run Frontend

```bash
cd client
npm install
npm run dev
```

---

# ▶️ Run Backend

```bash
cd server
npm install
npm run server
```

---

# 🌐 Deployment

## Frontend Deployment (Railway)

### Build Command

```bash
npm install && npm run build
```

### Start Command

```bash
npx serve -s dist -l $PORT
```

---

## Backend Deployment (Railway)

### Start Command

```bash
npm start
```

---

# 🔐 Authentication Flow

1. User Registers/Login
2. JWT Token Generated
3. Token Stored in Client
4. Protected APIs Verified using Middleware
5. Authorized User Access Granted

---

# 📡 Real-Time Features

* Live Task Updates
* Instant Notifications
* Team Collaboration
* Socket.IO Integration

---

# 📸 Screenshots

Add your project screenshots here.

---

# 🧠 Concepts Used

* REST API
* MVC Architecture
* Authentication & Authorization
* Middleware
* WebSockets
* State Management
* CRUD Operations
* Responsive Design

---

# 👨‍💻 Author

## Ravi Kumar

Java Developer | MERN Stack Developer | Web Developer

GitHub: [https://github.com/Ravitomar333](https://github.com/Ravitomar333)

---

# ⭐ Support

If you like this project, give it a ⭐ on GitHub.

---

# 📄 License

This project is licensed under the MIT License.
