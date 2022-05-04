import React, { useEffect, useState } from 'react';
import { PageMain } from '../../../../components/Common';
import { changeTitlePage } from '../../../../utils';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../../config';
import { Spinner } from 'reactstrap';

interface PostCreateProps {}

interface usersFB {
  age: number;
  id: string;
  name: string;
}

export function PostCreate(props: PostCreateProps) {
  const usersCollectionRef = collection(db, 'users');
  const [users, setUsers] = useState(Array<usersFB>());
  const [loading, setLoading] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState(0);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    let newData =
      data &&
      data.docs.map((doc): usersFB => {
        return { name: doc.data().name, age: doc.data().age, id: doc.id } as usersFB;
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

  console.log(users);

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
    setLoading(true);
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

  if (users.length === 0)
    return (
      <PageMain>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <Spinner>Loading...</Spinner>
            </div>
          </div>
        </div>
      </PageMain>
    );

  return (
    <PageMain>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="py-3">
              <input
                placeholder="Name..."
                className="form-control mb-2"
                onChange={(event) => {
                  setNewName(event.target.value);
                }}
              />
              <input
                type="number"
                placeholder="Age..."
                className="form-control mb-2"
                onChange={(event) => {
                  setNewAge(+event.target.value);
                }}
              />
              <button onClick={createUser} className="btn btn-primary">
                Create User
              </button>
            </div>
            <div className="render-users">
              {users &&
                users.map((user, index: number) => {
                  return (
                    <div key={index}>
                      <h1>Name: {user.name}</h1>
                      <h1>Age: {user.age}</h1>
                      <button
                        onClick={() => {
                          updateUser(user.id, user.age);
                        }}
                        className="btn btn-success"
                      >
                        {' '}
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
                })}
            </div>
          </div>
        </div>
      </div>
    </PageMain>
  );
}
