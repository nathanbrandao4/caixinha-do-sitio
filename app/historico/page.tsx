'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Transaction, PARTICIPANTS, TransactionType } from '@/types'
import TransactionList from '@/components/TransactionList'

export default function HistoricoPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filtered, setFiltered] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  // Filtros
  const [typeFilter, setTypeFilter] = useState<TransactionType | 'todos'>('todos')
  const [personFilter, setPersonFilter] = useState<string>('todos')

  useEffect(() => {
    loadTransactions()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [transactions, typeFilter, personFilter])

  async function loadTransactions() {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao carregar:', error)
    } else {
      setTransactions(data || [])
    }
    setLoading(false)
  }

  function applyFilters() {
    let result = [...transactions]

    // Filtrar por tipo
    if (typeFilter !== 'todos') {
      result = result.filter((t) => t.type === typeFilter)
    }

    // Filtrar por pessoa
    if (personFilter !== 'todos') {
      result = result.filter((t) => t.person === personFilter)
    }

    setFiltered(result)
  }

  // Calcular totais
  const totalEntradas = filtered
    .filter((t) => t.type === 'entrada')
    .reduce((acc, t) => acc + t.amount, 0)

  const totalSaidas = filtered
    .filter((t) => t.type === 'saida')
    .reduce((acc, t) => acc + t.amount, 0)

  function formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-bounce">📋</div>
          <p className="text-white/60">Carregando histórico...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white flex items-center gap-3">
        <span>📋</span>
        Histórico de Transações
      </h1>

      {/* Filtros */}
      <div className="bg-primary-900/50 rounded-xl p-4 border border-primary-700">
        <h2 className="text-sm font-medium text-white/60 mb-3">Filtros</h2>
        <div className="flex flex-wrap gap-4">
          {/* Filtro por tipo */}
          <div className="flex-1 min-w-[150px]">
            <label htmlFor="type-filter" className="block text-xs text-white/50 mb-1">
              Tipo
            </label>
            <select
              id="type-filter"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as TransactionType | 'todos')}
              className="w-full bg-primary-800 border border-primary-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="todos">Todos</option>
              <option value="entrada">Entradas</option>
              <option value="saida">Saídas</option>
            </select>
          </div>

          {/* Filtro por pessoa */}
          <div className="flex-1 min-w-[150px]">
            <label htmlFor="person-filter" className="block text-xs text-white/50 mb-1">
              Pessoa
            </label>
            <select
              id="person-filter"
              value={personFilter}
              onChange={(e) => setPersonFilter(e.target.value)}
              className="w-full bg-primary-800 border border-primary-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="todos">Todos</option>
              {PARTICIPANTS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-primary-800/50 rounded-xl p-4 border border-primary-700">
          <p className="text-xs text-white/50 mb-1">Total Entradas</p>
          <p className="text-xl font-bold text-primary-400">
            + R$ {formatCurrency(totalEntradas)}
          </p>
        </div>
        <div className="bg-red-900/30 rounded-xl p-4 border border-red-700/50">
          <p className="text-xs text-white/50 mb-1">Total Saídas</p>
          <p className="text-xl font-bold text-red-400">
            - R$ {formatCurrency(totalSaidas)}
          </p>
        </div>
        <div className="bg-gold-900/30 rounded-xl p-4 border border-gold-700/50 col-span-2 md:col-span-1">
          <p className="text-xs text-white/50 mb-1">Transações</p>
          <p className="text-xl font-bold text-gold-400">{filtered.length}</p>
        </div>
      </div>

      {/* Lista de Transações */}
      <TransactionList transactions={filtered} showAll />
    </div>
  )
}
