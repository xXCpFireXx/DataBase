import fs from 'fs';
import csv from 'csv-parser';
import pkg from 'pg';

const { Pool } = pkg;

// Configuración de PostgreSQL
const connection = new Pool({
  host: 'aws-0-us-east-2.pooler.supabase.com',
  user: 'postgres.xxyfefgdhrhjauupehfm',
  password: 'Cpfire8282', // remplaza con tu contraseña real
  database: 'postgres',
  port: 6543,
  ssl: { rejectUnauthorized: false }
});

const inserts = []; // Aquí acumularemos las promesas

fs.createReadStream('products.csv')
  .pipe(csv())
  .on('data', (row) => {
    const query = connection.query(
      'INSERT INTO public.products (product, price, amount, is_active) VALUES ($1, $2, $3, $4)',
      [row.product, row.price, row.amount, row.isActive]
    );
    inserts.push(query); // Guardamos la promesa
  })
  .on('end', async () => {
    try {
      await Promise.all(inserts); // Esperamos a que todos los inserts terminen
      console.log(`Se insertaron ${inserts.length} registros correctamente.`);
    } catch (err) {
      console.error('Error durante la inserción:', err);
    } finally {
      await connection.end(); // Cerramos la conexión cuando todo termine
      console.log('Conexión cerrada.');
    }
  });
