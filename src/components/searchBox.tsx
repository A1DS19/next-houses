import { ChangeEvent } from 'react';
import { FunctionComponent } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { useGoogleMapsScript, Libraries } from 'use-google-maps-script';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';
import '@reach/combobox/styles.css';

interface ISearchBoxProps {
  onSelectAdress: (
    address: string,
    latitude: number | null,
    longitude: number | null
  ) => void;
  defaultValue: string;
}

const libraries: Libraries = ['places'];

export const SearchBox: FunctionComponent<ISearchBoxProps> = ({
  onSelectAdress,
  defaultValue,
}): JSX.Element => {
  const { isLoaded, loadError } = useGoogleMapsScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;

  if (loadError) return <div>Error loading</div>;

  return <ReadySearchBox onSelectAdress={onSelectAdress} defaultValue={defaultValue} />;
};

const ReadySearchBox = ({
  onSelectAdress,
  defaultValue,
}: ISearchBoxProps): JSX.Element => {
  //debounce = espere 300ms y haga request
  //defaultValue = mismo de componente padre

  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 1000,
    defaultValue,
  });

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      onSelectAdress(address, lat, lng);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (e.target.value === '') {
      onSelectAdress('', null, null);
    }
  };

  const renderData = (): JSX.Element => {
    if (status === 'OK') {
      return data.map(({ description, place_id }) => (
        <ComboboxOption key={place_id} value={description} />
      )) as any;
    }
    return <ComboboxOption key={0} value='Buscando...' />;
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        id='search'
        value={value}
        onChange={handleChange}
        disabled={!ready}
        placeholder='Direccion'
        className='w-full p-2'
        autoComplete='off'
      />

      <ComboboxPopover>
        <ComboboxList>{renderData()}</ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};
