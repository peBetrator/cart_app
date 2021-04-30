import { gql } from '@apollo/client';

export const ADD_PRODUCT_MUTATION = gql`
  mutation AddProduct($product: ProductInput!) {
    addProduct(input: $product) {
      id
      title
      category
      price
    }
  }
`;

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct($id: String!, $product: ProductInput!) {
    updateProduct(id: $id, input: $product) {
      id
      title
      category
      price
    }
  }
`;

export const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProduct($id: String!) {
    deleteProduct(id: $id) {
      id
      title
      category
      price
    }
  }
`;

export const ADD_CATEGORY_MUTATION = gql`
  mutation CreateCategory($category: CategoryInput!) {
    createCategory(input: $category) {
      id
      title
    }
  }
`;
