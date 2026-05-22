# DIÁRIO DO PROJETO - Caixinha do Sítio

> Este arquivo serve como registro completo do estado atual do projeto.
> Sempre que uma conversa começar, basta enviar esta pasta para o assistente ficar a par de tudo.

---

## O QUE É O PROJETO

Sistema web de **caixinha coletiva** para férias em família.
A família junta dinheiro ao longo do ano para gastar nas férias de Dezembro/2026 no sítio.

- **URL de produção:** https://caixinha-do-sitio.vercel.app/
- **Hospedagem:** Vercel
- **Banco de dados:** Supabase (PostgreSQL)
- **Repositório:** github.com/nathanbrandao4/caixinha-do-sitio
- **Email (opcional):** Resend

---

## STACK TÉCNICA

- Next.js 16 (App Router)
- React 19
- TypeScript 5.9
- Tailwind CSS 4
- Supabase (banco de dados)
- Resend (envio de emails - opcional)

---

## PARTICIPANTES

| Nome      | Contribuição total (R$) |
|-----------|------------------------|
| MARCELO   | 200,00                 |
| NATHAN    | 230,00                 |
| ELIANE    | 152,00                 |
| BERNARDO  | 150,00                 |
| CARLOS    | 100,00                 |
| YANDRA    | 100,00                 |
| JOSÉ      | 100,00                 |
| MARIA     | 51,00                  |

---

## CONTRIBUIÇÕES POR MÊS

### Janeiro (opcional)
| Nome      | Valor   |
|-----------|---------|
| NATHAN    | R$ 50   |
| ELIANE    | R$ 50   |
| BERNARDO  | R$ 50   |
| Demais    | não contribuíram |

### Fevereiro
| Nome      | Valor   |
|-----------|---------|
| MARCELO   | R$ 100  |
| NATHAN    | R$ 60   |
| MARIA     | R$ 51   |
| ELIANE    | R$ 50   |
| BERNARDO  | R$ 50   |
| CARLOS    | R$ 50   |
| YANDRA    | R$ 50   |
| JOSÉ      | R$ 50   |

### Março
| Nome      | Valor   |
|-----------|---------|
| MARCELO   | R$ 100  |
| NATHAN    | R$ 60   |
| ELIANE    | R$ 52   |
| BERNARDO  | R$ 50   |
| CARLOS    | R$ 50   |
| YANDRA    | R$ 50   |
| JOSÉ      | R$ 50   |
| MARIA     | não contribuiu |

### Abril
| Nome      | Valor   |
|-----------|---------|
| NATHAN    | R$ 60   |
| Demais    | não contribuíram |

### Maio a Dezembro
Sem contribuições ainda.

---

## NÚMEROS ATUAIS (01/04/2026)

- **Total contribuições:** R$ 1.083,00
- **Rendimento CDI:** R$ 17,74
- **Saldo total:** R$ 1.100,74
- **Meta:** R$ 5.000,00
- **Progresso:** 22,0%
- **Falta:** R$ 3.899,85
- **Prazo:** Dezembro/2026

---

## ESTRUTURA DE ARQUIVOS

```
caixinha-do-sitio/
├── app/
│   ├── page.tsx                    # Dashboard - saldo + ranking + meses (dados hardcoded)
│   ├── layout.tsx                  # Layout global (Header + Footer)
│   ├── globals.css                 # Estilos globais (fundo com foto, animações)
│   ├── nova-entrada/page.tsx       # Formulário de depósito (usa Supabase)
│   ├── nova-saida/page.tsx         # Formulário de gasto (usa Supabase)
│   ├── historico/page.tsx          # Histórico com filtros (usa Supabase)
│   └── api/enviar-sugestao/route.ts # API de sugestões (Supabase + Resend)
├── components/
│   ├── Header.tsx                  # Cabeçalho "Caixinha do Sítio"
│   ├── BalanceCard.tsx             # Card grande com saldo, barra de progresso, meta
│   ├── ContributorsList.tsx        # Ranking de contribuintes com posições
│   ├── MonthlyBreakdown.tsx        # Accordion com contribuições por mês (Jan-Dez)
│   ├── SuggestionBox.tsx           # Formulário de sugestões para férias
│   └── TransactionList.tsx         # Lista de transações (entradas/saídas)
├── lib/
│   └── supabase.ts                 # Cliente Supabase
├── types/
│   └── index.ts                    # Tipos TS + constantes (PARTICIPANTS, META=5000)
├── supabase-setup.sql              # Script SQL para criar tabelas
├── preview.html                    # Preview estático para visualizar sem Node 18+
├── DIARIO.md                       # ESTE ARQUIVO
├── tailwind.config.ts              # Config Tailwind (cores primary/gold)
├── next.config.ts                  # Config Next.js
└── package.json                    # Dependências
```

---

## COMO FUNCIONA

### Dashboard (page.tsx)
- Os valores de contribuição de cada pessoa estão **hardcoded** no array `CONTRIBUICOES`
- O rendimento CDI também está hardcoded na constante `RENDIMENTO_CDI`
- Para atualizar valores, edita-se diretamente esses dados
- NÃO busca dados do Supabase na página principal

### Contribuições por Mês (MonthlyBreakdown.tsx)
- Accordion expansível com todos os 12 meses do ano
- Janeiro marcado como "(opcional)"
- Cada mês mostra todos os participantes com valor ou "não contribuiu"
- Meses futuros mostram "sem contribuintes"
- Dados hardcoded no próprio componente (array MONTHS_DATA)

### Formulários (nova-entrada, nova-saida)
- Gravam no Supabase via client-side
- Mas o dashboard NÃO lê do Supabase - os valores são manuais

### Histórico
- Lê transações do Supabase
- Tem filtros por tipo (entrada/saída) e por pessoa

### Sugestões
- Formulário que salva no Supabase (tabela `suggestions`)
- Opcionalmente envia email via Resend para nathanramos2771@gmail.com

---

## DESIGN / VISUAL

- **Tema escuro** com fundo de foto de natureza/lago borrada (Unsplash)
- **Cores principais:** verde (primary) e dourado/amarelo (gold)
- **Card de saldo:** grande, centralizado, borda dourada com animação glow
- **Ranking:** grid responsivo com posições (1° dourado, 2° prata, 3° bronze)
- **Meses:** accordion com header azul, expandível com setinha ▼
- **Emojis como avatares:** cada participante tem um emoji fixo

---

## BANCO DE DADOS (Supabase)

### Tabela `transactions`
| Coluna     | Tipo                   | Descrição                |
|------------|------------------------|--------------------------|
| id         | UUID (PK)              | Auto-gerado              |
| type       | TEXT ('entrada'/'saida')| Tipo da transação        |
| person     | TEXT (nullable)        | Quem depositou           |
| description| TEXT (nullable)        | Descrição do gasto       |
| amount     | DECIMAL(10,2)          | Valor (sempre positivo)  |
| created_at | TIMESTAMPTZ            | Data/hora                |

### Tabela `suggestions`
| Coluna     | Tipo                   | Descrição                |
|------------|------------------------|--------------------------|
| id         | UUID (PK)              | Auto-gerado              |
| name       | TEXT                   | Quem sugeriu             |
| suggestion | TEXT                   | Texto da sugestão        |
| created_at | TIMESTAMPTZ            | Data/hora                |

---

## VARIÁVEIS DE AMBIENTE

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
RESEND_API_KEY=re_xxx (opcional)
```

---

## HISTÓRICO DE ALTERAÇÕES

### 31/03/2026 - Adição de contribuições por mês + atualização CDI
- **CDI atualizado:** R$ 11,53 → R$ 17,15
- **Novo componente `MonthlyBreakdown.tsx`:** accordion com contribuições mensais
  - Janeiro (opcional): Nathan 50, Eliane 50, Bernardo 50
  - Fevereiro: Marcelo 100, Nathan 60, Maria 51, Eliane/Bernardo/Carlos/Yandra/José 50
  - Março: Marcelo 100, Nathan 60, Eliane 52, Bernardo/Carlos/Yandra/José 50
  - Abril-Dezembro: sem contribuintes
- **LEONARDO adicionado** ao ranking (R$ 0,00)
- **DIARIO.md criado** para referência completa do projeto
- **preview.html criado** para visualizar sem Node 18+

---

## NOTAS IMPORTANTES

1. O dashboard usa dados HARDCODED - para atualizar valores, editar `app/page.tsx` e `components/MonthlyBreakdown.tsx`
2. Os formulários de entrada/saída gravam no Supabase, mas o dashboard não lê de lá
3. O email de notificação de sugestões vai para: nathanramos2771@gmail.com
4. A foto de fundo vem do Unsplash (URL externa no globals.css)
5. O Node.js local é v14 - precisa de Node 18+ para rodar `npm run dev`
6. O repositório GitHub é: nathanbrandao4/caixinha-do-sitio
