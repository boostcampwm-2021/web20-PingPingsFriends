type HTTPMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

interface IHeadersOptions {
  // 필요시 더 추가
  'Content-Type'?: 'application/json';
}

export const getAuthOption = (method: HTTPMethod, accessToken: string | undefined, data?: BodyInit, headersOptions?: IHeadersOptions): RequestInit => {
  const headers = new Headers();
  headers.set('Authorization', `Bearer ${accessToken}`);
  if (headersOptions) {
    Object.keys(headersOptions).forEach((key) => {
      const value = headersOptions[key as keyof IHeadersOptions];
      if (value) {
        headers.set(key, value);
      }
    });
  }

  return { method: method, headers, body: data };
};
