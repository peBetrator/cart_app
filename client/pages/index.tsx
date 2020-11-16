import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import ProductPreview from 'components/products/ProductPreview';
import { ProductType } from 'components/products/types';
import { initializeApollo } from 'utilities/apolloClient';
import { ALL_PRODUCTS_QUERY } from '../graphql/queries';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

interface ProductTypes {
  products: ProductType[];
}

export default function Home() {
  const classes = useStyles();
  const {
    loading,
    error,
    data: { products },
  } = useQuery<ProductTypes>(ALL_PRODUCTS_QUERY);

  if (loading) return <div className={classes.container}>Loading...</div>;
  return (
    <div className={classes.container}>
      {products.map((product, index) => (
        <ProductPreview key={index} {...product} />
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ALL_PRODUCTS_QUERY,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}
