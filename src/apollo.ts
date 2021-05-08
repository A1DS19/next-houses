import { ApolloClient, InMemoryCache } from '@apollo/client';
import { HttpLink } from '@apollo/client/link/http';
import { useMemo } from 'react';

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({ uri: '/api/graphql', credentials: 'same-origin' }),
    cache: new InMemoryCache(),
    //ve el cache actual y luego hacer otro request para tener datos
    //actualizados
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });
};

export function useApollo() {
  //useMemo llamar la funcion una vez y luego llama a la funcion guardada
  const client = useMemo(() => createApolloClient(), []);
  return client;
}
