import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import InputField from "../components/InputField";
import useLogin from "../hooks/useLogin";
import { MdArrowBack } from "react-icons/md";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    phoneNumber: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(loginData.phoneNumber, loginData.password);
  };

  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition"
      >
        <MdArrowBack className="w-6 h-6 text-white" />
      </button>

      {/* Gradient Border Wrapper */}
      <div className="p-1 bg-gradient-to-r from-green-400 to-orange-400 rounded-lg z-10">
        <div className="flex rounded-lg overflow-hidden z-50 bg-gray-300">
          <div className="w-full bg-gray-100 min-w-80 sm:min-w-96 flex items-center justify-center">
            <div className="max-w-md w-full p-6">
              <h1 className="text-3xl font-semibold mb-6 text-black text-center">
                Login
              </h1>
              <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
                Welcome back! Log in to your account
              </h1>
              <form className="space-y-3" onSubmit={handleSubmit}>
                <InputField
                  label="Phone Number"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={loginData.phoneNumber}
                  onChange={handleChange}
                  className="text-white"
                />
                <InputField
                  label="Password"
                  id="password"
                  name="password"
                  type="password"
                  value={loginData.password}
                  onChange={handleChange}
                  className="text-white"
                />
                <div>
                  <button
                    type="submit"
                    className="w-full mt-4 bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Login
                  </button>
                </div>
              </form>
              <div className="mt-4 text-sm text-gray-600 text-center">
                <p>
                  {"Don't"} have an account?{" "}
                  <Link to="/signup" className="text-black hover:underline">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
