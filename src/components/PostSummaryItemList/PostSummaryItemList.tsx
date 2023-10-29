import { motion } from 'framer-motion';
import PostSummaryItem from '../PostSummaryItem/PostSummaryItem';
import { PostSummaryDTO } from '@/types/dtos';

type Props = {
  posts: PostSummaryDTO[];
};

function PostSummaryItemList({ posts }: Props) {
  return (
    <motion.ul className='space-y-2'>
      {posts.map((post, index) => (
        <motion.li
          animate={{ opacity: 1, y: 0 }}
          className='py-2'
          initial={{ opacity: 0, y: 10 }}
          key={post.id}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <PostSummaryItem post={post} />
        </motion.li>
      ))}
    </motion.ul>
  );
}

export default PostSummaryItemList;
