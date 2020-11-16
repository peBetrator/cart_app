import { gql, useQuery } from '@apollo/client';
import { initializeApollo } from 'lib/apolloClient';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export const ALL_PRODUCTS_QUERY = gql`
  query {
    products {
      id
      title
      price
      category
    }
  }
`;

interface ProductType {
  id: string;
  title: string;
  price: number;
  category: string;
}

interface ProductTypes {
  products: ProductType[];
}

export default function Home() {
  const {
    loading,
    error,
    data: { products },
  } = useQuery<ProductTypes>(ALL_PRODUCTS_QUERY);

  if (loading) return <div className={styles.container}>Loading...</div>;
  return (
    <div className={styles.container}>
      {products.map(({ id, title, price, category }) => (
        <>
          <span>{id}</span>
          <span>{title}</span>
          <span>{price}</span>
          <span>{category}</span>
        </>
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
