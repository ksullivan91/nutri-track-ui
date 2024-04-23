import React, {
  createContext,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { User } from 'firebase/auth';
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from '../utils/firebase.utils';
import useLocalStorage from '../hooks/useLocalStorage';

interface IUserContext {
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<IUserContext>({
  currentUser: null,
  setCurrentUser: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>(
    'currentUser',
    null
  );
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, [setCurrentUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
