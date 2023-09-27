export async function getCabins() {
  try {
    const res = await fetch('http://127.0.0.1:9000/api/v1/cabins');
    const data = await res.json();
    return data;
  } catch {
    throw new Error('Error in getting cabins...');
  }
}

export async function deleteCabin(_id) {
  try {
    const res = await fetch(`http://127.0.0.1:9000/api/v1/cabins/${_id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: null,
    });

    if (!res.ok) throw new Error('Error in deleting cabin...');
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function createCabin(newCabin) {
  try {
    const form = new FormData();

    for (let key in newCabin) {
      if (key === 'image') {
        form.append(key, Array.from(newCabin[key])[0]);
      } else {
        form.append(key, newCabin[key]);
      }
    }

    const res = await fetch(`http://127.0.0.1:9000/api/v1/cabins`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: form,
    });
    if (!res.ok) throw new Error('Error in creating cabin...');
  } catch (err) {
    throw new Error(err.message);
  }
}
