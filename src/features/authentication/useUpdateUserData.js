import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserData } from '../../services/apiAuth';
import toast from 'react-hot-toast';

function useUpdateUserData() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: updateUser } = useMutation({
    mutationFn: newUser => updateUserData(newUser),
    onSuccess: data => {
      toast.loading('Updating...');
      setTimeout(() => toast.success(data.message), 1000);
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: err => toast.error(err.message),
  });

  return { isLoading, updateUser };
}

export default useUpdateUserData;
