import { createComment } from '@/api/comments';
import { getPostById } from '@/api/posts';
import AddCommentBox from '@/components/Comments/AddCommentBox';
import CommentsList from '@/components/Comments/CommentsList';
import ContentInteractions from '@/components/ContentInteractions';
import PostContent from '@/components/PostContent';
import UpvoteDownvote from '@/components/UpvoteDownvote';
import { CreateCommentDTO, PostSummaryDTO } from '@/types/dtos';
import { Comment, Post } from '@/types/entities';
import { Button, Divider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconBrandWechat,
  IconChevronDown,
  IconChevronUp,
} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

type Props = {
  post: Post;
};

function PostPage({ post }: Props) {
  const [comments, setComments] = useState<Comment[]>(post.comments);

  const [commentsExpanded, { toggle }] = useDisclosure(false);

  // Function to add a new comment
  const addComment = (comment: Comment) => {
    setComments([...comments, comment]);
  };

  const handleAddComment = async (text: string) => {
    const createCommentDTO: CreateCommentDTO = {
      body: text.trim(),
      parentPostId: post.id,
      parentCommentId: '',
    };

    const createdComment = await createComment(createCommentDTO);

    if (createdComment) {
      addComment(createdComment);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <PostContent post={post} />

        {/* <UpvoteDownvote /> */}
        <ContentInteractions voteCount={post.voteCount} className='mt-5' />

        <Button
          variant='light'
          color='dark'
          radius={'xl'}
          onClick={toggle}
          w={180}
          className='mt-16'
          rightSection={
            commentsExpanded ? (
              <IconChevronUp strokeWidth={1.5} />
            ) : (
              <IconChevronDown strokeWidth={1.5} />
            )
          }
        >
          {commentsExpanded ? 'Hide' : 'Show'} comments
        </Button>
        <AnimatePresence>
          {commentsExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <AddCommentBox
                className='my-5'
                onSubmit={(text) => handleAddComment(text)}
              />

              <Divider mb={20} size={'6'} color='rgb(234, 234, 234)' />
              <AnimatePresence mode='wait'>
                {comments.length ? (
                  <CommentsList
                    comments={comments.sort(
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
      <p className='font-bold text-xl'>Share your thoughts!</p>
    </div>
  );
}

//@ts-ignore
export async function getServerSideProps({ params }) {
  const { postId } = params;

  const post = await getPostById(postId);

  // const post: PostSummaryDTO = {
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
