import clsx from 'clsx';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import { useLocation, useNavigate } from 'react-router-dom';
import { Category, PageMain } from '../../../../components/Common';
import { db, storage } from '../../../../config';
import styles from './UpdatePost.module.scss';
import { formats, modules } from '../../../../utils';
import { showErr, States } from '../CreatePost';
import { Spinner } from 'reactstrap';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Post } from '../../../../models';

interface UpdatePostProps {}

export const UpdatePost = (props: UpdatePostProps) => {
  const usersCollectionRef = collection(db, 'post');
  const categoryCollectionRef = collection(db, 'category');
  const navigate = useNavigate();
  const { quill, quillRef } = useQuill({
    modules,
    formats,
    theme: 'snow',
  });

  const { state } = useLocation();
  const postDetail: Post | any = state;
  console.log(state);

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(state && postDetail.contentHtml);
    }
  }, [quill]);

  const [states, setState] = useState<States>({
    title: state && postDetail.title,
    imgTitle: '',
    imgTitlePost: '',
  });
  const [contentHtml, setContentHtml] = useState<string>('');
  const [imgTitleFile, setimgTitleFile] = useState<File | null>();
  const [imgTitlePostFile, setImgTitlePostFile] = useState<File | null>();
  const [showErr, setShowErr] = useState<showErr>({
    titleErr: '',
    imgTitleErr: '',
    imgTitlePostErr: '',
    contenetHtmlErr: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [category, setCategory] = useState(Array<Category>());
  const [categoryId, setCategoryId] = useState<string>();

  const { titleErr, imgTitleErr, imgTitlePostErr, contenetHtmlErr } = showErr;
  const { title, imgTitle, imgTitlePost } = states;

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

  const handleUploadImgTitlePost = (): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
      try {
        if (imgTitlePostFile == null) return;
        const imageRef = ref(
          storage,
          `images/${imgTitlePostFile.name + imgTitlePostFile.lastModified}`
        );
        uploadBytes(imageRef, imgTitlePostFile).then((snapshot) => {
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

    if (!imgTitle) {
      setShowErr((pre) => ({ ...pre, imgTitleErr: 'Không được để trống' }));
      check = true;
    }

    if (!imgTitlePost) {
      setShowErr((pre) => ({ ...pre, imgTitlePostErr: 'Không được để trống' }));
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

    console.log(imgTitle);
    if (imgTitle) {
      setShowErr((pre) => ({ ...pre, imgTitleErr: '' }));
    }

    if (imgTitlePost) {
      setShowErr((pre) => ({ ...pre, imgTitlePostErr: '' }));
    }
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    const valueFile = event.currentTarget.files && event.currentTarget.files[0];

    setState((pre) => ({ ...pre, [name]: value }));

    if (name === 'imgTitle') setimgTitleFile(valueFile);
    else if (name === 'imgTitlePost') setImgTitlePostFile(valueFile);

    handleChandleValidte();
  };

  const handleBlur = () => {
    if (title.length < 8) {
      setShowErr((pre) => ({ ...pre, titleErr: 'Vui lòng nhập ít nhát 8 kí tự' }));
    }

    if (imgTitle) {
      setShowErr((pre) => ({ ...pre, imgTitleErr: '' }));
    }

    if (imgTitlePost) {
      setShowErr((pre) => ({ ...pre, imgTitlePostErr: '' }));
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
    // setLoading(true);
    const check = handleValidate();
    if (check) setLoading(false);

    const imgTitleUrl = await handleUploadImgTitle();
    const imgTitlePostUrl = await handleUploadImgTitlePost();

    // if (!check && imgTitleUrl && imgTitlePostUrl) {
    //   const data = {
    //     title,
    //     contentHtml,
    //     imgTitle: imgTitleUrl,
    //     imgTitlePost: imgTitlePostUrl,
    //     createdAt,
    //     categoryId,
    //     updatedAt: createdAt,
    //   };

    //   addDoc(usersCollectionRef, data)
    //     .then((response) => {
    //       if (response) {
    //         console.log('response success', response);
    //         setLoading(false);
    //         navigate('/');
    //         setState({ imgTitle: '', imgTitlePost: '', title: '' });
    //       }
    //     })
    //     .catch((error) => console.log(error));
    // }
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
                <label htmlFor="imgIntroduce" className="form-label">
                  Ảnh giới thiệu bài viết
                </label>
                <p className="text-danger">{imgTitlePostErr}</p>
                <input
                  value={imgTitlePost}
                  onChange={handleChangeInput}
                  onBlur={handleBlur}
                  type="file"
                  id="imgIntroduce"
                  name="imgTitlePost"
                  className="form-control"
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
