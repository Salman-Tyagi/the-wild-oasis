// import supabase from './supabase';

export async function getCabins() {
  // const { data, error } = await supabase.from("cabins").select("*");
  try {
    const res = await fetch('http://127.0.0.1:9000/api/v1/cabins');
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }

  // if (error) {
  //   console.error(error);
  //   throw new Error('Cabins could not be loaded');
  // }

  // return data;
}

export async function deleteCabin(_id) {
  try {
    await fetch(`http://127.0.0.1:9000/api/v1/cabins/${_id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: null,
    });
  } catch {
    throw new Error(`Error in deleting cabin`);
  }
}
