-- Primeiro, atualiza todos os registros existentes com o status 'CONFIRMED' para 'VERIFIED'.
-- Isso é crucial para evitar erros ao adicionar a nova restrição.
UPDATE tb_users
SET status = 'VERIFIED'
WHERE status = 'CONFIRMED';

---

-- Em seguida, remove a restrição de verificação (CHECK) antiga.
-- Você pode precisar ajustar o nome da restrição dependendo de como foi gerada.
ALTER TABLE tb_users
DROP CONSTRAINT tb_users_status_check;

---

-- Por fim, adiciona a nova restrição de verificação (CHECK) com os valores atualizados.
ALTER TABLE tb_users
ADD CONSTRAINT tb_users_status_check
CHECK (status IN ('PENDING', 'VERIFIED'));