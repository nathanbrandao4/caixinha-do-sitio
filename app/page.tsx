import BalanceCard from '@/components/BalanceCard'
import ContributorsList from '@/components/ContributorsList'
import { ContributorTotal } from '@/types'

// ========================================
// VALORES - EDITE AQUI PARA ATUALIZAR
// ========================================
const CONTRIBUICOES: ContributorTotal[] = [
  { name: 'NATHAN', total: 110 },
  { name: 'ELIANE', total: 100 },
  { name: 'BERNARDO', total: 50 },
  { name: 'JOSÉ', total: 50 },
  { name: 'CARLOS', total: 50 },
  { name: 'YANDRA', total: 50 },
]

// Rendimento CDI acumulado
const RENDIMENTO_CDI = 1.37
// ========================================

export default function HomePage() {
  const contribuicoes = CONTRIBUICOES.reduce((acc, c) => acc + c.total, 0)
  const balance = contribuicoes + RENDIMENTO_CDI

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-4 py-8">
      {/* Saldo GRANDE e Centralizado */}
      <div className="w-full max-w-2xl mb-12">
        <BalanceCard balance={balance} />
      </div>

      {/* Lista de Contribuintes Abaixo */}
      <div className="w-full max-w-3xl">
        <ContributorsList totals={CONTRIBUICOES} />
      </div>

      {/* Rendimento CDI - discreto */}
      <div className="w-full max-w-3xl mt-6 text-center">
        <p className="text-white/30 text-xs">
          Inclui R$ {RENDIMENTO_CDI.toFixed(2).replace('.', ',')} de rendimento CDI
        </p>
      </div>
    </div>
  )
}
