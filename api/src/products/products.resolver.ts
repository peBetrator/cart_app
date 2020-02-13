import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductType } from './dto/add-product.dto';
import { ProductInput } from './inputs/product.input';
import { ProductsService } from './products.service';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductsService) {}

  @Query(() => String)
  async hello() {
    return 'hello';
  }

  @Query(() => [ProductType])
  async products() {
    return this.productService.findAll();
  }

  @Mutation(() => ProductType)
  async addProduct(@Args('input') input: ProductInput) {
    return this.productService.add(input);
  }
}
