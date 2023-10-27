import type { Meta, StoryObj } from '@storybook/react';

import TopPosts from './TopThreePosts';
import { exampleTopPosts } from '../../__dummydata/post';

const meta: Meta<typeof TopPosts> = {
  component: TopPosts,
  argTypes: {
    topPosts: [
      {
        subcategoryName: {
          control: 'text',
        },
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
          commentCount: {
            control: {
              type: 'number',
              min: 0,
            },
          },
          createdDate: {
            control: 'date',
          },
          username: {
            control: 'text',
          },
          thumbnailUrl: {
            control: 'text',
          },
        },
      },
    ],
  },
  args: {
    topPosts: exampleTopPosts,
  },
};

export default meta;

type Story = StoryObj<typeof TopPosts>;

export const Primary: Story = {
  render: () => <TopPosts topPosts={exampleTopPosts} />,
};
