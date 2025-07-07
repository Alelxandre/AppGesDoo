"use client"

import { useState } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from "react-native"
import { mockTransactions, categories } from "../data/mockData"
import { formatCurrency, getCurrentMonth, getCategoryColor } from "../utils/helpers"

const { width } = Dimensions.get("window")

interface StatisticsScreenProps {
  navigation: any
}

export default function StatisticsScreen({ navigation }: StatisticsScreenProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  const currentMonth = getCurrentMonth()
  const transactions = mockTransactions.filter((t) =>
    selectedPeriod === "month" ? t.date.startsWith(currentMonth) : true,
  )

  const expenses = transactions.filter((t) => t.type === "expense")
  const totalExpenses = expenses.reduce((sum, t) => sum + Math.abs(t.amount), 0)

  // Grouper les dépenses par catégorie
  const expensesByCategory = expenses.reduce(
    (acc, transaction) => {
      const category = transaction.category
      if (!acc[category]) {
        acc[category] = 0
      }
      acc[category] += Math.abs(transaction.amount)
      return acc
    },
    {} as Record<string, number>,
  )

  const categoryStats = Object.entries(expensesByCategory)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: (amount / totalExpenses) * 100,
      color: getCategoryColor(category, categories),
    }))
    .sort((a, b) => b.amount - a.amount)

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Retour</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Statistiques</Text>
      </View>

      {/* Period Selector */}
      <View style={styles.periodSelector}>
        <TouchableOpacity
          style={[styles.periodButton, selectedPeriod === "month" && styles.selectedPeriod]}
          onPress={() => setSelectedPeriod("month")}
        >
          <Text style={[styles.periodText, selectedPeriod === "month" && styles.selectedPeriodText]}>Ce mois</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.periodButton, selectedPeriod === "all" && styles.selectedPeriod]}
          onPress={() => setSelectedPeriod("all")}
        >
          <Text style={[styles.periodText, selectedPeriod === "all" && styles.selectedPeriodText]}>Tout</Text>
        </TouchableOpacity>
      </View>

      {/* Total Expenses */}
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total des dépenses</Text>
        <Text style={styles.totalAmount}>{formatCurrency(totalExpenses)}</Text>
      </View>

      {/* Chart Simulation */}
      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Répartition par catégorie</Text>
        <View style={styles.chartPlaceholder}>
          {categoryStats.map((stat, index) => (
            <View key={stat.category} style={styles.chartBar}>
              <View style={styles.barInfo}>
                <Text style={styles.barCategory}>{stat.category}</Text>
                <Text style={styles.barAmount}>{formatCurrency(stat.amount)}</Text>
              </View>
              <View style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    {
                      width: `${stat.percentage}%`,
                      backgroundColor: stat.color,
                    },
                  ]}
                />
              </View>
              <Text style={styles.barPercentage}>{stat.percentage.toFixed(1)}%</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Category Details */}
      <View style={styles.categoryDetails}>
        <Text style={styles.sectionTitle}>Détails par catégorie</Text>
        {categoryStats.map((stat) => (
          <View key={stat.category} style={styles.categoryItem}>
            <View style={styles.categoryLeft}>
              <View style={[styles.categoryIcon, { backgroundColor: stat.color }]}>
                <Text style={styles.categoryEmoji}>
                  {categories.find((c) => c.name === stat.category)?.icon || "💰"}
                </Text>
              </View>
              <View>
                <Text style={styles.categoryName}>{stat.category}</Text>
                <Text style={styles.categoryPercentage}>{stat.percentage.toFixed(1)}% du total</Text>
              </View>
            </View>
            <Text style={styles.categoryAmount}>{formatCurrency(stat.amount)}</Text>
          </View>
        ))}
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
  periodSelector: {
    flexDirection: "row",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
  },
  periodButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  selectedPeriod: {
    backgroundColor: "#3498db",
  },
  periodText: {
    fontSize: 16,
    color: "#7f8c8d",
  },
  selectedPeriodText: {
    color: "white",
    fontWeight: "bold",
  },
  totalCard: {
    backgroundColor: "white",
    margin: 20,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  totalLabel: {
    fontSize: 16,
    color: "#7f8c8d",
  },
  totalAmount: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#e74c3c",
    marginTop: 5,
  },
  chartContainer: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 15,
  },
  chartPlaceholder: {
    gap: 10,
  },
  chartBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  barInfo: {
    width: 100,
  },
  barCategory: {
    fontSize: 12,
    fontWeight: "500",
    color: "#2c3e50",
  },
  barAmount: {
    fontSize: 10,
    color: "#7f8c8d",
  },
  barContainer: {
    flex: 1,
    height: 20,
    backgroundColor: "#ecf0f1",
    borderRadius: 10,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    borderRadius: 10,
  },
  barPercentage: {
    width: 40,
    fontSize: 12,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "right",
  },
  categoryDetails: {
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
  categoryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
  },
  categoryLeft: {
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
  categoryName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2c3e50",
  },
  categoryPercentage: {
    fontSize: 12,
    color: "#7f8c8d",
    marginTop: 2,
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e74c3c",
  },
})
