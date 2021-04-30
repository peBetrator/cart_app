import { useMutation } from '@apollo/client';
import { GetServerSideProps, GetStaticPaths, GetStaticPropsContext } from 'next';

import { Product } from '../../../components';
import { UPDATE_PRODUCT_MUTATION } from '../../../graphql/mutations';
import { CATEGORIES_QUERY, PRODUCTS_QUERY, PRODUCT_QUERY } from '../../../graphql/queries';
import { initializeApollo } from '../../../utilities/apolloClient';

const EditProduct = ({ categories, product }): React.ReactElement => {
  // TODO: show error via a notification
  const [updateProduct] = useMutation(UPDATE_PRODUCT_MUTATION);

  return <Product categories={categories} product={product} submitMutation={updateProduct} isEdit />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const apolloClient = initializeApollo();

  const {
    data: { products },
  } = await apolloClient.query({ query: PRODUCTS_QUERY });
  const paths = products.map(({ id }) => ({ params: { id } }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetServerSideProps = async (context: GetStaticPropsContext) => {
  const { id } = context.params;
  const apolloClient = initializeApollo();

  const {
    data: { categories },
    errors,
  } = await apolloClient.query({
    query: CATEGORIES_QUERY,
  });
  if (errors) console.error(errors);

  const {
    data: { product },
  } = await apolloClient.query({
    query: PRODUCT_QUERY,
    variables: { id },
  });

  return {
    props: {
      categories,
      product,
    },
  };
};

export default EditProduct;
