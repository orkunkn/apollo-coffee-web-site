import React, { createContext, useState, useEffect } from 'react';
import firebase from './firebase';
import { doc, getDoc } from 'firebase/firestore';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const userRef = doc(firebase.firestore(), "customers", authUser.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setUser({ ...authUser, ...docSnap.data() });
        } else {
          setUser(authUser);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};
