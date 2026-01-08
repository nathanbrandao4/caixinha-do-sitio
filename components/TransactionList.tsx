'use client'

import { Transaction } from '@/types'
import Link from 'next/link'

interface TransactionListProps {
  transactions: Transaction[]
  showAll?: boolean
  limit?: number
}

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  })
}

function formatTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function TransactionList({
  transactions,
  showAll = false,
  limit = 5,
}: TransactionListProps) {
  const displayTransactions = showAll ? transactions : transactions.slice(0, limit)

  if (transactions.length === 0) {
    return (
      <div className="bg-gradient-to-br from-primary-900/80 to-primary-950/80 rounded-2xl border border-primary-700 p-8 text-center">
        <span className="text-4xl mb-4 block">📭</span>
        <p className="text-white/60">Nenhuma transação registrada ainda.</p>
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          <Link
            href="/nova-entrada"
            className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            + Nova Entrada
          </Link>
          <Link
            href="/nova-saida"
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            + Nova Saída
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-br from-primary-900/80 to-primary-950/80 rounded-2xl border border-primary-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-600 px-4 py-3 flex justify-between items-center">
        <h3 className="font-bold text-white flex items-center gap-2">
          <span className="text-xl">📋</span>
          {showAll ? 'TODAS AS TRANSAÇÕES' : 'ÚLTIMAS TRANSAÇÕES'}
        </h3>
        {!showAll && transactions.length > limit && (
          <Link
            href="/historico"
            className="text-gold-400 text-sm hover:text-gold-300 transition-colors"
          >
            Ver todas →
          </Link>
        )}
      </div>

      {/* Lista */}
      <ul className="divide-y divide-primary-800/50">
        {displayTransactions.map((transaction) => {
          const isEntrada = transaction.type === 'entrada'

          return (
            <li
              key={transaction.id}
              className="flex items-center gap-4 px-4 py-3 hover:bg-primary-800/30 transition-colors"
            >
              {/* Ícone */}
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-xl
                  ${isEntrada ? 'bg-primary-600' : 'bg-red-900/50'}
                `}
              >
                {isEntrada ? '↗️' : '↘️'}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white truncate">
                  {isEntrada ? transaction.person : transaction.description}
                </p>
                <p className="text-sm text-white/50">
                  {formatDate(transaction.created_at)} às{' '}
                  {formatTime(transaction.created_at)}
                </p>
              </div>

              {/* Valor */}
              <span
                className={`
                  font-mono font-semibold
                  ${isEntrada ? 'text-primary-400' : 'text-red-400'}
                `}
              >
                {isEntrada ? '+' : '-'} R$ {formatCurrency(transaction.amount)}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
