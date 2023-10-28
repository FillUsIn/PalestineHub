'use client';

import React from 'react';
import { useForm, isEmail, hasLength } from '@mantine/form';
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
import { createUserAccount } from '@/api/user';

export const SignUp = () => {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: isEmail('Invalid email'),
      password: hasLength(
        { min: 5, max: 16 },
        'Password must be 5-16 characters long'
      ),
    },
  });

  const [visible, { toggle }] = useDisclosure(false);

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const { email: username, password } = form.values;
    await createUserAccount({ username, password });
  };

  return (
    <Box component='form' maw={340} mx='auto' onSubmit={handleSubmit}>
      <TextInput
        withAsterisk
        label='Email'
        placeholder='your@email.com'
        mt='md'
        {...form.getInputProps('email')}
      />
      <PasswordInput
        withAsterisk
        label='Password'
        visible={visible}
        onVisibilityChange={toggle}
        mt='md'
        {...form.getInputProps('password')}
      />
      <Stack mt='md' justify='center'>
        <Button variant='filled' type='submit'>
          Signup
        </Button>
        <Text className='text-center'>OR</Text>
        <Button variant='outline' onClick={() => router.push('/auth/login')}>
          Login
        </Button>
      </Stack>
    </Box>
  );
};
