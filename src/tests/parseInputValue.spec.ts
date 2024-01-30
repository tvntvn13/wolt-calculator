import { parseInputValue } from '../services/parseInputValue';

describe('parseInputValue tests', () => {
  it('should return 0 when input is 0 for cartValue', () => {
    expect(parseInputValue('0', 'cartValue')).toBe(0);
  });

  it('should not format if name is orderTime', () => {
    const date = '2024-03-18T10:00';
    expect(parseInputValue(date, 'orderTime')).toBe(date);
  });

  it('should return 1.2 when input is 1.2 for cartValue', () => {
    expect(parseInputValue('1.2', 'cartValue')).toBe(1.2);
  });

  it('should return 1000 when input is 1000.1 for deliveryDistance', () => {
    expect(parseInputValue('1000.1', 'deliveryDistance')).toBe(1000);
  });

  it('should return 0 when input is -1.2 for deliveryDistance', () => {
    expect(parseInputValue('-1.2', 'deliveryDistance')).toBe(0);
  });

  it('should return 66.9 when input is 66.9 for cartValue', () => {
    expect(parseInputValue('66.9', 'cartValue')).toBe(66.9);
  });

  it('should return 1.01 when input is 1.01 for cartValue', () => {
    expect(parseInputValue('1.01', 'cartValue')).toBe(1.01);
  });

  it('should return 0 when input is 0.9 deliveryDistance', () => {
    expect(parseInputValue('0.9', 'deliveryDistance')).toBe(0);
  });

  it('should return 10 when input is 10.2 for  numberOfItems', () => {
    expect(parseInputValue('10.2', 'numberOfItems')).toBe(10);
  });

  it('should return 0 when input is -1 for numberOfItems', () => {
    expect(parseInputValue('-1', 'numberOfItems')).toBe(0);
  });
});
