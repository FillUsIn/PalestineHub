/* eslint-disable @next/next/no-img-element */
import { Paper } from '@mantine/core';
import { since } from '@/lib/utils/date-time';
import { truncate } from '@/lib/utils/truncate';
import { PostSummaryDTO } from '@/types/dtos';
import Link from 'next/link';

import ContentInteractions from '../ContentInteractions';

type Props = {
  post: PostSummaryDTO;
};

function PostSummaryItem({ post }: Props) {
  const {
    body,
    categoryName,
    commentCount,
    createdDate,
    id,
    subCategoryName,
    title,
    thumbnailUrl,
    username,
    voteCount,
  } = post;
  const formattedDate = since(createdDate);
  return (
    <Paper
      className='flex flex-col h-48 overflow-hidden text-black transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 hover: duration-300'
      component={Link}
      href={`/resources/${categoryName}/${subCategoryName}/posts/${id}`}
      radius='lg'
      style={{
        backgroundImage: `url(${thumbnailUrl})`,
        backgroundSize: 'auto 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left',
      }}
      withBorder={true}
    >
      <div className='flex w-3/4 h-full flex-col ml-auto bg-[white] p-5'>
        <div className='flex items-center'>
          <p className='text-sm font-medium mb-2'>
            {username}
            <span className='text-xs font-semibold '>
              <span className='mx-1'>·</span>
              <span>{formattedDate}</span>
            </span>
          </p>
        </div>

        <h3 className='mb-3 text-xl font-semibold'>{truncate(title, 52)}</h3>
        <p className='whitespace-pre-line break-words text-sm font-medium'>
          {truncate(body, 200)}
        </p>

        <div className='mt-auto'>
          <ContentInteractions
            voteCount={voteCount}
            commentCount={commentCount}
            showOptions={false}
            onOptionsClicked={() => {}}
          />
        </div>
      </div>
    </Paper>
  );
}

export default PostSummaryItem;
