import { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import { ProductPreview } from '../components';
import { ProductType } from '../components/products/types';
import { PRODUCTS_QUERY } from '../graphql/queries';

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
  const { loading, error, data: { products } = {}, refetch } = useQuery<ProductTypes>(PRODUCTS_QUERY);

  useEffect(() => {
    refetch();
  }, []);

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
