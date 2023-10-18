import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';

import useSettings from './useSettings';
import useUpdateSetting from './useUpdateSetting';

function UpdateSettingsForm() {
  const { isLoading, settings = {} } = useSettings();
  const { isUpdating, updatingSetting } = useUpdateSetting();

  const {
    _id: settingId,
    breakfastPrice,
    maxGuestsPerBooking,
    maxNightsPerBooking,
    minNightsPerBooking,
  } = settings;

  function handleUpdateSetting(e, field) {
    const { value } = e.target;

    updatingSetting([settingId, { [field]: value }]);
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input
          type='number'
          id='min-nights'
          defaultValue={minNightsPerBooking}
          disabled={isLoading || isUpdating}
          onBlur={e => handleUpdateSetting(e, 'minNightsPerBooking')}
        />
      </FormRow>

      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          id='max-nights'
          defaultValue={maxNightsPerBooking}
          disabled={isLoading || isUpdating}
          onBlur={e => handleUpdateSetting(e, 'maxNightsPerBooking')}
        />
      </FormRow>

      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          id='max-guests'
          defaultValue={maxGuestsPerBooking}
          disabled={isLoading || isUpdating}
          onBlur={e => handleUpdateSetting(e, 'maxGuestsPerBooking')}
        />
      </FormRow>

      <FormRow label='Breakfast price'>
        <Input
          type='number'
          id='breakfast-price'
          defaultValue={breakfastPrice}
          disabled={isLoading || isUpdating}
          onBlur={e => handleUpdateSetting(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
