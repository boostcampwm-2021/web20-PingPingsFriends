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

export const fetchAPI = async (fetchURL: string, okCallback: (res: Response) => void, failCallback: (res: Response) => void, errorCallback: (err: any) => void, fetchOption?: RequestInit) => {
  try {
    const response: Response = await fetch(fetchURL, fetchOption);
    if (response.ok) {
      okCallback(response);
    } else {
      // if(액세스 토큰 만료?) {
      //   반환된 액세스 토큰 =  fetch(리프레시 토큰 유효성 테스트);
      //   if(리프레시 토큰 역시 만료) throw err;
      //   fetchAPI(다시 같은 요청, 반환된 액세스 토큰);
      // }
      failCallback(response);
    }
  } catch (err) {
    errorCallback(err);
  }
};
