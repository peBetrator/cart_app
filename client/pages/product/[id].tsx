import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { ProductType } from '../../components/products/types';
import { PRODUCT_QUERY } from '../../graphql/queries';

interface ProductQueryType {
  product: ProductType;
}

const Product = (): React.ReactElement => {
  const {
    query: { id },
  } = useRouter();
  const { loading, error, data: { product: { title, category, price } = {} } = {} } = useQuery<ProductQueryType>(
    PRODUCT_QUERY,
    {
      variables: { id },
    },
  );

  if (loading) return null;

  return (
    <>
      <Container maxWidth="sm">
        <Typography>{title}</Typography>
        <Typography>Category: {category}</Typography>
        <Typography>Price: {price}$</Typography>
      </Container>
    </>
  );
};

export default Product;
