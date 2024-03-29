import styled from 'styled-components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginForm from '../features/authentication/LoginForm';
import Logo from '../ui/Logo';
import Heading from '../ui/Heading';
import { isLoggedIn } from '../features/authentication/useLogin';

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  const haveUser = isLoggedIn();
  const navigate = useNavigate();

  useEffect(() => {
    if (haveUser) return navigate('/dashboard');
  }, []);

  return (
    <LoginLayout>
      <Logo />
      <Heading as='h4'>Login to your account</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
