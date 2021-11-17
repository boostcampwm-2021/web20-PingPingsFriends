import { useEffect, useRef, useState } from 'react';

const useSideNavi = (userHabitatId: number) => {
  const [curHabitatId, setCurHabitatId] = useState(userHabitatId);
  const habitatList = useRef<number[]>([]);
  // const historyIdx = useRef(4);
  const [historyIdx, setHistoryIdx] = useState<number>(4);

  useEffect(() => {
    // 메인 패이지 최초 랜더링 시
    // 서식지 10개 랜덤으로 받아옴
    // fetch('get random habitat id except user habitat 10 id')
    const resList = [0, 1, 2, 0, 1, 2, 0, 1, 2, 0];
    if (userHabitatId !== -1) habitatList.current = resList.splice(4, 0, userHabitatId);
    else {
      habitatList.current = resList;
      setCurHabitatId(habitatList.current[historyIdx]);
    }
  }, [userHabitatId]);

  useEffect(() => {
    // const curHistoryIdx = habitatList.current.indexOf(curHabitatId);
    if (historyIdx === 1 || historyIdx === habitatList.current.length - 2) {
      // 마지막 인덱스로 가기 전에 다시 10개를 받아옴
      // fetch('get random habitat 10 id )
      const resList = [0, 1, 2, 0, 1, 2, 0, 1, 2, 0];
      if (historyIdx === 1) {
        habitatList.current = [...resList, ...habitatList.current];
        setHistoryIdx(historyIdx + 10);
        // historyIdx += 10;
      } else {
        habitatList.current = [...habitatList.current, ...resList];
      }
    }
  }, [curHabitatId]);

  const handleNextHabitat = () => {
    setCurHabitatId(habitatList.current[historyIdx + 1]);
    setHistoryIdx(historyIdx + 1);
  };

  const handlePrevHabitat = () => {
    setCurHabitatId(habitatList.current[historyIdx - 1]);
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
