import React from "react";
import { DatePickerPropType } from "./types";
import { DatePicker as AntDatePicker } from "antd"
import moment from "moment";

const { RangePicker }  = AntDatePicker

const Index = ( {
						label,
						dates,
						setDates,
						colspan,
						disabled = false,
						datetoDisable,
						isRequired = false,
					}: DatePickerPropType) => {
	const disabledDate = (current: any) => {
		// Can not select yesterday and before
		const start = moment()?.subtract(1, "days");
		if (datetoDisable === "future") {
			return current > start;
		} else {
			return current < start;
		}
	};


	return (
		<div
			className={`col-span-${colspan || 1} my-1 px-2 w-full overflow-hidden`}
		>
			<div>
				<label
					htmlFor="email"
					className="block text-sm font-medium pb-2 text-gray-700"
				>
					{label || "Select Date"}{" "}
					{isRequired && <span className={`text-red-700`}>*</span>}
				</label>
				{datetoDisable ?

					<div className="mt-1">
						<RangePicker
							id={"dob"}
							disabled={disabled}
							aria-required={isRequired}
							defaultValue={undefined}
							disabledDate={disabledDate}
							className={"w-full h-11 font-light"}
							onChange={(date) => {
								setDates(date || undefined);
							}}
						/>
					</div>
					:
					<div className="mt-1">
						<RangePicker
							id={"dob"}
							disabled={disabled}
							aria-required={isRequired}
							defaultValue={undefined}
							className={"w-full h-11 font-light"}
							onChange={(date: any) => {
								setDates(date || undefined);
							}}
						/>
					</div>
				}
				<>

				</>
			</div>
		</div>
	);
};

export default Index;