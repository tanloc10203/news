import clsx from 'clsx';
import React from 'react';
import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom';
import styles from './CustomLink.module.scss';

export function CustomLink({ children, to, ...props }: LinkProps) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      className={clsx(styles.link, {
        [styles.active]: match ? true : false,
      })}
      to={to}
      {...props}
    >
      {children}
    </Link>
  );
}
