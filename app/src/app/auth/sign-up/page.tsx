"use client";

import SignUpForm from "@/components/Auth/SignUpForm";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function page() {
  return (
    <div className="max-w-[450px] w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>
            Already have an account ?{" "}
            <Link
              href={"/auth/login"}
              className="text-primary hover:underline hover:text-hover"
            >
              Login
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
}
