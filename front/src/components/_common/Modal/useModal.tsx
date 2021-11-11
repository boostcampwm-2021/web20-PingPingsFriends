import React, { useEffect, useRef, useState } from 'react';

export type ModalEvent = React.MouseEvent<Element> | React.KeyboardEvent<Element>;
export type ToggleHandler = (event: ModalEvent) => void;

const useModal = ($elem = '#modal') => {
  const [isShowing, setIsShowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const $portal = document.querySelector($elem) as Element;

  const toggle: ToggleHandler = (event) => {
    if ('key' in event && event.key === 'Escape') {
      setIsShowing(!isShowing);
      return;
    }

    const target = event.target as Element;
    if (target.closest('.modal-close-button')) {
      setIsShowing(!isShowing);
      return;
    }
    if (target.closest('.contents')) {
      return;
    }
    setIsShowing(!isShowing);
  };

  useEffect(() => {
    contentRef.current?.focus();
  });

  return {
    isShowing,
    toggle,
    $portal,
    contentRef,
  };
};

export default useModal;
