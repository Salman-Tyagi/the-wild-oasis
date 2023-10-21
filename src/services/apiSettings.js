import axios from './axiosIntance';

const API_HOST = '/api/v1/settings';

export const getSettings = async () => {
  try {
    const res = await axios(`${API_HOST}`);
    const data = res?.data.data;
    return data[0];
  } catch (err) {
    // console.error(err.response.data);
    throw Error('Error in getting settings data');
  }
};

export const updateSettings = async (id, newSettings) => {
  try {
    await axios.patch(`${API_HOST}/${id}`, newSettings);
  } catch (err) {
    // console.error(err);
    throw Error('Settings could not be updated');
  }
};
