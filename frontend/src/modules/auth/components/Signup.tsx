import * as React from "react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Devider from "@/ui/Devider";

interface SignUpProps {
  setThisPageState: React.Dispatch<React.SetStateAction<"signup" | "signin">>;
}

const SignUp: React.FC<SignUpProps> = ({ setThisPageState }) => {
  return (
    <form className="w-full min-h-screen p-8 shadow-md flex flex-col items-center justify-center">
      <div className="w-full max-w-[340px]">
        <strong className="text-[24px] flex justify-center">Sign Up</strong>
        <span className="text-[12px] flex justify-center text-gray-500 mb-6"></span>
        {/* ------------- Section 1 -------------  */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            className="input w-full"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="paggเssword"
            className="input w-full"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full  py-2 rounded transition-colors"
        >
          Sign in
        </button>
        <Devider
          className="text-gray-400 text-[14px] my-4"
          text="Or continue with"
        />
        {/* ------------- Section 2 -------------  */}
        <div className="mt-6 flex items-center justify-center space-x-4 mb-4">
          <button className="btn dark:bth-dark rounded-full h-10 w-10 flex items-center justify-center p-0">
            <FcGoogle size={18} />
          </button>
          <span className="text-gray-500">or</span>
          <button className="btn dark:bth-dark rounded-full h-10 w-10 flex items-center justify-center p-0">
            <FaGithub size={18} />
          </button>
        </div>

        {/* ------------- Section 3 -------------  */}
        <span className="w-full flex justify-center text-[14px]">
          Aleady have an account?
          <span
            className="link link-primary font-bold ms-1"
            onClick={() => setThisPageState("signin")}
          >
            Sign in
          </span>
        </span>
      </div>
    </form>
  );
};

export default SignUp;
