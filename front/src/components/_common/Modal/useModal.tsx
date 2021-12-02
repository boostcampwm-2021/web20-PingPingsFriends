import React, { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export type ModalEvent = React.MouseEvent<Element> | React.KeyboardEvent<Element>;
export type ToggleHandler = (event: ModalEvent | 'off') => void;

const useModal = (path = '', $elem = '#modal') => {
  const [isShowing, setIsShowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const $portal = document.querySelector($elem) as Element;
  const location = useLocation();
  const history = useHistory();
  const routePath = `/modal/${path}`;

  const toggle: ToggleHandler = (event) => {
    return path.length ? routeToggle() : generalToggle();

    function generalToggle() {
      if (event === 'off') {
        setIsShowing(!isShowing);
        return;
      }
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
    }

    function routeToggle() {
      const url = getURL(path);
      if (event === 'off') {
        history.push(url);
        return;
      }
      if ('key' in event && event.key === 'Escape') {
        history.push(url);
        return;
      }

      const target = event.target as Element;
      if (target.closest('.modal-close-button')) {
        history.push(url);
        return;
      }
      if (target.closest('.contents')) {
        return;
      }

      history.push(url);
    }
  };

  const getURL = (link: string) => {
    const path = location.pathname;
    const queryString = location.search;

    const arr = path.split('/').filter((pathname: string) => pathname.length);
    const removeCount = link.split('/').filter((v) => v.length).length;

    if (path.includes('modal')) {
      for (let i = 0; i <= removeCount; i++) {
        arr.pop();
      }
      return `/${arr.join('/')}${queryString}`;
    }
    arr.push('modal');
    arr.push(link);

    return `/${arr.join('/')}/${queryString}`;
  };

  useEffect(() => {
    contentRef.current?.focus();
  });

  return {
    isShowing,
    toggle,
    $portal,
    contentRef,
    routePath,
  };
};

export default useModal;
