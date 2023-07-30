import React, { ChangeEvent, FC, memo } from 'react';

interface Props {
  classes?: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  required?: boolean;
}

export const Input: FC<Props> = memo(({
  placeholder,
  classes,
  onChange,
  value,
  required,
}) => {
  return (
    <input
      type="text"
      className={`${classes}`}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
      required={required}
    />
  );
});
