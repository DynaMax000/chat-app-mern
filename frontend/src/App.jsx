import { Toaster } from 'react-hot-toast'
import { Navigate, Route, Routes } from 'react-router'
import PageLoader from './components/PageLoader'
import useAuthUser from './hooks/useAuthUser'
import CallPage from './pages/CallPage'
import ChatPage from './pages/ChatPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import NotificationsPage from './pages/NotificationsPage'
import OnboardingPage from './pages/OnboardingPage'
import SignUpPage from './pages/SignUpPage'
import Layout from './components/Layout'

function App() {
  const { isLoading, authUser } = useAuthUser();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) {
    return <div> <PageLoader /> </div>
  }

  return (
    <div className="h-screen" data-theme="night">
      <Routes>
        <Route path="/" element={isAuthenticated && isOnboarded ? (<Layout> <HomePage /> </Layout>) : (<Navigate to={!isAuthenticated ? '/login' : '/onboarding'} />)
        } />

        <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />

        <Route path="/onboarding" element={isAuthenticated ? (
          !isOnboarded ? (
            <OnboardingPage />
          ) : (
            <Navigate to="/" />
          )
        ) : (
          <Navigate to="/login" />
        )
        } />
        <Route path="/notifications" element={isAuthenticated ? <NotificationsPage /> : <Navigate to="/login" />} />

        <Route path="/call" element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />} />
        <Route path="/chat" element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App