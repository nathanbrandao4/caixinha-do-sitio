'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function NovaSaidaPage() {
  const router = useRouter()
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!description.trim()) {
      setError('Digite uma descrição para o gasto.')
      return
    }

    const numAmount = parseFloat(amount.replace(',', '.'))
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Digite um valor válido.')
      return
    }

    setLoading(true)

    try {
      const { error: insertError } = await supabase.from('transactions').insert({
        type: 'saida',
        description: description.trim(),
        amount: numAmount,
        created_at: new Date(date).toISOString(),
      })

      if (insertError) throw insertError

      router.push('/')
      router.refresh()
    } catch (err) {
      console.error('Erro ao salvar:', err)
      setError('Erro ao salvar a saída. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-gradient-to-br from-red-900/30 to-red-950/30 rounded-2xl border border-red-700/50 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 px-6 py-4">
          <h1 className="text-xl font-bold text-white flex items-center gap-3">
            <span className="text-2xl">💸</span>
            Nova Saída
          </h1>
          <p className="text-white/70 text-sm mt-1">
            Registrar um gasto da caixinha
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Descrição */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-white/80 mb-2">
              Descrição do gasto
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Compras no mercado, Gás, etc."
              className="w-full bg-primary-900/50 border border-red-600/50 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Valor */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-white/80 mb-2">
              Valor (R$)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50">
                R$
              </span>
              <input
                type="text"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0,00"
                className="w-full bg-primary-900/50 border border-red-600/50 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Data */}
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-white/80 mb-2">
              Data do gasto
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-primary-900/50 border border-red-600/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Erro */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Botões */}
          <div className="flex gap-3 pt-2">
            <Link
              href="/"
              className="flex-1 bg-primary-800 hover:bg-primary-700 text-white text-center py-3 rounded-xl font-medium transition-colors"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading}
              className={`
                flex-1 py-3 rounded-xl font-semibold transition-all
                ${
                  loading
                    ? 'bg-red-600/50 cursor-not-allowed text-white/50'
                    : 'bg-red-500 hover:bg-red-400 text-white'
                }
              `}
            >
              {loading ? 'Salvando...' : 'Salvar Saída'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
