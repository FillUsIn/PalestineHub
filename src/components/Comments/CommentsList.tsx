import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@/lib/utils/classname';
import Comment from './Comment';
import { Comment as CommentType } from '@/types/entities';
type Props = {
  comments: CommentType[];
  isChild: boolean;
  className?: string;
};

function CommentsList({ comments, className }: Props) {
  return (
    <>
      <motion.ul className={cn('space-y-10 bg-white', className)}>
        <AnimatePresence>
          {comments.map((comment, index) => {
            return (
              <motion.li
                key={comment.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Comment comment={comment} isChild={false} />
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}

export default CommentsList;
