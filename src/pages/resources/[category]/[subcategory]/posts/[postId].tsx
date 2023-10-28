import { getPostById } from '@/api/posts';
import AddCommentBox from '@/components/Comments/AddCommentBox';
import CommentsList from '@/components/Comments/CommentsList';
import PostContent from '@/components/PostContent';
import UpvoteDownvote from '@/components/UpvoteDownvote';
import { Post } from '@/types/entities';
import { Divider } from '@mantine/core';
import { IconBrandWechat } from '@tabler/icons-react';
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

        <UpvoteDownvote />

        <AddCommentBox className='my-5' onSubmit={() => {}} />

        <Divider mb={20} size={'6'} color='rgb(234, 234, 234)' />

        {/* {JSON.stringify(post.comments)} */}
        <AnimatePresence mode='wait'>
          {post.comments.length ? (
            <CommentsList
              comments={post.comments.sort(
                (a, b) =>
                  new Date(b.createdAt).valueOf() -
                  new Date(a.createdAt).valueOf()
              )}
              isChild={false}
            />
          ) : (
            <NoCommentsYet />
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
function NoCommentsYet() {
  return (
    <div className='flex flex-col items-center mt-20 gap-5 opacity-40'>
      <IconBrandWechat size={60} strokeWidth={1.5} />
      <p className='font-bold text-lg'>Be the first to comment</p>
    </div>
  );
}

//@ts-ignore
export async function getServerSideProps({ params }) {
  const { postId } = params;

  console.log('postId :>> ', postId);

  const post = await getPostById(postId);

  // const post: Post = {
  //   id: postId,
  //   body: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque, odit.',
  //   title: 'Why palestinians are the oppressed, not the oppressors.',
  //   createdAt: '2023-10-24T01:08:46.305527088',
  //   username: 'ahmad',
  //   url: 'https://google.com',
  //   thumbnailUrl: null,
  //   voteCount: 32,
  //   comments: [],
  //   userDislikes: [],
  //   userLikes: [],
  // };

  return {
    props: {
      post,
    },
  };
}

export default PostPage;
