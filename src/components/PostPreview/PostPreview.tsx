import React from 'react';
import Image from 'next/image';
import { Button, Card, Group, Paper, Text, Title } from '@mantine/core';
import { PostSummaryDTO, TopPost } from '@/types/dtos';
import { Post } from '@/types/entities';
import Link from 'next/link';

type Props = {
  post: Post;
};

function PostPreview({ post }: Props) {
  return (
    <Paper
      shadow='md'
      w='100%'
      radius='lg'
      style={{ backgroundImage: `url(${post.thumbnailUrl})` }}
      className='flex h-96 flex-col justify-between overflow-hidden'
    >
      <div className='flex h-full flex-col justify-between bg-gradient-to-b from-[#141414eb] to-90% p-5'>
        <div>
          <Title order={2} className='text-white'>
            {post.title}
          </Title>
          <p className='mt-3 font-semibold text-white'>{post.body}</p>
        </div>
        <Button variant='white' color='dark' className=''>
          Read post
        </Button>
      </div>
    </Paper>
  );
}

export default PostPreview;
