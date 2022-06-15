import React from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

/* const { webClientId } = process.env; */

interface AuthProviderProps {
  children: React.ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface AuthContextData {
  user: User | undefined;
  signInWithGoogle(): Promise<void>;
  signOut(): Promise<void>;
}

const AuthContext = React.createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = React.useState<User>();

  GoogleSignin.configure({
    webClientId:
      '421146143501-t43bodl4cf6d62g2k50vtdc3ns0g3jf8.apps.googleusercontent.com',
  });

  const signInWithGoogle = async () => {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const result = auth().signInWithCredential(googleCredential);

    if ((await result).user) {
      const { displayName, photoURL, uid, email } = (await result).user;

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.');
      }

      setUser({
        id: uid,
        name: displayName,
        photo: photoURL,
        email: email!,
      });
    }

    /*     result
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      }); */
  };

  React.useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid, email } = user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.');
        }

        setUser({
          id: uid,
          name: displayName,
          photo: photoURL,
          email: email!,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const signOut = async () => {
    setUser({} as User);
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth };
