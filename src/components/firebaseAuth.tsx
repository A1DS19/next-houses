import { FunctionComponent, useState, useEffect } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseAuthConfig = {
  signInFlow: 'popup',
  signInOptions: [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requiredDisplayName: false,
    },
  ],
  signInSuccessUrl: '/',
};

export const FirebaseAuth: FunctionComponent = (): JSX.Element => {
  const [renderAuth, setRenderAuth] = useState(false);

  useEffect(() => {
    setRenderAuth(true);
  }, []);

  return (
    <div className='mt-16'>
      {renderAuth && (
        <StyledFirebaseAuth
          uiConfig={firebaseAuthConfig}
          firebaseAuth={firebase.auth()}
        />
      )}
    </div>
  );
};
