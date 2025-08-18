CREATE TABLE tb_events (
    event_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    city VARCHAR(100) NOT NULL,
    address VARCHAR(100) NOT NULL,
    version INTEGER NOT NULL UNIQUE,
    address_number INTEGER NOT NULL,
    ticket_price DECIMAL NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL
);

CREATE TABLE tb_tickets (
    ticket_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    qrcode VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    status VARCHAR(100) NOT NULL,
    user_id UUID NOT NULL,
    event_id UUID NOT NULL,
    CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES tb_events(event_id) ON DELETE CASCADE,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES tb_users(user_id) ON DELETE CASCADE
);

CREATE TABLE tb_sponsorships (
    sponsorship_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_link VARCHAR(100) NOT NULL,
    logo_link VARCHAR(100) NOT NULL,
    sponsorship_value VARCHAR(100) NOT NULL,
    type VARCHAR(100) NOT NULL,
    cnpj VARCHAR(100) NOT NULL,
    user_id UUID NOT NULL,
    event_id UUID NOT NULL,
    CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES tb_events(event_id) ON DELETE CASCADE,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES tb_users(user_id) ON DELETE CASCADE
);




