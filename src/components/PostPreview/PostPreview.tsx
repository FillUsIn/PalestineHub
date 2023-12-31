import { PostSummaryDTO } from '@/types/dtos';
import { Post } from '@/types/entities';
import { Button, Paper, Title } from '@mantine/core';
import Link from 'next/link';

type PostPreviewProps = {
  post: PostSummaryDTO;
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
      className='flex h-80 md:w-1/3 flex-col justify-center items-center overflow-hidden transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 hover: duration-300'
      component={Link}
      href={`/resources/${categoryName}/${subcategoryName}/posts/${id}`}
      radius='lg'
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1)), url(${thumbnailUrl})`,
        backgroundSize: '100% auto',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className='flex h-full flex-col justify-between bg-gradient-to-b from-[#141414eb] to-90% p-5'>
        <div>
          <Title order={2} className='text-white'>
            {post.title}
          </Title>
        </div>
      </div>
    </Paper>
  );
};

export default PostPreview;
