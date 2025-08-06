import fs from 'fs';
import csv from 'csv-parser';
import pkg from 'pg';

const { Pool } = pkg;

// Configuración de PostgreSQL con datos reales
const connection = new Pool({
  host: 'aws-0-us-east-2.pooler.supabase.com',
  user: 'postgres.xxyfefgdhrhjauupehfm',
  password: '', // remplaza con tu contraseña de Supabase
  database: 'postgres',
  port: 6543,
  ssl: { rejectUnauthorized: false } // Supabase requiere SSL
});

fs.createReadStream('products.csv')
    .pipe(csv())
    .on('data', (row) => {
        connection.query('INSERT INTO public.products (product, price, amount, is_active) VALUES ($1, $2, $3, $4)', [row.product, row.price, row.amount, row.isActive], (err) => {
            if (err) {
                console.error('Error al insertar el registro:', err);
            } else {
                console.log('Registro insertado correctamente');
            }
        });
    })
    .on('end', () => {
        console.log('CSV único procesado.');
        connection.end();
    });