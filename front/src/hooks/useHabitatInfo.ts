import { useEffect, useState } from 'react';
import { HabitatInfo } from '@src/types/Habitat';

const useHabitatInfo = (habitatId: number | undefined) => {
  const [habitatInfo, setHabitatInfo] = useState<HabitatInfo | undefined>(undefined);

  useEffect(() => {
    if (habitatId === undefined) return;
    setHabitatInfo(undefined);
    const fetchHabitatInfo = async () => {
      const res: Response = await fetch(`/api/habitat/${habitatId}`, { headers: { Accept: 'application/json' } });
      if (res.ok) {
        const data = await res.json();
        setHabitatInfo(data);
      } else {
        setHabitatInfo(undefined);
      }
    };
    try {
      fetchHabitatInfo();
    } catch (err) {
      console.log(err);
      setHabitatInfo(undefined);
    }
  }, [habitatId]);

  return { habitatInfo };
};

export default useHabitatInfo;
