import React from 'react';
import { useForm, hasLength, isEmail } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { Button, TextInput, PasswordInput, Box, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { generateUsername } from 'unique-username-generator';
import { CreateUserResponseDTO } from '../../types/dtos';

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
        const response = await fetch('/api/signup', {
          method: 'POST',
          body: JSON.stringify({ ...values, username }),
        });

        if (response.status !== 201) {
          notifications.show({
            title: 'Error Signing Up',
            message: 'User might be already already.',
            color: 'red',
          });
          return;
        }

        notifications.show({
          title: 'Success',
          message: 'Sign Up Successful',
          color: 'green',
        });
        router.push('/auth/signin');
      } catch (error) {
        console.log(error);
      }
    });
  };

  const inputErrorStyles: React.CSSProperties = { color: '#ffd700' };

  return (
    <Box maw={745} className='flex flex-col gap-8' mx='auto'>
      <form
        className='bg-[#3D9A6B] px-24 py-8 flex flex-col gap-8 rounded-xl'
        onSubmit={handleSubmit()}
      >
        <Box className='flex flex-col justify-center text-center gap-2 text-white'>
          <Text fw='bolder' fz='48px'>
            Register
          </Text>
          <Text fw='normal' fz='md'>
            Register to unlock features such as Add Resource, Upvote, and
            Comment
          </Text>
        </Box>

        <TextInput
          placeholder='Email address'
          size='lg'
          radius='md'
          styles={{
            error: inputErrorStyles,
          }}
          {...form.getInputProps('email')}
        />

        <PasswordInput
          placeholder='Password'
          visible={visible}
          onVisibilityChange={toggle}
          size='lg'
          radius='md'
          styles={{
            error: inputErrorStyles,
          }}
          {...form.getInputProps('password')}
        />
        <Box mx='auto' w={200}>
          <Button
            w='100%'
            variant='filled'
            radius='xl'
            color='white'
            c='green'
            size='lg'
            type='submit'
          >
            Register
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
          onClick={() => router.push('/auth/signin')}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};
