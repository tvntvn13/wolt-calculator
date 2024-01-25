import React from 'react';
import '../styles/ResultDisplay.css';

interface ResultDisplayProps {
  calculatedFee: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ calculatedFee }): JSX.Element => {
  return (
    <div className="result-container">
      <p>Delivery Fee:</p>
      <p data-test-id="fee" data-testid="fee" className="total-fee">
        {`${calculatedFee} €`}
      </p>
    </div>
  );
};

export default ResultDisplay;
