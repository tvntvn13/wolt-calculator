import '../styles/ResetButton.css';

const ResetButton: React.FC = (): JSX.Element => {
  const handleResetClick = (event: React.MouseEvent) => {
    console.log('clicked', event.target);
  };

  return (
    <button className="reset-button" onClick={handleResetClick}>
      RESET
    </button>
  );
};

export default ResetButton;
