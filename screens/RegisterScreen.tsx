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

interface RegisterScreenProps {
  navigation: any
}

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs")
      return
    }

    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas")
      return
    }

    if (password.length < 6) {
      Alert.alert("Erreur", "Le mot de passe doit contenir au moins 6 caractères")
      return
    }

    setLoading(true)
    const success = await register(name, email, password)
    setLoading(false)

    if (!success) {
      Alert.alert("Erreur", "Erreur lors de l'inscription")
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.content}>
        <Text style={styles.title}>💰 Budget Manager</Text>
        <Text style={styles.subtitle}>Créez votre compte</Text>

        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="Nom complet" value={name} onChangeText={setName} />

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

          <TextInput
            style={styles.input}
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? "Inscription..." : "S'inscrire"}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate("Login")}>
            <Text style={styles.linkText}>Déjà un compte ? Connectez-vous</Text>
          </TouchableOpacity>
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
    backgroundColor: "#27ae60",
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
})
