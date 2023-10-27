import { TopPost } from '@/types/dtos';
import React from 'react';
import PostPreview from '../PostPreview/PostPreview';

type TopPostsProps = {
  topPosts: TopPost[];
};

const TopPosts: React.FC<TopPostsProps> = ({ topPosts }) => {
  if (topPosts.length == 0)
    return <p className='text-center'>No posts found.</p>;

  return (
    <div className='mt-5 space-y-10 md:flex md:justify-between md:gap-5 md:space-y-0'>
      {topPosts.map((topPost) => (
        <PostPreview key={topPost.post.id} post={topPost.post} />
      ))}
    </div>
  );
};

export default TopPosts;
