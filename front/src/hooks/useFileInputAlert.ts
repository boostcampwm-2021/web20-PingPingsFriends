import { useRef, useState } from 'react';
import { ModalType } from '@src/types/Modal';

type TUseFileInputAlert = () => any;

const useFileInputAlert: TUseFileInputAlert = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<ModalType>(null);

  const handleClick = () => {
    setLoading(() => 'loading');
    document.body.onfocus = () => checkIt();
  };
  const checkIt = (type?: ModalType) => {
    const fileElement = ref.current!;
    if (fileElement.value.length) {
      setLoading(type || null);
    } else {
      setLoading(null);
    }
    document.body.onfocus = null;
  };

  return { loading, ref, checkIt, setLoading, handleClick };
};

export default useFileInputAlert;
