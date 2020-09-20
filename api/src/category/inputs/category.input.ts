import { InputType, Field } from 'type-graphql';

@InputType()
export class CategoryInput {
  @Field()
  title: string;
}
