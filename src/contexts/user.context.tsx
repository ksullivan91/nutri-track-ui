import React, {
  createContext,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';
import { User } from 'firebase/auth'; // Adjust the import according to your Firebase setup
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from '../utils/firebase.utils';
import useLocalStorage from '../hooks/useLocalStorage';

// Define the shape of the context data
interface IUserContext {
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
}

// Create a context with a default value matching the IUserContext structure
export const UserContext = createContext<IUserContext>({
  currentUser: null,
  setCurrentUser: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // Here useLocalStorage hook will infer the types from the initial value provided
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
    return unsubscribe; // This function will be called to unsubscribe when the component unmounts
  }, [setCurrentUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
