import { fireEvent, render, screen } from '@testing-library/react';
import FormActionButton from '../components/FormActionButton';

const handleSubmit = vi.fn();
const text = 'CALCULATE FEE';

describe('FormActionButton component tests', () => {
  it('should render properly', () => {
    render(<FormActionButton {...{ onClick: handleSubmit, text: text }} />);
    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('it should call handleSubmit when button is clicked', () => {
    render(<FormActionButton {...{ onClick: handleSubmit, text: text }} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('it should display the text passed in', () => {
    render(<FormActionButton {...{ onClick: handleSubmit, text: text }} />);
    const button = screen.getByRole('button');
    expect(button.textContent).toBe('CALCULATE FEE');
  });
});
