-- =============================================
-- CAIXINHA DO SÍTIO - Script de Configuração
-- Execute este script no SQL Editor do Supabase
-- =============================================

-- Tabela de transações (entradas e saídas)
CREATE TABLE IF NOT EXISTS transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type TEXT NOT NULL CHECK (type IN ('entrada', 'saida')),
    person TEXT,
    description TEXT,
    amount DECIMAL(10, 2) NOT NULL CHECK (amount > 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);
CREATE INDEX IF NOT EXISTS idx_transactions_person ON transactions(person);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Apenas leitura pública (site somente visualização)
CREATE POLICY "Permitir leitura pública de transações"
    ON transactions FOR SELECT
    USING (true);

-- =============================================
-- DADOS INICIAIS
-- =============================================

INSERT INTO transactions (type, person, amount, created_at)
VALUES
    ('entrada', 'NATHAN', 50.00, NOW()),
    ('entrada', 'ELIANE', 50.00, NOW());
