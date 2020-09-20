import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryInput } from './inputs/category.input';
import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async createCategory(category: CategoryInput): Promise<Category> {
    const createdCategory = new this.categoryModel(category);
    return createdCategory.save();
  }
}
