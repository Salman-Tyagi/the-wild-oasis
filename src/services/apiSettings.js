import axios from 'axios';

const API_HOST = 'http://127.0.0.1:9000/api/v1/settings';

export const getSettings = async () => {
  try {
    const res = await axios(`${API_HOST}`);
    const data = res?.data.data;
    return data[0];
  } catch (err) {
    console.error(err);
    throw Error('Error in getting settings data');
  }
};

export const updateSettings = async (id, newSettings) => {
  try {
    await axios.patch(`${API_HOST}/${id}`, newSettings);
  } catch (err) {
    console.error(err);
    throw Error('Settings could not be updated');
  }
};

// import supabase from "./supabase";

// export async function getSettings() {
//   const { data, error } = await supabase.from("settings").select("*").single();

//   if (error) {
//     console.error(error);
//     throw new Error("Settings could not be loaded");
//   }
//   return data;
// }

// // We expect a newSetting object that looks like {setting: newValue}
// export async function updateSetting(newSetting) {
//   const { data, error } = await supabase
//     .from("settings")
//     .update(newSetting)
//     // There is only ONE row of settings, and it has the ID=1, and so this is the updated one
//     .eq("id", 1)
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("Settings could not be updated");
//   }
//   return data;
// }
