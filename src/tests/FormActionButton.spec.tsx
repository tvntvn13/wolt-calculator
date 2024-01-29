import { isInaccessible, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormActionButton from '../components/FormActionButton';

const handleSubmit = vi.fn();
const text = 'CALCULATE FEE';

const setup = () => {
  render(<FormActionButton {...{ onClick: handleSubmit, text: text }} />);
  const user = userEvent.setup();
  const button = screen.getByRole('button');
  return { user, button };
};

describe('FormActionButton component tests', () => {
  it('should render properly', () => {
    const { button } = setup();
    expect(button).toBeTruthy();
  });

  it('it should call handleSubmit when button is clicked', async () => {
    const { user, button } = setup();
    await user.click(button);
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('it should display the text passed in', () => {
    const { button } = setup();
    expect(button.textContent).toBe('CALCULATE FEE');
  });

  it('should call handleSubmit when enter is pressed', () => {
    const { user, button } = setup();
    user.type(button, '{enter}');
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('should be accessible', () => {
    const { button } = setup();
    expect(isInaccessible(button)).toBe(false);
  });
});
