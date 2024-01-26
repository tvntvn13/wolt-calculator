import '../styles/ResultDisplay.css';

interface ResultDisplayProps {
  calculatedFee: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ calculatedFee }): JSX.Element => {
  return (
    <div className="result-container" aria-live="polite">
      <p>Delivery Fee:</p>
      <p data-test-id="fee" className="total-fee">
        {`${calculatedFee} €`}
      </p>
    </div>
  );
};

export default ResultDisplay;
