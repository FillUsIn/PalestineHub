'use client';

import React from 'react';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import {
  Button,
  TextInput,
  PasswordInput,
  Stack,
  Box,
  Text,
} from '@mantine/core';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export const SignIn = () => {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
  });

  const [visible, { toggle }] = useDisclosure(false);

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    const { username, password } = form.values;
    await signIn('credentials', {
      username,
      password,
      redirect: true,
      callbackUrl: '/',
    });
  };

  return (
    <Box
      component='form'
      className='flex flex-col gap-6'
      maw={340}
      mx='auto'
      onSubmit={handleSubmit}
    >
      <TextInput
        withAsterisk
        label='Email'
        placeholder='your@email.com'
        {...form.getInputProps('username')}
      />
      <PasswordInput
        withAsterisk
        label='Password'
        visible={visible}
        onVisibilityChange={toggle}
        error={form.errors.password}
        {...form.getInputProps('password')}
      />
      <Stack justify='center'>
        <Button variant='filled' type='submit'>
          Login
        </Button>
        <Text className='text-center'>OR</Text>
        <Button variant='outline' onClick={() => router.push('/auth/signup')}>
          Sign Up
        </Button>
      </Stack>
    </Box>
  );
};
