import { BottomMessage } from "../components/BottomMessage";
import { Button } from "../components/Button";
import { CardComponent } from "../components/CarComponent";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Subheading } from "../components/Subheading";

export function Signup() {
  return (
    <CardComponent>
      <Heading label={"Sign Up"} />
      <Subheading label={"Enter your information to create an account"} />
      <InputBox name={"First Name"} placeholder={"John"} />
      <InputBox name={"Last Name"} placeholder={"Doe"} />
      <InputBox name={"Email"} placeholder={"john.doe@gmail.com"} />
      <InputBox name={"Password"} placeholder={"12345"} />
      <Button label={"Sign up"} onClick={() => {}} />
      <BottomMessage
        label={"Already have an account?"}
        buttonText={"Sign in"}
        route={"/signin"}
      />
    </CardComponent>
  );
}
