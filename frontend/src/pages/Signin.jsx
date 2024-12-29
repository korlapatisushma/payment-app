import { useState } from "react";
import { BottomMessage } from "../components/BottomMessage";
import { Button } from "../components/Button";
import { CardComponent } from "../components/CardComponent";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Subheading } from "../components/Subheading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignIn = () => {
    axios
      .post("http://localhost:3000/api/v1/user/signin", {
        username,
        password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", username);
        navigate("/dashboard");
      })
      .catch((e) => console.log(e));
  };

  return (
    <CardComponent>
      <Heading label={"Sign In"} />
      <Subheading label={"Enter your credentials to access account"} />
      <InputBox
        name={"Email"}
        type={"text"}
        placeholder={"John.doe@gmail.com"}
        setText={setUsername}
      />
      <InputBox
        name={"Password"}
        type={"password"}
        placeholder={"12345"}
        setText={setPassword}
      />
      <Button label={"Sign In"} onClick={handleSignIn} />
      <BottomMessage
        label={"Don't have an account?"}
        buttonText={"Sign Up"}
        route={"/signup"}
      />
    </CardComponent>
  );
}
