import 'mapbox-gl/dist/mapbox-gl.css';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Image } from 'cloudinary-react';
import ReactMapGL, { MapRef, Marker, Popup } from 'react-map-gl';
import { ViewState } from 'react-map-gl/src/mapbox/mapbox';
import { useLocalState } from 'src/utils/useLocalState';
import { houses_fetchHouses } from 'src/generated/houses';
import { SearchBox } from './searchBox';

interface IMap {
  setDataBounds: (bounds: string) => void;
  houses: houses_fetchHouses[] | null;
  highligthtedId: string | null;
  setHighligthtedId: (houseId: string | null) => void;
}

export const Map: FunctionComponent<IMap> = ({
  setDataBounds,
  houses,
  highligthtedId,
  setHighligthtedId,
}): JSX.Element => {
  const mapRef = useRef<MapRef | null>(null);
  const [viewport, setViewport] = useLocalState<ViewState>('viewport', {
    latitude: 9.74,
    longitude: -83.75,
    zoom: 10,
  });
  const [selectedHouse, setSelectedHouse] = useState<houses_fetchHouses | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className='text-black relative'>
      <ReactMapGL
        {...viewport}
        width='100%'
        height='calc(100vh - 64px)'
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
        onViewportChange={(nexViewport: any) => mounted && setViewport(nexViewport)}
        ref={(instance) => (mapRef.current = instance)}
        minZoom={5}
        maxZoom={15}
        mapStyle='mapbox://styles/a1ds/ckoayzzds02k317pazp99jt4u'
        onLoad={() => {
          if (mapRef.current) {
            const bounds = mapRef.current.getMap().getBounds();
            setDataBounds(JSON.stringify(bounds.toArray()));
          }
        }}
        onInteractionStateChange={(extra: any) => {
          if (!extra.isDragging && mapRef.current) {
            const bounds = mapRef.current.getMap().getBounds();
            setDataBounds(JSON.stringify(bounds.toArray()));
          }
        }}
      >
        <div className='absolute top-0 w-full z-10 p-4'>
          <SearchBox
            defaultValue=''
            onSelectAdress={(_address, latitude, longitude) => {
              if (latitude && longitude) {
                setViewport((oldState) => ({
                  ...oldState,
                  latitude,
                  longitude,
                  zoom: 12,
                }));
                if (mapRef.current) {
                  const bounds = mapRef.current.getMap().getBounds();
                  setDataBounds(JSON.stringify(bounds.toArray()));
                }
              }
            }}
          />
        </div>
        {houses?.map((house) => (
          <Marker
            key={house.id}
            latitude={house.latitude}
            longitude={house.longitude}
            offsetLeft={-15}
            offsetTop={-15}
            className={highligthtedId === house.id ? 'marker-active' : ''}
          >
            <button
              onClick={() => setSelectedHouse(house)}
              style={{ width: '30px', height: '30px', fontSize: '30px' }}
            >
              <img
                src={highligthtedId === house.id ? '/home-color.svg' : '/home-solid.svg'}
                alt='casas adyacentes'
                className='w-8'
                onMouseEnter={() => setHighligthtedId(house.id)}
                onMouseLeave={() => setHighligthtedId(null)}
              />
            </button>
          </Marker>
        ))}

        {selectedHouse && (
          <Popup
            latitude={selectedHouse.latitude}
            longitude={selectedHouse.longitude}
            onClose={() => setSelectedHouse(null)}
            closeOnClick={false}
          >
            <div className='text-center'>
              <h3 className='px-4'>{selectedHouse.address.substr(0, 30)}</h3>
              <Image
                className='mx-auto my-4'
                cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                publicId={selectedHouse.publicId}
                secure
                dpr='auto'
                quality='auto'
                width={200}
                heigth={Math.floor((9 / 16) * 200)}
                crop='fill'
                gravity='auto'
              />
              <Link href={`/houses/${selectedHouse.id}`}>Ver casa</Link>
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
};
