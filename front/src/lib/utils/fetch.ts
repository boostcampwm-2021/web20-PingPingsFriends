type HTTPMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE' | 'PUT';

interface IHeadersOptions {
  // 필요시 더 추가
  'Content-Type'?: 'application/json';
}

const setHeaders = (headersOptions: HeadersInit, headers: Headers) => {
  Object.keys(headersOptions).forEach((key) => {
    const value = headersOptions[key as keyof HeadersInit];
    if (value) {
      headers.set(key, value as any);
    }
  });
};

export const getAuthOption = (method: HTTPMethod, accessToken: string | undefined, data?: BodyInit, headersOptions?: HeadersInit): RequestInit => {
  const headers = new Headers();
  headers.set('Authorization', `Bearer ${accessToken}`);
  if (headersOptions) {
    setHeaders(headersOptions, headers);
  }

  return { method: method, headers, body: data };
};

export const fetchAPI = async (fetchURL: string, okCallback: (res: Response) => void, failCallback: (res: Response) => void, errorCallback: (err: any) => void, fetchOption?: RequestInit) => {
  try {
    const response: Response = await fetch(fetchURL, fetchOption);
    if (response.ok) {
      okCallback(response);
    } else {
      if (response.status === 401) {
        fetchAPI(
          `/api/users/auth/refresh`,
          async (okResponse) => {
            const { accessToken } = await okResponse.json();
            localStorage.setItem('access_token', accessToken);
            let headers;
            if (fetchOption) {
              headers = new Headers(fetchOption.headers);
              headers.set('Authorization', `Bearer ${localStorage.getItem('access_token')}`);
            }

            fetchAPI(
              fetchURL,
              (okRes) => {
                okCallback(okRes);
              },
              (failRes) => {
                failCallback(failRes);
              },
              (err2) => {
                errorCallback(err2);
              },
              { ...fetchOption, headers }
            );
          },
          (failResponse) => {
            if (failResponse.status === 419) {
              localStorage.removeItem('access_token');
            }
            console.log('adfadsfad', failResponse);
            failCallback(failResponse);
          },
          (err) => {
            console.log(err);
            errorCallback(err);
          }
        );
      } else {
        failCallback(response);
      }
    }
  } catch (err) {
    errorCallback(err);
  }
};
