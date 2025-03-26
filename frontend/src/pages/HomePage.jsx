import { useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import Cards from "../components/Cards";
import TestForm from "../components/TestForm";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Back Button placed outside the main container */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-4 left-4 z-50 flex items-center p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition"
      >
        <MdArrowBack className="w-6 h-6 text-white" />
      </button>

      <div className="flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center">
        <div className="flex items-center">
          <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text">
            We Prioritize Health First
          </p>
        </div>
        <div className="flex flex-wrap w-full justify-center items-center gap-6">
          <TestForm />
        </div>
        <Cards />
      </div>
    </>
  );
};

export default HomePage;
