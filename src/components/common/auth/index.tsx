"use client";

import { Button } from "@mantine/core";
import { signIn, signOut } from "next-auth/react";

export function SignIn({ provider, ...props }: any) {
  return <Button {...props} onClick={() => signIn(provider)} />;
}

export function SignOut(props: any) {
  return <Button {...props} onClick={() => signOut()} />;
}
