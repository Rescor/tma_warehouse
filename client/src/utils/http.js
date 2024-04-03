const SERVER_ADDR = 'http://127.0.0.1:3001'

export async function getAllItemsData() {
  const req = await fetch(`${SERVER_ADDR}/items`)
  return await req.json();
}

export async function getRequestData(id) {
  const req = await fetch(`${SERVER_ADDR}/requests/${id}`)
  return await req.json();
}

export async function getStatusesData(id) {
  const req = await fetch(`${SERVER_ADDR}/requests/statuses`)
  return await req.json();
}

export async function getAllRequestsData() {
  const req = await fetch(`${SERVER_ADDR}/requests/all`)
  return await req.json();
}

export async function getGroupsData() {
  const req = await fetch(`${SERVER_ADDR}/groups`)
  return await req.json();
}

export async function getUnitsData() {
  const req = await fetch(`${SERVER_ADDR}/units`)
  return await req.json();
}

export async function getItemData(id) {
  const req = await fetch(`${SERVER_ADDR}/item/${id}`)
  return await req.json();
}

export async function editItem(item) {
  try {
    const response = await fetch(`${SERVER_ADDR}/item/${item.id}/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });

    if (!response.ok) throw new Error('Failed to edit the item');
    return await response.json();
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

export async function deleteItem(id) {
  const req = await fetch(`${SERVER_ADDR}/item/${id}/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return await req.json();
}

export async function getOrdersData(userId) {
  const req = await fetch(`${SERVER_ADDR}/user_orders/${userId}`)
  return await req.json();
}

export async function newOrder(order) {
  try {
    const response = await fetch(`${SERVER_ADDR}/requests/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });

    if (!response.ok) throw new Error('Failed to create the new order');
    return await response.json();
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

export async function createNewItem(item) {
  try {
    const response = await fetch(`${SERVER_ADDR}/item/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    });

    if (!response.ok) throw new Error('Failed to create the new item');
    return await response.json();
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

export async function changeReqStatus(request_id, new_status) {
  try {
    const response = await fetch(`${SERVER_ADDR}/requests/${request_id}/change_status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({request_id, new_status})
    });

    if (!response.ok) throw new Error('Failed to change the request status');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}
