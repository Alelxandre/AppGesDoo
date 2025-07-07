"use client"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { AuthProvider, useAuth } from "./context/AuthContext"

// Screens
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import DashboardScreen from "./screens/DashboardScreen"

const Stack = createStackNavigator()

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  )
}

function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
    </Stack.Navigator>
  )
}

function AppNavigator() {
  const { user, loading } = useAuth()

  if (loading) {
    return null
  }

  return <NavigationContainer>{user ? <AppStack /> : <AuthStack />}</NavigationContainer>
}

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  )
}
