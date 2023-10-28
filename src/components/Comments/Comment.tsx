import { Avatar, Collapse } from '@mantine/core';
import { IconArrowsDiagonal, IconBrandReddit } from '@tabler/icons-react';
import { CreateCommentDTO } from '@/types/dtos';
import { since } from '@/lib/utils/date-time';
import { AnimatePresence, motion } from 'framer-motion';
import { useDisclosure } from '@mantine/hooks';
import ContentInteractions from '../ContentInteractions';
import CommentsList from './CommentsList';
import { Comment } from '@/types/entities';
import { cn } from '@/lib/utils/classname';

type Props = {
  comment: Comment;
  isChild: boolean;
};

function Comment({ comment, isChild }: Props) {
  const [commentExpanded, { toggle: toggleCollapsed }] = useDisclosure(true);

  const datePosted = since(comment.createdAt);

  return (
    <>
      <motion.div
        // layout
        key={comment.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'spring', duration: 0.7 }}
      >
        <Header
          authorUsername={comment.username}
          isAuthor={false}
          datePosted={datePosted}
          expandComment={toggleCollapsed}
          commentExpanded={commentExpanded}
        />
        <div className='-ml-2 pt-1.5'>
          <Collapse in={commentExpanded}>
            <Content
              className={''}
              toggleCollapsed={toggleCollapsed}
              comment={comment}
              isChild={isChild}
              onReplyClicked={() => {
                alert('not implemented yet');
              }}
              onOptionsClicked={() => {
                alert('not implemented yet');
              }}
              onAddReply={() => alert('not implemented yet')}
            />
          </Collapse>
        </div>
      </motion.div>
    </>
  );
}

function Content({
  comment,
  isChild,
  toggleCollapsed,
  onOptionsClicked,
  // onAddReply,
  onReplyClicked,
  className,
}: {
  comment: Comment;
  isChild: boolean;
  toggleCollapsed: () => void;
  onOptionsClicked: () => void;
  onReplyClicked: () => void;
  onAddReply: (createCommentDTO: CreateCommentDTO) => void;
  className?: string;
}) {
  // const [replyToCommentBoxOpened, { toggle: toggleReplyToCommentBox }] = useDisclosure(false);
  return (
    <div className={cn('flex', className)}>
      <VerticalCollapsibleLine onClick={toggleCollapsed} />
      <div className='w-full'>
        {/* Comment */}
        <div className='ml-2 w-full'>
          <p className='whitespace-pre-line text-sm break-words pr-5'>
            {comment.body}
          </p>
          <ContentInteractions
            className='pt-2'
            onUpvote={() => {}}
            onDownvote={() => {}}
            voteCount={comment.voteCount}
            onOptionsClicked={onOptionsClicked}
            showReplyButton
            onReplyClicked={onReplyClicked}
          />
        </div>
        {/* {replyToCommentBoxOpened && <AddCommentBox onSubmit={onAddReply} />} */}

        {/* Child */}
        {comment.replyComments.length > 0 && (
          <CommentsList
            comments={comment.replyComments}
            isChild={true}
            className='mt-5'
          />
        )}
      </div>
    </div>
  );
}

function Header({
  authorUsername = 'user',
  datePosted,
  expandComment,
  commentExpanded,
  isAuthor,
}: {
  authorUsername: string;
  datePosted: string;
  expandComment: () => void;
  commentExpanded: boolean;
  isAuthor: boolean;
}) {
  return (
    <motion.div className='flex items-center' transition={{ duration: 0.6 }}>
      <AnimatePresence mode='popLayout'>
        {!commentExpanded && (
          <motion.div
            initial={{ scale: 0, x: 20 }}
            animate={{
              scale: 1,
              x: 0,
              transition: { duration: 0.5, type: 'spring' },
            }}
            exit={{ scale: 0, transition: { duration: 0.5, type: 'spring' } }}
            key={'1'}
            transition={{ duration: 0.3, type: 'spring' }}
            className='text-gray-500 hover:text-orange-400 group cursor-pointer'
          >
            <IconArrowsDiagonal
              className='mr-2 group-hover:scale-110 transition-all duration-150'
              onClick={expandComment}
            />
          </motion.div>
        )}

        <div className='flex items-center'>
          <Avatar size='md' radius='xl' className='mr-1' color={'green'}>
            <IconBrandReddit size='30' />
          </Avatar>

          <p className='text-sm'>
            <span className='font-semibold '>{authorUsername}</span>
            {isAuthor && (
              <>
                <span className='mx-1'>·</span>
                <span className='font-bold text-blue-600 text-[.9rem]'>
                  Author
                </span>
              </>
            )}
            <span className=''>
              <span className='mx-1'>·</span>
              <span>{datePosted}</span>
            </span>
          </p>
        </div>
      </AnimatePresence>
    </motion.div>
  );
}

// function Header({
//   authorUsername = 'user',
//   datePosted,
//   expandComment,
//   commentExpanded,
//   isAuthor,
// }: {
//   authorUsername: string;
//   datePosted: string;
//   expandComment: () => void;
//   commentExpanded: boolean;
//   isAuthor: boolean;
// }) {
//   return (
//     <motion.div className='flex items-center' transition={{ duration: 0.6 }}>
//       <AnimatePresence mode='popLayout'>
//         {!commentExpanded && (
//           <motion.div
//             initial={{ scale: 0, x: 20 }}
//             animate={{
//               scale: 1,
//               x: 0,
//               transition: { duration: 0.5, type: 'spring' },
//             }}
//             exit={{ scale: 0, transition: { duration: 0.5, type: 'spring' } }}
//             key={'1'}
//             transition={{ duration: 0.3, type: 'spring' }}
//             className='text-gray-500 hover:text-green-700 group cursor-pointer'
//           >
//             <IconArrowsDiagonal
//               className='mr-2 group-hover:scale-110 transition-all duration-150'
//               onClick={expandComment}
//             />
//           </motion.div>
//         )}

//         <div className='flex items-center'>
//           <Avatar size='md' radius='xl' className='mr-1' color={'green'}>
//             <IconBrandReddit size='30' />
//           </Avatar>
//           <p className='text-sm'>
//             <span className='font-semibold '>{authorUsername}</span>
//             {isAuthor && (
//               <>
//                 <span className='mx-1'>·</span>
//                 <span className='font-bold text-blue-600 text-[.9rem]'>
//                   Author
//                 </span>
//               </>
//             )}
//             <span className=''>
//               <span className='mx-1'>·</span>
//               <span className='text-xs font-medium'>{datePosted}</span>
//             </span>
//           </p>
//         </div>
//       </AnimatePresence>
//     </motion.div>
//   );
// }

function VerticalCollapsibleLine({ onClick }: { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className='flex justify-center group relative w-7 cursor-pointer'
    >
      <div
        className='h-full absolute 
        transition-all
        duration-200
        border-l-[.2rem]
      border-gray-300
        group-hover:scale-x-150
      group-hover:border-green-700
      '
      ></div>
    </div>
  );
}

export default Comment;
