import {
  IconArrowBackUp,
  IconDots,
  IconMessageCircle,
} from '@tabler/icons-react';
import { cn } from '@/lib/utils/classname';
import { useState } from 'react';
import { ActionIcon } from '@mantine/core';
import ContentVotes from './ContentVotes';
import UpvoteDownvote from './UpvoteDownvote';

type Props = {
  onUpvote?: () => void;
  onDownvote?: () => void;
  voteCount: number;
  onOptionsClicked?: () => void;
  onReplyClicked?: () => void;
  commentCount?: number;
  className?: string;
  showOptions?: boolean;
  showCommentsCount?: boolean;
  showReplyButton?: boolean;
};

function ContentInteractions({
  onOptionsClicked,
  onReplyClicked,
  onUpvote,
  onDownvote,
  voteCount,
  commentCount = 0,
  showOptions = true,
  showCommentsCount = true,
  showReplyButton = false,
  className,
}: Props) {
  // const [voteCount, setVoteCount] = useState(0);
  // const [voteState, setVoteState] = useState<VoteState>();

  return (
    <div className={cn('flex items-center space-x-5', className ?? '')}>
      {/* <ContentVotes
        voteCount={voteCount}
        // setVoteCount={setVoteCount}
        // setVoteState={setVoteState}
      /> */}
      <UpvoteDownvote />

      {showCommentsCount && <Comments commentCount={commentCount} />}
      {showReplyButton && (
        <ActionIcon
          radius={'xl'}
          variant='transparent'
          color='gray'
          onClick={onReplyClicked}
        >
          <IconArrowBackUp size='24' />
        </ActionIcon>
      )}

      {showOptions && (
        <IconDots
          size='36'
          color='gray'
          className='cursor-pointer  rounded-full p-1.5 hover:bg-zinc-100'
          onClick={onOptionsClicked}
        />
      )}
    </div>
  );
}

function Comments({ commentCount = 0 }: { commentCount: number }) {
  return (
    <div className='flex text-gray-500 cursor-pointer items-center space-x-1 rounded-full px-2.5 py-1.5 hover:bg-zinc-100 '>
      <IconMessageCircle size='22' />
      <p className='text-sm font-bold  '>{commentCount}</p>
    </div>
  );
}

export default ContentInteractions;
