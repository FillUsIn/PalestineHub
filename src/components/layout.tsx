import { login } from '@/api/users';
import { AppShell, Burger, Button, Group, Tabs, em } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Children, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
const inter = Inter({ subsets: ['latin'] });

function Layout({ children }: Props) {
  const [opened, { toggle }] = useDisclosure();
  const isMobile = useMediaQuery(`(max-width: ${em(767)})`);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened, desktop: true },
      }}
      py={'xl'}
      // style={{
      //   backgroundImage: "url(hero-bg.png)",
      // }}
      className={`mx-auto max-w-6xl px-7 xl:px-0 ${inter.className}`}
    >
      <AppShell.Header withBorder={false}>
        <Group
          className='mx-auto  h-full max-w-6xl px-7 xl:px-0'
          justify='space-between'
        >
          <Link href='/'>
            <p className='space-x-1 text-2xl font-black'>
              <span>Fill</span>
              <span className='text-red-700'>Us</span>
              <span className='text-green-800'>In</span>
            </p>
          </Link>

          {!isMobile && (
            <>
              <Tabs color='green'>
                <Tabs.List>
                  <Tabs.Tab value='resources' className='mr-0'>
                    <Link href='/resources' className='cursor-pointer'>
                      Resources
                    </Link>
                  </Tabs.Tab>
                  <Tabs.Tab value='education' className='mr-0'>
                    <Link
                      href='/resources/education'
                      className='cursor-pointer'
                    >
                      Education
                    </Link>
                  </Tabs.Tab>
                  <Tabs.Tab value='tools' className='mr-0'>
                    <Link href='/resources/tools' className='cursor-pointer'>
                      Tools
                    </Link>
                  </Tabs.Tab>
                  <Tabs.Tab value='charities' className='mr-0'>
                    <Link
                      href='/resources/charities'
                      className='cursor-pointer'
                    >
                      Charities
                    </Link>
                  </Tabs.Tab>
                </Tabs.List>
              </Tabs>
              <Button
                radius={'xl'}
                fw={'bolder'}
                size='sm'
                color='dark'
                onClick={() =>
                  login({ username: 'admin', password: 'password' })
                }
              >
                Sign in
              </Button>
            </>
          )}

          <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='md' />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p='xs' className='mb-5'>
        <ul className='flex flex-col space-y-6 pl-8 text-2xl font-small'>
          <Link href='/resources' className='cursor-pointer'>
            Resources
          </Link>
          <Link href='/resources/education' className='cursor-pointer'>
            Education
          </Link>
          <Link href='/resources/tools' className='cursor-pointer'>
            Tools
          </Link>
          <Link href='/resources/charities' className='cursor-pointer'>
            Charities
          </Link>
          <hr />
          <Button
            w={'100%'}
            radius={'xl'}
            fw={'bold'}
            size='compact-xl'
            color='dark'
          >
            Sign in
          </Button>
        </ul>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

export default Layout;
