import { PostSummaryDTO } from '@/types/dtos';
import PostPreview from '../PostPreview/PostPreview';
import { Post } from '@/types/entities';

type TopPostProps = {
  post: Post;
};

const TopPost: React.FC<TopPostProps> = ({ post }) => {
  return <PostPreview previewMode post={post} />;
};

export default TopPost;
