import { ScrollArea } from '@mantine/core';
import { IconSettings, IconGift, IconBook } from '@tabler/icons-react';
import { LinksGroup } from './NavbarLinksGroup';
import classes from './NavbarNested.module.css';

const mockdata = [
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
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>
    </nav>
  );
}
