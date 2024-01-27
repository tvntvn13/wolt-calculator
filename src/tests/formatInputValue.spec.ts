import { parseInputValue } from '../services/formatInputValue';

describe('formatInputValue tests', () => {
  it('should return 0 when input is 0', () => {
    expect(parseInputValue('0', 'cartValue')).toBe(0);
  });

  it('should not format if name is orderTime', () => {
    expect(parseInputValue('2024-03-18T10:00:00.000Z', 'orderTime')).toBe(
      '2024-03-18T10:00:00.000Z'
    );
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
});
