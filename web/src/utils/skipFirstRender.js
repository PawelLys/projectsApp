import { useEffect, useRef } from 'react';

const useSkipFirstRender = (fn, args) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      return fn();
    }
  }, args);

  useEffect(() => {
    isMounted.current = true;
  }, []);
};

export default useSkipFirstRender;
