import { useEffect, useState } from 'react';

export interface HabitatInfo {
  recentUser: string[];
  totalUser: number;
  totalPost: number;
  recentUpload: string;
  king: string;
  name: string;
  color: string;
}

const useHabitatInfo = (habitatId: number) => {
  const [habitatInfo, setHabitatInfo] = useState<HabitatInfo | undefined>(undefined);

  useEffect(() => {
    if (habitatId === undefined) return;
    fetch(`/habitat/${habitatId}.json`, { headers: { Accept: 'application/json' } })
      .then((res) => res.json())
      .then((json) => setHabitatInfo(json))
      .catch((err) => {
        console.log(err);
        setHabitatInfo(undefined);
      });
  }, [habitatId]);

  return { habitatInfo };
};

export default useHabitatInfo;
