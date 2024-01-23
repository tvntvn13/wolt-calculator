import { useState } from 'react';
import './App.css';
import './fonts/OmnesBold.woff';
import './fonts/OmnesRegular.woff';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import { FormValue } from './interfaces/formValue';
import { calculateDeliveryFee } from './services/calculateDeliveryFee';
import FormActionButton from './components/FormActionButton';
import { formatDateTime } from './services/formatDateTime';

const App: React.FC = (): JSX.Element => {
  const HEADER_TEXT = 'Delivery Fee Calculator';
  const defaultFormValue: FormValue = {
    cartValue: 0,
    deliveryDistance: 0,
    numberOfItems: 0,
    orderTime: formatDateTime(new Date())
  };
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [formValue, setFormValue] = useState<FormValue>(defaultFormValue);
  const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);

  const handleSubmit = () => {
    const calculatedFee = calculateDeliveryFee(formValue);
    setDeliveryFee(calculatedFee);
    setHasBeenSubmitted(true);
  };

  return (
    <>
      <header className="header">{HEADER_TEXT}</header>
      <main className="main-container">
        <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => event.preventDefault()}>
          <InputForm
            formValue={formValue}
            setFormValue={setFormValue}
            hasBeenSubmitted={hasBeenSubmitted}
          />
          <ResultDisplay calculatedFee={deliveryFee.toFixed(2)} />
          <footer>
            <FormActionButton {...{ onClick: handleSubmit, text: 'CALCULATE FEE' }} />
          </footer>
        </form>
      </main>
    </>
  );
};

export default App;
