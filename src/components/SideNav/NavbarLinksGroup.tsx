import { useState } from 'react';
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
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  link,
  links,
}: LinksGroupProps) {
  const router = useRouter();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);

  const handleButtonClick = (o: any) => {
    setOpened(o);
    if (label !== 'All Resources') return;
    router.push(link);
  };

  return (
    <>
      <UnstyledButton
        onClick={() => handleButtonClick((o: any) => !o)}
        className={styles.control}
      >
        <Group justify='space-between' gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant='transparent' size={30} color='#007A3D'>
              <Icon style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
            <Box ml='md'>{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? 'rotate(-90deg)' : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks && (
        <Collapse in={opened}>
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
