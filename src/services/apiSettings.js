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

export async function getSettings() {
  try {
    const res = await fetch('http://127.0.0.1:9000/api/v1/settings');
    if (!res.ok) throw new Error('Error in gettings settings...');

    const data = await res.json();
    if (data.status === 'fail')
      throw new Error('Error in gettting settings...');

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function updateSettings(newSettings, id) {
  try {
    const data = await fetch(`http://127.0.0.1:9000/api/v1/settings/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSettings),
    });
    if (!data.ok) throw new Error('Error in updating settings...');
  } catch (err) {
    throw new Error(err.message);
  }
}
