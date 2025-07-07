"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from "react-native"
import { useAuth } from "../context/AuthContext"
import type { Transaction } from "../types"
import { mockTransactions, categories } from "../data/mockData"
import { formatCurrency, getCurrentMonth, getCategoryColor } from "../utils/helpers"

interface DashboardScreenProps {
  navigation: any
}

export default function DashboardScreen({ navigation }: DashboardScreenProps) {
  const { user, logout } = useAuth()
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [refreshing, setRefreshing] = useState(false)

  const currentMonth = getCurrentMonth()
  const monthlyTransactions = transactions.filter((t) => t.date.startsWith(currentMonth))

  const totalIncome = monthlyTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = monthlyTransactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)

  const balance = totalIncome - totalExpenses

  const recentTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1000)
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Bonjour,</Text>
          <Text style={styles.userName}>{user?.name}</Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>

      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Solde actuel</Text>
        <Text style={[styles.balanceAmount, { color: balance >= 0 ? "#27ae60" : "#e74c3c" }]}>
          {formatCurrency(balance)}
        </Text>

        <View style={styles.balanceDetails}>
          <View style={styles.balanceItem}>
            <Text style={styles.balanceItemLabel}>Revenus</Text>
            <Text style={[styles.balanceItemAmount, { color: "#27ae60" }]}>{formatCurrency(totalIncome)}</Text>
          </View>
          <View style={styles.balanceItem}>
            <Text style={styles.balanceItemLabel}>Dépenses</Text>
            <Text style={[styles.balanceItemAmount, { color: "#e74c3c" }]}>{formatCurrency(totalExpenses)}</Text>
          </View>
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#27ae60" }]}
          onPress={() => alert("Ajouter un revenu - Bientôt disponible")}
        >
          <Text style={styles.actionButtonText}>+ Revenu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#e74c3c" }]}
          onPress={() => alert("Ajouter une dépense - Bientôt disponible")}
        >
          <Text style={styles.actionButtonText}>- Dépense</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Transactions récentes</Text>
          <TouchableOpacity onPress={() => alert("Voir toutes les transactions")}>
            <Text style={styles.seeAllText}>Voir tout</Text>
          </TouchableOpacity>
        </View>

        {recentTransactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionItem}>
            <View style={styles.transactionLeft}>
              <View
                style={[styles.categoryIcon, { backgroundColor: getCategoryColor(transaction.category, categories) }]}
              >
                <Text style={styles.categoryEmoji}>
                  {categories.find((c) => c.name === transaction.category)?.icon || "💰"}
                </Text>
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionDescription}>{transaction.description}</Text>
                <Text style={styles.transactionCategory}>{transaction.category}</Text>
              </View>
            </View>
            <Text style={[styles.transactionAmount, { color: transaction.type === "income" ? "#27ae60" : "#e74c3c" }]}>
              {transaction.type === "income" ? "+" : "-"}
              {formatCurrency(Math.abs(transaction.amount))}
            </Text>
          </View>
        ))}
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity style={styles.navButton} onPress={() => alert("Statistiques - Bientôt disponible")}>
          <Text style={styles.navButtonText}>📊 Statistiques</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={() => alert("Budget - Bientôt disponible")}>
          <Text style={styles.navButtonText}>🎯 Budget</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 50,
  },
  greeting: {
    fontSize: 16,
    color: "#7f8c8d",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  logoutButton: {
    backgroundColor: "#e74c3c",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  logoutText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  balanceCard: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  balanceLabel: {
    fontSize: 16,
    color: "#7f8c8d",
    textAlign: "center",
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  balanceDetails: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#ecf0f1",
  },
  balanceItem: {
    alignItems: "center",
  },
  balanceItemLabel: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  balanceItemAmount: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
  },
  quickActions: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 15,
  },
  actionButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  section: {
    margin: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  seeAllText: {
    color: "#3498db",
    fontSize: 16,
  },
  transactionItem: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  categoryEmoji: {
    fontSize: 18,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2c3e50",
  },
  transactionCategory: {
    fontSize: 14,
    color: "#7f8c8d",
    marginTop: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  navigationButtons: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 15,
  },
  navButton: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2c3e50",
  },
})
