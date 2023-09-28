import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate } = useMutation({
    // mutationFn: () => deleteCabin(_id),
    mutationFn: deleteCabin,

    onSuccess: () => {
      toast.success('Cabin deleted successfully');

      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },

    onError: err => toast.error(err.message),
  });

  return { isDeleting, mutate };
}
