import type { Meta, StoryObj } from '@storybook/react';

import { NavbarNested } from './NavbarNested';

const meta: Meta<typeof NavbarNested> = {
  component: NavbarNested,
};

export default meta;

type Story = StoryObj<typeof NavbarNested>;

export const Primary: Story = {
  render: () => <NavbarNested />,
};
