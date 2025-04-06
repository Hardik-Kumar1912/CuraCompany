const GridBackground = ({ children }) => {
	return (
		<div className='w-full bg-white text-black bg-grid-black/[0.15] relative'>
			<div className='absolute pointer-events-none inset-0 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,white)]'></div>
			{children}
		</div>
	);
};
export default GridBackground;
