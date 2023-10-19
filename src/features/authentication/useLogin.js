import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { login } from '../../services/apiAuth';

function useLogin() {
  const navigate = useNavigate();

  const { isLoading, mutate: loginUser } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: () => {
      toast.success('Login successfull!');
      setTimeout(() => navigate('/dashboard'), 1000);
    },
    onError: err => toast.error(err.message),
  });

  return { isLoading, loginUser };
}

export default useLogin;

export function currentUser() {
  const user = localStorage.getItem('token');
  return user;
}
