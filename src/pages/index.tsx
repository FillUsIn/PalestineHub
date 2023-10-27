import { getTopics } from '@/api/topics';
import TopPosts from '@/components/TopPosts/TopThreePosts';
import { Topic } from '@/types/dtos';
import { Button, SegmentedControl } from '@mantine/core';
import { useRouter } from 'next/router';
import { useState } from 'react';

type Tab = string;

type Props = {
  topics: Topic[];
};

function Home({ topics }: Props) {
  const [resultTypes, setResultTypes] = useState<Tab[]>(
    topics ? topics.map((topic) => topic.title) : ['']
  );
  const [selectedTab, setSelectedTab] = useState<Tab>(resultTypes[0]);

  const router = useRouter();

  return (
    <div>
      <div className='md:flex md:justify-between'>
        <h1 className='mx-auto text-center text-4xl font-black leading-tight sm:text-5xl md:mx-0 md:text-start md:text-6xl lg:max-w-3xl'>
          Ultimate Resources Hub for the
          <span className='text-black'> PAL</span>
          <span className='text-[#E42525]'>EST</span>
          <span className='text-[#007A3D]'>INE </span>
          Cause
        </h1>
        <div className='mt-10 flex justify-center md:mt-0 md:self-center'>
          <Button
            onClick={() => router.push('/resources')}
            radius={'xl'}
            color='dark'
            size={'lg'}
            hiddenFrom='sm'
          >
            Learn more
          </Button>
          <Button
            onClick={() => router.push('/resources')}
            radius={'xl'}
            color='dark'
            size={'xl'}
            visibleFrom='sm'
          >
            Learn more
          </Button>
        </div>
      </div>
      <SegmentedControl
        data={resultTypes}
        value={selectedTab}
        onChange={(value) => setSelectedTab(value)}
        fullWidth
        color='#007A3D'
        size='md'
        className='mt-10'
        radius={'xl'}
      />

      {topics && topics.length ? (
        <TopPosts
          tab={selectedTab}
          topPosts={
            topics.find((topic) => topic.title === selectedTab)?.topPosts || []
          }
        />
      ) : (
        <p>Error displaying topics</p>
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const topics = await getTopics();
  console.log(topics);
  return {
    props: {
      topics,
    },
  };
}

export default Home;
