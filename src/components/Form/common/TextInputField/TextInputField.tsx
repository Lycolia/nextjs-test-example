import styles from './TextInputField.module.scss';

export type TextInputProps = {
  type: 'text' | 'email' | 'password';
  tabIndex?: number;
  name: string;
  placeholder?: string;
  value: string;
  autoComplete?: string;
  disabled?: boolean;
  onChange(changeValue: string): void;
  onFocus?: () => void;
  onBlur?: () => void;
};

export const TextInputField = (props: TextInputProps) => {
  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(ev.target.value);
  };

  return (
    <input
      className={styles.input_field}
      tabIndex={props.tabIndex}
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      onChange={(ev) => onChange(ev)}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      autoComplete={props.autoComplete}
      disabled={props.disabled}
    />
  );
};
