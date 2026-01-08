'use client'

import { useState } from 'react'
import { PARTICIPANTS } from '@/types'

export default function SuggestionBox() {
  const [name, setName] = useState('')
  const [suggestion, setSuggestion] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !suggestion.trim()) {
      setStatus('error')
      setMessage('Por favor, selecione seu nome e escreva uma sugestão.')
      return
    }

    setStatus('sending')

    try {
      const response = await fetch('/api/enviar-sugestao', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, suggestion }),
      })

      if (response.ok) {
        setStatus('success')
        setMessage('Sugestão enviada com sucesso! Obrigado pela contribuição.')
        setName('')
        setSuggestion('')
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        throw new Error('Erro ao enviar')
      }
    } catch {
      setStatus('error')
      setMessage('Erro ao enviar sugestão. Tente novamente.')
    }
  }

  return (
    <div className="bg-gradient-to-br from-gold-900/30 to-gold-950/30 rounded-2xl border border-gold-600/50 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gold-600 to-gold-500 px-4 py-3">
        <h3 className="font-bold text-primary-900 flex items-center gap-2">
          <span className="text-xl">💡</span>
          SUGESTÕES PARA AS FÉRIAS
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <p className="text-white/70 text-sm">
          O que você gostaria de fazer com o dinheiro nas próximas férias?
        </p>

        {/* Nome */}
        <div>
          <label htmlFor="suggestion-name" className="block text-sm text-white/80 mb-1">
            Seu nome
          </label>
          <select
            id="suggestion-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-primary-900/50 border border-primary-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-gold-500"
          >
            <option value="">Selecione...</option>
            {PARTICIPANTS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Sugestão */}
        <div>
          <label htmlFor="suggestion-text" className="block text-sm text-white/80 mb-1">
            Sua sugestão
          </label>
          <textarea
            id="suggestion-text"
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            placeholder="Ex: Fazer um churrasco no sítio, visitar uma cachoeira..."
            rows={3}
            className="w-full bg-primary-900/50 border border-primary-600 rounded-lg px-4 py-2 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-gold-500 resize-none"
          />
        </div>

        {/* Mensagem de status */}
        {status !== 'idle' && status !== 'sending' && (
          <div
            className={`text-sm p-3 rounded-lg ${
              status === 'success'
                ? 'bg-primary-600/20 text-primary-300'
                : 'bg-red-600/20 text-red-300'
            }`}
          >
            {message}
          </div>
        )}

        {/* Botão */}
        <button
          type="submit"
          disabled={status === 'sending'}
          className={`
            w-full py-3 rounded-lg font-semibold transition-all
            ${
              status === 'sending'
                ? 'bg-gold-600/50 cursor-not-allowed text-primary-900/50'
                : 'bg-gold-500 hover:bg-gold-400 text-primary-900 hover:scale-[1.02]'
            }
          `}
        >
          {status === 'sending' ? 'Enviando...' : '📨 Enviar Sugestão'}
        </button>
      </form>
    </div>
  )
}
