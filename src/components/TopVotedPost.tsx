import React from 'react';
import { Paper, Text, Group, Title, Button } from '@mantine/core';
import UpvoteDownvote from './UpvoteDownvote';
import { PostSummaryDTO } from '@/types/dtos';

type Props = {
  post: PostSummaryDTO;
};

function TopVotedPost({ post }: Props) {
  return (
    <Paper
      shadow='md'
      radius='lg'
      style={{ backgroundImage: `url(${post.thumbnailUrl})` }}
      className='flex h-40 w-full flex-col justify-between overflow-hidden md:h-80'
    >
      <div className='flex h-full flex-col justify-between bg-gradient-to-b from-[#141414eb] to-90% p-5'>
        <div>
          <div>
            <Title order={1} className='text-white-700 uppercase'>
              {post.title}
            </Title>
            <Text size='xs' className='capitalize'>
              description/link
            </Text>
          </div>
          <p className='mt-3 font-semibold text-white'>{post.body}</p>
        </div>
        <div className='flex items-center justify-between'>
          <span className='mr-6'>
            <Button
              variant='white'
              color='black'
              size='regular-md'
              style={{ border: '1px solid black' }}
            >
              Read Post
            </Button>
          </span>
          <span className='ml-6'>
            <UpvoteDownvote></UpvoteDownvote>
          </span>
        </div>
      </div>
    </Paper>
  );
}

export default TopVotedPost;
