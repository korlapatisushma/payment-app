import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export function SendMoney() {
  const location = useLocation();
  const [amount, setAmount] = useState(0);
  const handleTransfer = () => {
    axios.post("http://localhost:3000/api/account/transfer", {
      to: "",
      amount,
    });
  };
  return (
    <div className="flex justify-center h-screen bg-slate-300">
      <div className="flex flex-col h-full justify-center">
        <div className="rounded-lg bg-white w-96 text-center h-max p-4 space-y-8">
          <div className="text-3xl font-bold">Send Money</div>
          <div className="flex">
            <div className="rounded-full h-10 w-10 bg-green-500 flex flex-col justify-center ml-2">
              <div className="text-2xl flex justify-center text-white font-semibold">
                {location.state[0]}
              </div>
            </div>
            <div className="text-2xl flex flex-col justify-center font-bold ml-3">
              {location.state}
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount (in USD)</label>
              <input
                type="number"
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter Amount"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <button
              className="justify-center rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
              onClick={handleTransfer}
            >
              Initiate Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
