import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useWindowScroll } from '../../../hooks';

interface ScrollToTopProps {
  // children: React.ReactNode;
}

export function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    const updateScroll = () => window.scrollTo(0, 0);
    window.addEventListener('load', updateScroll);
    updateScroll();
    return () => window.removeEventListener('load', updateScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}
