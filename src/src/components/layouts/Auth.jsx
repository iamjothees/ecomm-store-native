import authService from "@/features/users/authService";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export default function AuthLayout() {
    const navigate = useNavigate();

    useEffect(() => {
        authService.isLoggedIn()
            .then((isLoggedIn) => (isLoggedIn === false) &&  navigate("/onboarding") )
    }, []);

    return <Outlet />;
};