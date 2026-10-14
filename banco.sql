CREATE TABLE catalogojogos (
    id          SERIAL PRIMARY KEY,
    titulo      VARCHAR(255) NOT NULL,
    plataforma  VARCHAR(100) NOT NULL,
    genero      VARCHAR(100) NOT NULL,
    nota        DECIMAL(10,2) NOT NULL,
    zerado      BOOLEAN NOT NULL DEFAULT FALSE
);