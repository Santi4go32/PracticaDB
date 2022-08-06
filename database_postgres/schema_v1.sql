-- Database: mande_db

-- DROP DATABASE mande_db;

CREATE DATABASE mande_db
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    TEMPLATE template0;

\c mande_db

CREATE TABLE pType(
	tyid SERIAL PRIMARY KEY,
	pType VARCHAR(60),
	breed VARCHAR(60),
	pdescription VARCHAR(60) DEFAULT ' '
);

CREATE TABLE pet(
    pid SERIAL PRIMARY KEY,
    pname VARCHAR(20),
    age VARCHAR(20),
    tyid INT,
    CONSTRAINT fk_id_type
        FOREIGN KEY (tyid)
        REFERENCES pType(tyid)
);

CREATE TABLE toy(
    tid SERIAL PRIMARY KEY,
    tname VARCHAR(60),
    color VARCHAR(60),
    pid INT,
    CONSTRAINT fk_id_pet
        FOREIGN KEY (pid)
        REFERENCES pet(pid)
);