'use client'

import { useState } from 'react'
import { PIX_KEY } from './PixKey'

interface PixCopyButtonProps {
  label?: string
}

/** Botão compacto que copia a chave PIX direto no clique, sem precisar revelar nada antes. */
export default function PixCopyButton({ label = 'Pagar' }: PixCopyButtonProps) {
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
    <button
      onClick={copiar}
      className="rounded-lg bg-green-600 hover:bg-green-500 transition-colors text-white text-xs font-bold px-3.5 py-2.5 whitespace-nowrap"
    >
      {copied ? '✔ Chave copiada!' : `💰 ${label}`}
    </button>
  )
}
