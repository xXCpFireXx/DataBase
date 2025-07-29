#  Taller de MySQL: Consultas con condiciones

##  Objetivo
Practicar consultas `SELECT` con distintas cláusulas: `WHERE`, `ORDER BY`, `GROUP BY`, funciones agregadas (`AVG`, `COUNT`, `MAX`, `MIN`) y condiciones booleanas.

---

##  Estructura de la Tabla

**Nombre de la tabla:** `usuarios`

| Campo    | Tipo        | Descripción                      |
|----------|-------------|----------------------------------|
| id       | INT         | Identificador único (PK)         |
| nombre   | VARCHAR(50) | Nombre del usuario               |
| edad     | INT         | Edad del usuario                 |
| nota     | FLOAT       | Calificación del usuario (0-5)   |
| ciudad   | VARCHAR(50) | Ciudad de residencia             |
| isActive | BOOLEAN     | Si el usuario está activo        |

---

##  Ejercicios

1. Mostrar todos los datos de la tabla `usuarios`.
2. Mostrar solo los nombres y edades de todos los usuarios.
3. Listar los usuarios cuya edad esté entre 18 y 25 años.
4. Obtener todos los usuarios activos (`isActive = true`).
5. Ordenar los usuarios por edad en orden descendente.
6. Obtener el promedio de las notas de todos los usuarios.
7. Contar cuántos usuarios hay registrados.
8. Encontrar el usuario con mayor edad.
9. Encontrar el usuario con menor edad.
10. Mostrar los usuarios de la ciudad de 'Medellín'.
11. Contar cuántos usuarios están activos (`isActive = true`).
12. Mostrar nombre, edad y nota de los usuarios que tengan una nota mayor o igual a 4.0 y sean activos.

---




