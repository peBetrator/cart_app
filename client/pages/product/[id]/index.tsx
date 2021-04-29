import { GetServerSideProps, GetServerSidePropsContext } from 'next';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { initializeApollo } from '../../../utilities/apolloClient';
import { ProductType } from '../../../components/products/types';
import { PRODUCT_QUERY } from '../../../graphql/queries';

interface ProductPropTypes {
  product: ProductType;
}

const Product = ({ product }: ProductPropTypes): React.ReactElement => {
  const { title, category, price } = product;

  return (
    <Container maxWidth="sm">
      <Typography>{title}</Typography>
      <Typography>Category: {category}</Typography>
      <Typography>Price: {price}$</Typography>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const apolloClient = initializeApollo();
  const { id } = context.params;

  const {
    data: { product },
    errors,
  } = await apolloClient.query({
    query: PRODUCT_QUERY,
    variables: { id },
  });
  if (errors) console.error(errors);

  return {
    props: {
      product,
    },
  };
};

export default Product;
