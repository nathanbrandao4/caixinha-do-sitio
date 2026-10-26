'use client'

import { useState } from 'react'

export const PIX_KEY = '59.778.669/0001-51'

interface PixKeyProps {
  compact?: boolean
}

export default function PixKey({ compact = false }: PixKeyProps) {
  const [copied, setCopied] = useState(false)

  async function copiar() {
    try {
      await navigator.clipboard.writeText(PIX_KEY)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard indisponível - ignora silenciosamente
    }
  }

  return (
    <div
      className={`flex items-center gap-2 flex-wrap justify-center rounded-xl border border-green-500/40 bg-green-500/10 ${
        compact ? 'px-3 py-1.5' : 'px-4 py-3'
      }`}
    >
      <span className="text-white/50 text-xs uppercase tracking-wide">Chave PIX</span>
      <span className="font-mono font-semibold text-green-400 text-sm sm:text-base">{PIX_KEY}</span>
      <button
        onClick={copiar}
        className="rounded-lg bg-green-600 hover:bg-green-500 transition-colors text-white text-xs font-bold px-3 py-1.5 whitespace-nowrap"
      >
        {copied ? '✔ Copiado!' : 'Copiar'}
      </button>
    </div>
  )
}
