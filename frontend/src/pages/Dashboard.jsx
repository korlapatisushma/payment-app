import { useLocation } from "react-router-dom";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export function Dashboard() {
  const location = useLocation();
  return (
    <>
      <Appbar user={location.state} />
      <Balance />
      <Users />
    </>
  );
}
