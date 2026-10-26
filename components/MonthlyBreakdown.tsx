'use client'

import { useState } from 'react'
import { MONTHS_DATA, VALOR_PADRAO, getRefMonthIndex, getPendingItems, MonthData } from '@/lib/pendencias'
import PixCopyButton from './PixCopyButton'

function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

function MonthAccordion({ data, isPast }: { data: MonthData; isPast: boolean }) {
  const [open, setOpen] = useState(false)

  const totalMonth = data.contributions.reduce(
    (acc, c) => acc + (c.amount ?? 0),
    0
  )
  const hasContributions = totalMonth > 0
  const hasPending = isPast && !data.optional && data.pending.length > 0
  const allPaid = isPast && !data.optional && data.pending.length === 0 && hasContributions

  return (
    <div
      className="border rounded-xl overflow-hidden"
      style={{
        borderColor: hasPending ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.1)',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 transition-colors"
        style={{
          background: hasPending ? 'rgba(239,68,68,0.07)' : 'rgba(0,0,0,0.3)',
        }}
      >
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xl">📅</span>
          <span className="font-semibold text-white text-lg">{data.month}</span>
          {data.optional && (
            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full border border-yellow-500/30">
              opcional
            </span>
          )}
          {hasContributions && (
            <span className="text-sm text-green-400/70">
              R$ {formatCurrency(totalMonth)}
            </span>
          )}
          {allPaid && (
            <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400">
              ✔ todos pagaram
            </span>
          )}
          {hasPending && (
            <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-red-500/15 border border-red-500/40 text-red-400">
              ⚠️ {data.pending.length} {data.pending.length === 1 ? 'pendência' : 'pendências'}
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

function PendingAlert({ items }: { items: { name: string; month: string }[] }) {
  if (items.length === 0) return null

  const totalAtraso = items.reduce((acc, item) => acc + (VALOR_PADRAO[item.name] ?? 50), 0)

  const totalByPerson: Record<string, number> = {}
  items.forEach((item) => {
    totalByPerson[item.name] = (totalByPerson[item.name] ?? 0) + (VALOR_PADRAO[item.name] ?? 50)
  })
  const personList = Object.entries(totalByPerson).sort((a, b) => b[1] - a[1])

  return (
    <div
      className="rounded-2xl overflow-hidden mt-6"
      style={{
        border: '2px solid rgba(239,68,68,0.5)',
        background: 'rgba(0,0,0,0.5)',
        boxShadow: '0 0 40px rgba(239,68,68,0.15), 0 0 80px rgba(239,68,68,0.05)',
      }}
    >
      {/* Cabeçalho */}
      <div
        className="flex items-center justify-center gap-4 px-6 py-5"
        style={{ background: 'linear-gradient(90deg, #dc2626, #b91c1c)' }}
      >
        <span className="text-4xl animate-pulse">🚨</span>
        <div className="text-center">
          <div className="text-2xl font-black tracking-widest uppercase">
            Pendências em Atraso
          </div>
          <div className="text-xs text-white/70 mt-1">
            contribuições de meses anteriores não realizadas
          </div>
        </div>
        <span className="bg-white text-red-600 font-black text-sm px-3 py-1.5 rounded-full whitespace-nowrap">
          {items.length} em atraso
        </span>
      </div>

      {/* Itens */}
      <div className="p-5 flex flex-col gap-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl px-5 py-4"
            style={{
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.25)',
              borderLeft: '4px solid #dc2626',
            }}
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl">🔴</span>
              <div>
                <div className="text-lg font-black tracking-wide text-red-300">
                  {item.name}
                </div>
                <div className="text-xs text-white/40 mt-0.5">não contribuiu</div>
              </div>
            </div>
            <div
              className="text-center px-4 py-2 rounded-lg"
              style={{
                background: 'rgba(239,68,68,0.2)',
                border: '1px solid rgba(239,68,68,0.4)',
              }}
            >
              <div className="text-red-400 font-bold text-sm">{item.month}</div>
              <div className="text-red-400/60 text-xs mt-0.5">em atraso</div>
            </div>
          </div>
        ))}
      </div>

      {/* Total por pessoa + botão de pagar (copia a chave PIX na hora) */}
      <div
        className="px-5 py-5 flex flex-col gap-2"
        style={{ borderTop: '1px solid rgba(239,68,68,0.3)' }}
      >
        <div className="text-xs font-bold uppercase tracking-widest text-red-400/70 mb-1 text-center">
          Total de pendências por pessoa
        </div>
        {personList.map(([name, total]) => (
          <div
            key={name}
            className="flex items-center justify-between gap-3 rounded-xl px-4 py-3"
            style={{
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.25)',
            }}
          >
            <div>
              <div className="font-black text-white tracking-wide">{name}</div>
              <div className="text-red-400 font-mono font-semibold text-sm">
                R$ {formatCurrency(total)}
              </div>
            </div>
            <PixCopyButton />
          </div>
        ))}
      </div>

      {/* Total geral */}
      <div
        className="text-center py-6 px-4"
        style={{
          borderTop: '1px solid rgba(239,68,68,0.3)',
          background: 'rgba(239,68,68,0.08)',
        }}
      >
        <div className="text-xs font-bold uppercase tracking-widest text-red-400/70 mb-1">
          Total de pendências (soma de tudo)
        </div>
        <div
          className="text-5xl sm:text-6xl font-black text-red-500"
          style={{ textShadow: '0 0 30px rgba(239,68,68,0.5)' }}
        >
          R$ {formatCurrency(totalAtraso)}
        </div>
      </div>

      <div
        className="text-center text-xs py-3 px-4"
        style={{
          borderTop: '1px solid rgba(239,68,68,0.2)',
          color: 'rgba(255,255,255,0.3)',
        }}
      >
        atualizado automaticamente conforme contribuições registradas
      </div>
    </div>
  )
}

export default function MonthlyBreakdown() {
  const refMonthIndex = getRefMonthIndex()
  const pendingItems = getPendingItems()

  return (
    <div id="pendencias">
      <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600/80 to-blue-500/80 px-5 py-4">
          <h3 className="font-bold text-white text-lg flex items-center justify-center gap-3">
            <span className="text-2xl">📆</span>
            CONTRIBUIÇÕES POR MÊS
          </h3>
        </div>

        <div className="p-3 space-y-2">
          {MONTHS_DATA.map((monthData) => (
            <MonthAccordion
              key={monthData.month}
              data={monthData}
              isPast={monthData.monthIndex < refMonthIndex}
            />
          ))}
        </div>
      </div>

      <PendingAlert items={pendingItems} />
    </div>
  )
}
