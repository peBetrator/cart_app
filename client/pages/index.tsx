import { GetServerSideProps } from 'next';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { ProductType } from 'components/products/types';
import { initializeApollo } from 'utilities/apolloClient';
import { ALL_PRODUCTS_QUERY } from '../graphql/queries';
import { ProductPreview } from '../components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

interface ProductTypes {
  products: ProductType[];
}

export default function Home({ products }): React.ReactElement {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <div className={classes.container}>
        {products.map((product, index) => (
          <ProductPreview key={index} {...product} />
        ))}
      </div>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();

  const {
    data: { products },
    errors,
  } = await apolloClient.query({
    query: ALL_PRODUCTS_QUERY,
  });

  return {
    props: {
      products,
    },
  };
};
