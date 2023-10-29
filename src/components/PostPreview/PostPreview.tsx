import { PostSummaryDTO } from '@/types/dtos';
import { Post } from '@/types/entities';
import { Button, Paper, Title } from '@mantine/core';

type PostPreviewProps = {
  post: Post | PostSummaryDTO;
  previewMode?: boolean;
};

const PostPreview: React.FC<PostPreviewProps> = ({
  post,
  previewMode = false,
}) => {
  const {
    body,
    categoryName,
    id,
    subcategoryName: subcategoryName,
    thumbnailUrl,
  } = post;

  return (
    <Paper
      className='flex h-96 w-full flex-col justify-center items-center overflow-hidden transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover: duration-300'
      component={Link}
      href={`/resources/${categoryName}/${subcategoryName}/posts/${id}`}
      radius='lg'
      style={{ backgroundImage: `url(${post.thumbnailUrl})` }}
      className='flex h-96 flex-col justify-between overflow-hidden'
    >
      <div className='flex h-full flex-col justify-between bg-gradient-to-b from-[#141414eb] to-90% p-5'>
        <div>
          <Title order={2} className='text-white'>
            {post.title}
          </Title>
          {!previewMode && (
            <p className='mt-3 font-semibold text-white'>{post.body}</p>
          )}
        </div>
        {!previewMode && (
          <Button variant='white' color='dark' className=''>
            Read post
          </Button>
        )}
      </div>
    </Paper>
  );
};

export default PostPreview;
