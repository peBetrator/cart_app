import { ProductType } from '../../products/dto/product.dto';
import { ObjectType, Field, ID } from 'type-graphql';
import { AllowedCategories } from '../enums/category.enum';

@ObjectType()
export class CategoryType {
  @Field(() => ID)
  id: string;
  @Field(() => AllowedCategories)
  title: AllowedCategories;
  @Field(() => [ProductType])
  products: ProductType[];
}
