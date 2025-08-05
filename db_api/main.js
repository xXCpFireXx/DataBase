import mongoose from 'mongoose';

const dbConnection = async () => {
  try {
    const mongodbAtlas = ""
    await mongoose.connect(mongodbAtlas);
  } catch (error) {
    throw new Error("Error en la base de datos")
  }
}
