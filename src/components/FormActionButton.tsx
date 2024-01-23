import '../styles/FormActionButton.css';

export interface FormActionButtonProps {
  onClick: () => void;
  text: string;
}

const FormActionButton: React.FC<FormActionButtonProps> = ({ onClick, text }): JSX.Element => {
  return (
    <button className="action-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default FormActionButton;
