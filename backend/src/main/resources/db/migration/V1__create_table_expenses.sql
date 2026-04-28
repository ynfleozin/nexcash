CREATE TABLE tb_expenses (
    id UUID PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    date TIMESTAMP NOT NULL,
    status VARCHAR(20) NOT NULL
);