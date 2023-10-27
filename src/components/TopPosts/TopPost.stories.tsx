import type { Meta, StoryObj } from '@storybook/react';

import TopPost from './TopPost';
import { examplePostSummary } from '../../__dummydata/post';

const meta: Meta<typeof TopPost> = {
  component: TopPost,
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
    post: examplePostSummary,
  },
};

export default meta;

type Story = StoryObj<typeof TopPost>;

export const Primary: Story = {
  render: () => <TopPost post={examplePostSummary} />,
};
