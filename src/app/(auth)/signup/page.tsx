"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { userLoginSchema, userLoginType } from "@/schema/userLogin";
import axios from "axios";
import { GoogleLogo } from "@/components/GoogleFont";
import { signIn } from "next-auth/react";

const Signup = () => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const router = useRouter();

  const form = useForm<userLoginType>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: userLoginType) {
    try {
      setIsSubmiting(true);
      console.log(values);
      const response = await axios.post("/api/signup", values);
      console.log(response);

      if (response) {
        router.push("/signin");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmiting(false);
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn("google", {
        callbackUrl: "/products",
        redirect: false,
      });

      if (result?.error) {
        console.error("Google sign-in error:", result.error);
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Sign Up
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email and password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
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
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full flex flex-row justify-center items-center"
                disabled={isSubmiting}
              >
                {isSubmiting && <Loader2 className=" animate-spin mr-2" />}
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
        <div className="my-8 relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300"></span>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">OR</span>
          </div>
        </div>
        <CardContent>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={() => handleGoogleSignIn()}
          >
            <GoogleLogo />
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
