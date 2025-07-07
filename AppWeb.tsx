"use client"
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContextWeb"

// Screens
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import DashboardScreenWeb from "./screens/DashboardScreenWeb"
import AddTransactionScreen from "./screens/AddTransactionScreen"
import StatisticsScreen from "./screens/StatisticsScreen"

// Navigation mock pour compatibilité
const createMockNavigation = (navigate: any) => ({
  navigate: (screen: string, params?: any) => {
    if (screen === "AddTransaction") {
      navigate("/add-transaction", { state: params })
    } else if (screen === "Statistics") {
      navigate("/statistics")
    } else if (screen === "Login") {
      navigate("/login")
    } else if (screen === "Register") {
      navigate("/register")
    } else {
      navigate("/")
    }
  },
  goBack: () => navigate(-1),
})

function AuthRoutes() {
  const navigate = useNavigate()
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen navigation={createMockNavigation(navigate)} />} />
      <Route path="/register" element={<RegisterScreen navigation={createMockNavigation(navigate)} />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

function AppRoutes() {
  const navigate = useNavigate()
  return (
    <Routes>
      <Route path="/" element={<DashboardScreenWeb navigation={createMockNavigation(navigate)} />} />
      <Route path="/add-transaction" element={<AddTransactionScreen navigation={createMockNavigation(navigate)} />} />
      <Route path="/statistics" element={<StatisticsScreen navigation={createMockNavigation(navigate)} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function AppNavigator() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "18px",
        }}
      >
        Chargement...
      </div>
    )
  }

  return user ? <AppRoutes /> : <AuthRoutes />
}

export default function AppWeb() {
  return (
    <AuthProvider>
      <Router>
        <AppNavigator />
      </Router>
    </AuthProvider>
  )
}
