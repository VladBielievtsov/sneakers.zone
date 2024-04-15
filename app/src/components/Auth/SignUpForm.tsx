"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { signup } from "@/lib/features/auth/authActions";
import { useState } from "react";
import { RootState } from "@/lib/store";
import { redirect } from "next/navigation";
import { setCookie } from "cookies-next";
import { useToast } from "../ui/use-toast";

const formSchema = z
  .object({
    fullname: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .max(55),
    username: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .max(55),
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    password: z.string().min(6),
    password_confirmation: z.string().min(6),
  })
  .superRefine(({ password, password_confirmation }, ctx) => {
    if (password_confirmation !== password) {
      ctx.addIssue({
        path: ["password_confirmation"],
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });

export default function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });
  const router = useRouter();
  const { loading, error } = useAppSelector((state: RootState) => state.auth);
  const [isError, setIsError] = useState<string>("");

  const dispatch = useAppDispatch();
  const { toast } = useToast()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await dispatch(
      signup({
        fullname: values.fullname,
        username: values.username,
        email: values.email,
        password: values.password,
      })
    );
    if (res.meta.requestStatus === "rejected") {
      setIsError("User not found");
    } else {
      toast({
        title: "Check you email",
        description: `We've just sent and email to you at ${values.email}.`,
      })
      router.push("/sneakers");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <p className="text-red-500 pt-0">
            Error: 
            {error}
          </p>
        )}
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fullname</FormLabel>
              <FormControl>
                <Input type="text" placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password_confirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password confirmation</FormLabel>
              <FormControl>
                <Input type="password" placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>{loading ? "Loading" : "Sign up"}</Button>
      </form>
    </Form>
  );
}
