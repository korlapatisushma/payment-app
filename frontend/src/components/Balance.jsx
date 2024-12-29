import { useEffect, useState } from "react";
import axios from "axios";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export function Balance() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    axios
      .get(`${API_ENDPOINT}/api/v1/account/balance`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBalance(response.data.balance);
      });
  });

  return (
    <div className="flex h-14">
      <div className="flex flex-col text-lg justify-center font-bold h-full ml-4">
        {"Your Balance - "}
      </div>
      <div className="flex flex-col text-lg justify-center font-medium h-full ml-2">
        {`$${balance.toFixed(2)}`}
      </div>
    </div>
  );
}
