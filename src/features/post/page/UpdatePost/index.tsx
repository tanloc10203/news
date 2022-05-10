import clsx from 'clsx';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import { useLocation, useNavigate } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { Category, PageMain } from '../../../../components/Common';
import { createdAt, db, storage } from '../../../../config';
import { Post } from '../../../../models';
import { formats, modules } from '../../../../utils';
import { showErr, States } from '../CreatePost';
import styles from './UpdatePost.module.scss';

interface UpdatePostProps {}

export const UpdatePost = (props: UpdatePostProps) => {
  const categoryCollectionRef = collection(db, 'category');
  const navigate = useNavigate();
  const { quill, quillRef } = useQuill({
    modules,
    formats,
    theme: 'snow',
  });

  const { state } = useLocation();
  const postDetail: Post | any = state;

  const [states, setState] = useState<States>({
    title: state && postDetail.title,
    imgTitle: '',
  });
  const [contentHtml, setContentHtml] = useState<string>('');
  const [imgTitleFile, setimgTitleFile] = useState<File | null>();
  const [showErr, setShowErr] = useState<showErr>({
    titleErr: '',
    imgTitleErr: '',
    contenetHtmlErr: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [category, setCategory] = useState(Array<Category>());
  const [categoryId, setCategoryId] = useState<string>(postDetail && postDetail.categoryId);

  const { titleErr, imgTitleErr, contenetHtmlErr } = showErr;
  const { title, imgTitle } = states;

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(state && postDetail.contentHtml);
      setContentHtml(state && postDetail.contentHtml);
    }
  }, [quill, postDetail, state]);

  useEffect(() => {
    const getCategory = async () => {
      const data = await getDocs(categoryCollectionRef);
      if (data) {
        const newDate = data.docs.map((docs) => {
          return { ...docs.data(), id: docs.id } as Category;
        });
        setCategory(newDate);
      }
    };
    getCategory();
  }, []);

  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        setContentHtml(quillRef.current.firstChild.innerHTML);
      });
    }
  }, [quill, quillRef]);

  const handleUploadImgTitle = (): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
      try {
        if (imgTitleFile == null) return;
        const imageRef = ref(storage, `images/${imgTitleFile.name + imgTitleFile.lastModified}`);
        uploadBytes(imageRef, imgTitleFile).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            resolve(url);
          });
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleValidate = (): Boolean => {
    let check = false;

    if (!title) {
      setShowErr((pre) => ({ ...pre, titleErr: 'Không được để trống' }));
      check = true;
    }

    if (!contentHtml) {
      setShowErr((pre) => ({ ...pre, contenetHtmlErr: 'Không được để trống' }));
      check = true;
    }

    return check;
  };

  const handleChandleValidte = () => {
    if (title) {
      setShowErr((pre) => ({ ...pre, titleErr: '' }));
    }
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    const valueFile = event.currentTarget.files && event.currentTarget.files[0];

    setState((pre) => ({ ...pre, [name]: value }));

    if (name === 'imgTitle') setimgTitleFile(valueFile);

    handleChandleValidte();
  };

  const handleBlur = () => {
    if (title.length < 8) {
      setShowErr((pre) => ({ ...pre, titleErr: 'Vui lòng nhập ít nhát 8 kí tự' }));
    }

    if (contentHtml) {
      setShowErr((pre) => ({ ...pre, contenetHtmlErr: '' }));
    }
  };

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setCategoryId(value);
  };

  const handleSubmit = async () => {
    if (postDetail && postDetail.id) {
      setLoading(true);
      const check = handleValidate();
      const postDoc = doc(db, 'post', postDetail.id);
      if (check) setLoading(false);
      let data;

      if (imgTitle) {
        const imgTitleUrl = await handleUploadImgTitle();
        data = {
          title: title,
          contentHtml: contentHtml,
          imgTitle: imgTitleUrl,
          updatedAt: createdAt,
          categoryId: categoryId,
        };
      } else {
        data = {
          title: title,
          contentHtml: contentHtml,
          updatedAt: createdAt,
          categoryId: categoryId,
        };
      }
      await updateDoc(postDoc, data);
      navigate('/');
      setLoading(false);
    }
  };

  return (
    <PageMain>
      <div className="container">
        <div className="row">
          <div className={clsx('col-md-9', styles.root)}>
            <div className={styles.rootTitle}>
              <h1>Cập nhật</h1>
            </div>
            <div className={clsx('form-group', styles.rootContentItem)}>
              <div className="form-group mb-2">
                <label htmlFor="categoryId" className="form-label">
                  Chọn danh mục
                </label>
                <select
                  name="categoryId"
                  id="categoryId"
                  className="form-control"
                  value={categoryId}
                  onChange={selectChange}
                >
                  {category && category.length > 0
                    ? category.map((item) => (
                        <option key={item.id} value={item.link}>
                          {item.name}
                        </option>
                      ))
                    : null}
                </select>
              </div>
              <div className={clsx('form-group', styles.rootContentItem)}>
                <label htmlFor="title" className="form-label">
                  Tiêu đề bài viết
                </label>
                <p className="text-danger">{titleErr}</p>
                <input
                  value={title}
                  onChange={handleChangeInput}
                  onBlur={handleBlur}
                  type="text"
                  id="title"
                  className="form-control form-custom"
                  name="title"
                />
              </div>

              <div className={clsx('form-group', styles.rootContentItem)}>
                <label htmlFor="imgTitle" className="form-label">
                  Ảnh tiêu đề
                </label>
                <p className="text-danger">{imgTitleErr}</p>
                <input
                  value={imgTitle}
                  onChange={handleChangeInput}
                  onBlur={handleBlur}
                  type="file"
                  id="imgTitle"
                  className="form-control"
                  name="imgTitle"
                />
              </div>

              <div className={clsx('form-group', styles.rootContentItem)}>
                <label htmlFor="">Nội dung bài viết</label>
                <p className="text-danger">{contenetHtmlErr}</p>
                <div className="my-2 react-quill">
                  <div ref={quillRef} onBlur={handleBlur} />
                </div>
              </div>

              <button
                disabled={loading}
                onClick={handleSubmit}
                className="btn btn-outline-primary mt-3"
              >
                {loading ? <Spinner>Loading...</Spinner> : 'Cập nhật bài viết'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageMain>
  );
};
