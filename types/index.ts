export type TransactionType = 'entrada' | 'saida'

export interface Transaction {
  id: string
  type: TransactionType
  person: string | null
  description: string | null
  amount: number
  created_at: string
}

export interface Suggestion {
  id: string
  name: string
  suggestion: string
  created_at: string
}

export interface ContributorTotal {
  name: string
  total: number
}

export const PARTICIPANTS = [
  'MARCELO',
  'ELIANE',
  'BERNADO',
  'CARLOS',
  'YANDRA',
  'NATHAN',
  'MARIA',
  'LEONARDO',
  'JOSÉ',
] as const

export type Participant = (typeof PARTICIPANTS)[number]

export const META = 4500
export const META_DATE = 'Dezembro 2026'
