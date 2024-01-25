import { calculateDeliveryFee } from '../services/calculateDeliveryFee';

const formValueMock = {
  cartValue: 10,
  deliveryDistance: 500,
  numberOfItems: 2,
  orderTime: '2021-03-18T10:00:00.000Z'
};

describe('calculateDeliveryFee tests', () => {
  it('should return 0 when cartValue is 0', () => {
    expect(calculateDeliveryFee({ ...formValueMock, cartValue: 0 })).toBe(0);
  });

  it('should return 2 when items is 2, distance >1000 and cartValue is >10', () => {
    expect(calculateDeliveryFee(formValueMock)).toBe(2);
  });

  it('should return 6.5 when items is 2, distance >1000 and cartValue is 5.50', () => {
    expect(calculateDeliveryFee({ ...formValueMock, cartValue: 5.5 })).toBe(6.5);
  });

  it('should return 3 when distance is 1001, cartValue 10 and items 2', () => {
    expect(calculateDeliveryFee({ ...formValueMock, deliveryDistance: 1001 })).toBe(3);
  });

  it('should return 6 when distance is 500, cartValue 10 and items 12', () => {
    expect(calculateDeliveryFee({ ...formValueMock, numberOfItems: 12 })).toBe(6);
  });

  it('should return 7.7 when distance is 500, cartValue 10 and items 13', () => {
    expect(calculateDeliveryFee({ ...formValueMock, numberOfItems: 13 })).toBe(7.7);
  });
});
