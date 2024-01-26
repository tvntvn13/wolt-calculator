import { FormValue } from '../interfaces/formValue';

export function formatInputValue(value: string, name: keyof FormValue): number | string | null {
  if (value === '' || value === ',' || value === '.' || value === '-') {
    return null;
  }

  switch (name) {
    case 'cartValue':
      return Math.max(parseFloat(value), 0);
    case 'deliveryDistance':
    case 'numberOfItems':
      return Math.max(parseInt(value), 0);
    default:
      return value;
  }
}
