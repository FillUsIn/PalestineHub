import { Group, Code, ScrollArea, rem, Button } from '@mantine/core';
import IconSettings from '../../../public/IconCharity.svg';
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
} from '@tabler/icons-react';
import { LinksGroup } from './NavbarLinksGroup';
import classes from './NavbarNested.module.css';
import useCategories from '@/hooks/useCategories';
import { getCategoryPosts } from '@/api/posts';

const categories = JSON.stringify(useCategories);
console.log(categories);
const mockdata = [
  {
    label: 'Education',
    icon: IconNotes,
    initiallyOpened: true,
    links: [
      { label: 'Articles', link: '/resources/education/articles' },
      { label: 'Documentaries', link: '/resources/education/documentaries' },
      { label: 'Videos', link: '/resources/education/videos' },
      { label: 'Podcasts', link: '/resources/education/podcasts' },
    ],
  },
  {
    label: 'Tools',
    icon: IconCalendarStats,
    links: [
      { label: 'BDS', link: '/resources/tools/bds' },
      // { label: 'General Tools', link: '/resources/tools/generaltools' },
      // { label: 'Fact Check', link: '/resources/tools/factcheck' },
    ],
  },
  {
    label: 'Charities',
    icon: IconLock,
    links: [
      // { label: 'General Charities', link: '/resources/charities/generalcharities' },
      { label: 'UK', link: '/resources/charities/UK' },
      { label: 'USA', link: '/resources/charities/USA' },
    ],
  },
];

export function NavbarNested() {
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <nav className={classes.navbar}>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>
    </nav>
  );
}
