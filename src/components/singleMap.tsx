import { FunctionComponent, useState } from 'react';
import Link from 'next/link';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface IHouse {
  id: string;
  latitude: number;
  longitude: number;
}

interface IProps {
  house: IHouse;
  nearby: IHouse[];
}

export const SingleMap = ({ house, nearby }: IProps): JSX.Element => {
  const [viewport, setViewport] = useState({
    latitude: house.latitude,
    longitude: house.longitude,
    zoom: 13,
  });

  return (
    <div className='text-black'>
      <ReactMapGL
        {...viewport}
        width='100%'
        height='calc(100vh - 64px)'
        onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        mapStyle='mapbox://styles/a1ds/ckoayzzds02k317pazp99jt4u'
        scrollZoom={false}
        minZoom={8}
      >
        <div className='absolute top-0 left-0 p-4'>
          <NavigationControl showCompass={false} />
        </div>

        <Marker
          latitude={house.latitude}
          longitude={house.longitude}
          offsetLeft={-15}
          offsetTop={-15}
        >
          <button
            type='button'
            style={{ width: '30px', height: '30px', fontSize: '30px' }}
          >
            <img src='/home-color.svg' alt='selected house' className='w-8' />
          </button>
        </Marker>

        {nearby.map((nearHouse) => {
          return (
            <Marker
              key={nearHouse.id}
              latitude={nearHouse.latitude}
              longitude={nearHouse.longitude}
              offsetLeft={-15}
              offsetTop={-15}
            >
              <Link href={`/houses/${nearHouse.id}`}>
                <a style={{ width: '30px', height: '30px', fontSize: '30px' }}>
                  <img src='/home-solid.svg' alt='near house' className='w-8' />
                </a>
              </Link>
            </Marker>
          );
        })}
      </ReactMapGL>
    </div>
  );
};
