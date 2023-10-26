import { Avatar, Box, Paper, Title } from '@mantine/core';
import { IconBrandReddit } from '@tabler/icons-react';
import { since } from '@/lib/utils/date-time';
import { PostSummaryDTO } from '@/types/dtos';
import Link from 'next/link';
import ContentInteractions from './ContentInteractions';

type Props = {
  post: PostSummaryDTO;
};

function PostSummaryItem({ post }: Props) {
  const formattedDate = since(post.createdDate);

  return (
    <Link href={`/posts/${post.id}`}>
      <Paper
        shadow='md'
        radius='lg'
        style={{ backgroundImage: `url(${post.imageUrl})` }}
        className='flex h-52 flex-col justify-between overflow-hidden text-white'
      >
        {/* bg-gradient-to-b from-[#1a1a1af4] */}
        <div className='flex h-full  flex-col justify-between bg-[#1a1a1a9e] p-5'>
          <div>
            <div className='flex items-center'>
              <p className='text-sm font-medium'>
                {post.username}
                <span className='text-xs font-semibold '>
                  <span className='mx-1'>·</span>
                  <span>{formattedDate}</span>
                </span>
              </p>
            </div>

            <p className='mt-2 text-xl font-semibold'>{post.title}</p>
            <p className='mb-2 mt-8 whitespace-pre-line break-words text-sm font-medium'>
              {post.body?.substring(0, 200)}...
            </p>

            <ContentInteractions
              voteCount={post.voteCount}
              commentCount={post.commentCount}
              showOptions={false}
              onOptionsClicked={() => {}}
            />
          </div>
        </div>
      </Paper>
      {/* <Box
        className=' text-white bg-gradient-to-b from-[#141414eb] to-90% h-full px-6 py-4 cursor-pointer rounded-2xl border-2 border-gray-100   transition-all'
        style={{ backgroundImage: `url(${post.imageUrl})` }}
      >
        <div className='flex items-center'>
          <p className='font-semibold text-sm'>
            {post.username}
            <span className='text-xs font-semibold text-gray-400'>
              <span className='mx-1'>·</span>
              <span>{formattedDate}</span>
            </span>
          </p>
        </div>
        <p className='font-semibold text-xl mt-2'>{post.title}</p>
        <p className='whitespace-pre-line mt-8 mb-2 break-words'>{post.body?.substring(0, 200)}...</p>

        <ContentInteractions
          voteCount={post.voteCount}
          commentCount={post.commentCount}
          showOptions={false}
          onOptionsClicked={() => {}}
        />
      </Box> */}
    </Link>
  );
}

export default PostSummaryItem;
