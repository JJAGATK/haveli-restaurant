import { getOpeningStatus, isTimeWithinOpeningHours } from '../utils/openingHours.js';
import { config } from '../config/index.js';

export class HoursService {
  getCurrentHoursStatus() {
    const status = getOpeningStatus(new Date());
    return {
      ...status,
      restaurant: {
        name: config.business.name,
        address: config.business.address,
        phone: config.business.phone,
        coordinates: config.business.coordinates,
        operatingHours: config.business.operatingHours,
      },
      weeklySchedule: [
        { day: 'Monday', hours: '5:00 AM – 12:30 AM' },
        { day: 'Tuesday', hours: '5:00 AM – 12:30 AM' },
        { day: 'Wednesday', hours: '5:00 AM – 12:30 AM' },
        { day: 'Thursday', hours: '5:00 AM – 12:30 AM' },
        { day: 'Friday', hours: '5:00 AM – 12:30 AM' },
        { day: 'Saturday', hours: '5:00 AM – 12:30 AM' },
        { day: 'Sunday', hours: '5:00 AM – 12:30 AM' },
      ],
      highwayAmenities: [
        { name: 'Ample Free Parking', description: 'Expansive secured parking suitable for cars, SUVs & tour buses' },
        { name: 'EV Fast Charging', description: 'High-speed EV charging stations available 24x7 for highway travelers' },
        { name: 'Family Restrooms', description: 'Hygienic, accessible, and frequently sanitized rest stations' },
        { name: 'Quick Highway Takeaway', description: 'Express counter for piping hot chai, lassi & stuffed rolls on the go' },
      ],
    };
  }

  validateTime(timeStr: string): boolean {
    return isTimeWithinOpeningHours(timeStr);
  }
}

export const hoursService = new HoursService();
