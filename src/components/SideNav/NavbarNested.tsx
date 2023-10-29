import { ScrollArea } from '@mantine/core';
import {
  IconSettings,
  IconGift,
  IconBook,
  IconGauge,
} from '@tabler/icons-react';
import { LinksGroup } from './NavbarLinksGroup';
import styles from './NavbarNested.module.css';

const mockdata = [
  { label: 'All Resources', link: '/resources', icon: IconGauge },
  {
    label: 'Education',
    link: '/resources/education',
    icon: IconBook,
    links: [
      { label: 'All Education', link: '/resources/education' },
      { label: 'Articles', link: '/resources/education/articles' },
      { label: 'Documentaries', link: '/resources/education/documentaries' },
      { label: 'Videos', link: '/resources/education/videos' },
      { label: 'Podcasts', link: '/resources/education/podcasts' },
    ],
  },
  {
    label: 'Charities',
    link: '/resources/charities',
    icon: IconGift,
    links: [
      { label: 'All Charities', link: '/resources/charities' },
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
    link: '/resources/tools',
    icon: IconSettings,
    links: [
      { label: 'All Tools', link: '/resources/tools' },
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
    <nav className={styles.navbar}>
      <ScrollArea className={styles.links}>
        <div className={styles.linksInner}>{links}</div>
      </ScrollArea>
    </nav>
  );
}
