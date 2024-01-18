import React from 'react';
import '../styles/ResultDisplay.css';

const ResultDisplay: React.FC<string> = ({ calculatedFee }) => {
  return (
    <div className="result-container">
      <p>Total Price:</p>
      <p data-test-id="fee" className="total-fee">
        {`${calculatedFee} €`}
      </p>
    </div>
  );
};

export default ResultDisplay;
