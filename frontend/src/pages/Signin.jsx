import { BottomMessage } from "../components/BottomMessage";
import { Button } from "../components/Button";
import { CardComponent } from "../components/CarComponent";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Subheading } from "../components/Subheading";

export function Signin() {
  return (
    <CardComponent>
      <Heading label={"Sign In"} />
      <Subheading label={"Enter your credentials to access account"} />
      <InputBox name={"Email"} placeholder={"John.doe@gmail.com"} />
      <InputBox name={"Password"} placeholder={"12345"} />
      <Button label={"Sign In"} onClick={() => {}} />
      <BottomMessage
        label={"Don't have an account?"}
        buttonText={"Sign Up"}
        route={"/signup"}
      />
    </CardComponent>
  );
}
