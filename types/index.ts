export interface User {
  id: string
  email: string
  name: string
}

export interface Transaction {
  id: string
  amount: number
  description: string
  category: string
  type: "income" | "expense"
  date: string
  userId: string
}

export interface Category {
  id: string
  name: string
  color: string
  icon: string
}

export interface Budget {
  id: string
  category: string
  limit: number
  spent: number
  month: string
  userId: string
}
