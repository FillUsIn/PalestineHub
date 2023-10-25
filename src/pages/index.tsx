import Head from "next/head";
import { Button, SegmentedControl } from "@mantine/core";
import { useState } from "react";
import { useRouter } from "next/router";
import { TopPicks } from "@/components/TopPicks/TopPicks";
import { getTopics } from "@/api/topics";
import { Topic } from "@/types/dtos";

type Tab = string;

type Props = {
  topics: Topic[];
};

function Home({ topics }: Props) {
  const [resultTypes] = useState<Tab[]>(["New to the cause?", "BDS", "Donate"]);
  const [selectedTab, setSelectedTab] = useState<Tab>("New to the cause?");

  const router = useRouter();

  return (
    <div>
      <div className='md:flex md:justify-between'>
        <h1 className='text-4xl  mx-auto text-center font-black leading-tight lg:max-w-3xl md:text-6xl md:text-start md:mx-0 sm:text-5xl'>
          Everything you need to know to aid the Palestinian cause.
        </h1>
        <div className='flex justify-center mt-10 md:mt-0 md:self-center'>
          <Button
            // styles={{ label: { textDecoration: "underline", textUnderlineOffset: ".3rem" } }}
            onClick={() => router.push("/resources")}
            radius={"xl"}
            color='dark'
            size={"lg"}
            hiddenFrom='sm'
          >
            Learn more
          </Button>
          <Button
            // styles={{ label: { textDecoration: "underline", textUnderlineOffset: ".3rem" } }}
            onClick={() => router.push("/resources")}
            radius={"xl"}
            color='dark'
            size={"xl"}
            visibleFrom='sm'
          >
            Learn more
          </Button>
          {/* color='#ba2f2f' */}
        </div>
      </div>
      <p className='text-center mt-20 font-bold text-2xl md:text-3xl md:text-start'>The quickest way to help</p>
      <SegmentedControl
        data={resultTypes}
        value={selectedTab}
        onChange={(value) => setSelectedTab(value)}
        fullWidth
        size='md'
        className='mt-10'
        radius={"xl"}
      />
      {topics && topics.length ? (
        <TopPicks tab={selectedTab} topPosts={topics[0].topPosts} />
      ) : (
        <p>Error displaying topics</p>
      )}
    </div>
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
