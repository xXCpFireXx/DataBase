import express, { json } from 'express';
import { createConnection } from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());

const db = createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // cambia si usas otra
  database: 'practica_db'
});

// GET: Obtener usuarios
app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.get('/employes', (req, res) => {
  db.query('SELECT * FROM empleados', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// POST: Agregar usuario
app.post('/usuarios', (req, res) => {
  const { nombre, email } = req.body;
  db.query('INSERT INTO usuarios (nombre, email) VALUES (?, ?)', [nombre, email], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Usuario agregado' });
  });
});

// PUT: Actualizar usuario
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;
  db.query('UPDATE usuarios SET nombre = ?, email = ? WHERE id_usuarios = ?', [nombre, email, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Usuario actualizado' });
  });
});

// DELETE: Eliminar usuario
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM usuarios WHERE id_usuarios = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Usuario eliminado' });
  });
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
