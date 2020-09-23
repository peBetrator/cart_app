import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductType } from './dto/product.dto';
import { ProductInput } from './inputs/product.input';
import { ProductsService } from './products.service';

@Resolver(of => ProductType)
export class ProductResolver {
  constructor(private readonly productService: ProductsService) {}

  @Query(() => [ProductType])
  async products() {
    return this.productService.findAll();
  }

  @Query(() => ProductType)
  async product(@Args('id') id: string) {
    return this.productService.findOne(id);
  }

  @Mutation(() => ProductType)
  async addProduct(@Args('input') input: ProductInput) {
    return this.productService.add(input);
  }

  @Mutation(() => ProductType)
  async updateProduct(
    @Args('id') id: string,
    @Args('input') input: ProductInput,
  ): Promise<ProductInput> {
    return this.productService.update(id, input);
  }

  @Mutation(() => ProductType)
  async deleteProduct(@Args('id') id: string): Promise<ProductInput> {
    return this.productService.delete(id);
  }
}
