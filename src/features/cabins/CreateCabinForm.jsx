import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import { Textarea } from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

function CreateCabinForm({ setShowForm }) {
  const { register, handleSubmit } = useForm();

  const clientQuery = useQueryClient();

  const {
    isLoading: isCreating,
    mutate,
    reset,
  } = useMutation({
    mutationFn: newCabin => createCabin(newCabin),
    onSuccess: () => {
      toast.success('New cabin created successfully');
      clientQuery.invalidateQueries({
        queryKey: ['cabins'],
      });
      reset();
    },
    onError: err => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate(data);
    // setShowForm(false);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Cabin name'>
        <Input type='text' id='name' {...register('name')} />
      </FormRow>

      <FormRow label='Maximum capacity'>
        <Input type='number' id='maxCapacity' {...register('maxCapacity')} />
      </FormRow>

      <FormRow label='Regular price'>
        <Input type='number' id='regularPrice' {...register('regularPrice')} />
      </FormRow>

      <FormRow label='Discount'>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          {...register('discount')}
        />
      </FormRow>

      <FormRow label='Description for website'>
        <Textarea
          type='number'
          id='description'
          defaultValue=''
          {...register('description')}
        />
      </FormRow>

      <FormRow label='Cabin photo'>
        <FileInput id='image' accept='image/*' />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isCreating}>Add Cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
