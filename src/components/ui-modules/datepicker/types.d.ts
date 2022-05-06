enum DateToBeDisabledType {
  past = "past",
  future = "future",
}
export interface DatePickerPropType {
  label?: string;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  colspan?: number;
  placeholder?: string;
  disabled: boolean;
  datetoDisable?: "future" | "past";
  isRequired?: booloen;
}
