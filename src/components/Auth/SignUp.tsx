'use client';

import React from 'react';
import { useForm, hasLength } from '@mantine/form';
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
import { createUserAccount } from '@/api/users';

export const SignUp = () => {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      password: hasLength(
        { min: 5, max: 16 },
        'Password must be 5-16 characters long'
      ),
    },
  });

  const [visible, { toggle }] = useDisclosure(false);

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const { username: username, password } = form.values;
    await createUserAccount({ username, password });
  };

  return (
    <Box
      component='form'
      maw={340}
      mx='auto'
      onSubmit={handleSubmit}
      className='flex flex-col gap-6'
    >
      <TextInput
        withAsterisk
        label='Username'
        placeholder='username'
        {...form.getInputProps('username')}
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
          Signup
        </Button>
        <Text className='text-center'>OR</Text>
        <Button variant='outline' onClick={() => router.push('/auth/signin')}>
          Login
        </Button>
      </Stack>
    </Box>
  );
};
