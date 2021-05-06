import { FormEvent, FunctionComponent } from 'react';
import { useState, useEffect, ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Image } from 'cloudinary-react';
import { SearchBox } from './searchBox';
// import {
//   CreateHouseMutation,
//   CreateHouseMutationVariables,
// } from "src/generated/CreateHouseMutation";
// import {
//   UpdateHouseMutation,
//   UpdateHouseMutationVariables,
// } from "src/generated/UpdateHouseMutation";
// import { CreateSignatureMutation } from "src/generated/CreateSignatureMutation";

interface IFormData {
  address: string;
  latitude: number;
  longitude: number;
  bedrooms: string;
  image: FileList;
}

interface IProps {}

export const HouseForm: FunctionComponent<IProps> = ({}): JSX.Element => {
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, setValue, errors, watch } = useForm<IFormData>({
    defaultValues: {},
  });
  const address = watch('address');

  useEffect(() => {
    register({ name: 'address' }, { required: 'Porfavor inserte su direccion' });
    register({ name: 'latitude' }, { required: true, min: -90, max: 90 });
    register({ name: 'longitude' }, { required: true, min: -180, max: 180 });
  }, [register]);

  const onSubmit = (data: IFormData) => {
    setSubmitting(true);
    handleCreate(data);
  };

  const handleCreate = async (data: IFormData) => {};

  return (
    <form className='mx-auto max-w-xl py-4' onSubmit={handleSubmit(onSubmit)}>
      <h1>Agregar Nueva Casa</h1>

      <div className='mt-4'>
        <SearchBox
          onSelectAdress={(address, latitude, longitude) => {
            setValue('address', address);
            setValue('latitude', latitude);
            setValue('longitude', longitude);
          }}
          defaultValue=''
        />
        <h2>{address}</h2>
        {errors.address && <p>{errors.address.message}</p>}
      </div>
    </form>
  );
};
