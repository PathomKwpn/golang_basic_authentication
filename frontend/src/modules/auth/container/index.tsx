import React from "react";

import { WiDaySunny } from "react-icons/wi";
import { GoMoon } from "react-icons/go";

import SignUp from "@/modules/auth/components/Signup.tsx";
import SignIn from "@/modules/auth/components/Signin.tsx";
const AuthPage = () => {
  const [thisPageState, setThisPageState] = React.useState<"signup" | "signin">(
    "signin"
  );
  return (
    <div className="w-full min-h-screen flex items-center justify-start transition-colors ">
      <button
        className="btn flex items-center justify-center absolute top-4 right-4 z-50 rounded-full h-8 w-8
          shadow hover:scale-105 transition"
      >
        <label className="swap swap-rotate">
          <input type="checkbox" className="theme-controller" value="dark" />
          <WiDaySunny className="swap-off h-5 w-5 fill-current" />
          <GoMoon className="swap-on h-5 w-5 fill-current" />
        </label>
      </button>
      <div className="w-1/2">
        {thisPageState === "signin" ? (
          <SignIn setThisPageState={setThisPageState} />
        ) : (
          <div></div>
        )}
      </div>
      <div className="w-1/2">
        {thisPageState === "signup" ? (
          <SignUp setThisPageState={setThisPageState} />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
