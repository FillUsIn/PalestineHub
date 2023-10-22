import React from 'react';

import { PostSummaryDTO } from "@/types";
import PostPreview from '../PostPreview/PostPreview';

type Tab = string;

export const TopPicks =({ tab }: { tab: Tab }) => {
  const postSummaries: PostSummaryDTO[] = [
    {
      title: "test title",
      postUrl: "https://fillusin.com/posts/123",
      imageUrl: "/top-video.jpeg",
      body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio, est!",
    },
    {
      title: "another title",
      postUrl: "https://fillusin.com/posts/456",
      imageUrl: "/top-video.jpeg",
      body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio, est!",
    },
    {
      title: "last title",
      postUrl: "https://fillusin.com/posts/789",
      imageUrl: "/child.jpeg",
      body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio, est!",
    },
  ];
  return (
    <>
      <p className='mt-10 font-semibold text-2xl'>Top picks</p>

      <div className='space-y-10 mt-5 md:flex md:justify-between md:gap-5 md:space-y-0'>
        <PostPreview postSummary={postSummaries[0]} />
        <PostPreview postSummary={postSummaries[1]} />
        <PostPreview postSummary={postSummaries[2]} />
      </div>
    </>
  );
}