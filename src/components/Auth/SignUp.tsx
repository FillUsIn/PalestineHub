'use client';

import React from 'react';
import { useForm, hasLength, isEmail } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import {
  Button,
  TextInput,
  PasswordInput,
  Stack,
  Box,
  Text,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { createUserAccount } from '@/api/users';
import { generateUsername } from 'unique-username-generator';

export const SignUp = () => {
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
      const username = generateUsername('', 2, 15);
      try {
        const user = await createUserAccount({ ...values, username });
        if (user) {
          notifications.show({
            title: 'Success',
            message: 'Sign Up Successful',
            color: 'green',
          });
          router.push('/auth/signin');
        }
      } catch (error) {
        notifications.show({
          title: 'Error Signing Up',
          message: 'User might be already taken.',
          color: 'red',
        });
      }
    });
  };

  return (
    <Box
      component='form'
      maw={340}
      mx='auto'
      onSubmit={handleSubmit()}
      className='flex flex-col gap-6'
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
