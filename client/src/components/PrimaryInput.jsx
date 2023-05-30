/* eslint-disable react/prop-types */
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Input = ({ name, label, type = "text", placeholder, error, sx = "", handleFocus, handleChange, value }) => {
	const [innerType, setInnerType] = useState(type);
	function toggleType() {
		setInnerType((prev) => (prev === "text" ? "password" : "text"));
	}
	return (
		<div className={`w-full  h-auto mb-4 ${sx}`}>
			<label htmlFor={name} className="block text-sm text-primary font-medium mb-2">
				{label}
			</label>
			<div className={`w-full flex items-center justify-between ${error ? "border-error" : "border-stroke"} border-[1px] rounded-[8px] px-3`}>
				<input
					type={innerType}
					placeholder={placeholder}
					aria-label={placeholder}
					className="bg-transparent  appearance-none  outline-none w-full  h-auto text-[16px] md:text-sm py-2"
					onFocus={() => {
						handleFocus && handleFocus(name);
					}}
					value={value}
					onChange={(e) => {
						handleChange && handleChange(name, e.target.value);
					}}
				/>

				{type === "password" && (
					<div>
						{innerType === "password" && <AiFillEye className="text-desc" onClick={toggleType} />}
						{innerType === "text" && <AiFillEyeInvisible className="text-desc" onClick={toggleType} />}
					</div>
				)}
			</div>
			<p className="text-error text-sm font-medium mt-[3px]">{error}</p>
		</div>
	);
};

export default Input;
