import { registerEnumType } from 'type-graphql';

export enum AllowedCategories {
  LAPTOP = 'LAPTOP',
  GPU = 'GPU',
  CPU = 'CPU',
  SMARTPHONE = 'SMARTPHONE',
  SOFTWARE = 'SOFTWARE',
}

registerEnumType(AllowedCategories, {
  name: 'AllowedCategories',
});
