import { Layout } from '../src/components/layout';
import { Map } from 'src/components/map';
import { useQuery, gql } from '@apollo/client';
import { useLocalState } from 'src/utils/useLocalState';
import { useDebounce } from 'use-debounce';
import { houses, housesVariables } from 'src/generated/houses';
import { useLastData } from 'src/utils/useLastData';
import { HouseList } from 'src/components/houseList';

type BoundsArray = [[number, number], [number, number]];

const HOUSES_QUERY = gql`
  query houses($bounds: BoundsInput!) {
    fetchHouses(bounds: $bounds) {
      id
      address
      latitude
      longitude
      publicId
      bedrooms
    }
  }
`;

const parseBounds = (boundsString: string) => {
  const bounds = JSON.parse(boundsString) as BoundsArray;
  return {
    sw: {
      latitude: bounds[0][1],
      longitude: bounds[0][0],
    },
    ne: {
      latitude: bounds[1][1],
      longitude: bounds[1][0],
    },
  };
};

function Home(): JSX.Element {
  const [dataBounds, setDataBounds] = useLocalState<string>('bounds', '[[0,0],[0,0]]');
  //useDebounce cambia el dato despues de cierto tiempo
  //en este caso 500ms
  const [debouncedDataBounds] = useDebounce(dataBounds, 500);
  const { data, loading, error } = useQuery<houses, housesVariables>(HOUSES_QUERY, {
    variables: {
      bounds: parseBounds(debouncedDataBounds),
    },
  });
  //useLastData guarda el ultimo
  //valor y previene flikering y que este null || undefined
  const lastData = useLastData(data);

  if (error) return <Layout main={<div>Error</div>} />;
  if (loading) return <Layout main={<></>} />;

  return (
    <Layout
      main={
        <div className='flex'>
          <div
            className='w-1/2 pb-4'
            style={{ maxHeight: 'calc(100vh - 64px)', overflowX: 'scroll' }}
          >
            <HouseList houses={lastData ? lastData?.fetchHouses : []} />
          </div>
          <div className='w-1/2'>
            <Map
              setDataBounds={setDataBounds}
              houses={lastData ? lastData.fetchHouses : []}
            />
          </div>
        </div>
      }
    />
  );
}

export default Home;
