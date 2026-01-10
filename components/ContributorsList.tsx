'use client'

import { ContributorTotal, PARTICIPANTS } from '@/types'

interface ContributorsListProps {
  totals: ContributorTotal[]
}

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

const avatars: Record<string, string> = {
  MARCELO: '👨',
  ELIANE: '👩',
  BERNARDO: '🧑',
  CARLOS: '👴',
  YANDRA: '👩',
  NATHAN: '🧔',
  MARIA: '👵',
  LEONARDO: '🧑',
  JOSÉ: '👴',
}

export default function ContributorsList({ totals }: ContributorsListProps) {
  const totalsMap = new Map(totals.map((t) => [t.name, t.total]))

  // Ordenar por valor (maior primeiro)
  const sortedParticipants = [...PARTICIPANTS].sort((a, b) => {
    const totalA = totalsMap.get(a) || 0
    const totalB = totalsMap.get(b) || 0
    return totalB - totalA
  })

  // Calcular ranking (empates têm mesma posição)
  let currentRank = 0
  let lastValue = -1
  const rankings = new Map<string, number>()

  sortedParticipants.forEach((name) => {
    const total = totalsMap.get(name) || 0
    if (total > 0) {
      if (total !== lastValue) {
        currentRank++
        lastValue = total
      }
      rankings.set(name, currentRank)
    }
  })

  return (
    <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-green-500/30 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600/80 to-green-500/80 px-5 py-4">
        <h3 className="font-bold text-white text-lg flex items-center justify-center gap-3">
          <span className="text-2xl">🏆</span>
          RANKING DE CONTRIBUIÇÕES
        </h3>
      </div>

      {/* Lista em grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 p-3">
        {sortedParticipants.map((name) => {
          const total = totalsMap.get(name) || 0
          const hasContributed = total > 0
          const rank = rankings.get(name)

          return (
            <div
              key={name}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                ${hasContributed
                  ? 'bg-green-900/30 border border-green-500/30'
                  : 'bg-white/5 border border-white/10'
                }
              `}
            >
              {/* Posição no Ranking */}
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
                ${rank === 1 ? 'bg-yellow-500 text-black' : ''}
                ${rank === 2 ? 'bg-gray-400 text-black' : ''}
                ${rank === 3 ? 'bg-amber-700 text-white' : ''}
                ${rank && rank > 3 ? 'bg-green-700/50 text-white' : ''}
                ${!rank ? 'bg-white/10 text-white/30' : ''}
              `}>
                {rank ? `${rank}°` : '-'}
              </div>

              {/* Avatar */}
              <span className="text-2xl">
                {avatars[name] || '👤'}
              </span>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className={`font-semibold truncate ${hasContributed ? 'text-white' : 'text-white/40'}`}>
                  {name}
                </p>
                <p className={`text-sm font-mono ${hasContributed ? 'text-green-400' : 'text-white/30'}`}>
                  R$ {formatCurrency(total)}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
