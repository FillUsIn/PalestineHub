import { AppShell, Burger, Button, Group, em } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Children, ReactNode } from "react";

type Props = {
  children: ReactNode;
};
const inter = Inter({ subsets: ["latin"] });

function Layout({ children }: Props) {
  const [opened, { toggle }] = useDisclosure();

  const isMobile = useMediaQuery(`(max-width: ${em(767)})`);
  const router = useRouter();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened, desktop: true } }}
      pt={"xl"}
      // style={{
      //   backgroundImage: "url(hero-bg.png)",
      // }}
      className={`max-w-6xl mx-auto lg:px-0 px-7 ${inter.className}`}
    >
      <AppShell.Header withBorder={false}>
        <Group className='h-full  px-6 max-w-4xl mx-auto lg:px-0' justify='space-between'>
          <Link href='/'>
            <p className='font-black text-2xl space-x-1'>
              <span>Fill</span>
              <span className='text-red-700'>Us</span>
              <span className='text-green-800'>In</span>
            </p>
          </Link>

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

      <AppShell.Navbar p='md' className='mb-5'>
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

      <AppShell.Main className='md:mt-20'>{children}</AppShell.Main>
    </AppShell>
  );
}

export default Layout;
