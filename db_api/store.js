import { Schema, model } from "mongoose";

const productSchema = new Schema({
  price: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  }
});

let Product;
try {
  Product = model("products");
} catch {
  Product = model("products", productSchema);
}

export { Product };