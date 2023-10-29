import NextAuth from 'next-auth';

declare module 'next-auth' {
  type User = {
    accessToken: string;
  };
}
