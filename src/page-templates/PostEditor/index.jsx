import { PostForm } from '../../components/PostForm';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { useHistory, useParams } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GQL_POST } from 'graphql/queries/post';
import { useEffect } from 'react';
import { Loading } from 'components/Loading';
import { GQL_CREATE_POST, GQL_UPDATE_POST } from 'graphql/mutations/post';
import { GQL_FRAGMENT_POST } from 'graphql/fragments/post';

export const PostEditor = () => {
  const { id } = useParams();
  const history = useHistory();
  const [getPost, { loading, error, data }] = useLazyQuery(GQL_POST, {
    onError: () => {},
  });
  const [updatePost, { error: updateError }] = useMutation(GQL_UPDATE_POST, {
    onError: () => {},
    onCompleted: () => {
      toast.success('post updated successfully');
    },
  });
  const [createPost, { error: createError }] = useMutation(GQL_CREATE_POST, {
    onError: () => {},
    onCompleted: (data) => {
      toast.success('post created successfully');

      /**
       * NOTE: adicione esse timeout poque o server esta com problema sempre
       * que o json do json server é modificado ele reinicia o server ai da erro ao recuperar o
       * novo post porque server está reiniciando
       */
      setTimeout(() => {
        history.push(`/post/${data.createPost.id}/edit`);
      }, 1000);
    },
    update: (cache, { data }) => {
      const newPostRef = cache.writeFragment({
        fragment: GQL_FRAGMENT_POST,
        data: data.createPost,
        variables: {
          id: data.createPost.id,
        },
      });

      cache.modify({
        fields: {
          posts: (existing = []) => {
            return [newPostRef, ...existing];
          },
        },
      });
    },
  });

  useEffect(() => {
    if (!id) return;

    getPost({
      variables: {
        postId: id,
      },
    });
  }, [id, getPost]);
  const handleUpdate = async (formValue) => {
    await updatePost({
      variables: {
        postId: id,
        data: {
          ...formValue,
        },
      },
    });
  };

  const handleCreate = async (formValue) => {
    await createPost({
      variables: {
        data: {
          ...formValue,
        },
      },
    });
  };

  const handleSubmit = async (formValue) => {
    if (id) return handleUpdate(formValue);

    return handleCreate(formValue);
  };

  if (loading) return <Loading loading={loading} />;

  const formError = error
    ? error.message
    : updateError
    ? updateError.message
    : createError
    ? createError.message
    : '';

  return (
    <>
      <Helmet title="Edit/Create Post - GraphQL + Apollo-Client - Otávio Miranda" />

      <PostForm
        handleSubmitCb={(sentValues) => handleSubmit(sentValues)}
        post={data?.post}
        formError={formError}
      />
    </>
  );
};
