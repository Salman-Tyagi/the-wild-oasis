import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editCabin } from '../../services/apiBookings';
import toast from 'react-hot-toast';

function useUpdateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updatingCabin } = useMutation({
    mutationFn: ({ editCabinId, data }) => editCabin(editCabinId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      }),
        toast.success('Cabin updated successfully');
    },
    onError: err => toast.error(err.message),
  });

  return { isUpdating, updatingCabin };
}

export default useUpdateCabin;
