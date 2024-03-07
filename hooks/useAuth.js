import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, firebaseUser => {
      console.log('got user:', firebaseUser);
      if (firebaseUser && firebaseUser.emailVerified === true) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          emailVerified: firebaseUser.emailVerified,
        });
      } else {
        setUser(null);
      }
    });
    return unsub;
  }, []);

  return { user };
};

export default useAuth;
