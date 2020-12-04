import { GetServerSideProps } from 'next';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ProductPreview from 'components/products/ProductPreview';
import { ProductType } from 'components/products/types';
import { initializeApollo } from 'utilities/apolloClient';
import { ALL_PRODUCTS_QUERY } from '../graphql/queries';
import Link from 'next/link';

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
    <>
      <Link href="/product/add" passHref>
        <Button variant="contained">Add</Button>
      </Link>
      <div className={classes.container}>
        {products.map((product, index) => (
          <ProductPreview key={index} {...product} />
        ))}
      </div>
    </>
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
