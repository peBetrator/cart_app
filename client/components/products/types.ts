import { FetchResult, MutationFunctionOptions, OperationVariables } from '@apollo/client';

interface Category {
  id: string;
  title: string;
}

export interface ProductType {
  id: string;
  title: string;
  price: number;
  category: string;
}

export interface ProductPropTypes {
  categories: Category[];
  product?: ProductType;
  isEdit?: boolean;
  submitMutation: (
    options?: MutationFunctionOptions<any, OperationVariables>,
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
}
