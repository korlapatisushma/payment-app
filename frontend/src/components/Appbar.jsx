import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";

export function Appbar({ user }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/signin");
  };

  return (
    <div className="flex h-14 justify-between w-full border-b">
      <div className="flex flex-col md:text-xl text-xl justify-center h-full ml-4 font-bold">
        Payment App
      </div>
      <div className="flex items-center space-x-4">
        <div className="hidden sm:block text-sm md:text-base font-medium">
          Hello, {user}
        </div>
        <div className="relative">
          <div className="rounded-full h-10 w-10 bg-slate-200 flex mt-2 mr-4 justify-center cursor-pointer">
            <div
              className="flex flex-col justify-center font-semibold text-2xl"
              onClick={toggleDropdown}
            >
              {user[0]}
            </div>
          </div>
          {isOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-lg shadow-lg">
              <Button label={"Logout"} onClick={handleLogout} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
