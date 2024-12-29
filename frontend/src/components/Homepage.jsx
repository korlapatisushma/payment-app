import React from "react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

// TODO -  handle the user session and show the text on button accordingly...

export const Homepage = () => {
  const navigate = useNavigate();
  const navigateDashboard = () => {
    navigate("/dashboard");
  };
  return (
    <div className="flex flex-col h-screen max-w-6xl mx-auto justify-center gap-4 items-center">
      <h1 className="text-5xl font-bold">Welcome to the Payment App</h1>
      <div className="w-1/6">
        <Button label={"Go to Dashboard"} onClick={navigateDashboard} />
      </div>
    </div>
  );
};
