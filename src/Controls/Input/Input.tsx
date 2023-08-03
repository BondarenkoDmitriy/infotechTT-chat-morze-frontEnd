import React, { ChangeEvent, FC, memo } from 'react';

interface Props {
  type?: string;
  classes?: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  required?: boolean;
}

export const Input: FC<Props> = memo(({
  type = 'text',
  placeholder,
  classes,
  onChange,
  value,
  required,
}) => {
  return (
    <input
      type={type}
      className={`${classes}`}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      required={required}
    />
  );
});
