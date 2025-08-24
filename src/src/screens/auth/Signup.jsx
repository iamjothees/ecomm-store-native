import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/contexts/ToastContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PhoneInput } from "@/components/common/PhoneInput";

export default function SignupForm() {
  const form = useForm();
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [signupWith, setSignupWith] = useState("email");

  const onSubmit = async (data) => {
    const { countryCode, phoneNumber, ...rest } = data;
    let submissionData = rest;

    if (signupWith === 'phone') {
        submissionData.phoneNumber = `${countryCode || ''}${phoneNumber}`;
    }

    await signup(submissionData)
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
      form.setValue("email", "");
      setSignupWith("phone");
    } else {
      form.setValue("countryCode", "");
      form.setValue("phoneNumber", "");
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="Max" required {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Robinson" required {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {signupWith === "email" ? (
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="m@example.com" required {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            ) : (
              <PhoneInput
                control={form.control}
                countryCodeName="countryCode"
                phoneNumberName="phoneNumber"
              />
            )}
            <div className="text-sm">
              <Button variant="link" type="button" onClick={toggleSignupWith}>
                {signupWith === "email"
                  ? "Sign up with phone number instead"
                  : "Sign up with email instead"}
              </Button>
            </div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create an account
            </Button>
            <Button variant="outline" className="w-full" disabled={form.formState.isSubmitting}>
              Sign up with Google
            </Button>
          </form>
        </Form>
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
