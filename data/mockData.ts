import type { Category, Transaction } from "../types"

export const categories: Category[] = [
  { id: "1", name: "Alimentation", color: "#FF6B6B", icon: "🍽️" },
  { id: "2", name: "Transport", color: "#4ECDC4", icon: "🚗" },
  { id: "3", name: "Logement", color: "#45B7D1", icon: "🏠" },
  { id: "4", name: "Divertissement", color: "#96CEB4", icon: "🎬" },
  { id: "5", name: "Santé", color: "#FFEAA7", icon: "⚕️" },
  { id: "6", name: "Éducation", color: "#DDA0DD", icon: "📚" },
  { id: "7", name: "Salaire", color: "#98D8C8", icon: "💰" },
  { id: "8", name: "Freelance", color: "#F7DC6F", icon: "💻" },
]

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    amount: 2500,
    description: "Salaire mensuel",
    category: "Salaire",
    type: "income",
    date: "2024-01-01",
    userId: "1",
  },
  {
    id: "2",
    amount: -450,
    description: "Courses alimentaires",
    category: "Alimentation",
    type: "expense",
    date: "2024-01-02",
    userId: "1",
  },
  {
    id: "3",
    amount: -800,
    description: "Loyer",
    category: "Logement",
    type: "expense",
    date: "2024-01-01",
    userId: "1",
  },
  {
    id: "4",
    amount: -120,
    description: "Essence",
    category: "Transport",
    type: "expense",
    date: "2024-01-03",
    userId: "1",
  },
]
