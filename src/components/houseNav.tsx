import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from 'src/auth/useAuth';
import { FunctionComponent } from 'react';
// import { DeleteHouse, DeleteHouseVariables } from "src/generated/DeleteHouse";

interface IProps {
  house: {
    id: string;
    userId: string;
  };
}

export const HouseNav: FunctionComponent<IProps> = ({ house }): JSX.Element => {
  const { user } = useAuth();
  const canManage = !!user && user.uid === house.userId;

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
        </>
      )}
    </>
  );
};
