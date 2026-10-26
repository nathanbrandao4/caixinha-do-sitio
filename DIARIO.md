# DIÁRIO DO ETO - Caixinha do Sítio

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
| MARCELO   | 900,00                 |
| NATHAN    | 590,00                 |
| ELIANE    | 304,00                 |
| BERNARDO  | 450,00                 |
| JOSÉ      | 250,00                 |
| CARLOS    | 450,00                 |
| YANDRA    | 450,00                 |
| MARIA     | 202,00                 |

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
| MARCELO   | R$ 100  |
| NATHAN    | R$ 60   |
| ELIANE    | R$ 52   |
| MARIA     | R$ 51   |
| BERNARDO  | R$ 50   |
| CARLOS    | R$ 50   |
| YANDRA    | R$ 50   |
| JOSÉ      | R$ 50   |

### Maio
| Nome      | Valor   |
|-----------|---------|
| MARCELO   | R$ 100  |
| NATHAN    | R$ 60   |
| ELIANE    | R$ 50   |
| BERNARDO  | R$ 50   |
| CARLOS    | R$ 50   |
| YANDRA    | R$ 50   |
| JOSÉ      | R$ 50   |
| MARIA     | R$ 50   |

### Junho
| Nome      | Valor   |
|-----------|---------|
| MARCELO   | R$ 100  |
| NATHAN    | R$ 60   |
| BERNARDO  | R$ 50   |
| CARLOS    | R$ 50   |
| YANDRA    | R$ 50   |
| ELIANE    | R$ 50   |
| MARIA     | R$ 50   |
| JOSÉ      | R$ 50   |

### Julho
| Nome      | Valor   |
|-----------|---------|
| MARCELO   | R$ 100  |
| NATHAN    | R$ 60   |
| BERNARDO  | R$ 50   |
| YANDRA    | R$ 50   |
| CARLOS    | R$ 50   |
| Demais    | não contribuíram |

### Agosto
| Nome      | Valor   |
|-----------|---------|
| MARCELO   | R$ 100  |
| BERNARDO  | R$ 100  |
| NATHAN    | R$ 60   |
| CARLOS    | R$ 50   |
| YANDRA    | R$ 50   |
| ELIANE / JOSÉ / MARIA | não contribuíram (pendência) |

### Setembro
| Nome      | Valor   |
|-----------|---------|
| MARCELO   | R$ 100  |
| NATHAN    | R$ 60   |
| CARLOS    | R$ 50   |
| YANDRA    | R$ 50   |
| ELIANE / BERNARDO / JOSÉ / MARIA | não contribuíram (pendência) |

### Outubro
| Nome      | Valor   |
|-----------|---------|
| MARCELO   | R$ 100  |
| NATHAN    | R$ 60   |
| CARLOS    | R$ 50   |
| YANDRA    | R$ 50   |
| Demais    | não contribuíram (ainda) |

### Novembro e Dezembro
Sem contribuições ainda.

---

## NÚMEROS ATUAIS (26/10/2026)

- **Total contribuições:** R$ 3.596,00
- **Rendimento CDI:** R$ 202,73
- **Saldo total:** R$ 3.798,73
- **Meta:** R$ 5.000,00
- **Progresso:** 76,0%
- **Falta:** R$ 1.201,27
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
│   ├── Header.tsx                  # Cabeçalho "Caixinha do Sítio" + chave PIX (copiar)
│   ├── BalanceCard.tsx             # Card grande com saldo, barra de progresso, meta
│   ├── ContributorsList.tsx        # Ranking de contribuintes com posições
│   ├── MonthlyBreakdown.tsx        # Accordion por mês + alerta de pendências + botão pagar PIX
│   ├── PendingWarningModal.tsx     # Modal grande ao abrir o site avisando quem tem pendência
│   ├── PixKey.tsx                  # Chave PIX com botão de copiar (reutilizável)
│   ├── SuggestionBox.tsx           # Formulário de sugestões para férias
│   └── TransactionList.tsx         # Lista de transações (entradas/saídas)
├── lib/
│   ├── pendencias.ts               # DADOS DOS MESES (MONTHS_DATA) + cálculo de pendências —
│   │                                 fonte única usada pelo MonthlyBreakdown e pelo modal
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
- Dados hardcoded em `lib/pendencias.ts` (array `MONTHS_DATA`) — NÃO mais dentro do componente
- Tem `id="pendencias"` na div raiz (âncora pra onde o modal de aviso rola a página)
- Dentro do bloco de pendências tem o botão "💰 Pagar pendência via PIX", que revela a chave PIX

### Alerta de pendências (PendingWarningModal.tsx)
- Modal grande e chamativo que aparece assim que a página carrega, se houver alguém pendente
- Lista os nomes de quem está pendente (calculado automaticamente, nunca hardcoded)
- Dois botões: "Ver minhas pendências" (fecha o modal e rola até `#pendencias`) e
  "Não tenho pendências" (fecha o modal e volta ao topo)
- Se não houver ninguém pendente, o modal simplesmente não aparece

### Chave PIX (PixKey.tsx)
- Componente reutilizável: mostra a chave PIX com botão de copiar (`navigator.clipboard`)
- Usado no `Header.tsx` (logo abaixo do título, visível em todas as páginas) e dentro do
  bloco de pendências do `MonthlyBreakdown.tsx`
- Chave PIX atual: `59.778.669/0001-51` (editar `PIX_KEY` em `components/PixKey.tsx` se mudar)

### lib/pendencias.ts — fonte única dos dados de mês
- Antes, `MonthlyBreakdown.tsx` tinha os dados dos meses hardcoded direto no componente, e em
  algum momento o `DIARIO.md` ficou com uma cópia manual desses dados que saiu de sincronia com
  o código (bug encontrado em 24/10/2026 — Abril e Maio apareciam errados no DIARIO)
- Pra isso não se repetir, os dados agora moram só em `lib/pendencias.ts` (`MONTHS_DATA`,
  `VALOR_PADRAO`) e tanto o `MonthlyBreakdown.tsx` quanto o `PendingWarningModal.tsx` importam
  de lá — qualquer mudança de mês já aparece certa nos dois lugares automaticamente

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

### 26/10/2026 (3) - Alerta de pendências, pagamento via PIX e refatoração dos dados
- **Novo modal de aviso** (`PendingWarningModal.tsx`): aparece bem grande e chamativo assim
  que o site carrega, se houver alguém pendente. Diz os nomes de quem está pendente e o total
  em atraso, com botões "Ver minhas pendências" (rola até a seção) e "Não tenho pendências"
  (volta ao topo)
- **Chave PIX com botão de copiar** (`PixKey.tsx`): adicionada no topo do site, logo abaixo
  do título (`Header.tsx`), e também dentro da seção de pendências via o novo botão
  "💰 Pagar pendência via PIX". Chave: `59.778.669/0001-51`
- **Refatoração:** os dados dos meses (`MONTHS_DATA`) saíram de dentro de `MonthlyBreakdown.tsx`
  e foram para `lib/pendencias.ts`, que agora é a fonte única usada tanto pelo accordion de
  meses quanto pelo modal de aviso — evita a dessincronia de dados que corrigimos há 2 dias
- Nenhum valor de contribuição mudou nessa atualização, só funcionalidade nova

### 26/10/2026 (2) - Carlos e Yandra em Outubro
- **Outubro:** Carlos +R$50 e Yandra +R$50
- Totais atualizados: Carlos 450, Yandra 450
- Saldo total: R$ 3.798,73 (76,0% da meta)

### 26/10/2026 - CDI atualizado
- **CDI atualizado:** R$ 193,61 → R$ 202,73
- Saldo total: R$ 3.698,73 (74,0% da meta)

### 24/10/2026 (2) - CDI atualizado
- **CDI atualizado:** R$ 180,85 → R$ 193,61
- Saldo total: R$ 3.689,61 (73,8% da meta)

### 24/10/2026 - Marcelo em Outubro + correção de dados antigos no DIARIO
- **Outubro:** Marcelo +R$100
- Total atualizado: Marcelo 900
- Saldo total: R$ 3.676,85 (73,5% da meta)
- **Correção de documentação:** as tabelas de Abril e Maio neste arquivo estavam desatualizadas em relação ao código (`MonthlyBreakdown.tsx`) — diziam que Bernardo (Abril) e Eliane/Bernardo/José/Maria (Maio) estavam pendentes, mas o código já tinha todo mundo pago nesses dois meses. Corrigido para refletir o código, que é a fonte real do que aparece no site.

### 07/10/2026 - Nathan em Outubro + pendências de Setembro + CDI atualizado
- **Outubro:** Nathan +R$60 (primeira contribuição do mês)
- **CDI atualizado:** R$ 150,53 → R$ 180,85
- Total atualizado: Nathan 590
- Pendências de Setembro (automático): ELIANE, BERNARDO, JOSÉ e MARIA
- Saldo total: R$ 3.576,85 (71,5% da meta)

### 14/09/2026 - Marcelo em Setembro
- **Setembro:** Marcelo +R$100
- Total atualizado: Marcelo 800
- Saldo total: R$ 3.486,53 (69,7% da meta)

### 13/09/2026 - Yandra e Carlos em Setembro + CDI atualizado
- **Setembro:** Yandra +R$50 e Carlos +R$50
- **CDI atualizado:** R$ 124,94 → R$ 150,53
- Totais atualizados: Carlos 400, Yandra 400
- Saldo total: R$ 3.386,53 (67,7% da meta)

### 01/09/2026 - Carlos e Yandra quitam Agosto + Nathan em Setembro + CDI
- **Agosto:** Carlos +R$50 e Yandra +R$50 (saíram da lista de pendências de Agosto)
- **Setembro:** Nathan +R$60 (primeira contribuição do mês)
- **CDI atualizado:** R$ 119,07 → R$ 124,94
- Totais atualizados: Nathan 530, Carlos 350, Yandra 350
- Pendências de Agosto (automático): agora só ELIANE, JOSÉ e MARIA
- Saldo total: R$ 3.260,94 (65,2% da meta)

### 07/08/2026 (2) - Marcelo em Agosto + CDI atualizado
- **Agosto:** Marcelo +R$100
- **CDI atualizado:** R$ 110,04 → R$ 119,07
- Total atualizado: Marcelo 700
- Saldo total: R$ 3.095,07 (61,9% da meta)

### 07/08/2026 - Bernardo em Agosto + CDI atualizado
- **Agosto:** Bernardo +R$100
- **CDI atualizado:** R$ 107,03 → R$ 110,04
- Total atualizado: Bernardo 450
- Saldo total: R$ 2.986,04 (59,7% da meta)

### 02/08/2026 (2) - Yandra e Carlos quitam pendência de Julho + Nathan em Agosto + CDI
- **Julho:** Yandra +R$50 e Carlos +R$50 (pendências removidas da lista vermelha)
- **Agosto:** Nathan +R$60 (primeira contribuição do mês)
- **CDI atualizado:** R$ 104,16 → R$ 107,03
- Totais atualizados: Nathan 470, Carlos 300, Yandra 300
- Saldo total: R$ 2.883,03 (57,7% da meta)

### 02/08/2026 - CDI atualizado + Julho virou mês em atraso
- **CDI atualizado:** R$ 101,29 → R$ 104,16
- Saldo total: R$ 2.720,16 (54,4% da meta)
- Mês virou para Agosto: quem não contribuiu em Julho (ELIANE, CARLOS, YANDRA, MARIA, JOSÉ) passou a aparecer automaticamente na lista de pendências em vermelho (essa lógica já existia em `MonthlyBreakdown.tsx`, não precisou de mudança de código)

### 30/07/2026 - CDI atualizado
- **CDI atualizado:** R$ 89,92 → R$ 101,29
- Saldo total: R$ 2.717,29 (54,3% da meta)

### 20/07/2026 - Marcelo e Bernardo +contribuição em Julho
- **Julho:** Marcelo +R$100, Bernardo +R$50 (além do Nathan +R$60 já registrado)
- Totais atualizados: Marcelo 600, Bernardo 350 (demais inalterados)
- Saldo total: R$ 2.705,92 (54,1% da meta)

### 02/06/2026 - Atualização Abril/Maio + remoção de Leonardo + CDI atualizado
- **CDI atualizado:** R$ 17,15 → R$ 42,47
- **LEONARDO removido** do ranking
- **Abril adicionado:** Marcelo 100, Nathan 60, Eliane 52, Maria 51, Carlos/Yandra/José 50
- **Maio adicionado:** Marcelo 100, Nathan 60, Carlos/Yandra 50
- Totais atualizados: Marcelo 400, Nathan 290, Eliane 204, Carlos/Yandra 200, Bernardo/José 150, Maria 102

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

1. O dashboard usa dados HARDCODED - para atualizar valores, editar `app/page.tsx` (totais e CDI) e `lib/pendencias.ts` (dados por mês, em `MONTHS_DATA`)
2. Os formulários de entrada/saída gravam no Supabase, mas o dashboard não lê de lá
3. O email de notificação de sugestões vai para: nathanramos2771@gmail.com
4. A foto de fundo vem do Unsplash (URL externa no globals.css)
5. O Node.js local é v14 - precisa de Node 18+ para rodar `npm run dev`
6. O repositório GitHub é: nathanbrandao4/caixinha-do-sitio
