import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/contexts/ToastContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupForm() {
  const { register, handleSubmit, setValue, formState: { isSubmitting } } = useForm();
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [signupWith, setSignupWith] = useState("email");

  const onSubmit = async (data) => {
    await signup(data)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        if (["ValidationError", "UserAlreadyExistsError"].includes(error.cause?.name)) {
          showToast(error.message, "error");
          return;
        }
        throw error;
      });
  };

  const toggleSignupWith = () => {
    if (signupWith === "email") {
      setValue("email", "");
      setSignupWith("phone");
    } else {
      setValue("phoneNumber", "");
      setSignupWith("email");
    }
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-balance text-muted-foreground">
            Enter your information to create an account
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input id="first-name" placeholder="Max" required {...register("firstName")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input id="last-name" placeholder="Robinson" required {...register("lastName")} />
            </div>
          </div>
          {signupWith === "email" ? (
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...register("email")}
              />
            </div>
          ) : (
            <div className="grid gap-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="+1 123 456 7890"
                required
                {...register("phoneNumber")}
              />
            </div>
          )}
          <div className="text-sm">
            <Button variant="link" type="button" onClick={toggleSignupWith}>
              {signupWith === "email"
                ? "Sign up with phone number instead"
                : "Sign up with email instead"}
            </Button>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create an account
          </Button>
          <Button variant="outline" className="w-full" disabled={isSubmitting}>
            Sign up with Google
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/onboarding/auth/login" className="underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}