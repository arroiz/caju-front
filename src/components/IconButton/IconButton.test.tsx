import { HiOutlineArrowLeft } from 'react-icons/hi';
import { IconButton } from '.';
import { render, screen, fireEvent } from '@testing-library/react';

describe('IconButton', () => {
  it('should show IconButton', () => {
    render(
      <IconButton aria-label="back">
        <HiOutlineArrowLeft size={24} />
      </IconButton>,
    );
    expect(screen.getByLabelText('back')).toBeInTheDocument();
  });

  it('should call onClick when the IconButton is clicked', () => {
    const clickMock = jest.fn();
    render(
      <IconButton onClick={clickMock} aria-label="back">
        <HiOutlineArrowLeft size={24} />
      </IconButton>,
    );
    fireEvent.click(screen.getByLabelText('back'));
    expect(clickMock).toHaveBeenCalledTimes(1);
  });

  it('should be focusable', () => {
    render(
      <IconButton aria-label="back">
        <HiOutlineArrowLeft size={24} />
      </IconButton>,
    );
    const button = screen.getByLabelText('back');
    button.focus();
    expect(button).toHaveFocus();
  });
});
