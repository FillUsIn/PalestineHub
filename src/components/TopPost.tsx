import React from "react";
import Image from "next/image";
import { Button, Card, Group, Paper, Text, Title } from "@mantine/core";
import { PostSummaryDTO } from "@/types/dtos";

type Props = {
  postSummary: PostSummaryDTO;
};

function TopPost({ postSummary }: Props) {
  return (
    <Paper
      shadow='md'
      radius='lg'
      style={{ backgroundImage: `url(${postSummary.imageUrl})` }}
      className='h-40 w-full flex flex-col overflow-hidden justify-between md:h-80'
    >
      <div className='p-5 bg-gradient-to-b from-[#141414eb] to-90% h-full flex flex-col justify-between'>
        <div>
          <Title order={5} className='text-white'>
            {postSummary.title}
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
