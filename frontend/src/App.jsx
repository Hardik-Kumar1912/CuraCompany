import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import TestPage from "./pages/TestPage";
import Header from "./components/ui/Header";
import Navbar1 from "./components/Navbar1";

import { useAuthContext } from "./context/AuthContext";
import InitailPage from "./pages/InitailPage";
import Footer from "./components/Footer";
import DashBoard from "./pages/DashBoard";
import Yet from "./pages/Yet";

import Analytics from "./pages/Analytics";
import PackagePage from "./pages/PackagePage";

function App() {
  const { authUser } = useAuthContext();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={authUser ? <DashBoard/> : <div><Navbar1/><InitailPage/><Footer/></div>}
        />
        <Route
          path="/home"
          element={authUser ? <div><Header/><HomePage/></div> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={authUser ? <DashBoard/> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={authUser ? <DashBoard/> : <SignUpPage />}
        />
        <Route
          path="/analytics"
          element={<div><Header /><Analytics /></div>}
        />
        <Route path="/transaction/:id" element={<div><Header /><TestPage /></div>} />
        <Route path="/packageTransaction/:id" element={<div><Header /><PackagePage /></div>} />
        <Route path="/yet" element={<Yet/>} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
