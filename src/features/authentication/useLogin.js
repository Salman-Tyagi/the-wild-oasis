import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { login } from '../../services/apiAuth';

function useLogin() {
  const navigate = useNavigate();

  const { isLoading, mutate: loginUser } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: () => {
      toast.loading('Loading...');
      setTimeout(() => navigate('/dashboard'), 1000);
    },
    onError: err => toast.error(err.message),
  });

  return { isLoading, loginUser };
}

export default useLogin;

export function isLoggedIn() {
  const token = localStorage.getItem('token');
  return token ? true : false;
}
