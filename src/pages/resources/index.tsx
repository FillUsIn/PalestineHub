import CreatePostForm from '@/components/CreatePostForm';
import PostSummaryItemList from '@/components/PostSummaryItemList/PostSummaryItemList';
import TopPost from '@/components/TopPosts/TopPost';
import { PagedResponse, PostSummaryDTO } from '@/types/dtos';
import { Button, Divider, Modal, Pagination, Title } from '@mantine/core';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';
import { getAllPosts } from '../../api/posts';
import { Category, Post } from '@/types/entities';
import { NavbarNested } from '@/components/SideNav/NavbarNested';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { getCategories } from '@/api/categories';

type Props = {
  paginatedPosts: PagedResponse<PostSummaryDTO>;
  categories: Category[];
};

const numberOfTopPosts = 3;
const postsPerPage = 10;

function Resources({ paginatedPosts, categories }: Props) {
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
      <div className='grid md:grid-cols-4'>
        <div className='col-span-1 hidden md:block  md:border-r-2 md:mr-10 md:pr-2'>
          <NavbarNested />
        </div>
        <div className='col-span-3 '>
          <Modal
            classNames={{ body: 'md:mx-5' }}
            opened={opened}
            onClose={close}
            centered
            withCloseButton={false}
          >
            <CreatePostForm categories={categories} onDismiss={close} />
          </Modal>
          <div className='flex flex-col md:flex-row justify-between'>
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
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const paginatedPosts = await getAllPosts(0, postsPerPage);
  const categories = await getCategories();

  return {
    props: {
      paginatedPosts,
      categories,
    },
  };
}

export default Resources;
