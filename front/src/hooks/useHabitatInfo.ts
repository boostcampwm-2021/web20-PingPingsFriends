import { useEffect, useState } from 'react';
import Config from '@lib/constants/config';
import { HabitatInfo } from '@src/types/Habitat';

const useHabitatInfo = (habitatId: number) => {
  const [habitatInfo, setHabitatInfo] = useState<HabitatInfo | undefined>(undefined);

  useEffect(() => {
    if (habitatId === undefined) return;
    fetch(Config.BACK_HOST + `/api/habitat/${habitatId}`, { headers: { Accept: 'application/json' } })
      .then((res) => res.json())
      .then((data: HabitatInfo) => {
        setHabitatInfo(data);
      })
      .catch((err) => {
        setHabitatInfo(undefined);
      });
  }, [habitatId]);

  return { habitatInfo };
};

export default useHabitatInfo;
