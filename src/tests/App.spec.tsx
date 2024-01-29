import { configure, fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { formatDateTime } from '../services/formatDateTime';
import { testCases } from '../tests/data/testCases';
import App from '../App';

configure({ testIdAttribute: 'data-test-id' });

const HEADER_TEXT = 'Delivery Fee Calculator';

const { noRushHourCases, rushHourCases } = testCases;

const setup = () => {
  render(<App />);
  const cartValueInput = screen.getByTestId('cartValue');
  const deliveryDistanceInput = screen.getByTestId('deliveryDistance');
  const numberOfItemsInput = screen.getByTestId('numberOfItems');
  const orderTimeInput = screen.getByTestId('orderTime');
  const calculateFeeButton = screen.getByRole('button');
  const feeDisplay = screen.getByTestId('fee');
  const user = userEvent.setup();
  return {
    cartValueInput,
    deliveryDistanceInput,
    numberOfItemsInput,
    orderTimeInput,
    calculateFeeButton,
    feeDisplay,
    user
  };
};

describe('App tests', () => {
  describe('UI tests', () => {
    it('should render without crashing', () => {
      render(<App />);
      expect(screen.getByText(HEADER_TEXT)).toBeTruthy();
    });

    it('should render calculate fee button', () => {
      render(<App />);
      expect(screen.getByRole('button')).toBeTruthy();
      expect(screen.getByText('CALCULATE FEE')).toBeTruthy();
    });

    it('should display correct placeholders for the input fields', () => {
      render(<App />);
      const orderTimeInput = screen.getByTestId('orderTime');
      expect(screen.getByPlaceholderText('0.00 €')).toBeTruthy();
      expect(screen.getByPlaceholderText('0 meters')).toBeTruthy();
      expect(screen.getByPlaceholderText('0 items')).toBeTruthy();
      expect(orderTimeInput.closest('input')?.value).toEqual(formatDateTime(new Date()));
    });

    it('should keep the values in the inputs after enter is pressed or button is clicked', async () => {
      const {
        cartValueInput,
        deliveryDistanceInput,
        numberOfItemsInput,
        orderTimeInput,
        calculateFeeButton,
        user
      } = setup();
      const form = screen.getByTestId('form');

      const value = '12.5';
      const distance = '1000';
      const items = '4';
      const date = '2021-01-01T12:00';

      await user.type(cartValueInput, value);
      await user.type(deliveryDistanceInput, distance);
      await user.type(numberOfItemsInput, items);
      userEvent.clear(orderTimeInput);
      await user.type(orderTimeInput, date);

      expect(cartValueInput.closest('input')?.value).toBe(value);
      expect(deliveryDistanceInput.closest('input')?.value).toBe(distance);
      expect(numberOfItemsInput.closest('input')?.value).toBe(items);
      expect(orderTimeInput.closest('input')?.value).toBe(date);

      await user.type(deliveryDistanceInput, '{enter}');
      expect(cartValueInput.closest('input')?.value).toBe(value);
      expect(deliveryDistanceInput.closest('input')?.value).toBe(distance);
      expect(numberOfItemsInput.closest('input')?.value).toBe(items);
      expect(orderTimeInput.closest('input')?.value).toBe(date);

      await user.click(calculateFeeButton);
      expect(cartValueInput.closest('input')?.value).toBe(value);
      expect(deliveryDistanceInput.closest('input')?.value).toBe(distance);
      expect(numberOfItemsInput.closest('input')?.value).toBe(items);
      expect(orderTimeInput.closest('input')?.value).toBe(date);

      fireEvent.submit(form);
      expect(cartValueInput.closest('input')?.value).toBe(value);
      expect(deliveryDistanceInput.closest('input')?.value).toBe(distance);
      expect(numberOfItemsInput.closest('input')?.value).toBe(items);
      expect(orderTimeInput.closest('input')?.value).toBe(date);
    });

    it('should calculate the delivery fee onSubmit when the button is clicked', async () => {
      const { cartValueInput, deliveryDistanceInput, numberOfItemsInput, orderTimeInput, user } =
        setup();
      await user.type(cartValueInput, '12');
      await user.type(deliveryDistanceInput, '1001');
      await user.type(numberOfItemsInput, '4');
      userEvent.clear(orderTimeInput);
      await user.type(orderTimeInput, '2024-11-11T10:00');

      const calculateFeeButton = screen.getByRole('button');
      await user.click(calculateFeeButton);

      expect(screen.getByTestId('fee').textContent).toBe('3.00 €');
    });

    it('should calculate the delivery fee onSubmit when enter is pressed', async () => {
      const { cartValueInput, deliveryDistanceInput, numberOfItemsInput, orderTimeInput, user } =
        setup();

      await user.type(cartValueInput, '8.3');
      await user.type(deliveryDistanceInput, '1001');
      await user.type(numberOfItemsInput, '4');
      userEvent.clear(orderTimeInput);
      await user.type(orderTimeInput, '2024-11-11T10:00');
      await user.type(orderTimeInput, '{enter}');
      expect(screen.getByTestId('fee').textContent).toBe('4.70 €');
    });
  });

  describe('Calculate correct fee | C = cartValue, D = deliveryDistance, N = numberOfItems, O = OrderTime', () => {
    describe('No Rush Hour', () => {
      test.each(noRushHourCases)(
        'C:$cartValue|D:$deliveryDistance|N:$numberOfItems|O:$orderTime|F:$fee',
        async ({ cartValue, deliveryDistance, numberOfItems, orderTime, fee }) => {
          const {
            cartValueInput,
            deliveryDistanceInput,
            numberOfItemsInput,
            orderTimeInput,
            calculateFeeButton,
            feeDisplay,
            user
          } = setup();

          await user.type(cartValueInput, cartValue);
          await user.type(deliveryDistanceInput, deliveryDistance);
          await user.type(numberOfItemsInput, numberOfItems);
          userEvent.clear(screen.getByTestId('orderTime'));
          await user.type(orderTimeInput, orderTime);

          await user.click(calculateFeeButton);
          expect(feeDisplay.textContent).toBe(`${fee} €`);
        }
      );
    });
    describe('Rush Hour', () => {
      test.each(rushHourCases)(
        'C:$cartValue|D:$deliveryDistance|N:$numberOfItems|O:$orderTime|F:$fee',
        async ({ cartValue, deliveryDistance, numberOfItems, orderTime, fee }) => {
          const {
            cartValueInput,
            deliveryDistanceInput,
            numberOfItemsInput,
            orderTimeInput,
            calculateFeeButton,
            feeDisplay,
            user
          } = setup();

          await user.type(cartValueInput, cartValue);
          await user.type(deliveryDistanceInput, deliveryDistance);
          await user.type(numberOfItemsInput, numberOfItems);
          userEvent.clear(screen.getByTestId('orderTime'));
          await user.type(orderTimeInput, orderTime);

          await user.click(calculateFeeButton);
          expect(feeDisplay.textContent).toBe(`${fee} €`);
        }
      );
    });
  });

  describe('Invalid input, fee should stay 0.00', () => {
    it('should add invalid class when the cart value is invalid', async () => {
      const { cartValueInput, feeDisplay, user } = setup();
      await user.type(cartValueInput, '0{enter}');
      expect(cartValueInput.closest('input')?.classList.contains('invalid')).toBe(true);
      expect(feeDisplay.textContent).toBe('0.00 €');
    });

    it('should add invalid class when the delivery distance is invalid', async () => {
      const { deliveryDistanceInput, feeDisplay, user } = setup();
      await user.type(deliveryDistanceInput, '0{enter}');
      expect(deliveryDistanceInput.closest('input')?.classList.contains('invalid')).toBe(true);
      expect(feeDisplay.textContent).toBe('0.00 €');
    });

    it('should add invalid class when the number of items is invalid', async () => {
      const { numberOfItemsInput, feeDisplay, user } = setup();
      await user.type(numberOfItemsInput, '0{enter}');
      expect(numberOfItemsInput.closest('input')?.classList.contains('invalid')).toBe(true);
      expect(feeDisplay.textContent).toBe('0.00 €');
    });

    it('should add invalid class when the order time is invalid', async () => {
      const { orderTimeInput, feeDisplay, user } = setup();
      await user.type(orderTimeInput, '0{enter}');
      expect(orderTimeInput.closest('input')?.classList.contains('invalid')).toBe(true);
      expect(feeDisplay.textContent).toBe('0.00 €');
    });

    it('should add invalid classes to all when all fields are invalid', async () => {
      const {
        cartValueInput,
        deliveryDistanceInput,
        numberOfItemsInput,
        orderTimeInput,
        feeDisplay,
        user
      } = setup();
      await user.type(cartValueInput, '0');
      await user.type(deliveryDistanceInput, '0');
      await user.type(numberOfItemsInput, '0');
      await user.type(orderTimeInput, '0{enter}');
      expect(cartValueInput.closest('input')?.classList.contains('invalid')).toBe(true);
      expect(deliveryDistanceInput.closest('input')?.classList.contains('invalid')).toBe(true);
      expect(numberOfItemsInput.closest('input')?.classList.contains('invalid')).toBe(true);
      expect(orderTimeInput.closest('input')?.classList.contains('invalid')).toBe(true);
      expect(feeDisplay.textContent).toBe('0.00 €');
    });
  });
});
