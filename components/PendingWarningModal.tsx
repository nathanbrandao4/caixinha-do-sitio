'use client'

import { useEffect, useState } from 'react'
import { getPendingSummary } from '@/lib/pendencias'

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export default function PendingWarningModal() {
  const [open, setOpen] = useState(false)
  const { names, totalAtraso } = getPendingSummary()

  useEffect(() => {
    if (names.length > 0) setOpen(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!open || names.length === 0) return null

  function verPendencias() {
    setOpen(false)
    setTimeout(() => {
      document.getElementById('pendencias')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  function naoTenho() {
    setOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm px-4 py-8 overflow-y-auto">
      <div className="max-w-lg w-full rounded-3xl border-2 border-red-500 bg-[#1a0808] shadow-[0_0_60px_rgba(239,68,68,0.5)] overflow-hidden animate-glow-red">
        <div
          className="px-6 py-6 text-center"
          style={{ background: 'linear-gradient(135deg, #dc2626, #991b1b)' }}
        >
          <div className="text-5xl mb-2 animate-pulse">🚨</div>
          <div className="text-2xl font-black uppercase tracking-wide text-white">
            Atenção: Pendências!
          </div>
        </div>

        <div className="p-6 text-center space-y-5">
          <p className="text-white text-lg leading-relaxed">
            Se você é{' '}
            <span className="font-black text-red-400">{names.join(', ')}</span>, você tem
            pendências na caixinha do sítio!
          </p>

          <div className="rounded-xl bg-red-500/10 border border-red-500/30 py-3 px-4">
            <p className="text-white/50 text-xs uppercase tracking-widest mb-1">
              Total pendente da família
            </p>
            <p className="text-3xl font-black text-red-400">R$ {formatCurrency(totalAtraso)}</p>
          </div>

          <div className="flex flex-col gap-3 pt-1">
            <button
              onClick={verPendencias}
              className="w-full rounded-xl bg-red-600 hover:bg-red-500 transition-colors text-white font-bold py-3.5 text-base"
            >
              Ver minhas pendências
            </button>
            <button
              onClick={naoTenho}
              className="w-full rounded-xl border border-white/20 hover:bg-white/5 transition-colors text-white/70 font-semibold py-3"
            >
              Não tenho pendências
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
