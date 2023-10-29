import { AppShell, Burger, Button, Group, Tabs, em } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { Logo75 } from '../../img/Logo';
import { useRouter } from 'next/router';
import styles from './Layout.module.css';

type Props = {
  children: ReactNode;
};
const inter = Inter({ subsets: ['latin'] });

function Layout({ children }: Props) {
  const [opened, { toggle }] = useDisclosure();
  const isMobile = useMediaQuery(`(max-width: ${em(767)})`);
  const router = useRouter();

  const isSelected = (section: string) => {
    const isCategoryEmpty = !router.query.category;
    if (isCategoryEmpty && router.asPath.replace(/\//g, '') !== section)
      return '';
    if (isCategoryEmpty && section === 'resources') return styles.isSelected;
    if (router.query.category !== section) return '';
    return styles.isSelected;
  };
  return (
    <AppShell
      header={{ height: 100 }}
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
              <Logo75 />
            </p>
          </Link>

          {!isMobile && (
            <>
              <Group
                className={`space-x-10 text-lg font-semibold ${styles.navigation}`}
              >
                <Link
                  href='/resources/news'
                  className={isSelected('resources')}
                >
                  News
                </Link>
                <Link
                  href='/resources/education'
                  className={isSelected('education')}
                >
                  Education
                </Link>
                <Link
                  href='/resources/charities'
                  className={isSelected('charities')}
                >
                  Charities
                </Link>
                <Link href='/resources/tools' className={isSelected('tools')}>
                  Tools
                </Link>
              </Group>
              <AuthActionButton />
            </>
          )}

          <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='md' />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p='md' className='mb-5'>
        <ul
          className={`flex flex-col space-y-6 pl-4 text-2xl font-medium ${styles.navigation}`}
        >
          <Link href='/resources' className={isSelected('resources')}>
            Resources
          </Link>
          <Link href='/resources/education' className={isSelected('education')}>
            Education
          </Link>
          <Link href='/resources/charities' className={isSelected('charities')}>
            Charities
          </Link>
          <Link href='/resources/tools' className={isSelected('tools')}>
            Tools
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
