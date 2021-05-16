import React from 'react';
import { Image } from 'cloudinary-react';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import {
  FindHouse,
  FindHouseVariables,
  FindHouse_fetchHouse_nearby,
} from 'src/generated/FindHouse';
import { Layout } from 'src/components/layout';
import { SingleMap } from 'src/components/singleMap';
import { HouseNav } from 'src/components/houseNav';

interface HouseProps {}

const SHOW_HOUSE_QUERY = gql`
  query FindHouse($houseId: String!) {
    fetchHouse(houseId: $houseId) {
      id
      userId
      publicId
      address
      bedrooms
      latitude
      longitude
      nearby {
        id
        latitude
        longitude
      }
    }
  }
`;

const Index: React.FC<HouseProps> = ({}): JSX.Element | null => {
  //extrae query params tanto '?ejemplo=1' como '/id'
  const {
    query: { id },
  } = useRouter();

  if (!id) return null;

  return <HouseData id={id as string} />;
};

export default Index;

const HouseData = (props: { id: string }): JSX.Element | null => {
  const { data, loading, error } = useQuery<FindHouse, FindHouseVariables>(
    SHOW_HOUSE_QUERY,
    { variables: { houseId: props.id } }
  );

  if (loading) return <Layout main={<div>Cargando...</div>} />;

  if (!data) return <Layout main={<div>No hay datos.</div>} />;

  if (!data.fetchHouse) return <Layout main={<div>No hay datos</div>} />;

  const { fetchHouse: house } = data;

  return (
    <Layout
      main={
        <div className='sm:block md:flex'>
          <div className='sm:w-full md:w-1/2 p-4'>
            <HouseNav house={house} />
            <h1 className='text-3xl my-2'>{house.address}</h1>
            <Image
              className='pb-2'
              cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
              publicId={house.publicId}
              alt={house.address}
              secure
              dpr='auto'
              quality='auto'
              width={900}
              height={Math.floor((9 / 16) * 900)}
              crop='fill'
              gravity='auto'
            />
            <p>{`${house.bedrooms}`} habitaciones</p>
          </div>
          <div className='sm:w-full md:w-1/2'>
            <SingleMap
              house={house}
              nearby={house.nearby as FindHouse_fetchHouse_nearby[]}
            />
          </div>
        </div>
      }
    />
  );
};
