import React from 'react';
import { Breadcrumbs as MantineBreadcrumbs, Anchor } from '@mantine/core';
import Link from 'next/link';
import useIsMobile from '@/hooks/useIsMobile';

type BreadcrumbItem = {
  title: string;
  href: string;
};

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  home?: string;
  separator?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  home = 'Home',
  separator = '>',
}) => {
  const homeItem: BreadcrumbItem = {
    title: home,
    href: '/',
  };

  const isMobile = useIsMobile();
  return (
    <MantineBreadcrumbs
      separator={separator}
      styles={{
        breadcrumb: { color: 'grey', fontWeight: '500' },
        separator: { color: 'grey', fontWeight: '500' },
      }}
    >
      {isMobile
        ? [homeItem, ...items].slice(-2).map((item, index) => (
            <Link href={item.href.toLocaleLowerCase()} key={index}>
              {item.title}
            </Link>
          ))
        : [homeItem, ...items].map((item, index) => (
            <Link href={item.href.toLocaleLowerCase()} key={index}>
              {item.title}
            </Link>
          ))}
    </MantineBreadcrumbs>
  );
};

export default Breadcrumbs;
