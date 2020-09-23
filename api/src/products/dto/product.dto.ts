import { AllowedCategories } from '../../category/enums/category.enum';
import { ObjectType, Field, Int, ID } from 'type-graphql';

@ObjectType()
export class ProductType {
  @Field(() => ID)
  id: string;

  @Field()
  readonly title: string;

  @Field(() => Int)
  readonly price: number;

  @Field(() => AllowedCategories)
  readonly category: AllowedCategories;
}
