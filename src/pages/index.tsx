import { getTopics } from '@/api/topics';
import TopPosts from '@/components/TopPosts/TopThreePosts';
import useIsMobile from '@/hooks/useIsMobile';
import { PostSummaryDTO, TopPost, Topic } from '@/types/dtos';
import { Button, Paper, SegmentedControl } from '@mantine/core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Carousel } from '@mantine/carousel';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
type Tab = string;

type Props = {
  topics: Topic[];
};

function Home({ topics }: Props) {
  const [resultTypes, setResultTypes] = useState<Tab[]>(
    topics ? topics.slice(0, 3).map((topic) => topic.title) : ['']
  );
  const [selectedTab, setSelectedTab] = useState<Tab>(resultTypes[0]);

  const router = useRouter();
  const isMobile = useIsMobile();

  return (
    <div>
      <div className='md:mt-5 md:flex md:justify-between'>
        <p className='mx-auto text-3xl font-black leading-tight sm:text-5xl md:mx-0 md:text-start md:text-6xl lg:max-w-3xl'>
          Ultimate Resources Hub for the
          <span className='text-black'> PAL</span>
          <span className='text-[#E42525]'>EST</span>
          <span className='text-[#007A3D]'>INE </span>
          Cause
        </p>
        <div className='mt-5 flex md:justify-center md:mt-0 md:self-center'>
          <Button
            onClick={() => router.push('/resources')}
            radius={'xl'}
            color='#007A3D'
            size={'md'}
            hiddenFrom='sm'
          >
            More resources
          </Button>
          <Button
            onClick={() => router.push('/resources')}
            radius={'xl'}
            color='#007A3D'
            size={'xl'}
            visibleFrom='sm'
          >
            More resources
          </Button>
        </div>
      </div>
      <SegmentedControl
        data={resultTypes}
        value={selectedTab}
        onChange={(value) => setSelectedTab(value)}
        orientation={isMobile ? 'vertical' : 'horizontal'}
        fullWidth
        color='#007A3D'
        size='md'
        className={'mt-10 mb-5'}
        classNames={{
          label: isMobile ? 'my-1' : '',
          indicator: isMobile ? 'my-1' : '',
        }}
        styles={{
          label: { fontSize: isMobile ? '' : '1.2rem' },
        }}
        radius={isMobile ? 'lg' : 'xl'}
      />

      {topics && topics.length ? (
        isMobile ? (
          <Topics
            view='carousel'
            topPosts={
              topics.find((topic) => topic.title === selectedTab)?.topPosts ||
              []
            }
          />
        ) : (
          <TopPosts
            topPosts={
              topics.find((topic) => topic.title === selectedTab)?.topPosts ||
              []
            }
          />
        )
      ) : (
        <p>Error displaying topics</p>
      )}
    </div>
  );
}

function Topics({
  topPosts,
  view,
}: {
  topPosts: TopPost[];
  view: 'grid' | 'carousel';
}) {
  if (view == 'carousel')
    return (
      <Carousel
        slideSize='70%'
        align={'start'}
        slideGap='lg'
        withControls={false}
        // classNames={{ root: 'bg-slate-200 p-3 rounded-xl' }}
      >
        {topPosts.map((topPost) => (
          <Carousel.Slide key={topPost.post.id}>
            {/* @ts-ignore // TODO: update to PostSummaryDTO once abdul has done it   in backend */}
            <TopPostPreview post={topPost.post} />
          </Carousel.Slide>
        ))}
      </Carousel>
    );

  return (
    <div className='grid grid-cols-2 gap-2'>
      <AnimatePresence mode='wait'>
        {topPosts.map((topPost) => (
          // @ts-ignore
          <TopPostPreview post={topPost.post} key={topPost.post.id} />
        ))}
      </AnimatePresence>
    </div>
  );
}

type PostPreviewProps = {
  post: PostSummaryDTO;
  previewMode?: boolean;
};

function TopPostPreview({ post, previewMode = false }: PostPreviewProps) {
  const {
    body,
    categoryName,
    id,
    subcategoryName: subcategoryName,
    thumbnailUrl,
    title,
  } = post;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Paper
        className='flex h-80 md:h-96 md:w-1/3 flex-col justify-center items-center overflow-hidden '
        component={Link}
        href={`/resources/${categoryName}/${subcategoryName}/posts/${id}`}
        radius='lg'
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3)), url(${thumbnailUrl})`,
          backgroundSize: 'auto 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <div className='flex h-full flex-col-reverse justify-between px-2 pb-5 bg-gradient-to-t from-[#0f0f0fd2] to-50%'>
          <div>
            <p
              className=' text-white text-base leading-[1.125rem] font-semibold shadow-2xl'
              style={{ textShadow: '1px 2px 3px black' }}
            >
              {title}
            </p>
          </div>
        </div>
      </Paper>
    </motion.div>
  );
}

export async function getServerSideProps() {
  const topics = await getTopics();
  return {
    props: {
      topics,
    },
  };
}

export default Home;
