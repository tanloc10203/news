import clsx from 'clsx';
import { collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import { Spinner } from 'reactstrap';
import { PageMain } from '../../../../components/Common';
import { db, storage } from '../../../../config';
import { changeTitlePage, formats, getBase64, modules } from '../../../../utils';
import styles from './CreatePost.module.scss';

interface CreatePostProps {}

interface States {
  title: string;
  imgTitle: string;
  imgTitlePost: string;
}

interface showErr {
  titleErr: string;
  imgTitleErr: string;
  imgTitlePostErr: string;
  contenetHtmlErr: string;
}

export const CreatePost: React.FC = (props: CreatePostProps) => {
  const usersCollectionRef = collection(db, 'post');
  const { quill, quillRef } = useQuill({
    modules,
    formats,
    theme: 'snow',
  });

  const [state, setState] = useState<States>({
    title: '',
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

  const { titleErr, imgTitleErr, imgTitlePostErr, contenetHtmlErr } = showErr;
  const { title, imgTitle, imgTitlePost } = state;

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

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const name = event.target.name;
    const value = event.target.value;
    const valueFile = event.target.files && event.target.files[0];

    setState((pre) => ({ ...pre, [name]: value }));

    if (name === 'imgTitle') setimgTitleFile(valueFile);
    else if (name === 'imgTitlePost') setImgTitlePostFile(valueFile);

    handleChandleValidte();
  };

  const handleSubmit = async () => {
    setLoading(true);
    const check = handleValidate();
    if (check) setLoading(false);

    const imgTitleUrl = await handleUploadImgTitle();
    const imgTitlePostUrl = await handleUploadImgTitlePost();

    if (!check && imgTitleUrl && imgTitlePostUrl) {
      const data = {
        title,
        contentHtml,
        imgTitle: imgTitleUrl,
        imgTitlePost: imgTitlePostUrl,
      };

      console.log(data);
      setLoading(false);
    }
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

  return (
    <PageMain>
      <div className="container">
        <div className="row">
          <div className={clsx('col-md-9', styles.root)}>
            <div className={styles.rootTitle}>
              <h1>Tạo bài viết</h1>
            </div>
            <div className={styles.rootContent}>
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
                  className="form-control"
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
                {loading ? <Spinner>Loading...</Spinner> : 'Tạo bài viết'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageMain>
  );
};
