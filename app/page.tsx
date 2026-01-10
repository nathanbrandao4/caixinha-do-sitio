import BalanceCard from '@/components/BalanceCard'
import ContributorsList from '@/components/ContributorsList'
import { ContributorTotal } from '@/types'

// ========================================
// VALORES - EDITE AQUI PARA ATUALIZAR
// ========================================
const CONTRIBUICOES: ContributorTotal[] = [
  { name: 'NATHAN', total: 50 },
  { name: 'ELIANE', total: 50 },
  { name: 'BERNARDO', total: 50 },
]
// ========================================

export default function HomePage() {
  const balance = CONTRIBUICOES.reduce((acc, c) => acc + c.total, 0)

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
    </div>
  )
}
