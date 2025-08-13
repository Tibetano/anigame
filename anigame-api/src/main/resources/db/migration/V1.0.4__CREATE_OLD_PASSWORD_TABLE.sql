CREATE TABLE tb_old_user_password (
    password_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    password VARCHAR(100) NOT NULL,
    replaced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID NOT NULL,
    FOREIGN KEY (user_id) REFERENCES tb_users(user_id) ON DELETE CASCADE
);

ALTER TABLE tb_users
ADD COLUMN new_password_token UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
ADD COLUMN new_password_token_expiration_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW() + INTERVAL '24 hours';