import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from '../lib/axios.ts'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
  createdAt: string
}

interface CreateTransactionData {
  description: string
  type: 'income' | 'outcome'
  category: string
  price: number
}

interface TransactionsContextType {
  transactions: Transaction[]
  fetchTransaction: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionData) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionsContextType)

interface TransactionsProviderProps {
  children: ReactNode
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  async function fetchTransaction(query?: string) {
    const response = await api.get('transactions', {
      params: {
        _order: 'desc',
        _sort: 'createdAt',
        q: query,
      },
    })

    setTransactions(response.data)
  }

  async function createTransaction(data: CreateTransactionData) {
    const { description, price, category, type } = data

    const response = await api.post('transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    })

    setTransactions((state) => [response.data, ...state])
  }
  useEffect(() => {
    fetchTransaction()
  }, [])
  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransaction, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
