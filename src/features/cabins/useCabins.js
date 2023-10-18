import { useQuery } from '@tanstack/react-query';
import { getAllCabins } from '../../services/apiBookings';

function useCabins() {
  const {
    data: cabins,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['cabins'],
    queryFn: getAllCabins,
  });

  return { cabins, error, isLoading };
}

export default useCabins;
