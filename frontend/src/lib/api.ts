const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// 1. Get Profile / Preferences
export async function getUserProfile() {
  const res = await fetch(`${API_URL}/users/me`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
}

// 2. Update Profile / Preferences (Theme, Name, Title)
export async function updateUserProfile(userId: string, data: any) {
  const res = await fetch(`${API_URL}/users/${userId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update user');
  return res.json();
}

// 3. Get Tasks with Search & Filters
export async function getTasks(filters?: { search?: string; priority?: string; status?: string }) {
  const query = new URLSearchParams(filters as any).toString();
  const res = await fetch(`${API_URL}/tasks?${query}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
}

// 4. Create Task
export async function createTask(taskData: any) {
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  });
  if (!res.ok) throw new Error('Failed to create task');
  return res.json();
}