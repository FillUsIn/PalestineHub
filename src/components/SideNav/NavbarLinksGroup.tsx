import { Dispatch, SetStateAction, useState } from 'react';
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  UnstyledButton,
  rem,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import styles from './NavbarLinksGroup.module.css';
import Link from 'next/link'; // Import Link component from Next.js
import { useRouter } from 'next/router';

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  link: string;
  links?: { label: string; link: string }[];
  setOpenCategory: Dispatch<SetStateAction<string | undefined>>;
  openCategory: string | undefined;
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  link,
  links,
  setOpenCategory,
  openCategory,
}: LinksGroupProps) {
  const router = useRouter();
  const hasLinks = Array.isArray(links);
  const shouldBeOpen = router.query.category === label.toLowerCase();
  const opened = openCategory == label;

  const handleCategoryClicked = () => {
    setOpenCategory((prev) => {
      if (prev === label) {
        return undefined;
      }
      return label;
    });
    if (label !== 'All Resources') return;
    router.push(link);
  };

  return (
    <>
      <UnstyledButton
        onClick={handleCategoryClicked}
        className={styles.control}
      >
        <Group justify='space-between' gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant='transparent' size={30} color='#007A3D'>
              <Icon style={{ width: rem(25), height: rem(25) }} />
            </ThemeIcon>
            <Box ml='md'>{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              stroke={3}
              style={{
                width: rem(25),
                height: rem(25),
                transform: opened ? 'rotate(-90deg)' : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks && (
        <Collapse in={openCategory == label}>
          {links.map((link) => (
            <div className={styles.linkWrapper} key={link.label}>
              <Link className={styles.link} href={link.link}>
                {link.label}
              </Link>
            </div>
          ))}
        </Collapse>
      )}
    </>
  );
}
