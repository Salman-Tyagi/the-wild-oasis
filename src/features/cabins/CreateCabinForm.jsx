import { useForm } from 'react-hook-form';
import { useCreateCabin } from './useCreateCabin';
import { useUpdateCabin } from './useUpdateCabin';

import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import { Textarea } from '../../ui/Textarea';

function CreateCabinForm({ setShowForm, EditCabin = {} }) {
  const { _id, ...editValues } = EditCabin;
  const isEditSession = _id ? true : false;

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const { isCreating, createCabinApi } = useCreateCabin();
  const { isUpdating, updateCabinApi } = useUpdateCabin(_id);

  function onSubmit(data) {
    if (isEditSession) {
      updateCabinApi(data);
    } else {
      createCabinApi(data, {
        onSuccess: () => {
          reset();
        },
      });
    }
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isCreating || isUpdating}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow label='Max capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isCreating || isUpdating}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be minimum 1',
            },
          })}
        />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isCreating || isUpdating}
          {...register('regularPrice', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          disabled={isCreating || isUpdating}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: value => {
              return (
                +getValues().regularPrice >= +value ||
                'Discount should be less than regular price'
              );
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Description for website'
        error={errors?.description?.message}
      >
        <Textarea
          type='number'
          id='description'
          disabled={isCreating || isUpdating}
          defaultValue=''
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label='Cabin photo' error={errors?.image?.message}>
        <FileInput
          id='image'
          disabled={isCreating || isUpdating}
          accept='image/*'
          type='file'
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          onClick={() => setShowForm(false)}
          variation='secondary'
          type='reset'
        >
          Cancel
        </Button>
        <Button disabled={isCreating || isUpdating}>
          {isEditSession ? 'Save cabin' : 'Add Cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
