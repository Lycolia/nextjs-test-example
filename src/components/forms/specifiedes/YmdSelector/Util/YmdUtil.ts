import { SelectOption } from 'src/components/forms/common/SelectBox/SelectBox';

export namespace YmdUtil {
  export const DefaultValue = '';

  export const createYearOptions = (
    minYearValue?: string,
    maxYearValue?: string
  ) => {
    const maxYear = Number(maxYearValue ?? new Date().getFullYear());
    const minYear = Number(minYearValue ?? 1914);
    const yearItems = new Array<SelectOption>();
    for (let year = maxYear; year >= minYear; year--) {
      const yearValue = year.toString();
      yearItems.push({
        text: yearValue,
        value: yearValue,
      });
    }

    return yearItems;
  };

  export const createMonthOptions = () => {
    const monthItems = new Array<SelectOption>();

    for (let month = 1; month <= 12; month++) {
      const monthValue = month.toString();
      const monthText = monthValue.padStart(2, '0');
      monthItems.push({ text: monthText, value: monthValue });
    }

    return monthItems;
  };

  const getLastDayOfMonth = (year: number, month: number) => {
    const dt = new Date(year, month, 1);
    dt.setDate(-1);
    return dt.getDate();
  };

  export const createDayOptions = (yearValue: string, monthValue: string) => {
    const lastDayOfMonth =
      getLastDayOfMonth(Number(yearValue), Number(monthValue)) + 1;
    const dayItems = new Array<SelectOption>();
    for (let day = 1; day <= lastDayOfMonth; day++) {
      const dayValue = day.toString();
      const dayText = dayValue.padStart(2, '0');
      dayItems.push({
        text: dayText,
        value: dayValue,
      });
    }

    return dayItems;
  };
}
