import React from 'react';
import { getCategoryPosts } from '@/api/posts';
import { PostSummaryDTO } from '@/types/dtos';
import { useDisclosure } from '@mantine/hooks';
import { Anchor, Button, Divider, Modal, Title } from '@mantine/core';
import CreatePostForm from '../../../components/CreatePostForm';
import PostSummaryItemList from '../../../components/PostSummaryItemList/PostSummaryItemList';
import TopPost from '../../../components/TopPosts/TopPost';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { NavbarNested } from '@/components/SideNav/NavbarNested';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

type Props = {
  categoryPosts: PostSummaryDTO[];
};

const numberOfTopPosts = 3;
const postsPerPage = 10;

function CategoryPage({ categoryPosts }: Props) {
  const [opened, { close, open }] = useDisclosure(false);
  const router = useRouter();
  const { data: session } = useSession();
  const items = [
    { title: 'Resources', href: '/resources' },
    { title: categoryPosts[0].categoryName, href: '#' },
  ];

  const handleSubmitResourceClick = () => {
    if (!session) {
      router.push('/auth/signup');
      return;
    }
    return open;
  };

  return (
    <>
      <div className='flex justify-center'>
        <div className='pr-5'>
          <NavbarNested />
        </div>
        <div className='flex flex-grow flex-col'>
          <Modal
            classNames={{ body: 'md:mx-5' }}
            opened={opened}
            onClose={close}
            centered
            withCloseButton={false}
          >
            <CreatePostForm onDismiss={close} />
          </Modal>
          <div className='flex flex-col md:flex-row '>
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
            {categoryPosts &&
              categoryPosts
                .slice(0, numberOfTopPosts)
                .map((post) => <TopPost post={post} key={post.id} />)}
          </div>

          <Divider className='my-5' size={'xl'} />
          {categoryPosts.length > 3 && (
            <Title order={2} mt={10} mb={20}>
              Other resources:
            </Title>
          )}
          <PostSummaryItemList posts={categoryPosts.slice(numberOfTopPosts)} />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: {
  params: { category: any };
}) {
  const category = context.params.category;
  const categoryPosts = (await getCategoryPosts(category, 0, postsPerPage))
    .content;
  console.log(categoryPosts);
  return {
    props: {
      categoryPosts,
    },
  };
}

export default CategoryPage;
