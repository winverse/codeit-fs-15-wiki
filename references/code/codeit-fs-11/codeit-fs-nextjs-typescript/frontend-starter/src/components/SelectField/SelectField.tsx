import type { SelectHTMLAttributes } from 'react';
import * as styles from './SelectField.css';

interface Option {
  value: string | number;
  label: string;
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
}

export default function SelectField({
  label,
  options,
  id,
  name,
  ...props
}: SelectFieldProps) {
  const selectId = id ?? name;

  return (
    <label className={styles.field} htmlFor={selectId}>
      <span className={styles.label}>{label}</span>
      <select id={selectId} name={name} className={styles.select} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
