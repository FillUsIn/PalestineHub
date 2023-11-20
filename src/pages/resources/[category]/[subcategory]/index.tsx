import React from 'react';
import { getSubcategoryPosts } from '../../../../api/posts';
import { PostSummaryDTO } from '../../../../types/dtos';
import { Modal, Button, Title, Divider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import CreatePostForm from '../../../../components/CreatePostForm';
import PostSummaryItemList from '../../../../components/PostSummaryItemList/PostSummaryItemList';
import TopPost from '../../../../components/TopPosts/TopPost';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { NavbarNested } from '@/components/SideNav/NavbarNested';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { getCategories } from '@/api/categories';
import { Category } from '@/types/entities';

type Props = {
  subcategoryPosts: PostSummaryDTO[];
  categories: Category[];
};

const numberOfTopPosts = 3;
const postsPerPage = 10;

function SubCategoryPage({ subcategoryPosts, categories }: Props) {
  const [opened, { close, open }] = useDisclosure(false);
  const router = useRouter();
  const { data: session } = useSession();

  const items = [
    { title: 'Resources', href: '/resources' },
    {
      title: subcategoryPosts[0]?.categoryName,
      href: `/resources/${subcategoryPosts[0]?.categoryName}`,
    },
    { title: subcategoryPosts[0]?.subcategoryName, href: '#' },
  ];

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
        <div className='col-span-3'>
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
            {subcategoryPosts &&
              subcategoryPosts
                .slice(0, numberOfTopPosts)
                .map((post) => <TopPost post={post} key={post.id} />)}
          </div>

          <Divider className='my-5' size={'xl'} />
          {subcategoryPosts.length > 3 && (
            <Title order={2} mt={10} mb={20}>
              Other resources:
            </Title>
          )}
          <PostSummaryItemList
            posts={subcategoryPosts.slice(numberOfTopPosts)}
          />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: {
  params: { subcategory: any };
}) {
  const subcategoryName = context.params.subcategory;
  const subcategoryPosts = (
    await getSubcategoryPosts(subcategoryName, 0, postsPerPage)
  ).content;
  const categories = await getCategories();

  return {
    props: {
      subcategoryPosts,
      categories,
    },
  };
}
export default SubCategoryPage;
