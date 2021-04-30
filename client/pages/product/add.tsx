import { useMutation } from '@apollo/client';
import { GetStaticProps } from 'next';

import { Product } from '../../components';
import { ADD_PRODUCT_MUTATION } from '../../graphql/mutations';
import { CATEGORIES_QUERY } from '../../graphql/queries';
import { initializeApollo } from '../../utilities/apolloClient';

const AddProduct = ({ categories }): React.ReactElement => {
  const [addProduct] = useMutation(ADD_PRODUCT_MUTATION);

  return <Product categories={categories} submitMutation={addProduct} />;
};

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  const {
    data: { categories },
    errors,
  } = await apolloClient.query({
    query: CATEGORIES_QUERY,
  });
  if (errors) console.warn(errors);

  return {
    props: {
      categories,
    },
  };
};

export default AddProduct;
