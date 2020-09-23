import { InputType, Field } from 'type-graphql';
import { AllowedCategories } from '../enums/category.enum';

@InputType()
export class CategoryInput {
  @Field(() => AllowedCategories)
  title: AllowedCategories;
}
