import { useState, useEffect } from 'react';
import type { OpeningHoursStatus } from '../types';

export function useOpeningHours() {
  const [status, setStatus] = useState<OpeningHoursStatus>(() => calculateClientOpeningStatus());

  function calculateClientOpeningStatus(): OpeningHoursStatus {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentMinutes = hours * 60 + minutes;

    const pad = (n: number) => n.toString().padStart(2, '0');
    const currentTimeString = `${pad(hours)}:${pad(minutes)}`;

    // Haveli operates 5:00 AM (300 mins) to 12:30 AM (next day, 30 mins)
    // Between 00:00 and 00:30 is OPEN
    // Between 00:31 and 04:59 is CLOSED
    // Between 05:00 and 23:59 is OPEN
    const isOpen = currentMinutes >= 5 * 60 || currentMinutes <= 30;

    let statusBadge: string;
    let statusDetails: string;
    let nextEvent: string;

    if (isOpen) {
      statusBadge = 'Open Now';
      statusDetails = 'Serving hot Punjabi feasts, kulchas, & roadside refreshments';
      nextEvent = 'Closes tonight at 12:30 AM';
    } else {
      statusBadge = 'Closed Now';
      statusDetails = 'Kitchen reopens at 5:00 AM with fresh morning tandoor & chai';
      nextEvent = 'Opens today at 5:00 AM';
    }

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = days[now.getDay()];

    return {
      isOpen,
      statusBadge,
      statusDetails,
      nextEvent,
      currentHours: '5:00 AM – 12:30 AM Daily',
      currentTimeString,
      dayOfWeek,
    };
  }

  useEffect(() => {
    // Initial compute
    setStatus(calculateClientOpeningStatus());

    // Update every minute
    const interval = setInterval(() => {
      setStatus(calculateClientOpeningStatus());
    }, 60000);

    // Also attempt to fetch latest live status from backend API if available
    fetch('/api/hours')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('API unavailable');
      })
      .then((json) => {
        if (json.success && json.data) {
          setStatus((prev) => ({
            ...prev,
            ...json.data,
          }));
        }
      })
      .catch(() => {
        // Fallback to client-side calculated status without error
      });

    return () => clearInterval(interval);
  }, []);

  return status;
}
