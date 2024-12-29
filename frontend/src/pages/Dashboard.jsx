import { useNavigate } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useEffect, useState } from "react";

export function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (!storedUser) {
      navigate("/signin");
    } else {
      setUser(storedUser);
    }
  }, []);

  return (
    <>
      {user && (
        <div className="flex flex-col h-screen max-w-7xl mx-auto items-center">
          <Appbar user={user} />
          <Balance />
          <Users />
        </div>
      )}
    </>
  );
}
