import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from '@lib/utils/queryString';

const useSideNavi = (userHabitatId: number) => {
  const [curHabitatId, setCurHabitatId] = useState(userHabitatId);
  const [habitatList, setHabitatList] = useState<number[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(3);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    fetch(`/api/habitat/random?currentId=${curHabitatId}`)
      .then((res) => res.json())
      .then((data: number[]) => {
        data.splice(historyIdx, 0, userHabitatId);
        setHabitatList(data);
      });
  }, [userHabitatId]);

  useEffect(() => {
    if (historyIdx === 1 || historyIdx === habitatList.length - 2) {
      fetch(`/api/habitat/random?currentId=${curHabitatId}`)
        .then((res) => res.json())
        .then((data: number[]) => {
          if (historyIdx === 1) {
            setHabitatList([...data, ...habitatList]);
            setHistoryIdx(historyIdx + 10);
          } else {
            setHabitatList([...habitatList, ...data]);
          }
        });
    }
  }, [curHabitatId]);

  useEffect(() => {
    const queryMap = queryString(location.search);
    if ('habitat' in queryMap) {
      setCurHabitatId(+queryMap['habitat']);
    }
  }, [location]);

  const handleNextHabitat = () => {
    history.push(`/?habitat=${habitatList[historyIdx + 1]}`);
    setHistoryIdx(historyIdx + 1);
  };

  const handlePrevHabitat = () => {
    history.push(`/?habitat=${habitatList[historyIdx - 1]}`);
    setCurHabitatId(habitatList[historyIdx - 1]);
    setHistoryIdx(historyIdx - 1);
  };

  return {
    curHabitatId,
    handleNextHabitat,
    handlePrevHabitat,
    habitatList,
    historyIdx,
  };
};

export default useSideNavi;
