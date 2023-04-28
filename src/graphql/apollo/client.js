import { ApolloClient, InMemoryCache } from '@apollo/client';
import { httpLink } from 'graphql/links/http-link';

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});
