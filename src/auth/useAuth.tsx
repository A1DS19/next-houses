import { useEffect, useState, useContext, createContext, FunctionComponent } from 'react';
import firebase from 'firebase/app';
import { useRouter } from 'next/router';
import { initFirebase } from './initFirebase';
import { removeTokenCookie, setTokenCookie } from './tokenCookies';
import 'firebase/auth';

initFirebase();

interface IAuthContext {
  user: firebase.User | null;
  logout: () => void;
  authenticated: boolean;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  logout: () => null,
  authenticated: false,
});

export const AuthProvider: FunctionComponent = ({ children }): JSX.Element => {
  const router = useRouter();
  const [user, setUser] = useState<firebase.User | null>(null);

  const logout = async (): Promise<void> => {
    try {
      await firebase.auth().signOut();
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  //Esperar evento de firebase login o sesion expirada
  useEffect(() => {
    const cancelAuthListener = firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        removeTokenCookie();
        setUser(null);
        return;
      }

      const token = await user.getIdToken();
      setTokenCookie(token);
      setUser(user);
    });

    return () => {
      cancelAuthListener();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, authenticated: !!user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
