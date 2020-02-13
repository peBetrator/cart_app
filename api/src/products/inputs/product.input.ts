import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class ProductInput {
  @Field()
  readonly title: string;

  @Field(() => Int)
  readonly price: number;

  @Field()
  readonly category: string;
}
