import Link from 'next/link';
import { Image } from 'cloudinary-react';
import { houses_fetchHouses } from 'src/generated/houses';
import { FunctionComponent } from 'react';

interface IProps {
  houses: houses_fetchHouses[] | null;
  setHighligthtedId: (houseId: string | null) => void;
  highligthtedId: string | null;
}

export const HouseList: FunctionComponent<IProps> = ({
  houses,
  setHighligthtedId,
  highligthtedId,
}): JSX.Element => {
  return (
    <>
      {houses?.map((house) => (
        <Link key={house.id} href={`/houses/${house.id}`}>
          <div
            className={
              highligthtedId === house.id
                ? 'px-6 pt-4 cursor-pointer flex flex-wrap house-list-item-active'
                : 'px-6 pt-4 cursor-pointer flex flex-wrap'
            }
            onMouseEnter={() => setHighligthtedId(house.id)}
            onMouseLeave={() => setHighligthtedId(null)}
          >
            <div className='sm:w-full md:w-1/2'>
              <Image
                cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                publicId={house.publicId}
                alt={house.address}
                secure
                dpr='auto'
                quality='auto'
                width={350}
                heigth={Math.floor((9 / 16) * 350)}
                crop='fill'
                gravity='auto'
              />
            </div>
            <div className='sm:w-full md:w-1/2 sm:pl-0 md:pl-4'>
              <h2 className='text-lg'>{house.address.substr(0, 30) + '...'}</h2>
              <p>{house.bedrooms} habitaciones</p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};
