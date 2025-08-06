import fs from 'fs';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import { empleado } from './empleado.js';


const connection = async () => {
  try {
    await mongoose.connect(mongodbAtlas);
  } catch (error) {
    throw new Error("Error en la base de datos")
  }
}

const empleados = [];

fs.createReadStream('empleados.csv')
  .pipe(csv())
  .on('data', (row) => {
    empleados.push({
      nombre: row.nombre,
      apellido: row.apellido,
      departamento: row.departamento,
      edad: parseInt(row.edad, 10),
      salario: parseFloat(row.salario),
      fecha_ingreso: new Date(row.fecha_ingreso)
    });
  })
  .on('end', async () => {
    await connection();

    try {
      const result = await empleado.insertMany(empleados);
      console.log(`${result.length} empleados insertados correctamente.`);
    } catch (err) {
      console.error('Error al insertar empleados:', err);
    } finally {
      mongoose.connection.close();
    }
  });