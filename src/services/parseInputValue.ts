import { FormValue } from '../interfaces/formValue';

export function parseInputValue(value: string, name: keyof FormValue): number | string | null {
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
