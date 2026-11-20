export interface OpeningStatus {
  isOpen: boolean;
  statusBadge: string;
  statusDetails: string;
  nextEvent: string;
  currentHours: string;
  currentTimeString: string;
  dayOfWeek: string;
}

/**
 * Checks if a given 24h time string (HH:mm) is within Haveli's operating hours (05:00 to 00:30 next day).
 * Operates on daily schedule: 5:00 AM to 12:30 AM past midnight.
 */
export function isTimeWithinOpeningHours(timeStr: string): boolean {
  const [hourStr, minuteStr] = timeStr.split(':');
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);

  if (isNaN(hour) || isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    return false;
  }

  const minutesFromMidnight = hour * 60 + minute;

  // Window 1: 00:00 to 00:30 (tail of late-night shift)
  if (minutesFromMidnight >= 0 && minutesFromMidnight <= 30) {
    return true;
  }

  // Window 2: 05:00 to 23:59
  if (minutesFromMidnight >= 5 * 60 && minutesFromMidnight <= 23 * 60 + 59) {
    return true;
  }

  // Otherwise (00:31 to 04:59) is closed
  return false;
}

/**
 * Calculates current open/closed status for a given Date object.
 */
export function getOpeningStatus(now: Date = new Date()): OpeningStatus {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = days[now.getDay()];

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentMinutes = hours * 60 + minutes;

  const pad = (n: number) => n.toString().padStart(2, '0');
  const currentTimeString = `${pad(hours)}:${pad(minutes)}`;

  // Haveli is open:
  // From 05:00 (300 mins) to 24:00 (1440 mins)
  // and from 00:00 (0 mins) to 00:30 (30 mins)
  const isOpen = (currentMinutes >= 5 * 60) || (currentMinutes <= 30);

  let statusBadge: string;
  let statusDetails: string;
  let nextEvent: string;

  if (isOpen) {
    statusBadge = 'Open Now';
    statusDetails = 'Serving authentic Punjabi feast & highway refreshments';
    nextEvent = 'Closes tonight at 12:30 AM';
  } else {
    statusBadge = 'Closed Now';
    statusDetails = 'Kitchen reopens at 5:00 AM with fresh hot kulchas & chai';
    nextEvent = 'Opens today at 5:00 AM';
  }

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
