"use client"

import { useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { categories } from "../data/mockData"

interface AddTransactionScreenProps {
  navigation: any
  route: any
}

export default function AddTransactionScreen({ navigation, route }: AddTransactionScreenProps) {
  const { type } = route.params || { type: "expense" }
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])

  const relevantCategories = categories.filter((cat) =>
    type === "income" ? ["Salaire", "Freelance"].includes(cat.name) : !["Salaire", "Freelance"].includes(cat.name),
  )

  const handleSave = () => {
    if (!amount || !description || !selectedCategory) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs")
      return
    }

    const numAmount = Number.parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      Alert.alert("Erreur", "Veuillez entrer un montant valide")
      return
    }

    // Ici vous ajouteriez la logique pour sauvegarder la transaction
    Alert.alert("Succès", "Transaction ajoutée avec succès", [{ text: "OK", onPress: () => navigation.goBack() }])
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>← Retour</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{type === "income" ? "Ajouter un revenu" : "Ajouter une dépense"}</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Montant (€)</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              placeholder="Description de la transaction"
              value={description}
              onChangeText={setDescription}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date</Text>
            <TextInput style={styles.input} placeholder="YYYY-MM-DD" value={date} onChangeText={setDate} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Catégorie</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.categoriesContainer}>
                {relevantCategories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryButton,
                      { backgroundColor: category.color },
                      selectedCategory === category.name && styles.selectedCategory,
                    ]}
                    onPress={() => setSelectedCategory(category.name)}
                  >
                    <Text style={styles.categoryEmoji}>{category.icon}</Text>
                    <Text style={styles.categoryName}>{category.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Enregistrer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  },
  header: {
    padding: 20,
    paddingTop: 50,
  },
  backButton: {
    fontSize: 16,
    color: "#3498db",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2c3e50",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e1e8ed",
  },
  categoriesContainer: {
    flexDirection: "row",
    gap: 10,
  },
  categoryButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    minWidth: 80,
    opacity: 0.8,
  },
  selectedCategory: {
    opacity: 1,
    borderWidth: 3,
    borderColor: "#2c3e50",
  },
  categoryEmoji: {
    fontSize: 24,
    marginBottom: 5,
  },
  categoryName: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: "#27ae60",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
})
