import { Product } from '../../products/interfaces/product.interface';
import { AllowedCategories } from '../enums/category.enum';

export interface Category {
  readonly title: AllowedCategories;
  readonly products: [Product];
}
