import axios from "axios";
import { useNavigate } from "react-router-dom";

export function User({ firstName, lastName, userId }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between my-4">
      <div className="flex">
        <div className="rounded-full h-8 w-8 bg-slate-200 flex justify-center">
          <div className="font-semibold text-xl">{firstName[0]}</div>
        </div>
        <div className="flex flex-col justify-center ml-2">{`${firstName} ${lastName}`}</div>
      </div>
      <div className="flex justify-center">
        <button
          className="rounded-lg bg-slate-800 text-white font-small text-sm px-2"
          onClick={() =>
            navigate("/send", {
              state: { fullName: `${firstName} ${lastName}`, userId: userId },
            })
          }
        >
          {"Send Money"}
        </button>
      </div>
    </div>
  );
}
