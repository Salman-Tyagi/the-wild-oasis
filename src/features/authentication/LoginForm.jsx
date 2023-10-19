import { useState } from 'react';
import styled from 'styled-components';

import useLogin from './useLogin';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import SpinnerMini from '../../ui/SpinnerMini';
import FormRowVertical from '../../ui/FormRowVertical';

const Label = styled.label`
  margin-top: 1rem;
`;

function LoginForm() {
  const [email, setEmail] = useState('aamir@gmail.com');
  const [password, setPassword] = useState('test1234');
  const { isLoading, loginUser } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;
    loginUser({ email, password });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical>
        <Label>Email address</Label>
        <Input
          // type='email'
          id='email'
          // This makes this form better for password managers
          autoComplete='username'
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Label>Password</Label>
        <Input
          type='password'
          id='password'
          autoComplete='current-password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <div>
        <Button size='large'>{isLoading ? <SpinnerMini /> : 'Login'}</Button>
      </div>
    </Form>
  );
}

export default LoginForm;
