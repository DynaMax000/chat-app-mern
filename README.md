# Chatter - Language Learning Chat Application

A modern MERN stack chat application designed for language learners to connect, practice, and improve their language skills through real-time conversations with native speakers and fellow learners worldwide.

## 🚀 Features

### 🔐 Authentication & User Management
- **User Registration & Login** with JWT authentication
- **Profile Onboarding** with language preferences and bio
- **Secure Password Hashing** with bcryptjs
- **Cookie-based Session Management**

### 💬 Chat & Communication
- **Real-time Messaging** powered by Stream Chat
- **Video/Voice Calls** for practice sessions
- **Language Partner Matching**
- **Notification System**

### 🌐 User Experience
- **Responsive Design** with Tailwind CSS and DaisyUI
- **Dark/Light Theme Support**
- **Multi-language Interface**
- **Mobile-First Design**

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Fast build tool and dev server
- **TanStack Query** - Server state management
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Elegant notifications
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Stream Chat** - Real-time messaging service
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Cookie parsing middleware

## 📁 Project Structure

```
Chat App MERN/
├── frontend/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/            # Application pages
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
    │   ├── controllers/      # Route handlers
    │   ├── models/          # Database models
    │   ├── routes/          # API routes
    │   ├── middlewares/     # Custom middleware
    │   ├── lib/             # Utility functions
    │   └── server.js        # Express server
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
   git clone <your-repo-url>
   cd "Chat App MERN"
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

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=4000

# Database
MONGO_URI=mongodb://localhost:27017/chatapp

# Authentication
JWT_SECRET=your-super-secret-jwt-key

# Stream Chat (Get from getstream.io)
STREAM_API_KEY=your-stream-api-key
STREAM_API_SECRET=your-stream-api-secret
```

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

## 📱 Application Flow

1. **Registration/Login** - Users create accounts or sign in
2. **Onboarding** - New users complete their profile with:
   - Bio and interests
   - Native language
   - Languages they want to learn
   - Location
3. **Home Dashboard** - Browse language partners and features
4. **Chat** - Real-time messaging with other users
5. **Video Calls** - Practice speaking with language partners
6. **Notifications** - Stay updated with messages and activities

## 🔑 API Endpoints

### Authentication Routes (`/api/auth`)
- `POST /signup` - Register new user
- `POST /login` - User login
- `POST /logout` - User logout
- `GET /me` - Get current user
- `POST /onboarding` - Complete user onboarding

### User Routes (`/api/users`)
- `GET /` - Get all users
- `GET /:id` - Get user by ID

### Chat Routes (`/api/chat`)
- `GET /token` - Get Stream Chat token

## 🎨 UI Features

- **Dark Mode Support** with DaisyUI themes
- **Responsive Design** for mobile and desktop
- **Loading States** and error handling
- **Toast Notifications** for user feedback
- **Form Validation** and error messages

## 🔒 Security Features

- **JWT Authentication** with httpOnly cookies
- **Password Hashing** with bcryptjs
- **CORS Protection** for cross-origin requests
- **Input Validation** and sanitization
- **Secure Headers** and best practices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Stream Chat for real-time messaging infrastructure
- MongoDB for flexible data storage
- The MERN stack community for excellent documentation
- All contributors and language learning enthusiasts

---

**Happy Language Learning! 🌍💬**