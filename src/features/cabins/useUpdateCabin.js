import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useUpdateCabin(id) {
  const clientQuery = useQueryClient();

  const { isLoading: isUpdating, mutate: updateCabinApi } = useMutation({
    mutationFn: newCabin => updateCabin(newCabin, id),

    onSuccess: () => {
      toast.success('Cabin updated successfully');
      clientQuery.invalidateQueries({
        queryKey: ['cabins'],
      });
    },

    onError: err => toast.error(err.message),
  });

  return { isUpdating, updateCabinApi };
}
