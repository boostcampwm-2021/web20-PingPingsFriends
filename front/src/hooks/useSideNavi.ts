import { useEffect, useReducer, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from '@lib/utils/queryString';

const FETCH_HABITAT_LENGTH = 10;
const INIT_HISTORY_INDEX = 4;

interface HistoryState {
  habitatList: number[];
  curIndex: number;
}

interface Action {
  type: 'INIT_RANDOM_HABITAT' | 'EXTEND_POST_HISTORY' | 'EXTEND_PRE_HISTORY' | 'GO_NEXT_HABITAT' | 'GO_PREV_HABITAT' | 'GO_TARGET_HABITAT';
  data: number[];
}

const initHistoryState: HistoryState = {
  habitatList: [],
  curIndex: -1,
};

const reducer = (state: HistoryState, action: Action): HistoryState => {
  switch (action.type) {
    case 'INIT_RANDOM_HABITAT':
      return { habitatList: action.data, curIndex: INIT_HISTORY_INDEX };
    case 'EXTEND_POST_HISTORY':
      return { habitatList: [...state.habitatList, ...action.data], curIndex: state.curIndex };
    case 'EXTEND_PRE_HISTORY':
      return { habitatList: [...action.data, ...state.habitatList], curIndex: state.curIndex + action.data.length };
    case 'GO_NEXT_HABITAT':
      return { ...state, curIndex: state.curIndex + 1 };
    case 'GO_PREV_HABITAT':
      return { ...state, curIndex: state.curIndex - 1 };
    case 'GO_TARGET_HABITAT':
      return { ...state, habitatList: action.data };
    default:
      throw new Error('habitat history error');
  }
};

const useSideNavi = (userHabitatId: number) => {
  const [historyState, historyDispatch] = useReducer(reducer, initHistoryState);
  const getCurHabitat = (idx: number = 0) => historyState.habitatList[historyState.curIndex + idx] ?? 2;
  const history = useHistory();
  const location = useLocation();

  const initRandomList = async (habitatId: number) => {
    const res: Response = await fetch(`/api/habitat/random?currentId=${habitatId}`);
    const data: number[] = await res.json();
    data.splice(INIT_HISTORY_INDEX, 0, habitatId);
    historyDispatch({ type: 'INIT_RANDOM_HABITAT', data });
    history.push(`/?habitat=${habitatId}`);
  };

  useEffect(() => {
    const queryMap = queryString(location.search);
    if ('habitat' in queryMap) {
      const curHabitatId = +queryMap['habitat'];
      if (curHabitatId === getCurHabitat()) return;
      else if (curHabitatId === getCurHabitat(1)) historyDispatch({ type: 'GO_NEXT_HABITAT', data: [] });
      else if (curHabitatId === getCurHabitat(-1)) historyDispatch({ type: 'GO_PREV_HABITAT', data: [] });
      else {
        initRandomList(curHabitatId);
      }
    } else {
      initRandomList(userHabitatId);
    }
  }, [location]);

  useEffect(() => {
    if (historyState.curIndex === 1 || historyState.curIndex === historyState.habitatList.length - 2) {
      fetch(`/api/habitat/random?currentId=${getCurHabitat()}`)
        .then((res) => res.json())
        .then((data: number[]) => {
          if (historyState.curIndex === 1) historyDispatch({ type: 'EXTEND_PRE_HISTORY', data });
          else historyDispatch({ type: 'EXTEND_POST_HISTORY', data });
        });
    }
  }, [historyState]);

  const handleNextHabitat = () => {
    if (historyState.curIndex + 1 === historyState.habitatList.length) return;
    history.push(`/?habitat=${getCurHabitat(1)}`);
  };

  const handlePrevHabitat = () => {
    if (historyState.curIndex - 1 === 0) return;
    history.push(`/?habitat=${getCurHabitat(-1)}`);
  };

  return {
    handleNextHabitat,
    handlePrevHabitat,
    historyState,
    getCurHabitat,
  };
};

export default useSideNavi;
