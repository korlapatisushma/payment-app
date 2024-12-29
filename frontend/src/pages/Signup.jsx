import { useState } from "react";
import { BottomMessage } from "../components/BottomMessage";
import { Button } from "../components/Button";
import { CardComponent } from "../components/CardComponent";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Subheading } from "../components/Subheading";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export function Signup() {
  const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = () => {
    axios
      .post(`${API_ENDPOINT}/api/v1/user/signup`, {
        username,
        firstName,
        lastName,
        password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard", { state: firstName });
      });
  };

  return (
    <CardComponent>
      <Heading label={"Sign Up"} />
      <Subheading label={"Enter your information to create an account"} />
      <InputBox
        name={"First Name"}
        setText={setFirstName}
        placeholder={"John"}
      />
      <InputBox name={"Last Name"} placeholder={"Doe"} setText={setLastName} />
      <InputBox
        name={"Email"}
        placeholder={"john.doe@gmail.com"}
        setText={setUsername}
      />
      <InputBox name={"Password"} placeholder={"12345"} setText={setPassword} />
      <Button label={"Sign up"} onClick={handleSignUp} />
      <BottomMessage
        label={"Already have an account?"}
        buttonText={"Sign in"}
        route={"/signin"}
      />
    </CardComponent>
  );
}
