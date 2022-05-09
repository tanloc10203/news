import { collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../config';
import { Post } from '../../../models';
import { changeTitlePage, parseMillisecondsIntoReadableTime } from '../../../utils';
import { PageMain } from '../../Common';
import { CategoryPostHome } from '../CategoryPostHome';
import { PostHomeLink } from '../PostHomeLink';
import { PostOutstanding } from '../PostOutstanding';
import { TabsSidebarRight } from '../TabsSidebarRight';
import './Home.scss';

interface HomeProps {}

export function Home(props: HomeProps) {
  const postCollectionRef = collection(db, 'post');
  const [loading, setLoading] = useState<boolean>(false);
  const [post, setPost] = useState(Array<Post>());
  const [categoryName, setCategoryName] = useState<string>('');

  useEffect(() => {
    const getCategoryDetail = async () => {
      if (post && post.length > 0) {
        const q = query(collection(db, 'category'), where('link', '==', post[0].categoryId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setCategoryName(doc.data().name);
        });
      }
    };
    getCategoryDetail();
  }, [post]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    setLoading(true);
    const data = await getDocs(postCollectionRef);
    const q = query(postCollectionRef, orderBy('createdAt', 'desc'));
    if (data) {
      setLoading(false);
      onSnapshot(q, (snapshot) =>
        setPost(
          snapshot.docs.map((doc): Post => {
            const createdAt = doc.data().createdAt.toDate();
            const d = new Date(createdAt);
            const now = new Date();
            const dd = now.getTime() - d.getTime();
            return {
              ...doc.data(),
              id: doc.id,
              time: parseMillisecondsIntoReadableTime(dd),
            } as Post;
          })
        )
      );
    }
  };

  React.useEffect(() => {
    changeTitlePage('Trang chủ');
  }, []);

  return (
    <>
      <PageMain>
        <div className="container mt-3">
          <div className="row">
            <div className="col-lg-9 col-md-12 content1">
              {!loading ? (
                post &&
                post.length > 0 && <PostOutstanding categoryName={categoryName} data={post[0]} />
              ) : (
                <div className="loading-data">
                  <div></div>
                  <div className="loading-data--content">
                    <div></div>
                    <span></span>
                  </div>
                </div>
              )}

              {[1, 2, 3].map((i) => (
                <section className="content-wp mt-3" key={i}>
                  <div className="row">
                    <div className="col-lg-6 col-md-12 mb-3">
                      <PostHomeLink />
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <PostHomeLink />
                    </div>
                  </div>
                </section>
              ))}

              <CategoryPostHome titleCategory="Kinh tế" isContentRights />
              <CategoryPostHome titleCategory="Văn hóa" isContentRights={false} />
              <CategoryPostHome titleCategory="Tin thị trường" isContentRights />
            </div>
            <div className="col-lg-3 col-md-12 content2">
              <TabsSidebarRight post={post && post} />
            </div>
          </div>
        </div>
      </PageMain>
    </>
  );
}
