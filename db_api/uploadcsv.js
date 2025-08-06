import fs from 'fs';
import csv from 'csv-parser';
import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'local_practica'
});

connection.connect((error) => {
    if (error) throw error;
    console.log('Conectado exitosamente a la db');
})

fs.createReadStream('products.csv')
    .pipe(csv())
    .on('data', (row) => {
        connection.query(
            'INSERT INTO products (product, price, amount, isActive) VALUES (?, ?, ?, ?)',
            [row.product, row.price, row.amount, row.isActive],
            (err) => {
                if (err) {
                console.error('Error al insertar el producto:', err);
                } else {
                console.log('Producto insertado correctamente');
                }
            }
            );
        console.log(row);
        console.log('--');
    })
    .on('end', () => {
        console.log('CSV único procesado.');
        connection.end();
    });