import { ChangeEvent, useMemo } from 'react';
import styles from './SelectBox.module.scss';

export type SelectOption = {
  text: string;
  value: string;
};

type SelectBoxProps = {
  name?: string;
  tabIndex?: number;
  optionItems: Array<SelectOption>;
  selectedValue: string;
  autoComplete?: string;
  onChange: (option: SelectOption) => void;
  onFocus?: () => void;
  onBlur?: () => void;
};

const getSelectedOption = (
  ev: React.ChangeEvent<HTMLSelectElement>
): SelectOption => {
  const target = ev.target;
  return {
    text: target.options[target.selectedIndex].text,
    value: target.options[target.selectedIndex].value,
  };
};

const invalidSelectOptions = (selectOptions: SelectOption[]) => {
  return (
    selectOptions === undefined ||
    !Array.isArray(selectOptions) ||
    selectOptions.length === 0 ||
    !('text' in selectOptions[0] && 'value' in selectOptions[0])
  );
};

const generateOptionItems = (optionItems: SelectOption[]) => {
  if (invalidSelectOptions(optionItems)) return <option value={''} />;
  return (
    <>
      {optionItems.map((option) => {
        return (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        );
      })}
    </>
  );
};

export const SelectBox = (props: SelectBoxProps) => {
  const optionItems = useMemo(() => {
    return generateOptionItems(props.optionItems);
  }, [props.optionItems]);

  const onChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    const selectedItem = getSelectedOption(ev);
    props.onChange(selectedItem);
  };

  return (
    <select
      className={styles.select_box}
      autoComplete={props.autoComplete}
      name={props.name}
      tabIndex={props.tabIndex}
      value={props.selectedValue}
      onChange={onChange}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
    >
      {optionItems}
    </select>
  );
};
