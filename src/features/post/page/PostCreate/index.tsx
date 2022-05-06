import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { FormEvent, useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import { Spinner } from 'reactstrap';
import { PageMain } from '../../../../components/Common';
import { db, storage } from '../../../../config';
import { changeTitlePage, formats, modules } from '../../../../utils';

interface PostCreateProps {}

interface usersFB {
  age: number;
  id: string;
  name: string;
  imgUrl?: string;
  content?: string;
}

export function PostCreate(props: PostCreateProps) {
  const usersCollectionRef = collection(db, 'users');
  const [users, setUsers] = useState(Array<usersFB>());
  const [loading, setLoading] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState(0);
  const [imgUpload, setImgUpload] = useState<File | null>(null);
  const [status, setStatus] = useState(false);
  const [loadingGetUser, setLoadingGetUser] = useState(false);
  const [text, setText] = useState('');
  const { quill, quillRef } = useQuill({ modules, formats, theme: 'snow' });

  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        setText(quillRef.current.firstChild.innerHTML);
      });
    }
  }, [quill, quillRef]);

  const handleImgUpload = (): Promise<string | undefined> => {
    return new Promise((resolve, reject) => {
      try {
        console.log('running handleImgUpload...');
        console.log(imgUpload);
        if (imgUpload == null) return;
        const imageRef = ref(storage, `images/${imgUpload.name + imgUpload.lastModified}`);
        uploadBytes(imageRef, imgUpload).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            console.log('url success', url);
            resolve(url);
          });
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    setLoadingGetUser(true);
    const data = await getDocs(usersCollectionRef);
    data && setLoadingGetUser(false);
    let newData =
      data &&
      data.docs.map((doc): usersFB => {
        return { ...doc.data(), id: doc.id } as usersFB;
      });
    setUsers(newData);
  };

  useEffect(() => {
    loading && getUsers();
  }, [loading]);

  useEffect(() => {
    loading && setLoading(false);
  }, [loading]);

  useEffect(() => {
    changeTitlePage('Viêt bài');
  }, []);

  const createUser = async () => {
    setStatus(true);
    const imgUrl = await handleImgUpload();

    if (imgUrl !== undefined) {
      console.log('running create user...');
      addDoc(usersCollectionRef, {
        name: newName,
        age: Number(newAge),
        imgUrl: imgUrl,
        content: text,
      })
        .then((response) => {
          if (response) {
            console.log('response success', response);
            setStatus(false);
            setNewName('');
            setNewAge(0);
            setImgUpload(null);
            setLoading(true);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const updateUser = async (id: string, age: number) => {
    const userDoc = doc(db, 'users', id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
    setLoading(true);
  };

  const deleteUser = async (id: string) => {
    const userDoc = doc(db, 'users', id);
    await deleteDoc(userDoc);
    setLoading(true);
  };

  return (
    <PageMain>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="py-3">
              <input
                placeholder="Name..."
                className="form-control mb-2"
                value={newName}
                onChange={(event: FormEvent<HTMLInputElement>) => {
                  setNewName(event.currentTarget.value);
                }}
              />
              <input
                type="number"
                placeholder="Age..."
                className="form-control mb-2"
                value={newAge}
                onChange={(event: FormEvent<HTMLInputElement>) => {
                  setNewAge(+event.currentTarget.value);
                }}
              />

              <input
                type="file"
                className="form-control mb-2"
                onChange={(event: FormEvent<HTMLInputElement>) => {
                  setImgUpload(event.currentTarget.files && event.currentTarget.files[0]);
                }}
              />

              <div className="mb-2 react-quill">
                <div ref={quillRef} />
              </div>

              <button onClick={createUser} className="btn btn-primary" disabled={status}>
                {status ? <Spinner>Loading...</Spinner> : 'Create User'}
              </button>
            </div>
            <div className="render-users">
              {loadingGetUser ? (
                <div className="container">
                  <div className="row">
                    <div className="col-md-12 text-center">
                      <Spinner>Loading...</Spinner>
                    </div>
                  </div>
                </div>
              ) : users.length > 0 ? (
                users.map((user, index: number) => {
                  return (
                    <div key={index}>
                      <h1>Name: {user.name}</h1>
                      <h1>Age: {user.age}</h1>
                      <div className="mb-2">
                        <img
                          src={user.imgUrl}
                          alt=""
                          style={{
                            maxWidth: '100%',
                            width: '500px',
                            height: '100px',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                      {user.content && (
                        <div
                          className="post__description"
                          dangerouslySetInnerHTML={{ __html: user.content }}
                        />
                      )}
                      <button
                        onClick={() => {
                          updateUser(user.id, user.age);
                        }}
                        className="btn btn-success"
                      >
                        Increase Age
                      </button>
                      <button
                        onClick={() => {
                          deleteUser(user.id);
                        }}
                        className="btn btn-danger"
                      >
                        {' '}
                        Delete User
                      </button>
                    </div>
                  );
                })
              ) : (
                <p>Không có user nào</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageMain>
  );
}
