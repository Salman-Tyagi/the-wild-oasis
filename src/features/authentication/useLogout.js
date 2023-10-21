import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { logout as logoutApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, mutate: logout } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.loading('Logging out...');
      queryClient.removeQueries();
      setTimeout(() => navigate('/login', { replace: true }), 1000);
    },
  });

  return { isLoading, logout };
}

export default useLogout;
