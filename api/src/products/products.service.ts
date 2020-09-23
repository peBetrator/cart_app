import { ProductInput } from './inputs/product.input';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Product } from './interfaces/product.interface';
import { ProductType } from './dto/product.dto';
import { AllowedCategories } from 'src/category/enums/category.enum';

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

  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id);
  }

  async findByCategory(id: AllowedCategories): Promise<Product[]> {
    return this.productModel
      .find()
      .where('category')
      .eq(id)
      .exec();
  }

  async delete(id: string): Promise<Product> {
    return await this.productModel.findByIdAndRemove(id);
  }

  async update(id: string, product: Product): Promise<Product> {
    return await this.productModel.findByIdAndUpdate(id, product, {
      new: true,
    });
  }
}
