import { useMutation } from '@tanstack/react-query';
import { updateUserPassword } from '../../services/apiAuth';
import toast from 'react-hot-toast';

const useUpdatePassword = () => {
  const { isLoading, mutate: updatePassword } = useMutation({
    mutationFn: newPassword => updateUserPassword(newPassword),
    onSuccess: data => {
      toast.loading('Updating password');
      setTimeout(() => toast.success(data.message), 1000);
    },
    onError: err => toast.error(err.message),
  });

  return { isLoading, updatePassword };
};

export default useUpdatePassword;
