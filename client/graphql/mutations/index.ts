import { gql } from '@apollo/client';

export const ADD_PRODUCT_MUTATION = gql`
  mutation addProduct($product: ProductInput!) {
    addProduct(input: $product) {
      id
      title
      category
      price
    }
  }
`;
