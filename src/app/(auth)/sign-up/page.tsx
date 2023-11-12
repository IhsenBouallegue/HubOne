import UserAuthForm from "@/components/home/user-auth-form";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/ui/button";
import { Card } from "@/ui/card";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up to HubOne",
};

export default function SignUp() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <Card className="mx-auto flex flex-col justify-center space-y-6 px-4 py-8 sm:px-16">
        <div className="flex flex-col space-y-2 text-center w-80">
          <Image
            src="/logo/hubone_logo.svg"
            height={56}
            width={56}
            className="mx-auto m-4"
            alt={"HubOne Logo"}
          />
          <h1 className="text-xl font-semibold tracking-tight">
            Create your HubOne account
          </h1>
          <p className="text-sm text-muted-foreground">
            Get started for free. No credit card required.
          </p>
        </div>
        <UserAuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/sign-in"
            className="hover:text-brand underline underline-offset-4"
          >
            Already have an account? Sign In
          </Link>
        </p>
      </Card>
    </div>
  );
}