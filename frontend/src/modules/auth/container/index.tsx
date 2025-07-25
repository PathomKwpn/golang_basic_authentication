import React from "react";
import SignUp from "@/modules/auth/components/Signup.tsx";
import SignIn from "@/modules/auth/components/Signin.tsx";

const AuthPage = () => {
  const [thisPageState, setThisPageState] = React.useState<"signup" | "signin">(
    "signin"
  );
  return (
    <div className="w-full min-h-screen flex items-center justify-start transition-colors ">
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
