import moment from "moment";
// import { RangeValue } from 'rc-picker/lib/interface'
export interface DatePickerPropType {
	label?: string;
	dates: any;
	setDates?: any;
	colspan?: number;
	placeholder?: string;
	disabled: boolean;
	datetoDisable?: "future" | "past";
	isRequired?: booloen;
}