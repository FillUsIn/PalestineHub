import {
  IconArrowBackUp,
  IconDots,
  IconMessageCircle,
} from '@tabler/icons-react';
import { cn } from '@/lib/utils/classname';
import { ReactNode } from 'react';
import { ActionIcon, Button } from '@mantine/core';
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
      <ContentVotes
        voteCount={voteCount}
        // setVoteCount={setVoteCount}
        // setVoteState={setVoteState}
      />
      {/* <UpvoteDownvote /> */}

      {showCommentsCount && <Comments commentCount={commentCount} />}

      {showReplyButton && (
        <ActionIcon
          radius={'xl'}
          size={37}
          color='#eeeeee'
          onClick={onReplyClicked}
        >
          <IconArrowBackUp
            color='gray'
            className='cursor-pointer  rounded-full p-1.5 hover:bg-zinc-100'
            size='36'
          />
        </ActionIcon>
      )}

      {showOptions && (
        <ActionIcon radius={'xl'} size={37} color='#eeeeee'>
          <IconDots
            size='36'
            color='gray'
            className='cursor-pointer  rounded-full p-1.5 hover:bg-zinc-100'
            onClick={onOptionsClicked}
          />
        </ActionIcon>
      )}
    </div>
  );
}

function Comments({ commentCount = 0 }: { commentCount: number }) {
  return (
    <Button radius={'xl'} color='#eeeeee' classNames={{ label: 'space-x-1' }}>
      <IconMessageCircle size='22' color='#4f4f4f' />
      <p className='text-sm font-bold text-gray-800'>{commentCount}</p>
    </Button>
  );
}

function Container({ children }: { children: ReactNode }) {
  return (
    <div className='bg-gray-200 hover:bg-[#e2e2e2] rounded-full px-3 py-1 cursor-pointer'>
      {children}
    </div>
  );
}

export default ContentInteractions;
