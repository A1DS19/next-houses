import { Layout } from '../src/components/layout';
import { Map } from 'src/components/map';
import { useQuery, gql } from '@apollo/client';
import { useLocalState } from 'src/utils/useLocalState';
import { useDebounce } from 'use-debounce';

type BoundsArray = [[number, number], [number, number]];

function Home(): JSX.Element {
  const [dataBounds, setDataBounds] = useLocalState<string>('bounds', '[[0,0],[0,0]]');
  //useDebounce cambia el dato despues de cierto tiempo
  //en este caso 500ms
  const [debouncedDataBounds] = useDebounce(dataBounds, 500);

  return (
    <Layout
      main={
        <div className='flex'>
          <div
            className='w-1/2 pb-4'
            style={{ maxHeight: 'calc(100vh - 64px)', overflowX: 'scroll' }}
          >
            HouseList
          </div>
          <div className='w-1/2'>
            <Map setDataBounds={setDataBounds} />
          </div>
        </div>
      }
    />
  );
}

export default Home;
