import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiBookings';
import toast from 'react-hot-toast';

function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: creatingCabin } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      toast.success('Cabin created successfully');
      //   reset();
    },
    onError: err => toast.error(err.message),
  });

  return { isCreating, creatingCabin };
}

export default useCreateCabin;
