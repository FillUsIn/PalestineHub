import React from 'react';
import { Paper, Text, Group, Title, Button } from '@mantine/core';
import UpvoteDownvote from './UpvoteDownvote';
import { PostSummaryDTO } from '@/types/dtos';

interface Props {
  postSummary: PostSummaryDTO;
}

function TopVotedPost({ postSummary }: Props) {
  return (
    <Paper
      shadow='md'
      radius='lg'
      className='flex h-40 w-full flex-col justify-between overflow-hidden md:h-80'
    >
      <div className='flex h-full flex-col justify-between bg-gradient-to-b from-[#141414eb] to-90% p-5'>
        <div>
          <Text size='sm' c='gray' className='text-white-400 capitalize'>
            {postSummary.username}
          </Text>
          <div className='mt-2'>
            <Title order={1} className='text-white-700 uppercase'>
              {postSummary.title}
            </Title>
            <Text size='xs' className='capitalize'>
              description/link
            </Text>
          </div>
          <p className='mt-3 font-semibold text-white'>{postSummary.body}</p>
        </div>
        <div className='flex items-center justify-between'>
          <span className='mr-6'>
            <Button variant='outline' color='dark' size='regular-md'>
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
