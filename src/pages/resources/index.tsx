import CreatePostForm from '@/components/CreatePostForm';
import PostSummaryItemList from '@/components/PostSummaryItemList/PostSummaryItemList';
import TopPost from '@/components/TopPosts/TopPost';
import { PagedResponse, PostSummaryDTO } from '@/types/dtos';
import { Button, Divider, Modal, Pagination, Title } from '@mantine/core';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { getAllPosts } from '../../api/posts';
import { Post } from '@/types/entities';
import { NavbarNested } from '@/components/SideNav/NavbarNested';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

type Props = {
  paginatedPosts: PagedResponse<PostSummaryDTO>;
};

const numberOfTopPosts = 3;
const postsPerPage = 10;

function Resources({ paginatedPosts }: Props) {
  const [opened, { close, open }] = useDisclosure(false);
  const items = [{ title: 'Resources', href: '#' }];
  const { data: session } = useSession();
  const router = useRouter();

  const posts = paginatedPosts.content || [];

  const handleSubmitResourceClick = () => {
    if (!session) {
      router.push('/auth/signup');
      return;
    }
    return open();
  };

  return (
    <>
      <div className='flex justify-center'>
        <div className='pr-5'>
          <NavbarNested />
        </div>
        <div className='flex flex-col'>
          <Modal
            classNames={{ body: 'md:mx-5' }}
            opened={opened}
            onClose={close}
            centered
            withCloseButton={false}
          >
            <CreatePostForm onDismiss={close} />
          </Modal>
          <div className='flex flex-col  justify-between md:flex-row '>
            <Breadcrumbs items={items} />
            <Button
              onClick={handleSubmitResourceClick}
              fw={'bolder'}
              radius='lg'
              color='dark'
              size='sm'
              className='mt-5 md:mt-0'
            >
              Submit a resource
            </Button>
          </div>
          <Title order={2} mt={30}>
            Top 3 resources
          </Title>
          <div className='mt-5 justify-between space-y-4 md:flex md:gap-5 md:space-y-0'>
            {posts &&
              posts
                .slice(0, numberOfTopPosts)
                .map((post) => <TopPost post={post} key={post.id} />)}
          </div>
          <Divider className='my-5' size={'xl'} />
          {posts.length > 3 && (
            <Title order={2} mt={10} mb={20}>
              Other resources:
            </Title>
          )}
          <PostSummaryItemList posts={posts.slice(numberOfTopPosts)} />
          <Pagination
            total={paginatedPosts.totalPages}
            color='#337a00'
            size='lg'
            radius='md'
          />
          ;
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const paginatedPosts = await getAllPosts(0, postsPerPage);
  return {
    props: {
      paginatedPosts,
    },
  };
}

export default Resources;
