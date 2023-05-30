/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const PrimaryButton = ({ text, handleClick, type = "button", disabled = false, sx = "", href }) => {
	return (
		<>
			{!href && (
				<button
					className={`w-full flex justify-center items-center bg-[#157c27] font-medium ${
						disabled ? "opacity-[0.5]" : "opacity-[1]"
					} bg-sec rounded-[5px] text-white py-3 text-md hover:opacity-[0.7] hover:scale-[1.1] transition-all duration-300 ${sx}`}
					type={type}
					disabled={disabled}
					onClick={(e) => (handleClick ? handleClick(e) : (e) => console.log(e))}>
					{text}
				</button>
			)}
			{href && (
				<Link
					to={href}
					className={`w-full flex justify-center items-center font-medium ${
						disabled ? "opacity-[0.5]" : "opacity-[1]"
					} bg-sec rounded-[5px] text-white py-3 text-sm hover:opacity-[0.7] hover:scale-[1.1] transition-all duration-300 ${sx}`}
					type={type}>
					{text}
				</Link>
			)}
		</>
	);
};

export default PrimaryButton;
