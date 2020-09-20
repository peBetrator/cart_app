import { Product } from '../../products/interfaces/product.interface';

export interface Category {
  readonly title: string;
  readonly products: [Product];
}
