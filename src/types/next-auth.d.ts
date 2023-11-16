import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken?: string;
      iat?: number;
      exp?: number;
      jti?: string;
      [x: string]: any;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    iat?: number;
    exp?: number;
    jti?: string;
    [x: string]: any;
  }
}
