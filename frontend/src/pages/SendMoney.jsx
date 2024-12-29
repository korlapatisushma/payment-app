import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { MdDone } from "react-icons/md";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export function SendMoney() {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [amount, setAmount] = useState(0);

  const handleCloseButton = () => {
    setShowPopup(false);
    navigate("/dashboard");
  };

  const handleTransfer = () => {
    axios
      .post(
        `${API_ENDPOINT}/api/v1/account/transfer`,
        {
          to: location.state.userId,
          amount,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setMessage("Payment Successful!");
        setShowPopup(true);
      })
      .catch((err) => {
        setMessage("Payment failed");
        setShowPopup(true);
      });
  };
  return (
    <div className="flex justify-center h-screen bg-slate-300">
      <div className="flex flex-col h-full justify-center">
        <div className="rounded-lg bg-white w-96 text-center h-max p-4 space-y-8">
          <div className="text-3xl font-bold">Send Money</div>
          <div className="flex">
            <div className="rounded-full h-10 w-10 bg-slate-500 flex flex-col justify-center ml-2">
              <div className="text-2xl flex justify-center text-white font-semibold">
                {location.state.fullName[0]}
              </div>
            </div>
            <div className="text-2xl flex flex-col justify-center font-bold ml-3">
              {location.state.fullName}
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount (in USD)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(Math.max(0.0, e.target.value));
                }}
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
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4">
            <h2 className="text-xl font-semibold">{message}</h2>
            <div className="rounded-full flex items-center mx-auto h-10 w-10 bg-green-600">
              <MdDone style={{ height: 42, width: 42, color: "white" }} />
            </div>
            <Button label={"Close"} onClick={handleCloseButton} />
          </div>
        </div>
      )}
    </div>
  );
}
