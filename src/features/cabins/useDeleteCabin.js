import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCabin } from '../../services/apiBookings';
import toast from 'react-hot-toast';

function useDeleteCabin() {
  const clientQuery = useQueryClient();

  const { isLoading: isDeleting, mutate: deletingCabin } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      clientQuery.invalidateQueries({
        queryKey: ['cabins'],
      });
      toast.success('Cabin deleted successfully');
    },
    onError: err => toast.error(err.message),
  });

  return { isDeleting, deletingCabin };
}

export default useDeleteCabin;
