import { AllowedCategories } from '../../category/enums/category.enum';

export interface Product {
  readonly title: string;
  readonly price: number;
  readonly category: AllowedCategories;
}
