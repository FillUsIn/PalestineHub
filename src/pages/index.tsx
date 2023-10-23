import Head from "next/head";
import { Button, SegmentedControl } from "@mantine/core";
import { useState } from "react";
import { useRouter } from "next/router";
import { TopPicks } from "@/components/TopPicks/TopPicks";

type Tab = string;

export default function Home() {
  const [resultTypes] = useState<Tab[]>(["New to the cause?", "BDS", "Donate"]);
  const [selectedTab, setSelectedTab] = useState<Tab>("New to the cause?");

  const router = useRouter();

  return (
    <div>
      <Head>
        <title>Fill Us In | Information and resources for Palestine</title>
      </Head>
      <div className='md:flex'>
        <h1 className='text-4xl  mx-auto text-center font-black leading-tight lg:max-w-3xl md:text-6xl md:text-start md:mx-0 sm:text-5xl'>
          Everything you need to know to aid the Palestinian cause.
        </h1>
        <div className='flex justify-center mt-10 md:mt-0'>
          <Button onClick={() => router.push("/resources")} radius={"xl"} color='dark' size='lg'>
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
      <TopPicks tab={selectedTab} />
    </div>
  );
}
