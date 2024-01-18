import { useEffect, useState } from 'react';
import './App.css';
import InputForm from './components/InputForm';
import ResultDisplay from './components/ResultDisplay';
import ResetButton from './components/ResetButton';

const App: React.FC = (): JSX.Element => {
  const HEADER_TEXT = 'Delivery Fee Calculator';
  const [deliveryFee, setDeliveryFee] = useState(0);

  console.log(deliveryFee);

  useEffect(() => {
    setDeliveryFee(100);
  }, []);

  return (
    <>
      <header className="header">{HEADER_TEXT}</header>
      <main className="main-container">
        <InputForm />
        <ResultDisplay calculatedFee={deliveryFee.toString()} />
        <ResetButton />
      </main>
    </>
  );
};

export default App;
