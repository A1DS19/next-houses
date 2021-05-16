import { gql, useQuery } from '@apollo/client';
import { GetServerSideProps, NextApiRequest } from 'next';
import { useRouter } from 'next/router';
import React, { FunctionComponent } from 'react';
import { loadIdToken } from 'src/auth/firebaseAdmin';
import { useAuth } from 'src/auth/useAuth';
import { HouseForm } from 'src/components/houseForm';
import { Layout } from 'src/components/layout';
import { EditHouse, EditHouseVariables } from 'src/generated/EditHouse';

const EDIT_HOUSE = gql`
  query EditHouse($houseId: String!) {
    fetchHouse(houseId: $houseId) {
      id
      userId
      address
      publicId
      image
      bedrooms
      latitude
      longitude
    }
  }
`;

interface editProps {}

const Edit: React.FC<editProps> = ({}) => {
  const {
    query: { id },
  } = useRouter();

  if (!id) return null;

  return <HouseData id={id as string} />;
};

const HouseData: FunctionComponent<{ id: string }> = ({ id }): JSX.Element => {
  const { user } = useAuth();
  const { data, loading, error } = useQuery<EditHouse, EditHouseVariables>(EDIT_HOUSE, {
    variables: {
      houseId: id,
    },
  });

  if (!user) return <Layout main={<div>No autenticado</div>} />;
  if (loading) return <Layout main={<div>Cargando...</div>} />;
  if (!data) return <Layout main={<div>No hay datos...</div>} />;
  if (data && !data.fetchHouse)
    return <Layout main={<div>No se cargo la casa...</div>} />;
  if (user.uid !== data.fetchHouse?.userId)
    return <Layout main={<div>No disponible...</div>} />;

  return <Layout main={<HouseForm house={data.fetchHouse} />} />;
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
}): Promise<{ props: any }> => {
  const uid = await loadIdToken(req as NextApiRequest);
  if (!uid) {
    res.setHeader('location', '/auth');
    res.statusCode = 302;
    res.end();
  }
  return {
    props: {},
  };
};

export default Edit;
