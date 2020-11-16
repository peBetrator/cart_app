import { gql } from '@apollo/client';

export const ALL_PRODUCTS_QUERY = gql`
  query {
    products {
      id
      title
      price
      category
    }
  }
`;
