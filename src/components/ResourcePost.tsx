import React from 'react';
import { Paper, Text, Group, Title, Button } from '@mantine/core';
import UpvoteDownvote from './UpvoteDownvote';
import { PostSummaryDTO } from '@/types/dtos';

type Props = {
  post: PostSummaryDTO;
};

function ResourcePost({ post }: Props) {
  return (
    <Paper
      shadow='md'
      radius='lg'
      style={{ backgroundImage: `url(${post.thumbnailUrl})` }}
      className='flex h-40 w-full flex-col justify-between overflow-hidden md:h-80'
    >
      <div className='flex h-full flex-col justify-between bg-gradient-to-b from-[#141414eb] to-90% p-5'>
        <div>
          <Text size='sm' c='gray' className='text-white-400 capitalize'>
            {post.username}
          </Text>
          <div className='mt-2'>
            <Title order={1} className='text-white-700 uppercase'>
              {post.title}
            </Title>
            <Text size='xs' className='capitalize'>
              description/link
            </Text>
          </div>
          <p className='mt-3 font-semibold text-white'>{post.body}</p>
        </div>
        <div className='items-right flex justify-between'>
          <span>{/**wrapper*/}</span>
          <span>
            <UpvoteDownvote></UpvoteDownvote>
          </span>
        </div>
      </div>
    </Paper>
  );
}

export default ResourcePost;
