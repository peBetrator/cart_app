import { gql } from '@apollo/client';

export const PRODUCTS_QUERY = gql`
  query Products {
    products {
      id
      title
      price
      category
    }
  }
`;

export const PRODUCT_QUERY = gql`
  query Product($id: String!) {
    product(id: $id) {
      title
      category
      price
    }
  }
`;

export const CATEGORIES_QUERY = gql`
  query Categories {
    categories {
      id
      title
    }
  }
`;
