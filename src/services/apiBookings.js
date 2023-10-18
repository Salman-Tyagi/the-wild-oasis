import axios from 'axios';

const API_HOST = 'http://127.0.0.1:9000/api/v1/cabins';

export const getAllCabins = async () => {
  try {
    const res = await axios(`${API_HOST}`);
    const data = res?.data?.data;
    return data;
  } catch (err) {
    console.log(err);
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

// import { getToday } from "../utils/helpers";
// import supabase from "./supabase";

// export async function getBooking(id) {
//   const { data, error } = await supabase
//     .from("bookings")
//     .select("*, cabins(*), guests(*)")
//     .eq("id", id)
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("Booking not found");
//   }

//   return data;
// }

// // Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
// export async function getBookingsAfterDate(date) {
//   const { data, error } = await supabase
//     .from("bookings")
//     .select("created_at, totalPrice, extrasPrice")
//     .gte("created_at", date)
//     .lte("created_at", getToday({ end: true }));

//   if (error) {
//     console.error(error);
//     throw new Error("Bookings could not get loaded");
//   }

//   return data;
// }

// // Returns all STAYS that are were created after the given date
// export async function getStaysAfterDate(date) {
//   const { data, error } = await supabase
//     .from("bookings")
//     // .select('*')
//     .select("*, guests(fullName)")
//     .gte("startDate", date)
//     .lte("startDate", getToday());

//   if (error) {
//     console.error(error);
//     throw new Error("Bookings could not get loaded");
//   }

//   return data;
// }

// // Activity means that there is a check in or a check out today
// export async function getStaysTodayActivity() {
//   const { data, error } = await supabase
//     .from("bookings")
//     .select("*, guests(fullName, nationality, countryFlag)")
//     .or(
//       `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
//     )
//     .order("created_at");

//   // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
//   // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
//   // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

//   if (error) {
//     console.error(error);
//     throw new Error("Bookings could not get loaded");
//   }
//   return data;
// }

// export async function updateBooking(id, obj) {
//   const { data, error } = await supabase
//     .from("bookings")
//     .update(obj)
//     .eq("id", id)
//     .select()
//     .single();

//   if (error) {
//     console.error(error);
//     throw new Error("Booking could not be updated");
//   }
//   return data;
// }

// export async function deleteBooking(id) {
//   // REMEMBER RLS POLICIES
//   const { data, error } = await supabase.from("bookings").delete().eq("id", id);

//   if (error) {
//     console.error(error);
//     throw new Error("Booking could not be deleted");
//   }
//   return data;
// }
