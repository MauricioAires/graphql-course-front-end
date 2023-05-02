import { PostForm } from '../../components/PostForm';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GQL_POST } from 'graphql/queries/post';
import { useEffect } from 'react';
import { Loading } from 'components/Loading';
import { GQL_UPDATE_POST } from 'graphql/mutations/post';

export const PostEditor = () => {
  const { id } = useParams();
  const [getPost, { loading, error, data }] = useLazyQuery(GQL_POST, {
    onError: () => {},
  });
  const [updatePost, { error: updateError }] = useMutation(GQL_UPDATE_POST, {
    onError: () => {},
    onCompleted: () => {
      toast.success('post updated successfully');
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
    console.log({ formValue });
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
