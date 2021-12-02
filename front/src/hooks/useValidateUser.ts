import { useUserDispatch, User, UserState } from '@src/contexts/UserContext';
import { useEffect } from 'react';
import { getAuthOption, fetchAPI } from '@lib/utils/fetch';

const useValidateUser = (userState: UserState) => {
  const userDispatch = useUserDispatch();
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken || accessToken === 'undefined' || userState.loading || userState.data?.userId !== -1) return;
    fetchAPI(
      `/api/users/info`,
      async (okRes) => {
        const data = await okRes.json();
        const newState: User = {
          userId: data.id,
          username: data.username,
          nickname: data.nickname,
          habitatId: data.habitatId,
          speciesId: data.speciesId,
          url: data.content?.url,
          accessToken: accessToken!,
        };
        userDispatch({ type: 'GET_USER_SUCCESS', data: newState });
      },
      (failRes) => {
        console.log(failRes);
      },
      (err) => {
        console.log(err);
      },
      getAuthOption('GET', accessToken)
    );
  }, [userState]);
};

export default useValidateUser;
