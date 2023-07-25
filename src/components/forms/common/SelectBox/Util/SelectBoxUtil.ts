import { SelectOption } from 'src/components/forms/common/SelectBox/SelectBox';

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
