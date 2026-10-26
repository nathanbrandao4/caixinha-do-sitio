import { PARTICIPANTS } from '@/types'

export interface MonthContribution {
  name: string
  amount: number | null
}

export interface MonthData {
  month: string
  monthIndex: number
  optional?: boolean
  contributions: MonthContribution[]
  pending: string[]
}

function buildMonth(
  month: string,
  monthIndex: number,
  data: Record<string, number>,
  optional?: boolean
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

  const pending = optional
    ? []
    : PARTICIPANTS.filter((name) => !(name in data))

  return { month, monthIndex, optional, contributions, pending }
}

// ========================================
// DADOS DOS MESES - EDITE AQUI PARA ATUALIZAR
// Fonte única: MonthlyBreakdown.tsx e o alerta de pendências (PendingWarningModal)
// leem os dois a partir daqui, pra nunca ficarem fora de sincronia.
// ========================================
export const MONTHS_DATA: MonthData[] = [
  buildMonth('Janeiro', 0, { NATHAN: 50, ELIANE: 50, BERNARDO: 50 }, true),

  buildMonth('Fevereiro', 1, {
    MARCELO: 100,
    NATHAN: 60,
    MARIA: 51,
    ELIANE: 50,
    BERNARDO: 50,
    CARLOS: 50,
    YANDRA: 50,
    JOSÉ: 50,
  }),

  buildMonth('Março', 2, {
    MARCELO: 100,
    NATHAN: 60,
    ELIANE: 52,
    BERNARDO: 50,
    CARLOS: 50,
    YANDRA: 50,
    JOSÉ: 50,
  }),

  buildMonth('Abril', 3, {
    MARCELO: 100,
    NATHAN: 60,
    ELIANE: 52,
    BERNARDO: 50,
    MARIA: 51,
    CARLOS: 50,
    YANDRA: 50,
    JOSÉ: 50,
  }),

  buildMonth('Maio', 4, {
    MARCELO: 100,
    NATHAN: 60,
    ELIANE: 50,
    BERNARDO: 50,
    CARLOS: 50,
    YANDRA: 50,
    JOSÉ: 50,
    MARIA: 50,
  }),

  buildMonth('Junho', 5, { MARCELO: 100, NATHAN: 60, BERNARDO: 50, CARLOS: 50, YANDRA: 50, ELIANE: 50, MARIA: 50, JOSÉ: 50 }),

  buildMonth('Julho', 6, { NATHAN: 60, MARCELO: 100, BERNARDO: 50, YANDRA: 50, CARLOS: 50 }),

  buildMonth('Agosto', 7, { NATHAN: 60, BERNARDO: 100, MARCELO: 100, CARLOS: 50, YANDRA: 50 }),

  buildMonth('Setembro', 8, { NATHAN: 60, YANDRA: 50, CARLOS: 50, MARCELO: 100 }),

  buildMonth('Outubro', 9, { NATHAN: 60, MARCELO: 100, CARLOS: 50, YANDRA: 50 }),

  ...(['Novembro', 'Dezembro'] as const).map(
    (month, i) => buildMonth(month, 10 + i, {})
  ),
]

// Valor padrão da cota mensal de cada participante (usado para calcular o total em atraso)
export const VALOR_PADRAO: Record<string, number> = {
  MARCELO: 100,
  NATHAN: 60,
  ELIANE: 50,
  BERNARDO: 50,
  CARLOS: 50,
  YANDRA: 50,
  JOSÉ: 50,
  MARIA: 50,
}

export function getRefMonthIndex(): number {
  const browserMonthIndex = new Date().getMonth()
  const lastContributedMonth = Math.max(
    ...MONTHS_DATA.filter((m) => m.contributions.some((c) => c.amount !== null)).map((m) => m.monthIndex)
  )
  return Math.max(browserMonthIndex, lastContributedMonth)
}

export function getPendingItems(): { name: string; month: string }[] {
  const refMonthIndex = getRefMonthIndex()
  return MONTHS_DATA.flatMap((m) => {
    if (m.optional || m.monthIndex >= refMonthIndex) return []
    return m.pending.map((name) => ({ name, month: m.month }))
  })
}

export interface PendingSummary {
  items: { name: string; month: string }[]
  totalAtraso: number
  /** nomes únicos com pendência, ordenados de quem deve mais meses pra quem deve menos */
  names: string[]
}

export function getPendingSummary(): PendingSummary {
  const items = getPendingItems()
  const totalAtraso = items.reduce((acc, item) => acc + (VALOR_PADRAO[item.name] ?? 50), 0)

  const countByName: Record<string, number> = {}
  items.forEach((item) => {
    countByName[item.name] = (countByName[item.name] ?? 0) + 1
  })

  const names = Array.from(new Set(items.map((i) => i.name))).sort(
    (a, b) => countByName[b] - countByName[a]
  )

  return { items, totalAtraso, names }
}
