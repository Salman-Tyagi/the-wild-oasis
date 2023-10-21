import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { isLoggedIn } from './useLogin';

function ProtectedRoute({ children }) {
  const haveUser = isLoggedIn();
  const navigate = useNavigate();

  useEffect(() => {
    if (!haveUser) {
      toast.error('User logged out! Please login again.');
      navigate('/login');
    }
  }, [haveUser, navigate]);

  if (haveUser) return children;
}

export default ProtectedRoute;
