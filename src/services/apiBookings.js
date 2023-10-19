import axios from './axiosIntance';

const API_HOST = '/api/v1/cabins';

export const getAllCabins = async () => {
  try {
    const res = await axios(`${API_HOST}`);
    const data = res?.data?.data;
    return data;
  } catch (err) {
    console.error(err.response.data);
    throw Error('Error in getting cabins');
  }
};

export const deleteCabin = async id => {
  try {
    await axios.delete(`${API_HOST}/${id}`);
  } catch (err) {
    console.error(`Error: ${err.response.data.message}`);
    throw Error('Cabin could be deleted');
  }
};

export const createCabin = async newCabin => {
  const formData = new FormData();

  for (let key in newCabin) {
    if (key === 'image' && typeof newCabin[key] !== 'string') {
      formData.append(key, newCabin[key][0]);
    } else if (key === 'image' && typeof newCabin[key] === 'string') {
      formData.append(key, newCabin[key]);
    } else {
      formData.append(key, newCabin[key]);
    }
  }

  try {
    await axios.post(`${API_HOST}`, formData);
  } catch (err) {
    console.error(err);
    throw Error('Cabin could not be created');
  }
};

export const editCabin = async (id, updatedCabin) => {
  const formData = new FormData();

  for (let key in updatedCabin) {
    if (key === 'image' && typeof updatedCabin[key] !== 'string') {
      formData.append(key, updatedCabin[key][0]);
    } else if (key === 'image' && typeof updatedCabin[key] === 'string') {
      formData.append(key, updatedCabin[key]);
    } else {
      formData.append(key, updatedCabin[key]);
    }
  }

  try {
    await axios.patch(`${API_HOST}/${id}`, formData);
  } catch (err) {
    console.error(err);
    throw Error('Cabin could not be updated');
  }
};
