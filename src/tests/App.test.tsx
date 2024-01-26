import { configure, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import App from '../App';

configure({ testIdAttribute: 'data-test-id' });

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

  it('should calculate the delivery fee onSubmit when the button is clicked', async () => {
    render(<App />);
    const cartValueInput = screen.getByTestId('cartValue');
    const deliveryDistanceInput = screen.getByTestId('deliveryDistance');
    const numberOfItemsInput = screen.getByTestId('numberOfItems');
    const orderTimeInput = screen.getByTestId('orderTime');
    const user = userEvent.setup();

    await user.type(cartValueInput, '12');
    await user.type(deliveryDistanceInput, '1001');
    await user.type(numberOfItemsInput, '4');
    await user.type(orderTimeInput, '12122024');

    const calculateFeeButton = screen.getByRole('button');
    await user.click(calculateFeeButton);

    expect(screen.getByTestId('fee').textContent).toBe('3.00 €');
  });

  it('should calculate the delivery fee onSubmit when enter is pressed', async () => {
    render(<App />);
    const cartValueInput = screen.getByTestId('cartValue');
    const deliveryDistanceInput = screen.getByTestId('deliveryDistance');
    const numberOfItemsInput = screen.getByTestId('numberOfItems');
    const orderTimeInput = screen.getByTestId('orderTime');
    const user = userEvent.setup();

    await user.type(cartValueInput, '8.3');
    await user.type(deliveryDistanceInput, '1001');
    await user.type(numberOfItemsInput, '4');
    await user.type(orderTimeInput, '12122024{enter}');

    expect(screen.getByTestId('fee').textContent).toBe('4.70 €');
  });

  it('should calculate the delivery fee', async () => {
    render(<App />);
    const cartValueInput = screen.getByTestId('cartValue');
    const deliveryDistanceInput = screen.getByTestId('deliveryDistance');
    const numberOfItemsInput = screen.getByTestId('numberOfItems');
    const orderTimeInput = screen.getByTestId('orderTime');
    const user = userEvent.setup();

    await user.type(cartValueInput, '5.8');
    await user.type(deliveryDistanceInput, '1000');
    await user.type(numberOfItemsInput, '4');
    await user.type(orderTimeInput, '12122024{enter}');

    expect(screen.getByTestId('fee').textContent).toBe('6.20 €');
  });
});
