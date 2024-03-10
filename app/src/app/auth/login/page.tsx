"use client";

import LoginForm from "@/components/Auth/LoginForm";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function page() {
  return (
    <div className="max-w-[450px] w-full">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Don't have an account yet?{" "}
            <Link
              href={"/auth/sign-up"}
              className="text-primary hover:underline hover:text-hover"
            >
              Sign up
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
