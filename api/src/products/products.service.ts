import { ProductInput } from './inputs/product.input';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async add(addProductDto: ProductInput): Promise<Product> {
    const addedProduct = new this.productModel(addProductDto);
    return addedProduct.save();
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }
}
