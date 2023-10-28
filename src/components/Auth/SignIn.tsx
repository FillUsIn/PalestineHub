'use client';

import React from 'react';
import { useForm, isEmail } from '@mantine/form';
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
import { login } from '@/api/user';

export const SignIn = () => {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: isEmail('Invalid email'),
    },
  });

  const [visible, { toggle }] = useDisclosure(false);

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    const { email: username, password } = form.values;
    await login({ username, password });
  };

  return (
    <Box component='form' maw={340} mx='auto' onSubmit={handleSubmit}>
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
        error={form.errors.password}
        {...form.getInputProps('password')}
      />
      <Stack mt='md' justify='center'>
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
