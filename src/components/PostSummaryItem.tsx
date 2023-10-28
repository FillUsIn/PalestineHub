/* eslint-disable @next/next/no-img-element */
import { Paper } from '@mantine/core';
import { since } from '@/lib/utils/date-time';
import { truncate } from '@/lib/utils/truncate';
import { PostSummaryDTO } from '@/types/dtos';
import Link from 'next/link';

import ContentInteractions from './ContentInteractions';

type Props = {
  post: PostSummaryDTO;
};

function PostSummaryItem({ post }: Props) {
  const {
    body,
    commentCount,
    createdDate,
    id,
    title,
    thumbnailUrl,
    username,
    voteCount,
  } = post;
  const formattedDate = since(createdDate);
  return (
    <Link href={`/posts/${id}`}>
      <Paper
        className='h-48 overflow-hidden text-black'
        radius='lg'
        withBorder={true}
      >
        <div className='flex flex-row justify-between'>
          {thumbnailUrl && (
            <div className='w-1/3'>
              <img alt={title} className='w-full' src={thumbnailUrl} />
            </div>
          )}

          <div className='basis-2/3 flex h-full flex-col justify-between bg-[white] p-5'>
            <div>
              <div className='flex items-center'>
                <p className='text-sm font-medium'>
                  {username}
                  <span className='text-xs font-semibold '>
                    <span className='mx-1'>·</span>
                    <span>{formattedDate}</span>
                  </span>
                </p>
              </div>

              <h3 className='mt-2 text-xl font-semibold'>{title}</h3>
              <p className='mb-2 mt-8 whitespace-pre-line break-words text-sm font-medium'>
                {truncate(body, 200)}
              </p>

              <ContentInteractions
                voteCount={voteCount}
                commentCount={commentCount}
                showOptions={false}
                onOptionsClicked={() => {}}
              />
            </div>
          </div>
        </div>
      </Paper>
    </Link>
  );
}

export default PostSummaryItem;
