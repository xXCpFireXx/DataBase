// Archivo: server.js
// Importamos los módulos necesarios
import 'dotenv/config';
import express, { json } from 'express';
import pkg from 'pg';
import cors from 'cors';

// Extraemos el constructor Pool del paquete pg
const { Pool } = pkg;

// Creamos la aplicación de Express
const app = express();

// Middlewares
app.use(cors()); // Habilita CORS para permitir peticiones desde el frontend
app.use(json()); // Permite al servidor entender peticiones con cuerpo en formato JSON

// Configuración de la conexión a la base de datos PostgreSQL (Supabase)
// Asegúrate de que estos datos son correctos.
const db = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  ssl: { rejectUnauthorized: false }
});

// --- Endpoints del CRUD para la tabla 'products' ---

// READ: Obtener todos los productos
app.get('/products', async (req, res) => {
  try {
    // Consultamos todos los registros de la tabla 'products'
    const { rows } = await db.query('SELECT * FROM public.products ORDER BY product ASC');
    res.json(rows); // Enviamos los resultados como JSON
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error al obtener los productos', details: err.message });
  }
});

// CREATE: Agregar un nuevo producto
app.post('/products', async (req, res) => {
  // Extraemos los datos del cuerpo de la petición
  const { product, price, amount, is_active } = req.body;

  // Validación simple de datos
  if (!product || !price || amount === undefined || is_active === undefined) {
    return res.status(400).json({ error: 'Faltan campos requeridos.' });
  }

  try {
    // Creamos la consulta SQL para insertar el nuevo producto
    const queryText = 'INSERT INTO public.products (product, price, amount, is_active) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [product, price, amount, String(is_active)]; // Convertimos is_active a string

    // Ejecutamos la consulta
    const { rows } = await db.query(queryText, values);

    // Respondemos con el producto recién creado
    res.status(201).json({ message: 'Producto agregado exitosamente', product: rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error al agregar el producto', details: err.message });
  }
});

// UPDATE: Actualizar un producto existente por su ID
app.put('/products/:id', async (req, res) => {
  const { id } = req.params; // Obtenemos el ID del producto de la URL
  const { product, price, amount, is_active } = req.body; // Obtenemos los nuevos datos

  if (!product || !price || amount === undefined || is_active === undefined) {
    return res.status(400).json({ error: 'Faltan campos requeridos.' });
  }

  try {
    const queryText = `
      UPDATE public.products 
      SET product = $1, price = $2, amount = $3, is_active = $4 
      WHERE id = $5 
      RETURNING *`;
    const values = [product, price, amount, String(is_active), id];

    const result = await db.query(queryText, values);

    // Si no se actualizó ninguna fila, el producto no existe
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto actualizado exitosamente', product: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error al actualizar el producto', details: err.message });
  }
});

// DELETE: Eliminar un producto por su ID
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params; // Obtenemos el ID de la URL

  try {
    const queryText = 'DELETE FROM public.products WHERE id = $1';
    const result = await db.query(queryText, [id]);

    // Si no se eliminó ninguna fila, el producto no existe
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error al eliminar el producto', details: err.message });
  }
});


// Ponemos el servidor a escuchar en el puerto 3001
const PORT = 3001;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
