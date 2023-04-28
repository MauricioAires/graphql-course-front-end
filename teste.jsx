import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import 'cross-fetch/polyfill';

const client = new ApolloClient({
  uri: 'http://localhost:4003/',
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query QueryUsers($inputs: ApiFiltersInput) {
        users(inputs: $inputs) {
          id
          userName
          indexRef
          createdAt
          posts {
            id
            title
          }
        }
      }
    `,
  })
  .then((res) => {
    console.log(JSON.stringify(res, 2, 2));
  });
