import { SelectOption } from 'src/components/Form/common/SelectBox/SelectBox';

export namespace SelectBoxUtil {
  export const emptyString: SelectOption = {
    text: '',
    value: '',
  };

  export const insertFirstOption = (
    sourceOptionItems: SelectOption[],
    insertItem: SelectOption
  ) => {
    return [
      {
        ...insertItem,
      },
      ...sourceOptionItems,
    ];
  };
}
