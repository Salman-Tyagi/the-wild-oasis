import { useMutation } from '@tanstack/react-query';
import { updateUserData } from '../../services/apiAuth';
import toast from 'react-hot-toast';

function useUpdateUserData() {
  const { isLoading, mutate: updateUser } = useMutation({
    mutationFn: newUser => updateUserData(newUser),
    onSuccess: () => toast.success('User updated successfully'),
    onError: err => toast.error(err.message),
  });

  return { isLoading, updateUser };
}

export default useUpdateUserData;
