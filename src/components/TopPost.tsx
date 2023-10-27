import React from 'react';
import Image from 'next/image';
import { Button, Card, Group, Paper, Text, Title } from '@mantine/core';
import { PostSummaryDTO } from '@/types/dtos';

type Props = {
  post: PostSummaryDTO;
};

function TopPost({ post }: Props) {
  return (
    <Paper
      shadow='md'
      radius='lg'
      style={{ backgroundImage: `url(${post.thumbnailUrl})` }}
      className='flex h-40 w-full flex-col justify-between overflow-hidden md:h-80'
    >
      <div className='flex h-full flex-col justify-between bg-gradient-to-b from-[#141414eb] to-90% p-5'>
        <div>
          <Title order={5} className='text-white'>
            {post.title}
          </Title>
          {/* <p className='mt-3 text-white font-semibold'>{postSummary.body}</p> */}
        </div>
        {/* <Button variant='white' color='dark' className=''>
          Read post
        </Button> */}
      </div>
    </Paper>
  );
}

export default TopPost;
