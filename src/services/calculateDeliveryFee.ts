import { environment as env } from '../environments/environment';
import { FormValue } from '../interfaces/formValue';

export function calculateDeliveryFee(formValue: FormValue): number {
  const { cartValue, deliveryDistance, numberOfItems, orderTime } = formValue;

  if (!isValidFormValue(formValue)) {
    return 0;
  }

  if (isFreeDelivery(numberOfItems, cartValue, env.freeDeliveryThreshold)) {
    return 0;
  }

  let deliveryFee = calculateDistanceSurcharge(deliveryDistance);
  deliveryFee += calculateCartValueSurcharge(cartValue);
  deliveryFee += calculateItemSurcharge(numberOfItems);
  deliveryFee += calculateFridayRushSurcharge(deliveryFee, orderTime);
  deliveryFee = Math.min(deliveryFee, env.maxDeliveryFee);
  return Math.round(deliveryFee * 100) / 100;
}

function calculateDistanceSurcharge(distance: number): number {
  if (distance <= env.baseDistance) return env.baseFee;
  return env.baseFee + Math.ceil((distance - env.baseDistance) / env.distanceThreshold);
}

function calculateCartValueSurcharge(cartValue: number): number {
  if (cartValue >= env.cartValueThreshold) return 0;
  return env.cartValueThreshold - cartValue;
}

function calculateItemSurcharge(numberOfItems: number): number {
  if (numberOfItems <= env.smallItemThreshold) return 0;
  const bulkSurcharge = numberOfItems > env.bulkItemThreshold ? env.bulkSurcharge : 0;
  const extraItemsSurcharge = (numberOfItems - env.smallItemThreshold) * env.itemMultiplier;
  return extraItemsSurcharge + bulkSurcharge;
}

function calculateFridayRushSurcharge(deliveryFee: number, orderTimeString: string | null): number {
  const orderTime = new Date(orderTimeString!);
  const hour = orderTime.getHours();
  const day = orderTime.getDay();
  if (day === env.rushHourDay && hour >= env.rushHourStart && hour < env.rushHourEnd) {
    return deliveryFee * env.rushHourMultiplier - deliveryFee;
  }
  return 0;
}

function isFreeDelivery(numberOfItems: number, price: number, threshold: number): boolean {
  return isNoItems(numberOfItems) || isPriceOverThreshold(price, threshold);
}

function isNoItems(numberOfItems: number): boolean {
  return !numberOfItems || numberOfItems <= 0;
}

function isPriceOverThreshold(price: number, threshold: number): boolean {
  return !price || price >= threshold;
}

export function isValidFormValue(formValue: FormValue): boolean {
  const { cartValue, deliveryDistance, numberOfItems, orderTime } = formValue;
  if (!cartValue || cartValue === -1 || !deliveryDistance || !numberOfItems || !orderTime) {
    return false;
  }
  return true;
}
