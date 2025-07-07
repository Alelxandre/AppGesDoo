"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { useAuth } from "../context/AuthContext"

interface LoginScreenProps {
  navigation: any
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs")
      return
    }

    setLoading(true)
    const success = await login(email, password)
    setLoading(false)

    if (!success) {
      Alert.alert("Erreur", "Email ou mot de passe incorrect")
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.content}>
        <Text style={styles.title}>💰 Budget Manager</Text>
        <Text style={styles.subtitle}>Connectez-vous à votre compte</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? "Connexion..." : "Se connecter"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate("Register")}>
            <Text style={styles.linkText}>Pas de compte ? Inscrivez-vous</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.demoInfo}>
          <Text style={styles.demoText}>Compte de démonstration :</Text>
          <Text style={styles.demoCredentials}>Email: test@test.com</Text>
          <Text style={styles.demoCredentials}>Mot de passe: password</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#2c3e50",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#7f8c8d",
    marginBottom: 40,
  },
  form: {
    marginBottom: 30,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e1e8ed",
  },
  button: {
    backgroundColor: "#3498db",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#bdc3c7",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkButton: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    color: "#3498db",
    fontSize: 16,
  },
  demoInfo: {
    backgroundColor: "#e8f4f8",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  demoText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 5,
  },
  demoCredentials: {
    fontSize: 12,
    color: "#34495e",
  },
})
