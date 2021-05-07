import 'reflect-metadata';
import { NextApiRequest } from 'next';
import { ApolloServer } from 'apollo-server-micro';
import { prisma } from 'src/prisma';
import { loadIdToken } from 'src/auth/firebaseAdmin';
import { schema } from 'src/schema';
import { Context } from 'src/schema/context';

interface IGraphqContext {
  req: NextApiRequest;
}

const server = new ApolloServer({
  schema,
  context: async ({ req }: IGraphqContext): Promise<Context> => {
    const uid = await loadIdToken(req);

    return {
      uid,
      prisma,
    };
  },
});

const handler = server.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
