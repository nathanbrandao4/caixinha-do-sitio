'use client'

import { META, META_DATE } from '@/types'

interface BalanceCardProps {
  balance: number
}

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export default function BalanceCard({ balance }: BalanceCardProps) {
  const percentage = Math.min((balance / META) * 100, 100)
  const falta = META - balance

  return (
    <div className="relative bg-black/60 backdrop-blur-md rounded-3xl p-10 md:p-14 border-2 border-yellow-500/50 shadow-2xl animate-glow card-shine">

      <div className="relative z-10 text-center">
        {/* Label pequeno */}
        <p className="text-yellow-400/80 text-sm md:text-base uppercase tracking-widest mb-2">
          Total Arrecadado
        </p>

        {/* VALOR GIGANTE */}
        <div className="mb-8">
          <span className="text-white/50 text-4xl md:text-5xl">R$</span>
          <span className="text-7xl sm:text-8xl md:text-9xl font-black text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            {formatCurrency(balance)}
          </span>
        </div>

        {/* Barra de progresso / Régua */}
        <div className="mb-6">
          <div className="h-6 md:h-8 bg-black/50 rounded-full overflow-hidden border-2 border-yellow-500/40 relative">
            {/* Preenchimento */}
            <div
              className="h-full bg-gradient-to-r from-green-600 via-green-400 to-yellow-400 rounded-full transition-all duration-1000 ease-out relative"
              style={{ width: `${percentage}%` }}
            >
              {/* Brilho animado */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            </div>

            {/* Porcentagem no centro da barra */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-sm md:text-lg drop-shadow-lg">
                {percentage.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Info abaixo da barra */}
        <div className="flex justify-between items-center text-sm md:text-base px-2">
          <div className="text-left">
            <p className="text-white/40 text-xs">META</p>
            <p className="text-white/70 font-semibold">R$ {formatCurrency(META)}</p>
          </div>

          <div className="text-center">
            <p className="text-white/40 text-xs">ATÉ</p>
            <p className="text-yellow-400 font-semibold">{META_DATE}</p>
          </div>

          <div className="text-right">
            <p className="text-white/40 text-xs">FALTA</p>
            <p className="text-red-400/80 font-semibold">R$ {formatCurrency(falta)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
