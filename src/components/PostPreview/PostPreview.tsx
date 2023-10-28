import { PostSummaryDTO } from '@/types/dtos';
import { Post } from '@/types/entities';
import { Button, Paper, Title } from '@mantine/core';
import Link from 'next/link';

type PostPreviewProps = {
  post: Post | PostSummaryDTO;
  previewMode?: boolean;
};

const PostPreview: React.FC<PostPreviewProps> = ({
  post,
  previewMode = false,
}) => {
  const { body, categoryName, id, subCategoryName, thumbnailUrl } = post;

  return (
    <Paper
      className='flex h-96 flex-col justify-between overflow-hidden hover:ring-sky-500'
      component={Link}
      href={`/resources/${categoryName}/${subCategoryName}${id}`}
      radius='lg'
      shadow='md'
      style={{ backgroundImage: `url(${thumbnailUrl})` }}
      w='100%'
    >
      <div className='flex h-full flex-col justify-between bg-gradient-to-b from-[#141414eb] to-90% p-5'>
        <div>
          <Title order={2} className='text-white'>
            {post.title}
          </Title>
          {!previewMode && (
            <p className='mt-3 font-semibold text-white'>{body}</p>
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
