import { useLayoutEffect, useRef, useState } from 'react';

export function useWindowScroll() {
  const [scroll, setScroll] = useState(0);
  const timeout = useRef<any>(null);

  useLayoutEffect(() => {
    const updateScroll = () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }

      timeout.current = setTimeout(() => {
        setScroll(window.scrollY);
      }, 10);
    };
    window.addEventListener('scroll', updateScroll);
    updateScroll();
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);
  return scroll;
}
