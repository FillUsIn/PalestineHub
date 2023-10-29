import { ScrollArea } from '@mantine/core';
import {
  IconSettings,
  IconGift,
  IconBook,
  IconGauge,
} from '@tabler/icons-react';
import { LinksGroup } from './NavbarLinksGroup';
import classes from './NavbarNested.module.css';

const mockdata = [
  { label: 'Dashboard', icon: IconGauge },
  {
    label: 'Education',
    icon: IconBook,
    initiallyOpened: true,
    links: [
      { label: 'Articles', link: '/resources/education/articles' },
      { label: 'Documentaries', link: '/resources/education/documentaries' },
      { label: 'Videos', link: '/resources/education/videos' },
      { label: 'Podcasts', link: '/resources/education/podcasts' },
    ],
  },
  {
    label: 'Charities',
    icon: IconGift,
    links: [
      {
        label: 'General Charities',
        link: '/resources/charities/general charities',
      },
      // { label: 'UK', link: '/resources/charities/UK' },
      // { label: 'USA', link: '/resources/charities/USA' },
    ],
  },
  { label: 'Analytics', icon: IconPresentationAnalytics },
  { label: 'Contracts', icon: IconFileAnalytics },
  { label: 'Settings', icon: IconAdjustments },
  {
    label: 'Tools',
    icon: IconSettings,
    links: [
      { label: 'BDS', link: '/resources/tools/BDS' },
      { label: 'General Tools', link: '/resources/tools/general tools' },
      { label: 'Fact Check', link: '/resources/tools/fact check' },
    ],
  },
];

export function NavbarNested() {
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify='space-between'>
          <Code fw={700}>v3.1.2</Code>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <Button radius={'xl'} fw={'bolder'} size='sm' color='dark'>
          Sign in
        </Button>
      </div>
    </nav>
  );
}
