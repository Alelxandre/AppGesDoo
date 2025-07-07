export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount)
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export const getCurrentMonth = (): string => {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`
}

export const getCategoryColor = (categoryName: string, categories: any[]): string => {
  const category = categories.find((cat) => cat.name === categoryName)
  return category?.color || "#666"
}
