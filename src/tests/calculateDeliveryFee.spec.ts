import { calculateDeliveryFee } from '../services/calculateDeliveryFee';

const formValue = {
  cartValue: 10,
  deliveryDistance: 500,
  numberOfItems: 2,
  orderTime: '2021-03-18T10:00'
};

const getRandomInteger = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

describe('calculateDeliveryFee', () => {
  describe('cart value changes | items: 2, distance: 500, no rush hour', () => {
    it('should return 0 when cartValue is 0', () => {
      expect(calculateDeliveryFee({ ...formValue, cartValue: 0 })).toBe(0);
    });
    it('should return 2 when cartValue is 10', () => {
      expect(calculateDeliveryFee(formValue)).toBe(2);
    });
    it('should return 6.5 when items cartValue is 5.50', () => {
      expect(calculateDeliveryFee({ ...formValue, cartValue: 5.5 })).toBe(6.5);
    });
    it('should return 0 when cartValue is >= 200', () => {
      expect(calculateDeliveryFee({ ...formValue, cartValue: 200 })).toBe(0);
    });
    it('should return 11 when cartValue is 1', () => {
      expect(calculateDeliveryFee({ ...formValue, cartValue: 1 })).toBe(11);
    });
    it('should return 10.2 when cartValue is 1.8', () => {
      expect(calculateDeliveryFee({ ...formValue, cartValue: 1.8 })).toBe(10.2);
    });
  });

  describe('cart value changes, rush hour | items: 2, distance: 500', () => {
    it('should return 0 when cartValue is 0', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          cartValue: 0,
          orderTime: '2024-01-26T16:00'
        })
      ).toBe(0);
    });
    it('should return 2.4 when cartValue is 10', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          orderTime: '2024-01-26T16:00'
        })
      ).toBe(2.4);
    });
    it('should return 7.8 when items cartValue is 5.50', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          cartValue: 5.5,
          orderTime: '2024-01-26T16:00'
        })
      ).toBe(7.8);
    });
    it('should return 0 when cartValue is >= 200', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          cartValue: 200,
          orderTime: '2024-01-26T16:00'
        })
      ).toBe(0);
    });
    it('should return 13.2 when cartValue is 1', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          cartValue: 1,
          orderTime: '2024-01-26T16:00'
        })
      ).toBe(13.2);
    });
    it('should return 12.24 when cartValue is 1.8', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          cartValue: 1.8,
          orderTime: '2024-01-26T16:00'
        })
      ).toBe(12.24);
    });
  });

  describe('delivery distance changes | items: 2, value: 10, no rush hour', () => {
    it('should return 2 when distance 0 - 1000', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          deliveryDistance: getRandomInteger(1, 1000)
        })
      ).toBe(2);
    });
    it('should return 5 when distance 2001 - 2500', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          deliveryDistance: getRandomInteger(2001, 2500)
        })
      ).toBe(5);
    });
    it('should return 11 when distance 5001 - 5500', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          deliveryDistance: getRandomInteger(5001, 5500)
        })
      ).toBe(11);
    });
    it('should return 14 when distance 6501 - 7000', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          deliveryDistance: getRandomInteger(6501, 7000)
        })
      ).toBe(14);
    });
    it('should return 7 when distance 3001 - 3500', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          deliveryDistance: getRandomInteger(3001, 3500)
        })
      ).toBe(7);
    });
    it('should return 10 when distance 4501 - 5000', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          deliveryDistance: getRandomInteger(4501, 5000)
        })
      ).toBe(10);
    });
  });

  describe('delivery distance changes, rush hour | items: 2, value: 10', () => {
    it('should return 2.4 when distance 0 - 1000', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          orderTime: '2024-01-26T16:00',
          deliveryDistance: getRandomInteger(1, 1000)
        })
      ).toBe(2.4);
    });
    it('should return 6 when distance 2001 - 2500', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          orderTime: '2024-01-26T16:00',
          deliveryDistance: getRandomInteger(2001, 2500)
        })
      ).toBe(6);
    });
    it('should return 13.2 when distance 5001 - 5500', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          orderTime: '2024-01-26T16:00',
          deliveryDistance: getRandomInteger(5001, 5500)
        })
      ).toBe(13.2);
    });
    it('should return maxDeliveryFee when distance 6501 - 7000', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          orderTime: '2024-01-26T16:00',
          deliveryDistance: getRandomInteger(6501, 7000)
        })
      ).toBe(15);
    });
    it('should return 8.4 when distance 3001 - 3500', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          orderTime: '2024-01-26T16:00',
          deliveryDistance: getRandomInteger(3001, 3500)
        })
      ).toBe(8.4);
    });
    it('should return 12 when distance 4501 - 5000', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          orderTime: '2024-01-26T16:00',
          deliveryDistance: getRandomInteger(4501, 5000)
        })
      ).toBe(12);
    });
  });

  describe('items changes, rush hour | distance: 500, value: 10', () => {
    it('should return 7.2 when items 12', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          numberOfItems: 12,
          orderTime: '2024-01-26T16:00'
        })
      ).toBe(7.2);
    });
    it('should return 9.24 when items 13', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          numberOfItems: 13,
          orderTime: '2024-01-26T16:00'
        })
      ).toBe(9.24);
    });
    it('should return 3 when items 5', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          numberOfItems: 5,
          orderTime: '2024-01-26T16:00'
        })
      ).toBe(3);
    });
    it('should return 5.4 when items 9', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          numberOfItems: 9,
          orderTime: '2024-01-26T16:00'
        })
      ).toBe(5.4);
    });
    it('should return 6.6 when items 11', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          numberOfItems: 11,
          orderTime: '2024-01-26T16:00'
        })
      ).toBe(6.6);
    });
    it('should return 2.4 when items 1 - 4', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          orderTime: '2024-01-26T16:00',
          numberOfItems: getRandomInteger(1, 4)
        })
      ).toBe(2.4);
    });
  });

  describe('items changes | distance: 500, value: 10, no rush hour', () => {
    it('should return 6 when items 12', () => {
      expect(calculateDeliveryFee({ ...formValue, numberOfItems: 12 })).toBe(6);
    });
    it('should return 7.7 when items 13', () => {
      expect(calculateDeliveryFee({ ...formValue, numberOfItems: 13 })).toBe(7.7);
    });
    it('should return 2.5 when items 5', () => {
      expect(calculateDeliveryFee({ ...formValue, numberOfItems: 5 })).toBe(2.5);
    });
    it('should return 4.5 when items 9', () => {
      expect(calculateDeliveryFee({ ...formValue, numberOfItems: 9 })).toBe(4.5);
    });
    it('should return 5.5 when items 11', () => {
      expect(calculateDeliveryFee({ ...formValue, numberOfItems: 11 })).toBe(5.5);
    });
    it('should return 2 when items 1 - 4', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          numberOfItems: getRandomInteger(1, 4)
        })
      ).toBe(2);
    });
  });

  describe('order time changes | distance: 500, value: 10, items: 2', () => {
    it('should correctly calculate the rush hour surcharge at 16:00', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          orderTime: '2024-01-26T16:00'
        })
      ).toBe(2.4);
    });
    it('should correctly calculate the rush hour surcharge at 15:00', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          orderTime: '2024-01-26T15:00'
        })
      ).toBe(2.4);
    });
    it('should correctly calculate the rush hour surcharge at 18:59', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          orderTime: '2024-01-26T18:59'
        })
      ).toBe(2.4);
    });
    it('should correctly calculate the rush hour surcharge at 17:59', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          orderTime: '2024-01-26T17:59'
        })
      ).toBe(2.4);
    });
    it('should not add the rush hour surcharge at 19:00', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          orderTime: '2024-01-26T19:00'
        })
      ).toBe(2);
    });
    it('should not add the rush hour surcharge on tuesday 16:00', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          orderTime: '2024-01-23T16:00'
        })
      ).toBe(2);
    });
    it('should not add the rush hour surcharge at 00:00', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          orderTime: '2024-01-26T00:00'
        })
      ).toBe(2);
    });
    it('should not add the rush hour surcharge at 19:01', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          orderTime: '2024-01-26T19:01'
        })
      ).toBe(2);
    });
    it('should not add the rush hour surcharge at 14.59', () => {
      expect(
        calculateDeliveryFee({
          ...formValue,
          orderTime: '2024-01-26T14:58'
        })
      ).toBe(2);
    });
  });

  describe('combinating test cases for all scenarios', () => {
    it('should return 5.6 | value: 8.4, distance: 1500, items: 6, no-rush-hour', () => {
      expect(
        calculateDeliveryFee({
          cartValue: 8.4,
          deliveryDistance: 1500,
          numberOfItems: 6,
          orderTime: '2024-01-26T10:00'
        })
      ).toBe(5.6);
    });
    it('should return 7.6 | value: 5.4, distance: 1498, items: 4, no-rush-hour', () => {
      expect(
        calculateDeliveryFee({
          cartValue: 5.4,
          deliveryDistance: 1498,
          numberOfItems: 4,
          orderTime: '2024-01-26T10:00'
        })
      ).toBe(7.6);
    });
    it('should return 9 | value: 12.4, distance: 3500, items: 5, rush-hour', () => {
      expect(
        calculateDeliveryFee({
          cartValue: 12.4,
          deliveryDistance: 3500,
          numberOfItems: 5,
          orderTime: '2024-01-26T15:10'
        })
      ).toBe(9);
    });
    it('should return 11.6 | value: 4.4, distance: 2005, items: 6, no-rush-hour', () => {
      expect(
        calculateDeliveryFee({
          cartValue: 4.4,
          deliveryDistance: 2005,
          numberOfItems: 6,
          orderTime: '2024-01-26T10:00'
        })
      ).toBe(11.6);
    });
    it('should return 12.84 | value: 3.3, distance: 500, items: 8, rush-hour', () => {
      expect(
        calculateDeliveryFee({
          cartValue: 3.3,
          deliveryDistance: 500,
          numberOfItems: 8,
          orderTime: '2024-01-26T16:00'
        })
      ).toBe(12.84);
    });
    it('should return 8.3 | value: 7.7, distance: 100, items: 12, no-rush-hour', () => {
      expect(
        calculateDeliveryFee({
          cartValue: 7.7,
          deliveryDistance: 100,
          numberOfItems: 12,
          orderTime: '2024-01-26T10:00'
        })
      ).toBe(8.3);
    });
    it('should return 9.96 | value: 9.2, distance: 2500, items: 9, rush-hour', () => {
      expect(
        calculateDeliveryFee({
          cartValue: 9.2,
          deliveryDistance: 2500,
          numberOfItems: 9,
          orderTime: '2024-01-26T18:00'
        })
      ).toBe(9.96);
    });
    it('should return 10.7 | value: 20, distance: 1555, items: 15, no-rush-hour', () => {
      expect(
        calculateDeliveryFee({
          cartValue: 20,
          deliveryDistance: 1555,
          numberOfItems: 15,
          orderTime: '2024-01-26T10:00'
        })
      ).toBe(10.7);
    });
    it('should return maxDeliveryFee | value: 100, distance: 3300, items: 18, rush-hour', () => {
      expect(
        calculateDeliveryFee({
          cartValue: 100,
          deliveryDistance: 3300,
          numberOfItems: 13,
          orderTime: '2024-01-26T18:00'
        })
      ).toBe(15);
    });
    it('should return 14.94 | value: 9.75, distance: 2490, items: 16, rush-hour', () => {
      expect(
        calculateDeliveryFee({
          cartValue: 9.75,
          deliveryDistance: 2490,
          numberOfItems: 16,
          orderTime: '2024-01-26T17:00'
        })
      ).toBe(14.94);
    });
  });
});
