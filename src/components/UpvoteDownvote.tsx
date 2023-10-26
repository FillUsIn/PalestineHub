import React, { useState } from 'react';
import {
  IconArrowBigUp as UpvoteIcon,
  IconArrowBigDown as DownvoteIcon,
} from '@tabler/icons-react';
import { ActionIcon, Group, Text } from '@mantine/core';

interface IconProps {
  bgColor?: string;
  iconColor?: string;
  textColor?: string;
  disable?: boolean;
}

interface Props {
  upvoteConfig?: IconProps;
  downvoteConfig?: IconProps;
  defaultUpvoteCount?: number;
  defaultDownvoteCount?: number;
  onUpvote?: (count?: number) => void;
  onDownvote?: (count?: number) => void;
}

const UpvoteDownvote: React.FC<Props> = ({
  upvoteConfig,
  downvoteConfig,
  defaultUpvoteCount,
  defaultDownvoteCount,
  onUpvote,
  onDownvote,
}) => {
  const upvoteIconColor = upvoteConfig?.disable
    ? '#C5C2C2'
    : upvoteConfig?.iconColor ?? '#3A8E64';
  const downvoteIconColor = downvoteConfig?.disable
    ? '#C5C2C2'
    : downvoteConfig?.iconColor ?? '#FF0000';

  const [upvoteCount, setUpvoteCount] = useState<number>(
    defaultUpvoteCount ?? 0
  );
  const [downvoteCount, setDownvoteCount] = useState<number>(
    defaultDownvoteCount ?? 0
  );
  return (
    <Group gap='md' justify='center' className='w-fit'>
      <Group gap='0'>
        <ActionIcon
          size={20}
          variant='transparent'
          disabled={upvoteConfig?.disable}
          onClick={() => {
            setUpvoteCount(upvoteCount + 1);
            onUpvote && onUpvote(upvoteCount);
          }}
        >
          <UpvoteIcon fill={upvoteIconColor} color={upvoteIconColor} />
        </ActionIcon>
        {upvoteCount > 0 && (
          <Text size='sm' c='gray'>
            {upvoteCount}
          </Text>
        )}
      </Group>
      <Group gap='0'>
        <ActionIcon
          size={20}
          variant='transparent'
          disabled={downvoteConfig?.disable}
          onClick={() => {
            setDownvoteCount(downvoteCount + 1);
            onDownvote && onDownvote(downvoteCount);
          }}
        >
          <DownvoteIcon fill={downvoteIconColor} color={downvoteIconColor} />
        </ActionIcon>
        {downvoteCount > 0 && (
          <Text size='sm' c='gray'>
            {downvoteCount}
          </Text>
        )}
      </Group>
    </Group>
  );
};

export default UpvoteDownvote;
