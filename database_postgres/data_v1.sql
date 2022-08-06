\c mande_db

INSERT INTO  pType(pType, breed) VALUES ('Gato', 'Siamés');
INSERT INTO  pType(pType, breed) VALUES ('Perro', 'Golden Retriever');
INSERT INTO  pet(pname,age,tyid) VALUES ('Arceus', 5, (SELECT MAX(tyid) FROM pType));
INSERT INTO  toy(tname,color,pid) VALUES ('bola8','rojo',(SELECT MAX(pid) FROM pet));