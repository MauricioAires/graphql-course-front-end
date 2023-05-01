import P from 'prop-types';
import * as Styled from './styles';
import { Heading } from 'components/Heading';
import { Post } from 'components/Post';
import { Helmet } from 'react-helmet';
import { useQuery } from '@apollo/client';
import { GQL_POSTS, GQL_POSTS_LIMIT } from 'graphql/queries/post';
import { Loading } from 'components/Loading';
import { DefaultError } from 'components/DefaultError';
import { FormButton } from 'components/FormButton';

export const Home = () => {
  const { data, loading, error, fetchMore } = useQuery(GQL_POSTS, {
    onCompleted: () => {},
    onError: () => {},
  });

  if (loading) return <Loading loading={loading} />;
  if (error) return <DefaultError error={error} />;

  if (!data) return null;

  const handleLoadMore = async () => {
    if (!Array.isArray(data?.posts)) return;

    await fetchMore({
      variables: {
        inputs: {
          _start: data?.posts.length + GQL_POSTS_LIMIT,
          _sort: 'indexRef',
          _limit: GQL_POSTS_LIMIT,
          _order: 'DESC',
        },
      },
    });
  };

  return (
    <>
      <Helmet title="Home - GraphQL + Apollo-Client - Otávio Miranda" />

      <Styled.Container>
        <Heading>Posts</Heading>
      </Styled.Container>

      <Styled.PostsContainer>
        {data?.posts.map((post) => {
          const uniqueKey = `home-post-${post.id}`;
          return (
            <Post
              key={uniqueKey}
              id={post.id}
              title={post.title}
              body={post.body}
              user={post.user}
              createdAt={post.createdAt}
            />
          );
        })}
      </Styled.PostsContainer>

      <Styled.Container>
        <FormButton clickedFn={handleLoadMore}>Load more</FormButton>
      </Styled.Container>
    </>
  );
};

Home.propTypes = {
  children: P.node,
};
