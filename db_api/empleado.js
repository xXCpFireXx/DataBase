
import { Schema, model } from "mongoose";

const empleadoSchema = new Schema({
  nombre: String,
  apellido: String,
  departamento: String,
  edad: Number,
  salario: Number,
  fecha_ingreso: Date
});

let empleado;
try {
  empleado = model("empleados");
} catch {
  empleado = model("empleados", empleadoSchema);
}

export { empleado };
