import { ScrollArea } from '@mantine/core';
import {
  IconSettings,
  IconGift,
  IconBook,
  IconGauge,
  IconNews,
} from '@tabler/icons-react';
import { LinksGroup } from './NavbarLinksGroup';
import styles from './NavbarNested.module.css';
import { useState } from 'react';

const mockdata = [
  // { label: 'All Resources', link: '/resources', icon: IconGauge },
  {
    label: 'Education',
    link: '/resources/education',
    icon: IconBook,
    links: [
      // { label: 'All Education', link: '/resources/education' },
      { label: 'Articles', link: '/resources/education/articles' },
      { label: 'Documentaries', link: '/resources/education/documentaries' },
      { label: 'Videos', link: '/resources/education/videos' },
      { label: 'Podcasts', link: '/resources/education/podcasts' },
      { label: 'Books', link: '/resources/education/books' },
      { label: 'General', link: '/resources/education/general education' },
    ],
  },
  {
    label: 'Tools',
    link: '/resources/tools',
    icon: IconSettings,
    links: [
      // { label: 'All Tools', link: '/resources/tools' },
      { label: 'Boycott', link: '/resources/tools/boycott' },
      { label: 'Advocacy', link: '/resources/tools/advocacy' },
      { label: 'Fact Check', link: '/resources/tools/fact check' },
      { label: 'General', link: '/resources/tools/general tools' },
    ],
  },
  {
    label: 'Charities',
    link: '/resources/charities',
    icon: IconGift,
    links: [
      // { label: 'All Charities', link: '/resources/charities' },
      { label: 'On The Ground', link: '/resources/charities/on the ground' },
      { label: 'General', link: '/resources/charities/general charities' },
    ],
  },
  {
    label: 'News',
    link: '/resources/news',
    icon: IconNews,
    links: [
      { label: 'Updates', link: '/resources/news/updates' },
      { label: 'Fake News', link: '/resources/news/fake news' },
      { label: 'Counter arguments', link: '/resources/news/counter arguments' },
      { label: 'Discussions', link: '/resources/news/discussions' },
      { label: 'General', link: '/resources/news/general news' },
    ],
  },
];

export function NavbarNested() {
  const [openCategory, setOpenCategory] = useState<string | undefined>();

  const links = mockdata.map((item) => (
    <LinksGroup
      openCategory={openCategory}
      {...item}
      key={item.label}
      setOpenCategory={setOpenCategory}
    />
  ));

  return (
    <nav className={styles.navbar}>
      {/* <ScrollArea className={styles.links}> */}
      <div className={styles.linksInner}>{links}</div>
      {/* </ScrollArea> */}
    </nav>
  );
}
