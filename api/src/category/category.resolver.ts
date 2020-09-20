import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CategoryType } from './dto/category.dto';
import { CategoryInput } from './inputs/category.input';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [CategoryType])
  async categories() {
    return this.categoryService.findAll();
  }

  @Mutation(() => CategoryType)
  async createCategory(@Args('input') input: CategoryInput) {
    return this.categoryService.createCategory(input);
  }
}
