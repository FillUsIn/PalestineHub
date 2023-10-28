'use client';

import React from 'react';
import { hasLength, isEmail, useForm } from '@mantine/form';
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
      email: '',
      password: '',
    },
    validate: {
      email: isEmail('Invalid Email'),
      password: hasLength(
        { min: 6, max: 16 },
        'Password must be 6-16 characters long'
      ),
    },
  });

  const [visible, { toggle }] = useDisclosure(false);

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    return form.onSubmit(async (values) => {
      await signIn('credentials', {
        ...values,
        redirect: true,
        callbackUrl: '/',
      });
    });
  };

  return (
    <Box
      component='form'
      className='flex flex-col gap-6'
      maw={340}
      mx='auto'
      onSubmit={handleSubmit()}
    >
      <TextInput
        withAsterisk
        label='Email'
        placeholder='your@email.com'
        {...form.getInputProps('email')}
      />
      <PasswordInput
        withAsterisk
        label='Password'
        visible={visible}
        onVisibilityChange={toggle}
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
