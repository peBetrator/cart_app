import * as mongoose from 'mongoose';
import { ProductSchema } from '../products/products.schema';

export const CategorySchema = new mongoose.Schema({
  title: String,
  products: [ProductSchema], //TODO: make it not-nullable
});
