import React from "react";

import { PostSummaryDTO } from "@/types";
import PostPreview from "../PostPreview/PostPreview";

type Tab = string;

export const TopPicks = ({ tab }: { tab: Tab }) => {
  const postSummaries: PostSummaryDTO[] = [
    {
      title: "test title",
      imageUrl: "/top-video.jpeg",
      body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio, est!",
      authorUsername: "yaseen",
      createdDate: "2021-09-22T14:30:45",
      id: "123",
      voteCount: 3,
      commentCount: 43,
    },
    {
      title: "another title",
      imageUrl: "/top-video.jpeg",
      body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio, est!",
      authorUsername: "mohammed",
      createdDate: "2021-09-22T14:30:45",
      id: "456",
      voteCount: 21,
      commentCount: 3,
    },
    {
      title: "last title",
      imageUrl: "/child.jpeg",
      body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio, est!",
      authorUsername: "abdullah",
      createdDate: "2021-09-22T14:30:45",
      id: "789",
      voteCount: -5,
      commentCount: 2,
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
};
