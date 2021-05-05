import { FunctionComponent } from 'react';
import { Layout } from 'src/components/layout';
import { FirebaseAuth } from 'src/components/firebaseAuth';
import { GetServerSideProps, NextApiRequest } from 'next';
import { loadIdToken } from 'src/auth/firebaseAdmin';

interface IAuthProps {}

const Auth: FunctionComponent<IAuthProps> = (): JSX.Element => {
  return <Layout main={<FirebaseAuth />} />;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const uid = await loadIdToken(req as NextApiRequest);

  if (uid) {
    res.setHeader('location', '/');
    res.statusCode = 302;
    res.end();
  }

  return {
    props: {},
  };
};

export default Auth;
