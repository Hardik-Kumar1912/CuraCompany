import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="mb-10">
      <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-center relative z-50 text-black pt-10">
        <Link to="/">Cura</Link>
      </h1>

      <div className="relative mb-10 w-3/4 sm:w-2/3 md:w-1/2 mx-auto">
        {/* Gradients */}
        <div className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-indigo-400 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-10 top-0 bg-gradient-to-r from-transparent via-indigo-400 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-24 top-0 bg-gradient-to-r from-transparent via-sky-400 to-transparent h-[5px] w-1/3 blur-sm" />
        <div className="absolute inset-x-24 top-0 bg-gradient-to-r from-transparent via-sky-400 to-transparent h-px w-1/3" />
      </div>
    </div>
  );
};

export default Header;
