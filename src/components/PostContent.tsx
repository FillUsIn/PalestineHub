import { Post } from '@/types/entities';
import { since } from '@/lib/utils/date-time';
import Link from 'next/link';
import ContentInteractions from './ContentInteractions';
import UpvoteDownvote from './UpvoteDownvote';
import AddCommentBox from './Comments/AddCommentBox';
import { Divider } from '@mantine/core';
import { AnimatePresence } from 'framer-motion';
import CommentsList from './Comments/CommentsList';
import { IconBrandWechat, IconExternalLink } from '@tabler/icons-react';

function PostContent({
  post,
  onOptionsClicked,
}: {
  post: Post;
  onOptionsClicked?: () => void;
}) {
  return (
    <div className='space-y-5'>
      <div className='flex items-center gap-2'>
        <div className=''>
          <p className='text-sm font-semibold text-gray-500'>
            {post.username || 'user'}
            <span>
              <span className='mx-1'>·</span>
              <span>{since(post.createdAt)}</span>
            </span>
          </p>
        </div>
      </div>
      <h1 className='mt-4 mx-auto text-2xl font-semibold'>{post.title}</h1>
      {post.thumbnailUrl && (
        <div className=''>
          <a href={post.url} target='_blank' className='relative group'>
            <div
              style={{
                backgroundImage: `url(${post.thumbnailUrl})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }}
              className='h-80 w-full rounded-md shadow-lg'
            ></div>
            <div className='absolute inset-0 bg-black opacity-0 transition-all group-hover:opacity-50 duration-300 cursor-pointer'></div>
          </a>
          <a
            href={post.url}
            target='_blank'
            className='flex mt-2 items-center hover:underline hover:underline-offset-4 font-semibold bg-gray-200 justify-center sm:justify-start sm:w-fit hover:scale-105 p-2 transition-all  rounded-lg cursor-pointer  gap-2'
          >
            View resource <IconExternalLink size={22} />
          </a>
        </div>
      )}
      {post.body && (
        <p className='mx-auto whitespace-pre-line break-words'>{post.body}</p>
      )}

      {/* <ContentInteractions
        voteCount={post.voteCount}
        commentCount={post.comments.length}
        className='mt-5'
        onOptionsClicked={onOptionsClicked}
      /> */}
    </div>
  );
}

export default PostContent;
