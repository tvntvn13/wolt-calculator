import { useState } from 'react';
import '../styles/InputForm.css';

const InputForm: React.FC = (): JSX.Element => {
  const [cartValue, setCartValue] = useState<number>(0);
  const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
  const [numberOfItems, setNumberOfItems] = useState<number>(0);
  const [orderTime, setOrderTime] = useState<Date | null>(null);

  const currentDateTime = new Date().toUTCString().toLocaleUpperCase('fi-FI');

  console.log(currentDateTime);

  return (
    <div className="input-container">
      <label htmlFor="cart-value">Cart Value (€)</label>
      <input
        inputMode="numeric"
        type="number"
        data-test-id="cartValue"
        id="cart-value"
        className="input-box"
        value={cartValue}
        onChange={(e) => setCartValue(parseInt(e.target.value))}
      />
      <label htmlFor="delivery-distance">Delivery Distance (km)</label>
      <input
        type="number"
        inputMode="numeric"
        data-test-id="deliveryDistance"
        id="delivery-distance"
        className="input-box"
        value={deliveryDistance}
        onChange={(e) => setDeliveryDistance(parseInt(e.target.value))}
      />
      <label htmlFor="number-of-items">Number of Items</label>
      <input
        type="number"
        inputMode="numeric"
        data-test-id="numberOfItems"
        id="number-of-items"
        className="input-box"
        value={numberOfItems}
        onChange={(e) => setNumberOfItems(parseInt(e.target.value))}
      />
      <label htmlFor="order-time">Order Time</label>
      <input
        type="datetime-local"
        inputMode="numeric"
        data-test-id="orderTime"
        id="order-time"
        className="input-box input-date"
        value={orderTime?.toLocaleString()}
        onChange={(e) => setOrderTime(new Date(e.target.value))}
        // placeholder={currentDateTime}
      />
    </div>
  );
};

export default InputForm;
