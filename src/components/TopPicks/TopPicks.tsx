import React from "react";
import { PostSummaryDTO, TopPost } from "@/types/dtos";
import PostPreview from "../PostPreview/PostPreview";
import { Post } from "@/types/entities";

type Tab = string;

export const TopPicks = ({
  tab,
  topPosts,
}: {
  tab: Tab;
  topPosts: TopPost[];
}) => {
  if (topPosts.length == 0)
    return <p className='text-center'>No posts found.</p>;

  return (
    <>
      <div className='mt-5 space-y-10 md:flex md:justify-between md:gap-5 md:space-y-0'>
        {topPosts.map((topPost) => (
          <PostPreview key={topPost.post.id} post={topPost.post} />
        ))}
      </div>
    </>
  );
};
