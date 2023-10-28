import PostContent from '@/components/PostContent';
import { Post } from '@/types/entities';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

type Props = {
  post: Post;
};

function PostPage({ post }: Props) {
  if (!post) return <p>Post not found</p>;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <PostContent post={post} />
        {/* <AddCommentBox
          className='my-5'
          onSubmit={(createCommentDTO: CreateCommentDTO) => addComment(createCommentDTO)}
        />
        <Divider mb={20} size={"6"} color='rgb(234, 234, 234)' />

        <AnimatePresence mode='wait'>
          {post.comments.length ? (
            <CommentsList
              comments={post.comments.sort(
                (a, b) => new Date(b.createdDate).valueOf() - new Date(a.createdDate).valueOf()
              )}
              isChild={false}
            />
          ) : (
            <NoCommentsYet />
          )}
        </AnimatePresence> */}
      </motion.div>
    </AnimatePresence>
  );
}

//@ts-ignore
export async function getServerSideProps({ params }) {
  const { postId } = params;

  console.log('postId :>> ', postId);

  const post: Post = {
    body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque, odit.',
    categoryName: 'Charities',
    createdAt: '2023-10-24T01:08:46.305527088',
    comments: [],
    id: postId,
    subCategoryName: 'Medical',
    title: 'Why palestinians are the oppressed, not the oppressors.',
    thumbnailUrl: null,
    url: 'https://google.com',
    userDislikes: [],
    userLikes: [],
    username: 'ahmad',
    voteCount: 32,
  };

  return {
    props: {
      post,
    },
  };
}

export default PostPage;
