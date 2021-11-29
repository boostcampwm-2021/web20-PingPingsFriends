import { useUserDispatch, User, UserState } from '@src/contexts/UserContext';
import { useEffect } from 'react';
import { getAuthOption } from '@lib/utils/fetch';

const useValidateUser = (userState: UserState) => {
  const userDispatch = useUserDispatch();
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken || accessToken === 'undefined' || userState.loading || userState.data?.userId !== -1) return;
    const validFetch = async () => {
      const res: Response = await fetch(`/api/users/info`, getAuthOption('GET', accessToken));
      if (res.ok) {
        const data = await res.json();
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
      } else return;
    };
    validFetch();
  }, [userState]);
};

export default useValidateUser;
