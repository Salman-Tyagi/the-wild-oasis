import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useCreateCabin() {
  const clientQuery = useQueryClient();

  const { isLoading: isCreating, mutate: createCabinApi } = useMutation({
    mutationFn: newCabin => createCabin(newCabin),

    onSuccess: () => {
      toast.success('New cabin created successfully');
      clientQuery.invalidateQueries({
        queryKey: ['cabins'],
      });
    },

    onError: err => toast.error(err.message),
  });

  return { isCreating, createCabinApi };
}
