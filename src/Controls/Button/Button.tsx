import React, { FC, MouseEventHandler, memo } from 'react';

type ButtonType = (MouseEventHandler<HTMLButtonElement>);

interface Props {
  classes?: string;
  children?: unknown;
  onClick?: ButtonType;

}

export const Button: FC<Props> = memo(({ children, classes, onClick }) => {
  return (
    <button
      type="button"
      className={`${classes}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
});
