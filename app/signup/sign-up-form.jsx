"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUp } from "@/lib/auth-client";
import { EMAIL_REGEX } from "@/lib/constants";

const DEFAULT_ERROR = {
  error: false,
  message: "",
};

export function SignUpForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(DEFAULT_ERROR);

  const validateForm = ({ email, password, confirmPassword }) => {
    if (!email) {
      setError({ error: true, message: "Email is required" });
      return false;
    }
    if (!EMAIL_REGEX.test(email)) {
      setError({ error: true, message: "Please enter a valid email address" });
      return false;
    }
    if (!password) {
      setError({ error: true, message: "Password is required" });
      return false;
    }
    if (password.length < 8) {
      setError({ error: true, message: "Password must be at least 8 characters" });
      return false;
    }
    if (password !== confirmPassword) {
      setError({ error: true, message: "Passwords do not match" });
      return false;
    }
    setError(DEFAULT_ERROR);
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm-password");

    if (!validateForm({ email, password, confirmPassword })) return;

    setIsLoading(true);

    await signUp.email(
      { 
        email, 
        password, 
        name: email.split("@")[0], // Use email prefix as name
      },
      {
        onSuccess: () => {
          router.push("/login?registered=true");
        },
        onError: (ctx) => {
          setError({
            error: true,
            message: ctx.error.message || "Failed to create account",
          });
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Create an account</CardTitle>
        <CardDescription className="text-center">
          Enter your details to get started
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                autoComplete="email"
                disabled={isLoading}
                className={error.error ? "border-destructive" : ""}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                autoComplete="new-password"
                disabled={isLoading}
                className={error.error ? "border-destructive" : ""}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                placeholder="Confirm your password"
                autoComplete="new-password"
                disabled={isLoading}
                className={error.error ? "border-destructive" : ""}
              />
            </div>
            
            {error.error && (
              <div className="text-sm text-destructive text-center">
                {error.message}
              </div>
            )}
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "Creating account..." : "Sign up"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <p className="text-center text-sm text-muted-foreground w-full">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
