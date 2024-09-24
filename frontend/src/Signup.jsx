import { Heading } from "./components/Heading";
import { Subheading } from "./components/Subheading";

export function Signup() {
  return (
    <div className="flex item-center justify-center">
      <Heading label={"Signup"} />
      <Subheading label={"Enter your information to create your account"} />
    </div>
  );
}
