import { Link } from "react-router-dom";

export function BottomMessage({ label, route, buttonText }) {
  return (
    <div className="flex py-2 justify-center">
      <div>{label}</div>
      <Link to={route} className="pl-1 underline">
        {buttonText}
      </Link>
    </div>
  );
}
