import authService from "@/features/users/authService";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

export default function OnboardingLayout() {
    const navigate = useNavigate();

    useEffect(() => {
        authService.isLoggedIn()
            .then((isLoggedIn) => (isLoggedIn) &&  navigate("/") )
    }, []);

    return (
        <div className='flex-1 flex flex-col bg-gray-100 justify-center items-center'>
            <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
                <Outlet />
                <div className="hidden bg-muted lg:block">
                    <img
                    src="https://assets.architecturaldigest.in/photos/65523eab052e7db38641449e/16:9/w_2560%2Cc_limit/Anita%2520Dongre%2520Rewild'23%2520%2520(1).jpg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
            </div>

        </div>
    )
};