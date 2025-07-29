--Crear tabla usuarios.
CREATE TABLE usuarios( 
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(50),
edad INT,
nota FLOAT CHECK (nota >= 0 AND nota <= 5),
ciudad VARCHAR(50),
isActive BOOLEAN);

--Mostrar todos los datos de la tabla usuarios.
SELECT * FROM usuarios;

--Mostrar solo los nombres y edades de todos los usuarios.
SELECT nombre, edad FROM usuarios;

--Listar los usuarios cuya edad esté entre 18 y 25 años.
SELECT nombre, edad FROM usuarios WHERE	edad>=18 AND edad<=25;
SELECT nombre, edad FROM usuarios WHERE edad BETWEEN 18 AND 25;

--Obtener todos los usuarios activos (isActive = true).
SELECT * FROM usuarios WHERE isActive = 1;

--Ordenar los usuarios por edad en orden descendente.
SELECT * FROM usuarios ORDER BY edad DESC;

--Obtener el promedio de las notas de todos los usuarios.
SELECT ROUND(AVG(nota),2) AS promedio_notas FROM usuarios;

--Contar cuántos usuarios hay registrados.
SELECT COUNT(*) AS numero_usuarios FROM usuarios;

--Encontrar el usuario con mayor edad.
SELECT nombre, edad FROM usuarios WHERE edad = (SELECT MAX(edad) FROM usuarios) LIMIT 1;
--Encontrar los usuarios con mayor edad.
SELECT nombre, edad FROM usuarios WHERE edad = (SELECT MAX(edad) FROM usuarios);

--Encontrar el usuario con mayor edad.
SELECT nombre, edad FROM usuarios WHERE edad = (SELECT MIN(edad) FROM usuarios) LIMIT 1;
--Encontrar lo usuarios con menor edad.
SELECT nombre, edad FROM usuarios WHERE edad = (SELECT MIN(edad) FROM usuarios);

--Mostrar los usuarios de la ciudad de 'Medellín'.
SELECT nombre, ciudad FROM usuarios WHERE ciudad = 'Medellín';

--Contar cuántos usuarios están activos (isActive = true).
SELECT COUNT(*) AS usuarios_activos FROM usuarios WHERE isActive = 1;

--Mostrar nombre, edad y nota de los usuarios que tengan una nota mayor o igual a 4.0 y sean activos.
SELECT nombre, edad, nota FROM usuarios WHERE nota >= 4 AND isActive = 1;