import { fireEvent, render, screen } from '@testing-library/react';
import { FormValue } from '../interfaces/formValue';
import { formatDateTime } from '../services/formatDateTime';
import InputForm from '../components/InputForm';

//eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderInputForm = (overrides?: any) => {
  const formValue: FormValue = {
    cartValue: 0,
    deliveryDistance: 0,
    numberOfItems: 0,
    orderTime: formatDateTime(new Date())
  };
  const setFormValue = vi.fn();
  const hasBeenSubmitted = overrides?.hasBeenSubmitted || false;

  render(
    <InputForm
      formValue={formValue}
      setFormValue={setFormValue}
      hasBeenSubmitted={hasBeenSubmitted}
    />
  );
  return { setFormValue, hasBeenSubmitted, formValue };
};

describe('InputForm component tests', () => {
  it('should render properly', () => {
    renderInputForm();
    expect(screen.getByLabelText('Order Time')).toBeTruthy();
  });

  it('should show correct placeholders', () => {
    renderInputForm();
    expect(screen.getByTestId('cartValue')).toBeTruthy();
    expect(screen.getByTestId('deliveryDistance')).toBeTruthy();
    expect(screen.getByTestId('numberOfItems')).toBeTruthy();
  });

  it('should call the setFormValue on input change', () => {
    const { setFormValue } = renderInputForm();
    const cartValueInput = screen.getByTestId('cartValue');
    const deliveryDistanceInput = screen.getByTestId('deliveryDistance');
    const numberOfItemsInput = screen.getByTestId('numberOfItems');
    const orderTimeInput = screen.getByTestId('orderTime');
    fireEvent.change(cartValueInput, { target: { value: '10.10' } });
    fireEvent.change(deliveryDistanceInput, { target: { value: '1000' } });
    fireEvent.change(numberOfItemsInput, { target: { value: '2' } });
    fireEvent.change(orderTimeInput, { target: { value: '0000' } });
    expect(setFormValue).toHaveBeenCalledTimes(4);
  });

  it('should apply invalid class to invalid inputs after first submit', () => {
    renderInputForm({ hasBeenSubmitted: true });
    const cartValueInput = screen.getByTestId('cartValue');
    const deliveryDistanceInput = screen.getByTestId('deliveryDistance');
    const numberOfItemsInput = screen.getByTestId('numberOfItems');
    expect(cartValueInput.classList.contains('invalid')).toBe(true);
    expect(deliveryDistanceInput.classList.contains('invalid')).toBe(true);
    expect(numberOfItemsInput.classList.contains('invalid')).toBe(true);
  });
});
