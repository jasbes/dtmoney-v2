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

interface TransactionsContextType {
  transactions: Transaction[]
  fetchTransaction: (query?: string) => Promise<void>
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
        q: query,
      },
    })

    setTransactions(response.data)
  }
  useEffect(() => {
    fetchTransaction()
  }, [])
  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}
