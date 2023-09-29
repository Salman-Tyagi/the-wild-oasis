export async function getCabins() {
  try {
    const res = await fetch('http://127.0.0.1:9000/api/v1/cabins');
    if (!res.ok) throw new Error('Error in fetching cabin...');

    const data = await res.json();
    return data;
  } catch {
    throw new Error('Error in getting cabins...');
  }
}

export async function deleteCabin(id) {
  try {
    const res = await fetch(`http://127.0.0.1:9000/api/v1/cabins/${id}`, {
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

export async function updateCabin(newCabin, id) {
  try {
    const form = new FormData();

    for (let key in newCabin) {
      if (key === 'image' && Array.from(newCabin[key])[0]) {
        if (typeof newCabin[key] !== 'string') {
          form.append(key, Array.from(newCabin[key])[0]);
        } else {
          delete newCabin[key];
        }
      } else {
        form.append(key, newCabin[key]);
      }
    }

    const data = await fetch(`http://127.0.0.1:9000/api/v1/cabins/${id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
      },
      body: form,
    });
    if (!data.ok) throw new Error('Error in updating cabin...');
  } catch (err) {
    throw new Error(err.message);
  }
}
