import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { signup as signupApi } from '../../services/apiAuth';

function useSignup() {
  const navigate = useNavigate();

  const { isLoading, mutate: signup } = useMutation({
    mutationFn: newUser => signupApi(newUser),
    onSuccess: () => {
      toast.success('Account created');
      navigate('/login');
    },
    onError: err => toast.error(err.message),
  });

  return { isLoading, signup };
}

export default useSignup;
