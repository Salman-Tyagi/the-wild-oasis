import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSettings as updateSettingsApi } from '../../services/apiSettings';
import toast from 'react-hot-toast';

export function useUpdateSettings(_id) {
  const clientQuery = useQueryClient();

  const { isLoading: isUpdating, mutate: updateSettings } = useMutation({
    mutationFn: newSettings => updateSettingsApi(newSettings, _id),

    onSuccess: () => {
      // toast.success('Settings updated successfully');
      clientQuery.invalidateQueries({
        queryKey: ['settings'],
      });
    },

    onError: () => toast.error(err.message),
  });

  return { isUpdating, updateSettings };
}
