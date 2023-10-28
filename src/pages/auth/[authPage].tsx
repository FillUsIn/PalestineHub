import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { SignIn, SignUp } from '@/components/Auth';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

interface Props {
  authPage: 'signin' | 'signup';
}

const Auth: React.FC<Props> = ({ authPage }) => {
  const route = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    if (session?.user) {
      route.push('/');
    }
  });

  switch (authPage) {
    case 'signup':
      return <SignUp />;
    case 'signin':
      return <SignIn />;
    default:
      return <>Error 404: Page Not Found</>;
  }
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      authPage: params?.authPage,
    },
  };
};

export default Auth;
