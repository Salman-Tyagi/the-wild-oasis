import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { currentUser } from './useLogin';

function ProtectedRoute({ children }) {
  const user = currentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user]);

  return children;
}

export default ProtectedRoute;
