import clsx from 'clsx';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { Category, PageMain } from '../../../../components/Common';
import { createdAt, db, storage } from '../../../../config';
import { formats, modules } from '../../../../utils';
import styles from './CreatePost.module.scss';

interface CreatePostProps {}

export interface States {
  title: string;
  imgTitle: string;
}

export interface showErr {
  titleErr: string;
  imgTitleErr: string;
  contenetHtmlErr: string;
}

export const CreatePost: React.FC = (props: CreatePostProps) => {
  const usersCollectionRef = collection(db, 'post');
  const categoryCollectionRef = collection(db, 'category');
  const navigate = useNavigate();
  const { quill, quillRef } = useQuill({
    modules,
    formats,
    theme: 'snow',
  });

  const [state, setState] = useState<States>({
    title: '',
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
  const [categoryId, setCategoryId] = useState<string>('giai-tri');

  const { titleErr, imgTitleErr, contenetHtmlErr } = showErr;
  const { title, imgTitle } = state;

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

    if (!imgTitle) {
      setShowErr((pre) => ({ ...pre, imgTitleErr: 'Không được để trống' }));
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

    if (imgTitle) {
      setShowErr((pre) => ({ ...pre, imgTitleErr: '' }));
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

  const handleSubmit = async () => {
    setLoading(true);
    const check = handleValidate();
    if (check) setLoading(false);

    const imgTitleUrl = await handleUploadImgTitle();

    if (!check && imgTitleUrl) {
      const data = {
        title,
        contentHtml,
        imgTitle: imgTitleUrl,
        createdAt,
        categoryId,
        updatedAt: createdAt,
      };

      addDoc(usersCollectionRef, data)
        .then((response) => {
          if (response) {
            setLoading(false);
            navigate('/');
            setState({ imgTitle: '', title: '' });
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const handleBlur = () => {
    if (title.length < 8) {
      setShowErr((pre) => ({ ...pre, titleErr: 'Vui lòng nhập ít nhát 8 kí tự' }));
    }

    if (imgTitle) {
      setShowErr((pre) => ({ ...pre, imgTitleErr: '' }));
    }

    if (contentHtml) {
      setShowErr((pre) => ({ ...pre, contenetHtmlErr: '' }));
    }
  };

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setCategoryId(value);
  };

  return (
    <PageMain>
      <div className="container">
        <div className="row">
          <div className={clsx('col-md-9', styles.root)}>
            <div className={styles.rootTitle}>
              <h1>Tạo bài viết</h1>
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
                {loading ? <Spinner>Loading...</Spinner> : 'Tạo bài viết'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageMain>
  );
};
