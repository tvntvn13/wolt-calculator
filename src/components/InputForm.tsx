import { FormValue } from '../interfaces/formValue';
import { formatDateTime } from '../services/formatDateTime';
import { formatInputValue } from '../services/formatInputValue';
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
}): JSX.Element => {
  const { cartValue, deliveryDistance, numberOfItems, orderTime } = formValue;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    const name = event.target.name as keyof FormValue;
    const newValue = formatInputValue(value, name);

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
        name="cartValue"
        placeholder="0 €"
        min="0"
        max="1000000.00"
        step="0.05"
        required={true}
        type="number"
        data-test-id="cartValue"
        data-testid="cartValue"
        id="cart-value"
        className={hasBeenSubmitted && !cartValue ? 'invalid input-box' : 'input-box'}
        value={cartValue || ''}
        onChange={handleInputChange}
      />
      <span id="cartValueHint" className="hidden">
        Enter the cart value in euros. Accepts only positive decimal numbers.
      </span>
      <label htmlFor="delivery-distance">Delivery Distance (m)</label>
      <input
        aria-describedby="deliveryDistanceHint"
        name="deliveryDistance"
        placeholder="0 meters"
        step="5"
        min="0"
        max="1000000"
        required={true}
        type="number"
        data-test-id="deliveryDistance"
        id="delivery-distance"
        className={hasBeenSubmitted && !deliveryDistance ? 'invalid input-box' : 'input-box'}
        value={deliveryDistance || ''}
        onChange={handleInputChange}
      />
      <span id="deliveryDistanceHint" className="hidden">
        Enter the distance in meters. Accepts only positive numbers.
      </span>
      <label htmlFor="number-of-items">Number of Items</label>
      <input
        aria-describedby="numberOfItemsHint"
        name="numberOfItems"
        placeholder="0 items"
        step="1"
        required={true}
        type="number"
        data-test-id="numberOfItems"
        id="number-of-items"
        className={hasBeenSubmitted && !numberOfItems ? 'invalid input-box' : 'input-box'}
        value={numberOfItems || ''}
        onChange={handleInputChange}
      />
      <span id="numberOfItemsHint" className="hidden">
        Enter the number of items. Accepts only positive numbers.
      </span>
      <label htmlFor="order-time">Order Time</label>
      <input
        aria-describedby="orderTimeHint"
        name="orderTime"
        type="datetime-local"
        required={true}
        data-test-id="orderTime"
        id="order-time"
        className={hasBeenSubmitted && !orderTime ? 'invalid input-box' : 'input-box'}
        value={orderTime ?? formatDateTime(new Date())}
        onChange={handleInputChange}
      />
      <span id="orderTimeHint" className="hidden">
        Select or enter the date and time.
      </span>
    </div>
  );
};

export default InputForm;
