import { AppShell, Burger, Button, Group, em } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { Logo100 } from '../img/Logo';

type Props = {
  children: ReactNode;
};
const inter = Inter({ subsets: ['latin'] });

function Layout({ children }: Props) {
  const [opened, { toggle }] = useDisclosure();
  const isMobile = useMediaQuery(`(max-width: ${em(767)})`);

  return (
    <AppShell
      header={{ height: 130 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened, desktop: true },
      }}
      py={'xl'}
      className={`mx-auto max-w-6xl px-7 xl:px-0 ${inter.className}`}
    >
      <AppShell.Header withBorder={false}>
        <Group
          className='mx-auto  h-full max-w-6xl px-7 xl:px-0'
          justify='space-between'
        >
          <Link href='/'>
            <p className='space-x-1'>
              <Logo100 />
            </p>
          </Link>

          {!isMobile && (
            <>
              <Group className='space-x-10 text-lg font-semibold'>
                <Link href='/resources/education' className='cursor-pointer'>
                  Education
                </Link>
                <Link href='/resources/tools' className='cursor-pointer'>
                  Tools
                </Link>
                <Link href='/resources/charities' className='cursor-pointer'>
                  Charities
                </Link>
              </Group>
              <AuthActionButton />
            </>
          )}

          <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='md' />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p='md' className='mb-5'>
        <ul className='flex flex-col space-y-6 pl-4 text-2xl font-medium'>
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
          <AuthActionButton />
        </ul>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

export default Layout;

const CustomButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick: VoidFunction;
}) => {
  return (
    <Button
      radius={'xl'}
      fw={'bolder'}
      size='sm'
      color='dark'
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

const AuthActionButton = () => {
  const { data: session } = useSession();

  const handleSignIn = () => signIn();
  const handleSignOut = () => signOut();
  return session ? (
    <CustomButton text='Sign Out' onClick={handleSignOut} />
  ) : (
    <CustomButton text='Sign In' onClick={handleSignIn} />
  );
};
