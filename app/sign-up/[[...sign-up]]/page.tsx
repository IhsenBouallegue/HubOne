import { SignUp } from "@clerk/nextjs";
import { Center } from "@mantine/core";

export default function Page() {
  return (
    <Center h="100vh">
      <SignUp />
    </Center>
  );
}
