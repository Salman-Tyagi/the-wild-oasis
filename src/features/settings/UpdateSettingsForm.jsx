import { useSettings } from './useSettings';

import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSettings } from '../../services/apiSettings';
import toast from 'react-hot-toast';
import { useUpdateSettings } from './useUpdateSettings';

function UpdateSettingsForm() {
  const {
    isLoading,
    setttings: {
      _id,
      minNightsPerBooking,
      maxNightsPerBooking,
      maxGuestsPerBooking,
      breakfastPrice,
    } = {},
  } = useSettings();

  const { isUpdating, updateSettings } = useUpdateSettings(_id);

  function handleUpdateValue(e, field) {
    const { value } = e.target;
    if (!value) return;

    updateSettings({ [field]: value * 1 });
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          type='number'
          id='min-nights'
          disabled={isUpdating}
          defaultValue={minNightsPerBooking}
          onBlur={e => handleUpdateValue(e, 'minNightsPerBooking')}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          id='max-nights'
          disabled={isUpdating}
          defaultValue={maxNightsPerBooking}
          onBlur={e => handleUpdateValue(e, 'maxNightsPerBooking')}
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          id='max-guests'
          disabled={isUpdating}
          defaultValue={maxGuestsPerBooking}
          onBlur={e => handleUpdateValue(e, 'maxGuestsPerBooking')}
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          type='number'
          id='breakfast-price'
          disabled={isUpdating}
          defaultValue={breakfastPrice}
          onBlur={e => handleUpdateValue(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
