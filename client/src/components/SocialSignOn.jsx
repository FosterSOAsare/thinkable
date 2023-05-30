/* eslint-disable react/prop-types */

const SocialSignOn = (props) => {
	const { text, link, icon_sx = "" } = props;
	return (
		<a href={link} className="w-full flex justify-center items-center  bg-transparent mb-2 font-bold  rounded-[5px] text-primary border-stroke border-[1px] py-3 text-sm">
			<span className="h-auto w-auto mr-2 flex items-center relative justify-center">
				<props.icon className={`text-2xl ${icon_sx}`} />
			</span>
			{text}
		</a>
	);
};

export default SocialSignOn;
