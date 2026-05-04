'use client'

import { useState } from 'react'
import { PARTICIPANTS } from '@/types'

interface MonthContribution {
  name: string
  amount: number | null
}

interface MonthData {
  month: string
  label?: string
  contributions: MonthContribution[]
}

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function buildMonth(
  month: string,
  data: Record<string, number>,
  label?: string
): MonthData {
  const contributions: MonthContribution[] = PARTICIPANTS.map((name) => ({
    name,
    amount: name in data ? data[name] : null,
  }))

  contributions.sort((a, b) => {
    if (a.amount === null && b.amount === null) return 0
    if (a.amount === null) return 1
    if (b.amount === null) return -1
    return b.amount - a.amount
  })

  return { month, label, contributions }
}

const MONTHS_DATA: MonthData[] = [
  buildMonth('Janeiro', {
    NATHAN: 50,
    ELIANE: 50,
    BERNARDO: 50,
  }, 'opcional'),

  buildMonth('Fevereiro', {
    MARCELO: 100,
    NATHAN: 60,
    MARIA: 51,
    ELIANE: 50,
    BERNARDO: 50,
    CARLOS: 50,
    YANDRA: 50,
    JOSÉ: 50,
  }),

  buildMonth('Março', {
    MARCELO: 100,
    NATHAN: 60,
    ELIANE: 52,
    BERNARDO: 50,
    CARLOS: 50,
    YANDRA: 50,
    JOSÉ: 50,
  }),

  buildMonth('Abril', {
    MARCELO: 100,
    NATHAN: 60,
    ELIANE: 52,
    MARIA: 51,
    CARLOS: 50,
    YANDRA: 50,
    JOSÉ: 50,
  }),

  buildMonth('Maio', {
    NATHAN: 60,
  }),

  ...['Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'].map(
    (month) => buildMonth(month, {})
  ),
]

function MonthAccordion({ data }: { data: MonthData }) {
  const [open, setOpen] = useState(false)

  const totalMonth = data.contributions.reduce(
    (acc, c) => acc + (c.amount ?? 0),
    0
  )
  const hasContributions = totalMonth > 0

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 bg-black/30 hover:bg-black/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">📅</span>
          <span className="font-semibold text-white text-lg">{data.month}</span>
          {data.label && (
            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full border border-yellow-500/30">
              {data.label}
            </span>
          )}
          {hasContributions && (
            <span className="text-sm text-green-400/70 ml-2">
              R$ {formatCurrency(totalMonth)}
            </span>
          )}
        </div>
        <span
          className={`text-white/50 text-xl transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        >
          ▼
        </span>
      </button>

      {open && (
        <div className="bg-black/20 border-t border-white/10">
          {!hasContributions ? (
            <div className="px-5 py-6 text-center">
              <span className="text-white/40 text-sm italic">sem contribuintes</span>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {data.contributions.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center justify-between px-5 py-3"
                >
                  <span
                    className={`font-medium ${
                      c.amount !== null ? 'text-white' : 'text-white/30'
                    }`}
                  >
                    {c.name}
                  </span>
                  {c.amount !== null ? (
                    <span className="text-green-400 font-mono font-semibold">
                      R$ {formatCurrency(c.amount)}
                    </span>
                  ) : (
                    <span className="text-red-400/50 text-sm italic">
                      não contribuiu
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function MonthlyBreakdown() {
  return (
    <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600/80 to-blue-500/80 px-5 py-4">
        <h3 className="font-bold text-white text-lg flex items-center justify-center gap-3">
          <span className="text-2xl">📆</span>
          CONTRIBUIÇÕES POR MÊS
        </h3>
      </div>

      <div className="p-3 space-y-2">
        {MONTHS_DATA.map((monthData) => (
          <MonthAccordion key={monthData.month} data={monthData} />
        ))}
      </div>
    </div>
  )
}
