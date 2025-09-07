# Chatter - Language Learning Chat Application

Modern MERN stack app for language learners to discover partners, build friendships, and chat in real time.

## 🚀 Features

### 🔐 Authentication & User Management
- **User Registration & Login** with JWT authentication
- **Profile Onboarding** with language preferences and bio
- **Secure Password Hashing** with bcryptjs
- **Cookie-based Session Management**

### 💬 Social & Communication
- **Real-time Messaging** (Stream Chat integration scaffolded – token endpoint in place)
- **Friend Requests** (send, view outgoing, accept)
- **Recommended Users** (excludes current user & existing friends; only onboarded users)
- **Future**: Calls & richer notifications (UI placeholders exist)

### 🌐 User Experience
- Responsive Tailwind + DaisyUI UI
- Theme switcher (DaisyUI themes via Zustand store)
- Toast feedback (react-hot-toast)
- Accessible, mobile‑first layout

## 🛠️ Tech Stack

### Frontend
- React 19 + Vite
- TanStack Query (data fetching & caching)
- React Router 7 (routing & guards)
- Tailwind CSS + DaisyUI (styling & themes)
- Zustand (lightweight global state: theme)
- Axios (pre‑configured instance with credentials)
- Lucide React icons / react-hot-toast

### Backend
- Node.js / Express (ESM)
- MongoDB + Mongoose (User & FriendRequest models)
- JWT auth (httpOnly cookie, 7d expiry)
- bcryptjs password hashing (pre-save hook)
- Stream Chat client (user upsert + token generation)
- CORS + cookie-parser middleware

## 📁 Project Structure (Simplified)

```
Chat App MERN/
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable UI (FriendCard, Layout, ThemeSelector...)
│   │   ├── pages/             # Route pages
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignUpPage.jsx
│   │   │   ├── OnboardingPage.jsx
│   │   │   ├── ChatPage.jsx
│   │   │   ├── CallPage.jsx
│   │   │   └── NotificationsPage.jsx
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utility functions and API
│   │   └── App.jsx           # Main app component
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── src/
   │   ├── controllers/      # Auth, user, chat logic
   │   ├── models/           # User, FriendRequest
   │   ├── routes/           # /auth, /users, /chat
   │   ├── middlewares/      # protectRoute (JWT)
   │   ├── lib/              # db, stream helpers
   │   └── server.js         # App entrypoint
    ├── package.json
    └── .env
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Stream Chat account (for real-time messaging)

### Installation

1. **Clone the repository**
   ```bash
   git clone 
   cd Chat App MERN
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

Environment variables intentionally omitted; set your own (PORT, FRONTEND_URL, MONGO_URI, JWT_SECRET, STREAM_API_KEY, STREAM_API_SECRET, etc.).

### Running the Application

1. **Start MongoDB** (if running locally)

2. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server will run on `http://localhost:4000`

3. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## 📱 Core Flow
1. Sign up / Login → JWT cookie issued
2. Onboarding → set bio, nativeLanguage, learningLanguage, location (marks isOnboarded=true)
3. Home → shows friends + recommended users
4. Send friend requests → outgoing & incoming tracked
5. (Planned) Accept → becomes mutual friendship; chat/call expansion planned

## 🔑 API Endpoints

### Auth (`/api/auth`)
- POST /signup
- POST /login
- POST /logout
- GET /me (protected)
- POST /onboarding (protected)

### Users (`/api/users` – all protected)
- GET /               → Recommended users
- GET /friends         → Current friends (populated)
- POST /friend-request/:id
- PUT  /friend-request/:id/accept
- GET /friend-requests (incoming + accepted summary)
- GET /outgoing-friend-requests

### Chat (`/api/chat`)
- GET /token (requires auth; returns Stream token)

## 🎨 UI Features
- Theme selector (DaisyUI)
- Loading & skeleton states (spinners)
- Toast notifications (auth, onboarding, requests)
- Language flags (country code mapping)
- Responsive card grid

## 🔒 Security & Hardening
- httpOnly JWT cookie (7d)
- Password hashing (bcrypt, salt rounds 10)
- CORS restricted to FRONTEND_URL
- Token validation & 401 handling in middleware
- Input validation in controllers (IDs, required fields)

## 🤝 Contributing
1. Fork
2. Create feature branch
3. Commit & push
4. Open PR

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Stream Chat for real-time messaging infrastructure
- MongoDB for flexible data storage
- The MERN stack community for excellent documentation
- All contributors and language learning enthusiasts

---

**Happy Language Learning! 🌍💬**