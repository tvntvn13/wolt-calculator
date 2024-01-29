import { configure, isInaccessible, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import InputForm from '../components/InputForm';
import { FormValue } from '../interfaces/formValue';
import { formatDateTime } from '../services/formatDateTime';

configure({ testIdAttribute: 'data-test-id' });

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

const setup = () => {
  const cartValueInput = screen.getByTestId('cartValue');
  const deliveryDistanceInput = screen.getByTestId('deliveryDistance');
  const numberOfItemsInput = screen.getByTestId('numberOfItems');
  const orderTimeInput = screen.getByTestId('orderTime');
  const user = userEvent.setup();
  return {
    cartValueInput,
    deliveryDistanceInput,
    numberOfItemsInput,
    orderTimeInput,
    user
  };
};

describe('InputForm component tests', () => {
  it('should render properly', () => {
    renderInputForm();
    expect(screen.getByLabelText('Order Time')).toBeTruthy();
  });

  it('should show correct placeholders', () => {
    renderInputForm();
    expect(screen.getByPlaceholderText('0.00 €')).toBeTruthy();
    expect(screen.getByPlaceholderText('0 meters')).toBeTruthy();
    expect(screen.getByPlaceholderText('0 items')).toBeTruthy();
    expect(screen.getByTestId('orderTime').closest('input')?.value).toEqual(
      formatDateTime(new Date())
    );
  });

  it('should call the setFormValue on every input change, (no spaces)', async () => {
    const { setFormValue } = renderInputForm();
    const { cartValueInput, deliveryDistanceInput, numberOfItemsInput, orderTimeInput, user } =
      setup();

    const inputValues = ['11.65', '1000', '2', '1010'];
    const lengthOfInputs = inputValues.join('').length - 1; // minus the '.'

    await user.type(cartValueInput, inputValues[0]);
    await user.type(deliveryDistanceInput, inputValues[1]);
    await user.type(numberOfItemsInput, inputValues[2]);
    await user.type(orderTimeInput, inputValues[3]);
    expect(setFormValue).toHaveBeenCalledTimes(lengthOfInputs);
  });

  it('should call the setFormValue on input change, (with spaces)', async () => {
    const { setFormValue } = renderInputForm();
    const { cartValueInput, deliveryDistanceInput, numberOfItemsInput, orderTimeInput, user } =
      setup();
    const inputValues = ['    1,2', '00000001000', '000 04', '12122024'];
    const inputValuesLength = inputValues.join('').replaceAll(' ', '').length - 1; // minus the ','

    await user.type(cartValueInput, inputValues[0]);
    await user.type(deliveryDistanceInput, inputValues[1]);
    await user.type(numberOfItemsInput, inputValues[2]);
    await user.type(orderTimeInput, inputValues[3]);
    expect(setFormValue).toHaveBeenCalledTimes(inputValuesLength);
  });

  it('should apply invalid class to invalid inputs after first submit', () => {
    render(
      <InputForm
        formValue={{
          cartValue: 0,
          deliveryDistance: 0,
          numberOfItems: 0,
          orderTime: null
        }}
        setFormValue={vi.fn()}
        hasBeenSubmitted={true}
      />
    );
    const { cartValueInput, deliveryDistanceInput, numberOfItemsInput, orderTimeInput } = setup();

    expect(cartValueInput.classList.contains('invalid')).toBe(true);
    expect(deliveryDistanceInput.classList.contains('invalid')).toBe(true);
    expect(numberOfItemsInput.classList.contains('invalid')).toBe(true);
    expect(orderTimeInput.classList.contains('invalid')).toBe(true);
  });

  it('all fields should be accessible', async () => {
    renderInputForm();
    const { cartValueInput, deliveryDistanceInput, numberOfItemsInput, orderTimeInput } = setup();

    expect(isInaccessible(cartValueInput)).toBe(false);
    expect(isInaccessible(deliveryDistanceInput)).toBe(false);
    expect(isInaccessible(numberOfItemsInput)).toBe(false);
    expect(isInaccessible(orderTimeInput)).toBe(false);
  });
});
