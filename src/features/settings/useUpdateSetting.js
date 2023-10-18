import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSettings } from '../../services/apiSettings';
import toast from 'react-hot-toast';

function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updatingSetting } = useMutation({
    mutationFn: ([settingId, newSetting]) =>
      updateSettings(settingId, newSetting),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['settings'],
      }),
        toast.success('Settings updated successfully');
    },
    onError: err => toast.error(err.message),
  });

  return { isUpdating, updatingSetting };
}

export default useUpdateSetting;
