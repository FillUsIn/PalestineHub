import { Inter, Poppins } from "next/font/google";
import { AppShell, Burger, Button, Group, SegmentedControl, em } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { TopPicks } from "@/components/TopPicks/TopPicks";

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
