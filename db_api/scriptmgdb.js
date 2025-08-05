import mongoose from 'mongoose';
import express, { json } from 'express';
import cors from 'cors';
import { Product  } from './store';

const app = express();
app.use(cors());
app.use(json());

const dbConnection = async () => {
  try {
    const mongodbAtlas = "mongodb+srv://suarezalejo26:KMywB7Ts4xPOLdGT@cluster26.io7gtc6.mongodb.net/store?retryWrites=true&w=majority"
    await mongoose.connect(mongodbAtlas);
  } catch (error) {
    throw new Error("Error en la base de datos")
  }
}

app.get('/store', async (res) => {
  try {
    await dbConnection();
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));