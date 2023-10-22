import { useEffect, useState } from 'react';

import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import SpinnerMini from '../../ui/SpinnerMini';

import useUser from './useUser';
import useUpdateUserData from './useUpdateUserData';

function UpdateUserDataForm() {
  const { user: { fullName: name, email } = {} } = useUser();
  const { isLoading, updateUser } = useUpdateUserData();

  const [fullName, setFullName] = useState('');
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    const paylaod = { fullName, email };
    if (avatar) paylaod.avatar = avatar;
    updateUser(paylaod);
  }

  useEffect(() => {
    if (name) setFullName(name);
  }, [name]);

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label='Email address'>
        <Input defaultValue={email} disabled />
      </FormRow>
      <FormRow label='Full name'>
        <Input
          disabled={isLoading}
          type='text'
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          id='fullName'
        />
      </FormRow>
      <FormRow label='Avatar image'>
        <FileInput
          disabled={isLoading}
          id='avatar'
          type='file'
          accept='image/*'
          onChange={e => {
            if (e.target.files?.[0]) setAvatar(e.target.files[0]);
          }}
        />
      </FormRow>
      <FormRow>
        <Button disabled={isLoading} type='reset' variation='secondary'>
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : 'Update account'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
