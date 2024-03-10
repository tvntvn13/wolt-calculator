import { useState } from 'react';
import Badge from './components/Badge';
import FormActionButton from './components/FormActionButton';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import { FormValue } from './interfaces/formValue';
import { calculateDeliveryFee, isValidFormValue } from './services/calculateDeliveryFee';
import { formatDateTime } from './services/formatDateTime';
import './styles/App.css';

const App: React.FC = (): React.JSX.Element => {
  const HEADER_TEXT = 'Delivery Fee Calculator';
  const defaultFormValue: FormValue = {
    cartValue: -1, // has to be < 0 for the placeholder logic in InputForm
    deliveryDistance: 0,
    numberOfItems: 0,
    orderTime: formatDateTime(new Date())
  };
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [formValue, setFormValue] = useState<FormValue>(defaultFormValue);
  const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!isValidFormValue(formValue)) {
      setDeliveryFee(0);
    } else {
      setDeliveryFee(calculateDeliveryFee(formValue));
    }
    setHasBeenSubmitted(true);
  };

  return (
    <>
      <header className="header">
        <h1>{HEADER_TEXT}</h1>
      </header>
      <main className="main-container">
        <form
          data-test-id="form"
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => event.preventDefault()}>
          <InputForm
            formValue={formValue}
            setFormValue={setFormValue}
            hasBeenSubmitted={hasBeenSubmitted}
          />
          <ResultDisplay calculatedFee={deliveryFee.toFixed(2)} />
          <FormActionButton onClick={handleSubmit} text="CALCULATE FEE" />
        </form>
      </main>
      <Badge />
    </>
  );
};

export default App;
