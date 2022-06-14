import React from 'react';

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
}

const AuthContext = React.createContext({} as AuthContextData);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const user = {
    id: '123123123',
    name: 'Paulo Sergio',
    email: 'paulocardoso19@live.com',
  };

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  return context;
};

export { AuthProvider, useAuth };
