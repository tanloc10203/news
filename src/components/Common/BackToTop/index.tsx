import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import styles from './BackToTop.module.scss';

type Props = {};

export const BackToTop = (props: Props) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const scrollTops = () => {
      if (window.scrollY > 400) setShow(true);
      else setShow(false);
    };
    scrollTops();
    window.addEventListener('scroll', scrollTops);
    return () => window.removeEventListener('scroll', scrollTops);
  }, []);

  return (
    <>
      {show && (
        <Button
          outline
          color="danger"
          className={styles.backToTop}
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
        >
          <FontAwesomeIcon icon={faAngleUp} />
        </Button>
      )}
    </>
  );
};
