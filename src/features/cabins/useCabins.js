import { useQuery } from '@tanstack/react-query';
import { getCabins } from '../../services/apiCabins';

export function useCabins() {
  const { isLoading, data } = useQuery({
    queryKey: ['cabins'],
    queryFn: getCabins,
  });

  let cabins;
  if (data) {
    cabins = data.data;
  }

  return { isLoading, cabins };
}
