import React from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

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
  user: User;
  signInWithGoogle(): Promise<void>;
}

const AuthContext = React.createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const user = {
    id: '123123123',
    name: 'Paulo Sergio',
    email: 'paulocardoso19@live.com',
  };

  GoogleSignin.configure({
    webClientId:
      '"421146143501-t43bodl4cf6d62g2k50vtdc3ns0g3jf8.apps.googleusercontent.com"',
  });

  const signInWithGoogle = async () => {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential);

    user_sign_in
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth };
