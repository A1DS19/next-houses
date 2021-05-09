import { FormEvent, FunctionComponent, ReactInstance } from 'react';
import { useState, useEffect, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Image } from 'cloudinary-react';
import { SearchBox } from './searchBox';
import { CreateSignatureMutation } from 'src/generated/CreateSignatureMutation';
import { CreateHouse, CreateHouseVariables } from 'src/generated/CreateHouse';

interface IFormData {
  address: string;
  latitude: number;
  longitude: number;
  bedrooms: string;
  image: FileList;
}

interface IUploadImageResponse {
  secure_url: string;
}

interface IProps {}

const SIGNATURE_MUTATION = gql`
  mutation CreateSignatureMutation {
    createImageSignature {
      signature
      timestamp
    }
  }
`;

const CREATE_HOUSE_MUTATION = gql`
  mutation CreateHouse($input: HouseInput!) {
    createHouse(input: $input) {
      id
    }
  }
`;

export const HouseForm: FunctionComponent<IProps> = ({}): JSX.Element => {
  const [createSignature] = useMutation<CreateSignatureMutation>(SIGNATURE_MUTATION);
  const [createHouse] = useMutation<CreateHouse, CreateHouseVariables>(
    CREATE_HOUSE_MUTATION
  );
  const [submitting, setSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const { register, handleSubmit, setValue, errors, watch } = useForm<IFormData>({
    defaultValues: {},
  });
  const address = watch('address');
  const router = useRouter();

  useEffect(() => {
    register({ name: 'address' }, { required: 'Porfavor inserte su direccion' });
    register({ name: 'latitude' }, { required: true, min: -90, max: 90 });
    register({ name: 'longitude' }, { required: true, min: -180, max: 180 });
  }, [register]);

  const onSubmit = (data: IFormData) => {
    setSubmitting(true);
    handleCreate(data);
  };

  const handleCreate = async (data: IFormData) => {
    const { data: signatureData } = await createSignature();

    if (signatureData) {
      const { signature, timestamp } = signatureData.createImageSignature;
      const { secure_url } = await uploadImage(data.image[0], signature, timestamp);
      const { data: houseData } = await createHouse({
        variables: {
          input: {
            address: data.address,
            image: secure_url,
            coordinates: {
              latitude: data.latitude,
              longitude: data.longitude,
            },
            bedrooms: parseInt(data.bedrooms),
          },
        },
      });
      if (houseData?.createHouse) {
        router.push(`/houses/${houseData.createHouse.id}`);
      } else {
        alert('No Funciono lmao');
      }
    }
  };

  const uploadImage = async (
    image: File,
    signature: string,
    timestamp: number
  ): Promise<IUploadImageResponse> => {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
    const formData = new FormData();
    formData.append('file', image);
    formData.append('signature', signature);
    formData.append('timestamp', timestamp.toString());
    formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_KEY);

    const res = await fetch(url, {
      method: 'post',
      body: formData,
    });

    return res.json();
  };

  return (
    <form className='mx-auto max-w-xl py-4' onSubmit={handleSubmit(onSubmit)}>
      <h1>Agregar Nueva Casa</h1>

      <div className='mt-3'>
        <label htmlFor='search'>Buscar Direccion de Casa</label>
        <SearchBox
          onSelectAdress={(address, latitude, longitude) => {
            setValue('address', address);
            setValue('latitude', latitude);
            setValue('longitude', longitude);
          }}
          defaultValue=''
        />
        {errors.address && <p>{errors.address.message}</p>}
      </div>

      {address && (
        <>
          <div className='mt-4'>
            <label
              htmlFor='image'
              className='p-4 border-dashed border-4 border-gray-600 block cursor-pointer'
            >
              Click para agregar imagen
            </label>
            <input
              type='file'
              id='image'
              name='image'
              accept='image/*'
              style={{ display: 'none' }}
              ref={register({
                validate: (fileList: FileList) => {
                  if (fileList.length > 0) return true;
                  return 'Favor agregue un archivo';
                },
              })}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                if (event?.target?.files?.[0]) {
                  const file = event?.target?.files?.[0];
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPreviewImage(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            {previewImage && (
              <img
                src={previewImage}
                className='mt-4 object-cover'
                style={{ width: '576px', height: `${(9 / 16) * 576}px` }}
              />
            )}
            {errors.image && <p>{errors.image.message}</p>}
          </div>
          <div className='mt-4'>
            <label htmlFor='bedrooms' className='block'>
              Habitaciones
            </label>
            <input
              type='number'
              name='bedrooms'
              id='bedrooms'
              className='p-2'
              ref={register({
                required: 'Porfavor ingrese el numero de habitaciones',
                min: { value: 1, message: 'Muy pocas habitaciones' },
                max: { value: 100, message: 'Esas son muchas habitaciones' },
              })}
            />
            {errors.bedrooms && <p>{errors.bedrooms.message}</p>}
          </div>

          <div className='mt-4'>
            {!submitting ? (
              <>
                <button
                  type='submit'
                  className='bg-blue-500 hover:bg-blue-700 font-bold py-2 px-2 rounded mr-2'
                  disabled={submitting}
                >
                  Submit
                </button>
                <Link href='/'>
                  <a>Cancelar</a>
                </Link>
              </>
            ) : (
              <h1>Insertando datos...</h1>
            )}
          </div>
        </>
      )}
    </form>
  );
};
