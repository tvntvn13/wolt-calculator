import App from '../App';
import { fireEvent, render, screen } from '@testing-library/react';

const HEADER_TEXT = 'Delivery Fee Calculator';

describe('App tests', () => {
  it('render without crashing', () => {
    render(<App />);
    expect(screen.getByText(HEADER_TEXT)).toBeTruthy();
  });

  it('should render calculate fee button', () => {
    render(<App />);
    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('should display correct placeholders for the input fields', () => {
    render(<App />);
    expect(screen.getByPlaceholderText('0 €')).toBeTruthy();
    expect(screen.getByPlaceholderText('0 meters')).toBeTruthy();
    expect(screen.getByPlaceholderText('0 items')).toBeTruthy();
  });

  it('should calculate the delivery fee onSubmit when the button is clicked', () => {
    render(<App />);

    const cartValueInput = screen.getByTestId('cartValue');
    const deliveryDistanceInput = screen.getByTestId('deliveryDistance');
    const numberOfItemsInput = screen.getByTestId('numberOfItems');

    fireEvent.change(cartValueInput, { target: { value: 12 } });
    fireEvent.change(deliveryDistanceInput, { target: { value: 1001 } });
    fireEvent.change(numberOfItemsInput, { target: { value: 4 } });

    const calculateFeeButton = screen.getByRole('button');
    fireEvent.click(calculateFeeButton);

    expect(screen.getByTestId('fee').textContent).toBe('3.00 €');
  });

  it('should calculate the delivery fee onSubmit when enter is pressed', () => {
    render(<App />);

    const cartValueInput = screen.getByTestId('cartValue');
    const deliveryDistanceInput = screen.getByTestId('deliveryDistance');
    const numberOfItemsInput = screen.getByTestId('numberOfItems');

    fireEvent.change(cartValueInput, { target: { value: 8.3 } });
    fireEvent.change(deliveryDistanceInput, { target: { value: 1001 } });
    fireEvent.change(numberOfItemsInput, { target: { value: 4 } });

    const form = screen.getByTestId('form');
    const calculateFeeButton = screen.getByRole('button');
    fireEvent.click(calculateFeeButton);
    fireEvent.submit(form);

    expect(screen.getByTestId('fee').textContent).toBe('4.70 €');
  });
});
