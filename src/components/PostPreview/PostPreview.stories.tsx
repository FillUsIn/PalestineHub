import type { Meta, StoryObj } from '@storybook/react';

import { examplePost } from '../../__dummydata/post';
import PostPreview from './PostPreview';

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
    //@ts-ignore // TODO: fix typing to PostSummaryDTO
    post: examplePost,
  },
};

export default meta;

type Story = StoryObj<typeof PostPreview>;

export const Primary: Story = {
  //@ts-ignore // TODO: fix typing to PostSummaryDTO
  render: () => <PostPreview post={examplePost} />,
};
