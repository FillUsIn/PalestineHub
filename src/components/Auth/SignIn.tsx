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
    <Box maw={745} className='flex flex-col gap-8' mx='auto'>
      <form
        className='border border-[#3D9A6B] px-24 py-8 flex flex-col gap-8 rounded-xl'
        onSubmit={handleSubmit()}
      >
        <Box className='flex flex-col justify-center text-center gap-2 text-slate-700'>
          <Text fw='bolder' fz='48px'>
            Login
          </Text>
        </Box>

        <TextInput
          placeholder='Email address'
          size='lg'
          radius='md'
          {...form.getInputProps('email')}
        />
        <PasswordInput
          placeholder='Password'
          visible={visible}
          onVisibilityChange={toggle}
          size='lg'
          radius='md'
          {...form.getInputProps('password')}
        />
        <Box mx='auto' w={200}>
          <Button
            variant='filled'
            w='100%'
            radius='xl'
            color='#3D9A6B'
            size='lg'
            type='submit'
          >
            Login
          </Button>
        </Box>
      </form>
      <Box
        mx='auto'
        className='flex flex-col items-center content-center gap-8'
      >
        <Text fw='bold' fz='md'>
          OR
        </Text>
        <Button
          variant='outline'
          color='#3D9A6B'
          radius='xl'
          size='lg'
          onClick={() => router.push('/auth/signup')}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};
