import * as React from "react";
const SignUp = () => {
  return (
    <form className="w-full max-w-sm p-8 rounded-lg shadow-md">
      <span className="text-[24px] font-bold flex justify-center">Sign Up</span>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input type="email" className="input" placeholder="Enter your email" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <input
          type="password"
          className="w-full px-3 py-2 border  rounded focus:outline-none focus:ring-2 "
          placeholder="Enter your password"
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary w-full  py-2 rounded transition-colors"
      >
        Sign Up
      </button>
      <div className="mt-6 flex items-center space-x-4">
        {/* <button className="btn btn-soft btn-primary dark:bth-dark">
          Sign up with Google
          </button> */}
        {/* <button className="btn btn-soft btn-primary dark:bth-dark">
          Primary
          </button> */}
        {/* <button className="btn btn-soft btn-primary dark:bth-dark">
          Sign up with Facebook
          </button> */}
      </div>
    </form>
  );
};

export default SignUp;
