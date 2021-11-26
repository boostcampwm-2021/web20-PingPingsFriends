type HTTPMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

export const getAuthOption = (method: HTTPMethod, accessToken: string | undefined, data?: any): RequestInit => {
  return { method: method, headers: { Authorization: `Bearer ${accessToken}` }, body: data };
};
