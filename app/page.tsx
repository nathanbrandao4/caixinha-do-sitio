import BalanceCard from '@/components/BalanceCard'
import ContributorsList from '@/components/ContributorsList'
import MonthlyBreakdown from '@/components/MonthlyBreakdown'
import { ContributorTotal } from '@/types'

// ========================================
// VALORES - EDITE AQUI PARA ATUALIZAR
// ========================================
const CONTRIBUICOES: ContributorTotal[] = [
  { name: 'NATHAN', total: 170 },
  { name: 'ELIANE', total: 152 },
  { name: 'BERNARDO', total: 150 },
  { name: 'MARCELO', total: 200 },
  { name: 'JOSÉ', total: 100 },
  { name: 'CARLOS', total: 100 },
  { name: 'YANDRA', total: 100 },
  { name: 'MARIA', total: 51 },
  { name: 'LEONARDO', total: 0 },
]

// Rendimento CDI acumulado
const RENDIMENTO_CDI = 17.15
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
