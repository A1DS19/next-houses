import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from 'src/auth/useAuth';
import { FunctionComponent } from 'react';
import { DeleteHouse, DeleteHouseVariables } from 'src/generated/DeleteHouse';

const DELETE_HOUSE = gql`
  mutation DeleteHouse($houseId: String!) {
    deleteHouse(houseId: $houseId)
  }
`;

interface IProps {
  house: {
    id: string;
    userId: string;
  };
}

export const HouseNav: FunctionComponent<IProps> = ({ house }): JSX.Element => {
  const [deleteHouse, { loading }] = useMutation<DeleteHouse, DeleteHouseVariables>(
    DELETE_HOUSE
  );
  const { user } = useAuth();
  const canManage = !!user && user.uid === house.userId;
  const router = useRouter();

  return (
    <>
      <Link href='/'>
        <a>mapa</a>
      </Link>
      {canManage && (
        <>
          {' | '}
          <Link href={`/houses/${house.id}/edit`}>
            <a>Editar</a>
          </Link>
          {' | '}
          <button
            disabled={loading}
            type='button'
            onClick={async () => {
              if (confirm('Esta seguro?')) {
                await deleteHouse({ variables: { houseId: house.id } });
                router.push('/');
              }
            }}
          >
            Eliminar
          </button>
        </>
      )}
    </>
  );
};
