import { Post } from '@/types/entities';
import { since } from '@/lib/utils/date-time';
import Link from 'next/link';
import ContentInteractions from './ContentInteractions';
import UpvoteDownvote from './UpvoteDownvote';
import AddCommentBox from './Comments/AddCommentBox';
import { Divider } from '@mantine/core';
import { AnimatePresence } from 'framer-motion';
import CommentsList from './Comments/CommentsList';
import { IconBrandWechat } from '@tabler/icons-react';

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
      <h1 className='mt-4 text-2xl font-semibold'>{post.title}</h1>
      {post.thumbnailUrl && (
        <div
          style={{ backgroundImage: `url(${post.thumbnailUrl})` }}
          className='h-80 w-full  rounded-md shadow-lg'
        ></div>
      )}
      {post.body && (
        <p className=' whitespace-pre-line break-words'>{post.body}</p>
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
