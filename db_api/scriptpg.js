import express, { json } from 'express';
import pkg from 'pg';
import cors from 'cors';

const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(json());

// Configuración de PostgreSQL con datos reales
const db = new Pool({
  host: 'aws-0-us-east-2.pooler.supabase.com',
  user: 'postgres.xxyfefgdhrhjauupehfm',
  password: 'Cpfire8282', // remplaza con tu contraseña de Supabase
  database: 'postgres',
  port: 6543,
  ssl: { rejectUnauthorized: false } // Supabase requiere SSL
});

// Obtener todos los usuarios
app.get('/empleados', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM empleados');
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Contar usuarios
app.get('/count', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT COUNT(*) AS numUsers FROM usuarios');
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Agregar usuario
app.post('/empleados', async (req, res) => {
  const { nombre, apellido, departamento, edad, salario, fecha_ingreso } = req.body;
  try {
    await db.query('INSERT INTO public.empleados (nombre, apellido, departamento, edad, salario, fecha_ingreso) VALUES ($1, $2, $3, $4, $5 , $6)', [nombre, apellido, departamento, edad, salario, fecha_ingreso]);
    res.json({ message: 'Empleado agregado' });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Actualizar usuario
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;
  try {
    const result = await db.query(
      'UPDATE usuarios SET nombre = $1, email = $2 WHERE id = $3',
      [nombre, email, id]
    );
    if (result.rowCount === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ message: 'Usuario actualizado' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Eliminar usuario
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query('DELETE FROM usuarios WHERE id = $1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));