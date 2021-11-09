import React, { useEffect, useRef, useState } from 'react';

export type ModalEvent = React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>;
export type ToggleModal = (event: ModalEvent) => void;

const useModal = ($elem = '#modal') => {
  const [isShowing, setIsShowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const $portal = document.querySelector($elem) as Element;

  const toggle: ToggleModal = (event) => {
    if ('key' in event && event.key === 'Escape') {
      setIsShowing(!isShowing);
      return;
    }

    const target = event.target as Element;
    if (target.closest('.close')) {
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
