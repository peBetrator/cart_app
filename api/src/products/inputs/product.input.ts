import { AllowedCategories } from '../../category/enums/category.enum';
import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class ProductInput {
  @Field()
  readonly title: string;

  @Field(() => Int)
  readonly price: number;

  @Field(() => AllowedCategories)
  readonly category: AllowedCategories;
}
