import { render, screen } from '@testing-library/react';
import ResultDisplay from '../components/ResultDisplay';

const deliveryFee = 5.25999;

describe('ResultDisplay component tests', () => {
  it('should render the component', () => {
    render(<ResultDisplay calculatedFee={deliveryFee.toFixed(2)} />);
    expect(screen.getByText('Delivery Fee:')).toBeTruthy();
  });

  it('should display 0.00 € by default', () => {
    const deliveryFee = 0;
    const rendered = render(<ResultDisplay calculatedFee={deliveryFee.toFixed(2)} />);
    expect(rendered.container.querySelector('.total-fee')?.textContent).toBe('0.00 €');
  });

  it('should display the calculated fee', () => {
    const rendered = render(<ResultDisplay calculatedFee={deliveryFee.toFixed(2)} />);
    expect(rendered.container.querySelector('.total-fee')?.textContent).toBe('5.26 €');
  });
});
