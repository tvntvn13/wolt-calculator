import React from 'react';
import { FormValue } from '../interfaces/formValue';
import { parseInputValue } from '../services/parseInputValue';
import '../styles/InputForm.css';

interface InputFormProps {
  formValue: FormValue;
  setFormValue: React.Dispatch<React.SetStateAction<FormValue>>;
  hasBeenSubmitted: boolean;
}

const InputForm: React.FC<InputFormProps> = ({
  formValue,
  setFormValue,
  hasBeenSubmitted
}): React.JSX.Element => {
  const { cartValue, deliveryDistance, numberOfItems, orderTime } = formValue;
  const MIN_FLOAT_VALUE = 0.01;
  const MIN_INT_VALUE = 1;
  const MAX_VALUE = 1000000;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    const name = event.target.name as keyof FormValue;
    const newValue = parseInputValue(value, name);

    setFormValue((previousValue) => ({
      ...previousValue,
      [name]: newValue
    }));
  };

  return (
    <div className="input-container">
      <label htmlFor="cart-value">Cart Value (€)</label>
      <input
        aria-describedby="cartValueHint"
        aria-required
        name="cartValue"
        placeholder="0.00 €"
        min={MIN_FLOAT_VALUE}
        max={MAX_VALUE}
        step={MIN_FLOAT_VALUE}
        type="number"
        data-test-id="cartValue"
        id="cart-value"
        className={
          hasBeenSubmitted && (!cartValue || cartValue < MIN_FLOAT_VALUE)
            ? 'invalid input-box'
            : 'input-box'
        }
        value={cartValue >= 0 ? cartValue : ''}
        onChange={handleInputChange}
        required
      />
      <span id="cartValueHint" className="hidden">
        Enter the cart value in euros. Accepts positive decimal numbers between 0.01 and 1000000.
      </span>
      <label htmlFor="delivery-distance">Delivery Distance (m)</label>
      <input
        aria-describedby="deliveryDistanceHint"
        aria-required
        name="deliveryDistance"
        placeholder="0 meters"
        step={MIN_INT_VALUE}
        min={MIN_INT_VALUE}
        max={MAX_VALUE}
        type="number"
        data-test-id="deliveryDistance"
        id="delivery-distance"
        className={hasBeenSubmitted && !deliveryDistance ? 'invalid input-box' : 'input-box'}
        value={deliveryDistance || ''}
        onChange={handleInputChange}
        required
      />
      <span id="deliveryDistanceHint" className="hidden">
        Enter the distance in meters. Accepts positive numbers between 1 and 1000000.
      </span>
      <label htmlFor="number-of-items">Number of Items</label>
      <input
        aria-describedby="numberOfItemsHint"
        aria-required
        name="numberOfItems"
        placeholder="0 items"
        step={MIN_INT_VALUE}
        min={MIN_INT_VALUE}
        max={MAX_VALUE}
        type="number"
        data-test-id="numberOfItems"
        id="number-of-items"
        className={hasBeenSubmitted && !numberOfItems ? 'invalid input-box' : 'input-box'}
        value={numberOfItems || ''}
        onChange={handleInputChange}
        required
      />
      <span id="numberOfItemsHint" className="hidden">
        Enter the number of items. Accepts positive numbers between 1 and 1000000.
      </span>
      <label htmlFor="order-time">Order Time</label>
      <input
        aria-describedby="orderTimeHint"
        aria-required
        name="orderTime"
        type="datetime-local"
        data-test-id="orderTime"
        id="order-time"
        className={hasBeenSubmitted && !orderTime ? 'invalid input-box' : 'input-box'}
        value={orderTime || ''}
        onChange={handleInputChange}
        required
      />
      <span id="orderTimeHint" className="hidden">
        Select or enter the date and time.
      </span>
    </div>
  );
};

export default InputForm;
