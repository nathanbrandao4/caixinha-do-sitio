# Caixinha do Sítio

Sistema de gerenciamento de caixinha coletiva para férias em família.

## Funcionalidades

- Dashboard com saldo total e progresso até a meta
- Registro de entradas (depósitos por participante)
- Registro de saídas (gastos)
- Histórico completo com filtros
- Ranking de contribuintes
- Caixa de sugestões para atividades

## Participantes

MARCELO, ELIANE, BERNADO, CARLOS, YANDRA, NATHAN, MARIA, LEONARDO, JOSÉ

**Meta:** R$ 4.500 até Dezembro/2026

---

## Configuração

### 1. Criar projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta gratuita
2. Clique em **"New Project"**
3. Escolha um nome (ex: `caixinha-do-sitio`)
4. Defina uma senha para o banco de dados
5. Aguarde o projeto ser criado (~2 minutos)

### 2. Criar as tabelas

1. No Supabase, vá em **SQL Editor** (menu lateral)
2. Clique em **"New Query"**
3. Copie todo o conteúdo do arquivo `supabase-setup.sql`
4. Cole no editor e clique em **"Run"**
5. Você deve ver "Success" para todos os comandos

### 3. Obter as credenciais

1. No Supabase, vá em **Settings > API**
2. Copie:
   - **Project URL** (ex: `https://xyz.supabase.co`)
   - **anon public key** (começa com `eyJ...`)

### 4. Configurar o projeto local

1. Copie o arquivo `.env.local.example` para `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edite `.env.local` e adicione suas credenciais:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://sua-url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-aqui
   ```

### 5. Rodar localmente

```bash
npm install
npm run dev
```

Acesse: http://localhost:3000

---

## Deploy no Vercel

### 1. Subir para o GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/seu-usuario/caixinha-do-sitio.git
git push -u origin main
```

### 2. Deploy no Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login com GitHub
2. Clique em **"Add New Project"**
3. Importe o repositório `caixinha-do-sitio`
4. Em **Environment Variables**, adicione:
   - `NEXT_PUBLIC_SUPABASE_URL` = sua URL do Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = sua chave do Supabase
   - `RESEND_API_KEY` = sua chave do Resend (opcional, para emails)
5. Clique em **Deploy**

---

## Envio de Emails (Opcional)

Para receber sugestões por email:

1. Acesse [resend.com](https://resend.com) e crie uma conta
2. Vá em **API Keys** e crie uma nova chave
3. Adicione `RESEND_API_KEY` nas variáveis de ambiente
4. Com a conta gratuita, você pode enviar de `onboarding@resend.dev`

---

## Tecnologias

- **Next.js 16** - Framework React
- **Tailwind CSS** - Estilização
- **Supabase** - Banco de dados PostgreSQL
- **TypeScript** - Tipagem estática
- **Resend** - Envio de emails (opcional)

---

## Estrutura do Projeto

```
caixinha-do-sitio/
├── app/
│   ├── page.tsx              # Dashboard principal
│   ├── nova-entrada/         # Formulário de entrada
│   ├── nova-saida/           # Formulário de saída
│   ├── historico/            # Lista de transações
│   └── api/enviar-sugestao/  # API de sugestões
├── components/               # Componentes React
├── lib/supabase.ts          # Cliente Supabase
├── types/                    # Tipos TypeScript
└── supabase-setup.sql       # Script do banco de dados
```
