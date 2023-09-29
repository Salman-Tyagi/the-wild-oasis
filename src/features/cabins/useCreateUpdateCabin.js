import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin, updateCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useCreateUpdateCabin(id) {
  const isEditSession = id ? true : false;

  const clientQuery = useQueryClient();

  const { isLoading: isCreatingUpdating, mutate } = useMutation({
    mutationFn: isEditSession
      ? newCabin => updateCabin(newCabin, id)
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
    },

    onError: err => toast.error(err.message),
  });

  return { isCreatingUpdating, mutate };
}
