import { Link, useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
import { useToast } from "@/contexts/ToastContext";
import { useAuth } from "@/contexts/AuthContext";

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export default function LoginForm() {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { login } = useAuth();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
        email: "",
        password: "",
        },
    });

    const handleLoginFormSubmit = async (values) => {
        await login(values)
            .then((user) => {
                if (!user) throw Error("User not found")
                
                showToast("Welcome back! " + user.fullName, "success");
                navigate("/");
            })
            .catch((error) => {
                if (["InvalidCredentialsError"].includes(error.cause?.name)) {
                    showToast(error.message, "error");
                    return;
                }
                throw error;
            });
    };

    const handleLoginAsDemoUser = () => {
        form.setValue("email", "iamjothees@gmail.com");
        form.setValue("password", "password");
    };

    return (
        <div className="flex items-center justify-center py-12">
            <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
                </p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleLoginFormSubmit)} className="grid gap-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                        <Input placeholder="m@example.com" {...field} />
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
                        <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                        {/* <Link
                            to="/forgot-password"
                            className="ml-auto inline-block text-sm underline"
                        >
                            Forgot your password?
                        </Link> */}
                        </div>
                        <FormControl>
                        <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                {
                    import.meta.env.MODE === "development" && (
                        <Button type="submit" onClick={handleLoginAsDemoUser} className="w-full" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Login as Demo User
                        </Button>         
                    )
                }
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Login
                </Button>
                <Button variant="outline" className="w-full" disabled={form.formState.isSubmitting}>
                    Login with Google
                </Button>
                </form>
            </Form>
            <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/onboarding/auth/signup" className="underline">
                Sign up
                </Link>
            </div>
            </div>
        </div>
    );
}
