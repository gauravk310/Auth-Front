import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ErrorToast } from "../Utils/Error";
import { SuccessToast } from "../Utils/Sucess";

export const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const HandleChange = (e) => {
    const { name, value } = e.target;
    const inputData = { ...loginInfo };
    inputData[name] = value;
    setLoginInfo(inputData);
  };

  const HandleSubmit = async (e) => {
    // console.log(signupInfo);
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      ErrorToast("Provide All Credentials");
    }
    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { sucess, message, name, jwttoken } = result;
      // console.log("Data Submited :",sucess,message);
      if (sucess) {
        SuccessToast(message);
        localStorage.setItem("token", jwttoken);
        localStorage.setItem("loggedinUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 3000);
      } else if (!sucess) {
        ErrorToast(message);
      }
      // console.log(result);
    } catch (error) {
      ErrorToast(error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Log-in
          </h1>
          <form className="space-y-5" onSubmit={HandleSubmit}>
            <div>
              {/* Email Input */}
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email :
              </label>
              <input
                onChange={HandleChange}
                type="email"
                value={loginInfo.email}
                name="email"
                placeholder="Enter email"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password :
              </label>
              <input
                type="password"
                onChange={HandleChange}
                name="password"
                value={loginInfo.password}
                placeholder="Enter password"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Log-in
            </button>
            <p className="text-center text-sm text-gray-600">
              New User ?{" "}
              <Link
                to="/signup"
                className="text-blue-600 font-medium hover:underline"
              >
                Sign-Up
              </Link>
            </p>
          </form>

          <ToastContainer />
        </div>
      </div>
    </>
  );
};
