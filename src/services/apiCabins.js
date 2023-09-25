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
