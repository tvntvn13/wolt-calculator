import { configure, render, screen } from '@testing-library/react';
import ResultDisplay from '../components/ResultDisplay';

configure({ testIdAttribute: 'data-test-id' });

const setup = (deliveryFee: number) => {
  render(<ResultDisplay calculatedFee={deliveryFee.toFixed(2)} />);
  const feeDisplay = screen.getByTestId('fee');
  return feeDisplay;
};

describe('ResultDisplay component tests', () => {
  it('should render the component', () => {
    const feeDisplay = setup(0);
    expect(feeDisplay).toBeTruthy();
  });

  it('should display 0.00 € by default', () => {
    const feeDisplay = setup(0);
    expect(feeDisplay.textContent).toBe('0.00 €');
  });

  it('should display the calculated fee: 3.5 => 3.50 €', () => {
    const feeDisplay = setup(3.5);
    expect(feeDisplay.textContent).toBe('3.50 €');
  });

  it('should display the calculated fee 15 => 15.00 €', () => {
    const feeDisplay = setup(15);
    expect(feeDisplay.textContent).toBe('15.00 €');
  });

  it('should display the calculated fee 9.2 => 9.20 €', () => {
    const feeDisplay = setup(9);
    expect(feeDisplay.textContent).toBe('9.00 €');
  });
});
