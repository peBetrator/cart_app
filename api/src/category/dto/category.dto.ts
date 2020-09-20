import { ProductType } from '../../products/dto/add-product.dto';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
export class CategoryType {
  @Field(() => ID)
  id: string;
  @Field()
  title: string;
  @Field(() => [ProductType])
  products: ProductType[];
}
