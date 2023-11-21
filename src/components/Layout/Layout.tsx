import { AppShell, Burger, Button, Group, Tabs, em } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import React, { ReactNode, useEffect, useState } from 'react';
import { Logo50, Logo75 } from '../../img/Logo';
import { useRouter } from 'next/router';
import styles from './Layout.module.css';
import useIsMobile from '@/hooks/useIsMobile';
import { NavbarNested } from '../SideNav/NavbarNested';
import { usePathname } from 'next/navigation';

type Props = {
  children: ReactNode;
};
const inter = Inter({ subsets: ['latin'] });

function Layout({ children }: Props) {
  const [opened_navBar, { toggle, close: closeNavBar, open: openNavBar }] =
    useDisclosure();
  const isMobile = useIsMobile();
  const router = useRouter();

  const isSelected = (section: string) => {
    if (router.query.category !== section) return '';
    return styles.isSelected;
  };

  const pathname = usePathname();


  if (typeof window !== 'undefined') {
    if (opened_navBar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  useEffect(() => {
    closeNavBar(); // Close the navigation panel
  }, [pathname, closeNavBar]);

  return (
    <AppShell
      header={{ height: isMobile ? 70 : 100 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened_navBar, desktop: true },
      }}
      pt={'lg'}
      pb={100}
      className={`mx-auto max-w-6xl px-7 xl:px-0 ${inter.className}`}
    >
      <AppShell.Header withBorder={false}>
        <Group
          className='mx-auto my-3 max-w-6xl px-7 xl:px-0'
          justify='space-between'
        >
          <Link href='/'>
            <p className='space-x-1'>{isMobile ? <Logo50 /> : <Logo75 />}</p>
          </Link>

          {!isMobile && (
            <>
              <Group
                className={`space-x-10 text-lg font-semibold ${styles.navigation}`}
              >
                <Link href='/resources/news' className={isSelected('news')}>
                  News
                </Link>
                <Link
                  href='/resources/education'
                  className={isSelected('education')}
                >
                  Education
                </Link>
                <Link href='/resources/tools' className={isSelected('tools')}>
                  Tools
                </Link>
                <Link
                  href='/resources/charities'
                  className={isSelected('charities')}
                >
                  Charities
                </Link>
              </Group>
              <AuthActionButton />
            </>
          )}

          <Burger
            opened={opened_navBar}
            onClick={toggle}
            hiddenFrom='sm'
            size='md'
          />
        </Group>
      </AppShell.Header>


      <AppShell.Navbar p='md' className='mb-5'>
        <NavbarNested />
        <AuthActionButton className='mt-10' />
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

export default Layout;

const CustomButton = ({
  text,
  onClick,
  className,
}: {
  text: string;
  onClick: VoidFunction;
  className?: string;
}) => {
  return (
    <Button
      radius={'xl'}
      fw={'bolder'}
      size='sm'
      color='dark'
      onClick={onClick}
      className={className}
    >
      {text}
    </Button>
  );
};

const AuthActionButton = ({ className }: { className?: string }) => {
  const { data: session } = useSession();

  const handleSignIn = () => signIn();
  const handleSignOut = () => signOut();
  return session ? (
    <CustomButton
      className={className ?? ''}
      text='Sign Out'
      onClick={handleSignOut}
    />
  ) : (
    <CustomButton className={className} text='Sign In' onClick={handleSignIn} />
  );
};
