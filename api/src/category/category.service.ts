import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async findOne(id: string): Promise<Category> {
    return this.categoryModel.findById(id);
  }

  async createCategory(category: CategoryInput): Promise<Category> {
    const data = await this.categoryModel
      .find({ title: category.title })
      .exec();

    if (data.length) {
      throw new HttpException(
        `Category with name: "${category.title}" already exists.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const createdCategory = new this.categoryModel(category);
    return createdCategory.save();
  }

  async deleteCategory(id: string): Promise<Category> {
    return this.categoryModel.findByIdAndRemove(id);
  }
}
