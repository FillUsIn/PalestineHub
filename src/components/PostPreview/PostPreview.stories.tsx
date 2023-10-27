import type { Meta, StoryObj } from '@storybook/react';

import { Post } from '@/types/entities';
import PostPreview from './PostPreview';

const examplePost: Post = {
  id: 'post1',
  title: 'Post title',
  body: 'Post body',
  voteCount: 5,
  createdAt: new Date().toDateString(),
  username: 'testuser',
  url: '/testpost',
  thumbnailUrl: '',
  userLikes: [
    {
      username: 'user1',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    },
  ],
  userDislikes: [
    {
      username: 'user2',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    },
  ],
};

const meta: Meta<typeof PostPreview> = {
  component: PostPreview,
  argTypes: {
    post: {
      id: {
        control: 'text',
      },
      title: {
        control: 'text',
      },
      body: {
        control: 'text',
      },
      voteCount: {
        control: {
          type: 'number',
          min: 0,
        },
      },
      createdAt: {
        control: 'date',
      },
      username: {
        control: 'text',
      },
      url: {
        control: 'text',
      },
      thumbnailUrl: {
        control: 'text',
      },
      userLikes: {
        control: 'object',
      },
      userDislikes: {
        control: 'object',
      },
    },
  },
  args: {
    post: examplePost,
  },
};

export default meta;

type Story = StoryObj<typeof PostPreview>;

export const Primary: Story = {
  render: () => <PostPreview post={examplePost} />,
};
