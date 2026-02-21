'use client';

import { useEffect, useState } from 'react';

// Compute the target date once at module level so it never changes
const targetDate = (() => {
  const d = new Date();
  d.setDate(d.getDate() + 4);
  return d.getTime();
})();

const useCountdown = () => {
  const [countdown, setCountdown] = useState(targetDate - new Date().getTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(targetDate - new Date().getTime());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(countdown % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
  const minutes = Math.floor(countdown % (1000 * 60 * 60) / (1000 * 60));
  const seconds = Math.floor(countdown % (1000 * 60) / 1000);
  return {
    days,
    hours,
    minutes,
    seconds
  };
};
export default useCountdown;