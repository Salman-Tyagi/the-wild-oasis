import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin, updateCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useCreateUpdateCabin(_id, reset) {
  const isEditSession = _id ? true : false;

  const clientQuery = useQueryClient();

  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: isEditSession
      ? newCabin => updateCabin(newCabin, _id)
      : newCabin => createCabin(newCabin),

    onSuccess: () => {
      toast.success(
        isEditSession
          ? 'Cabin updated successfully'
          : 'New cabin created successfully'
      );
      clientQuery.invalidateQueries({
        queryKey: ['cabins'],
      });
      reset();
    },

    onError: err => toast.error(err.message),
  });

  return { isCreating, mutate };
}
