import { GetServerSideProps } from 'next';
import { useQuery } from '@apollo/client';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import { ProductPreview } from '../components';
import { ProductType } from '../components/products/types';
import { ALL_PRODUCTS_QUERY } from '../graphql/queries';
import { initializeApollo } from '../utilities/apolloClient';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

interface ProductTypes {
  products: ProductType[];
}

export default function Home(): React.ReactElement {
  const classes = useStyles();

  const { loading, error, data: { products } = {}, refetch } = useQuery<ProductTypes>(ALL_PRODUCTS_QUERY);

  if (loading) {
    return null;
  }

  return (
    <Container maxWidth="md">
      <Box className={classes.container}>
        {products.map((product: ProductType, index: number) => (
          <ProductPreview key={index} refetch={refetch} {...product} />
        ))}
      </Box>
    </Container>
  );
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const apolloClient = initializeApollo();

//   const {
//     data: { products },
//     errors,
//   } = await apolloClient.query({
//     query: ALL_PRODUCTS_QUERY,
//   });

//   return {
//     props: {
//       products,
//     },
//   };
// };
