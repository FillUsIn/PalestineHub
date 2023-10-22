import { Inter, Poppins } from "next/font/google";
import { AppShell, Burger, Button, Card, Group, SegmentedControl, Text, em } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import { useEffect, useState } from "react";
import PostPreview from "@/components/PostPreview";
import { PostSummaryDTO } from "@/types";
import Link from "next/link";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ weight: "500", subsets: ["latin-ext"] });

type Tab = string;

export default function Home() {
  const [opened, { toggle }] = useDisclosure();

  const [resultTypes] = useState<Tab[]>(["New to the cause?", "BDS", "Donate"]);
  const [selectedTab, setSelectedTab] = useState<Tab>("New to the cause?");

  const isMobile = useMediaQuery(`(max-width: ${em(767)})`);

  const router = useRouter();

  // useEffect(() => {
  //   fetch("http://FillUsInApi-env.eba-9zxfiijr.eu-west-1.elasticbeanstalk.com/fillUsIn/api");
  // }, []);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened, desktop: true } }}
      pt={"xl"}
      className={`max-w-4xl mx-auto lg:px-0 px-7 ${inter.className}`}
    >
      <AppShell.Header>
        <Group className='h-full px-6 max-w-4xl mx-auto lg:px-0' justify='space-between'>
          <p className='font-black text-2xl space-x-1'>
            <span>Fill</span>
            <span className='text-red-700'>Us</span>
            <span className='text-green-800'>In</span>
          </p>

          {!isMobile && (
            <>
              <Group className='space-x-10 text-lg font-semibold'>
                <Link href='/resources/education' className='cursor-pointer'>
                  Education
                </Link>
                <Link href='/resources/charities' className='cursor-pointer'>
                  Charities
                </Link>
                <Link href='/resources/tools' className='cursor-pointer'>
                  Tools
                </Link>
              </Group>
              <Button radius={"xl"} fw={"bolder"} size='sm' color='black'>
                Sign in
              </Button>
            </>
          )}

          <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='md' />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p='md' className='my-5'>
        <ul className='flex flex-col pl-4 space-y-6 text-2xl font-medium'>
          <Link href='/resources/education' className='cursor-pointer'>
            Education
          </Link>
          <Link href='/resources/charities' className='cursor-pointer'>
            Charities
          </Link>
          <Link href='/resources/tools' className='cursor-pointer'>
            Tools
          </Link>
          <hr />
          <Button w={"100%"} radius={"md"} fw={"bold"} size='compact-xl' color='black'>
            Sign in
          </Button>
        </ul>
      </AppShell.Navbar>

      <AppShell.Main>
        <div className='md:flex'>
          <h1 className='text-5xl mx-auto text-center font-black leading-tight lg:max-w-3xl md:text-6xl md:text-start md:mx-0'>
            Learn the real truth behind the Israel-Palestine conflict.
          </h1>
          <div className='flex justify-center mt-10 md:mt-0'>
            <Button onClick={() => router.push("/resources")} radius={"md"} color='#ba2f2f' size='lg'>
              Learn more
            </Button>
          </div>
        </div>
        <SegmentedControl
          data={resultTypes}
          value={selectedTab}
          onChange={(value) => setSelectedTab(value)}
          fullWidth
          size='lg'
          className='mt-20'
          radius={"xl"}
        />
        <TopPicks tab={selectedTab} />
      </AppShell.Main>
    </AppShell>
  );
}

// const Card = () => {
//   return (
//     <div className='relative rounded-lg overflow-hidden shadow-md'>
//       {/* Background image */}
//       <div
//         className='w-full h-40 bg-cover bg-center'
//         style={{
//           backgroundImage: `url('/top-video.jpeg')`,
//         }}
//       >
//         {/* Black gradient overlay (bottom to top right) */}
//         <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60'></div>

//         {/* Title */}
//         <div className='absolute bottom-4 left-4 text-white text-lg font-semibold'>Card Title</div>
//       </div>

//       {/* Card Content */}
//       <div className='bg-white p-4'>{/* Your card content here */}</div>
//     </div>
//   );
// };

function Panel() {
  return <></>;
}

function CallToActions() {
  return (
    <div className='mt-28 space-y-5 md:gap-5 md:space-y-0 md:flex md:justify-evenly'>
      <div className='hover:bg-gray-300 md:w-full text-center rounded-md p-2 text-lg font-semibold bg-gray-200'>
        Education
      </div>
      <div className='hover:bg-gray-300 md:w-full text-center rounded-md p-2 text-lg font-semibold bg-gray-200'>
        Charities
      </div>
      <div className='hover:bg-gray-300 md:w-full text-center rounded-md p-2 text-lg font-semibold bg-gray-200'>
        Tools
      </div>
    </div>
  );
}

function TopPicks({ tab }: { tab: Tab }) {
  const postSummaries: PostSummaryDTO[] = [
    {
      title: "test title",
      postUrl: "https://fillusin.com/posts/123",
      imageUrl: "/top-video.jpeg",
      body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio, est!",
    },
    {
      title: "another title",
      postUrl: "https://fillusin.com/posts/456",
      imageUrl: "/top-video.jpeg",
      body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio, est!",
    },
    {
      title: "last title",
      postUrl: "https://fillusin.com/posts/789",
      imageUrl: "/child.jpeg",
      body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio, est!",
    },
  ];
  return (
    <>
      <p className='mt-10 font-semibold text-2xl'>Top picks</p>

      <div className='space-y-10 mt-5 md:flex md:justify-between md:gap-5 md:space-y-0'>
        <PostPreview postSummary={postSummaries[0]} />
        <PostPreview postSummary={postSummaries[1]} />
        <PostPreview postSummary={postSummaries[2]} />
        {/* <div className='h-60 bg-gray-100 shadow-inner rounded-lg relative lg:w-full'>
          <Image src={"/top-video.jpeg"} layout='fill' objectFit='cover' alt='top video' className='rounded-lg' />
        </div>
        <div className='h-60 bg-gray-100 shadow-inner rounded-lg relative lg:w-full'>
          <Image src={"/article.jpeg"} layout='fill' objectFit='cover' alt='top video' className='rounded-lg' />
        </div>
        <div className='h-60 bg-gray-100 shadow-inner rounded-lg relative lg:w-full'>
          <Image src={"/child.jpeg"} layout='fill' objectFit='cover' alt='top video' className='rounded-lg' />
        </div> */}
      </div>
    </>
  );
}
