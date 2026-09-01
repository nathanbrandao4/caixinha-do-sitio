import BalanceCard from '@/components/BalanceCard'
import ContributorsList from '@/components/ContributorsList'
import MonthlyBreakdown from '@/components/MonthlyBreakdown'
import { ContributorTotal } from '@/types'

// ========================================
// VALORES - EDITE AQUI PARA ATUALIZAR
// ========================================
const CONTRIBUICOES: ContributorTotal[] = [
  { name: 'NATHAN', total: 530 },
  { name: 'ELIANE', total: 304 },
  { name: 'BERNARDO', total: 450 },
  { name: 'MARCELO', total: 700 },
  { name: 'JOSÉ', total: 250 },
  { name: 'CARLOS', total: 350 },
  { name: 'YANDRA', total: 350 },
  { name: 'MARIA', total: 202 },
]

// Rendimento CDI acumulado
const RENDIMENTO_CDI = 124.94
// ========================================

export default function HomePage() {
  const contribuicoes = CONTRIBUICOES.reduce((acc, c) => acc + c.total, 0)
  const balance = contribuicoes + RENDIMENTO_CDI

  return (
    <div className="flex flex-col items-center px-4 py-8">
      {/* Saldo GRANDE e Centralizado */}
      <div className="w-full max-w-2xl mb-12">
        <BalanceCard balance={balance} />
      </div>

      {/* Rendimento CDI - discreto */}
      <div className="w-full max-w-3xl mb-8 text-center">
        <p className="text-white/30 text-xs">
          Inclui R$ {RENDIMENTO_CDI.toFixed(2).replace('.', ',')} de rendimento CDI
        </p>
      </div>

      {/* Lista de Contribuintes */}
      <div className="w-full max-w-3xl mb-12">
        <ContributorsList totals={CONTRIBUICOES} />
      </div>

      {/* Contribuições por Mês */}
      <div className="w-full max-w-3xl">
        <MonthlyBreakdown />
      </div>
    </div>
  )
}
