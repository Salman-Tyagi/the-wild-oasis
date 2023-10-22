import { useForm } from 'react-hook-form';

import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';

import useUpdatePassword from './useUpdatePassword';

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { isLoading, updatePassword } = useUpdatePassword();

  function onSubmit(newPassword) {
    updatePassword(newPassword);
    reset();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label='Password (min 8 characters)'
        error={errors?.password?.message}
      >
        <Input
          type='password'
          id='password'
          disabled={isLoading}
          autoComplete='current-password'
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Confirm password'
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type='password'
          disabled={isLoading}
          autoComplete='new-password'
          id='passwordConfirm'
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: value =>
              getValues().password === value || 'Passwords need to match',
          })}
        />
      </FormRow>
      <FormRow>
        <Button
          disabled={isLoading}
          onClick={reset}
          type='reset'
          variation='secondary'
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isLoading ? 'Upating...' : 'Update password'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
