import React from 'react';
import { Breadcrumbs as MantineBreadcrumbs, Anchor } from '@mantine/core';

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
  separator = '→',
}) => {
  const homeItem: BreadcrumbItem = {
    title: home,
    href: '/',
  };
  return (
    <MantineBreadcrumbs separator={separator}>
      {[homeItem, ...items].map((item, index) => (
        <Anchor href={item.href} key={index}>
          {item.title}
        </Anchor>
      ))}
    </MantineBreadcrumbs>
  );
};

export default Breadcrumbs;
