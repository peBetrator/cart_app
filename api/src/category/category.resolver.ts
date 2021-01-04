import {
  Args,
  Mutation,
  Parent,
  Query,
  Resolver,
  ResolveProperty,
} from '@nestjs/graphql';
import { ProductType } from 'src/products/dto/product.dto';
import { ProductsService } from '../products/products.service';
import { CategoryService } from './category.service';
import { CategoryType } from './dto/category.dto';
import { CategoryInput } from './inputs/category.input';
import * as mongoose from 'mongoose';

@Resolver(of => CategoryType)
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly productService: ProductsService,
  ) {}

  @Query(() => [CategoryType])
  async categories() {
    return this.categoryService.findAll();
  }

  @Query(() => CategoryType)
  async category(@Args('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Mutation(() => CategoryType)
  async createCategory(@Args('input') input: CategoryInput) {
    return this.categoryService.createCategory(input);
  }

  @Mutation(() => ProductType)
  async deleteCategory(@Args('id') id: string): Promise<CategoryInput> {
    return this.categoryService.deleteCategory(id);
  }

  @ResolveProperty(() => [ProductType])
  async products(@Parent() category: CategoryType) {
    const { title } = category;

    return this.productService.findByCategory(title);
  }
}
