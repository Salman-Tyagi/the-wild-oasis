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
    await fetch(`http://127.0.0.1:9000/api/v1/cabins/${_id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: null,
    });
  } catch {
    throw new Error(`Error in deleting cabin...`);
  }
}

export async function createCabin(newCabin) {
  try {
    await fetch(`http://127.0.0.1:9000/api/v1/cabins`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCabin),
    });
  } catch {
    throw new Error('Error in creating cabin...');
  }
}
