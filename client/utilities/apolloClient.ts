import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import merge from 'deepmerge';
import { useMemo } from 'react';

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: 'http://localhost:8000/graphql', // Server URL (must be absolute)
      // credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            products: {
              merge: true,
            },
          },
        },
      },
    }),
  });
}

export function initializeApollo(initialState: NormalizedCacheObject = null): ApolloClient<NormalizedCacheObject> {
  const _apolloClient: ApolloClient<NormalizedCacheObject> = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache: NormalizedCacheObject = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache);

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: NormalizedCacheObject): ApolloClient<NormalizedCacheObject> {
  const store: ApolloClient<NormalizedCacheObject> = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
