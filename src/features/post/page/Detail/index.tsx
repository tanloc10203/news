import { faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageMain } from '../../../../components/Common';
import { db } from '../../../../config';
import { Post } from '../../../../models';
import { ModalDelete } from '../../components/ModalDelete';
import styles from './Detail.module.scss';

interface DetailProps {}

export const Detail = (props: DetailProps) => {
  const location = useLocation();
  const data: Post | any = location.state;
  const [categoryName, setCategoryName] = useState<string>('');
  const authUser = Boolean(localStorage.getItem('auth_user'));
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getCategoryDetail = async () => {
      if (data) {
        const q = query(collection(db, 'category'), where('link', '==', data.categoryId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setCategoryName(doc.data().name);
        });
      }
    };
    getCategoryDetail();
  }, [data]);

  const toggle = () => {
    setIsOpen(false);
  };

  const onDelete = async () => {
    if (data) {
      setLoading(true);
      const userDoc = doc(db, 'post', data.id);
      await deleteDoc(userDoc);
      navigate('/');
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <PageMain>
      <ModalDelete isOpen={isOpen} onDestroy={onDelete} toggle={toggle} loading={loading} />
      <div className="container px-5">
        <div className="row gx-5">
          <div className="col-md-12">
            <main className={styles.root}>
              <div className={styles.title}>{data && data.title}</div>
              <div className={styles.timeCategory}>
                <span className={styles.time}>{data.time || '1h'} trước</span>
                <span className={styles.category}># {categoryName}</span>
              </div>
              <div className={styles.img}>
                <img src={data && data.imgTitle} alt="" />
              </div>
              {authUser ? (
                <div className={styles.flex}>
                  <button className="btn btn-outline-danger me-2" onClick={() => setIsOpen(true)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <Link to={`/news/update-post`} state={data}>
                    <button className="btn btn-outline-success">
                      <FontAwesomeIcon icon={faPenSquare} />
                    </button>
                  </Link>
                </div>
              ) : null}
              <div
                className="post__description"
                dangerouslySetInnerHTML={{ __html: data && data.contentHtml }}
              />
            </main>
          </div>
        </div>
      </div>
    </PageMain>
  );
};
