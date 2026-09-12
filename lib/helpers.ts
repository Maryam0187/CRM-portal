export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** YYYY-MM-DD in local timezone (avoids UTC shift from toISOString). */
export function formatLocalDate(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function generateTimeSlots(
  startTime: string,
  endTime: string,
  duration: number
): string[] {
  const slots: string[] = [];
  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);
  
  let currentMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;
  
  while (currentMinutes + duration <= endMinutes) {
    const hours = Math.floor(currentMinutes / 60);
    const mins = currentMinutes % 60;
    slots.push(`${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`);
    currentMinutes += duration;
  }
  
  return slots;
}

export const CATEGORY_SERVICES: Record<string, Array<{name: string, duration: number, price: number}>> = {
  barber: [
    { name: 'Haircut', duration: 30, price: 50 },
    { name: 'Beard Trim', duration: 15, price: 25 },
    { name: 'Hair & Beard', duration: 45, price: 70 },
  ],
  salon: [
    { name: 'Haircut', duration: 45, price: 80 },
    { name: 'Hair Coloring', duration: 120, price: 250 },
    { name: 'Manicure', duration: 30, price: 60 },
    { name: 'Pedicure', duration: 45, price: 80 },
  ],
  nails: [
    { name: 'Manicure', duration: 30, price: 60 },
    { name: 'Pedicure', duration: 45, price: 80 },
    { name: 'Gel Nails', duration: 60, price: 120 },
  ],
  massage: [
    { name: 'Swedish Massage (60min)', duration: 60, price: 200 },
    { name: 'Deep Tissue Massage (60min)', duration: 60, price: 250 },
    { name: 'Thai Massage (90min)', duration: 90, price: 300 },
  ],
  spa: [
    { name: 'Facial Treatment', duration: 60, price: 180 },
    { name: 'Body Scrub', duration: 45, price: 150 },
    { name: 'Spa Package', duration: 120, price: 350 },
  ],
  cleaning: [
    { name: 'Basic Home Cleaning', duration: 120, price: 150 },
    { name: 'Deep Cleaning', duration: 180, price: 250 },
    { name: 'Move-in/out Cleaning', duration: 240, price: 350 },
  ],
  car_detailing: [
    { name: 'Exterior Wash & Wax', duration: 60, price: 100 },
    { name: 'Interior Detailing', duration: 90, price: 150 },
    { name: 'Full Detailing', duration: 180, price: 300 },
  ],
  ac_cleaning: [
    { name: 'Single AC Unit Cleaning', duration: 60, price: 120 },
    { name: 'Multiple Units (3)', duration: 120, price: 300 },
  ],
  pest_control: [
    { name: 'General Pest Control', duration: 90, price: 200 },
    { name: 'Termite Treatment', duration: 120, price: 350 },
  ],
  handyman: [
    { name: 'General Repairs (per hour)', duration: 60, price: 100 },
    { name: 'Furniture Assembly', duration: 90, price: 150 },
    { name: 'Painting (per room)', duration: 240, price: 400 },
  ],
  photographer: [
    { name: 'Portrait Session (1hr)', duration: 60, price: 300 },
    { name: 'Event Photography (3hrs)', duration: 180, price: 800 },
  ],
  tutor: [
    { name: 'Math Tutoring (1hr)', duration: 60, price: 150 },
    { name: 'English Tutoring (1hr)', duration: 60, price: 150 },
  ],
  yoga: [
    { name: 'Group Class (1hr)', duration: 60, price: 80 },
    { name: 'Private Session (1hr)', duration: 60, price: 200 },
  ],
  cooking_class: [
    { name: 'Basic Cooking Class (2hrs)', duration: 120, price: 250 },
    { name: 'Baking Workshop (3hrs)', duration: 180, price: 350 },
  ],
  food_tour: [
    { name: 'Street Food Tour (3hrs)', duration: 180, price: 200 },
    { name: 'Fine Dining Experience (4hrs)', duration: 240, price: 500 },
  ],
};
