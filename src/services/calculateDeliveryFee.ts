import { FormValue } from '../interfaces/formValue';
import { environment as env } from '../environment/environment';

export function calculateDeliveryFee(formValue: FormValue): number {
  const { cartValue, deliveryDistance, numberOfItems, orderTime } = formValue;

  if (isNoItems(numberOfItems) || isPriceOverThreshold(cartValue, env.freeDeliveryLimit)) {
    return 0;
  }

  let deliveryFee = calculateBaseFee(deliveryDistance);

  if (cartValue < env.cartValueThreshold) {
    deliveryFee += env.cartValueThreshold - cartValue;
  }
  deliveryFee += calculateItemSurcharge(numberOfItems);
  deliveryFee += checkForFridayRushSurcharge(deliveryFee, orderTime);
  deliveryFee = Math.min(deliveryFee, env.maxDeliveryFee);
  return deliveryFee;
}

function calculateBaseFee(distance: number): number {
  if (distance <= env.baseDistance) return 2;
  return 2 + Math.ceil((distance - env.baseDistance) / env.distanceThreshold);
}

function calculateItemSurcharge(numberOfItems: number): number {
  if (numberOfItems <= env.smallItemLimit) return 0;
  const bulkSurcharge = numberOfItems > env.bulkItemLimit ? env.bulkSurcharge : 0;
  const extraItemsSurcharge = (numberOfItems - env.smallItemLimit) * env.itemMultiplier;
  return extraItemsSurcharge + bulkSurcharge;
}

function checkForFridayRushSurcharge(deliveryFee: number, orderTimeString: string | null): number {
  if (!orderTimeString) return 0;
  const orderTime = new Date(orderTimeString);
  const hour = orderTime.getHours();
  const day = orderTime.getDay();
  if (day === env.rushHourDay && hour >= env.rushHourStart && hour <= env.rushHourdEnd) {
    return deliveryFee * env.rushHourMultiplier - deliveryFee;
  }
  return 0;
}

function isNoItems(numberOfItems: number | null): boolean {
  return !numberOfItems || numberOfItems < 1;
}

function isPriceOverThreshold(price: number, threshold: number): boolean {
  return !price || price >= threshold;
}
