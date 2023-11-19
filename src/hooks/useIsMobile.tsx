import { em } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

function useIsMobile() {
  return useMediaQuery(`(max-width: ${em(767)})`);
}

export default useIsMobile;
