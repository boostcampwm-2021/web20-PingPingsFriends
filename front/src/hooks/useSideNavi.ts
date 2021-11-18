import { useEffect, useState } from 'react';
import Config from '@lib/constants/config';

const useSideNavi = (userHabitatId: number) => {
  const [curHabitatId, setCurHabitatId] = useState(userHabitatId);
  const [habitatList, setHabitatList] = useState<number[]>([]);
  // const habitatList = useRef<number[]>([]);
  // const historyIdx = useRef(4);
  const [historyIdx, setHistoryIdx] = useState<number>(3);

  useEffect(() => {
    fetch(Config.BACK_HOST + `/api/habitat/random?currentId=${curHabitatId}`)
      .then((res) => res.json())
      .then((data: number[]) => {
        data.splice(historyIdx, 0, userHabitatId);
        setHabitatList(data);
      });
  }, [userHabitatId]);

  useEffect(() => {
    if (historyIdx === 1 || historyIdx === habitatList.length - 2) {
      // const resList = [0, 1, 2, 0, 1, 2, 0, 1, 2, 0];
      fetch(Config.BACK_HOST + `/api/habitat/random?currentId=${curHabitatId}`)
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

  const handleNextHabitat = () => {
    setCurHabitatId(habitatList[historyIdx + 1]);
    setHistoryIdx(historyIdx + 1);
  };

  const handlePrevHabitat = () => {
    setCurHabitatId(habitatList[historyIdx - 1]);
    setHistoryIdx(historyIdx - 1);
  };

  return {
    curHabitatId,
    handleNextHabitat,
    handlePrevHabitat,
    habitatList,
    historyIdx,
    setCurHabitatId,
  };
};

export default useSideNavi;
