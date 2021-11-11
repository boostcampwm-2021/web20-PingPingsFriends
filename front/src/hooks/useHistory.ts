import { useEffect, useRef, useState } from 'react';

const useHistory = (userHabitatId: number) => {
  const [curHabitatId, setCurHabitatId] = useState(userHabitatId);
  const habitatList = useRef<number[]>([]);
  const historyIdx = useRef(4);

  useEffect(() => {
    // 메인 패이지 최초 랜더링 시
    // 서식지 10개 랜덤으로 받아옴
    // fetch('get random habitat id except user habitat 10 id')
    const resList = [0, 1, 2, 0, 1, 2, 0, 1, 2, 0];
    if (userHabitatId !== -1) habitatList.current = resList.splice(4, 0, userHabitatId);
    else {
      habitatList.current = resList;
      setCurHabitatId(habitatList.current[historyIdx.current]);
    }
  }, [userHabitatId]);

  useEffect(() => {
    // const curHistoryIdx = habitatList.current.indexOf(curHabitatId);
    if (historyIdx.current === 1 || historyIdx.current === habitatList.current.length - 2) {
      // 마지막 인덱스로 가기 전에 다시 10개를 받아옴
      // fetch('get random habitat 10 id )
      const resList = [0, 1, 2, 0, 1, 2, 0, 1, 2, 0];
      if (historyIdx.current === 1) {
        habitatList.current = [...resList, ...habitatList.current];
        historyIdx.current += 10;
      } else {
        habitatList.current = [...habitatList.current, ...resList];
      }
    }
  }, [curHabitatId]);

  const handleNextHabitat = () => {
    setCurHabitatId(habitatList.current[++historyIdx.current]);
  };

  const handlePrevHabitat = () => {
    setCurHabitatId(habitatList.current[--historyIdx.current]);
  };

  return {
    curHabitatId,
    handleNextHabitat,
    handlePrevHabitat,
    habitatList,
    historyIdx,
  };
};

export default useHistory;
