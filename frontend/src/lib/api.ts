const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function getUserProfile() {
  const res = await fetch(`${API_URL}/users/me`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch user');
  }
  return res.json();
}

export async function updateUserProfile(userId: string, data: any) {
  const res = await fetch(`${API_URL}/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to update user');
  }
  return res.json();
}