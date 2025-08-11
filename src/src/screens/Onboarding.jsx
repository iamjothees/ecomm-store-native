import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';

const Onboarding = () => {
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleChoice = (choice) => {
        if (choice === 'login') {
        navigate('/onboarding/auth/login');
        } else {
        navigate('/onboarding/auth/signup');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
            {step === 1 && (
            <>
                <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
                Welcome to Mens-Wear
                </h1>
                <p className="text-center text-gray-600 dark:text-gray-400">
                Your one-stop shop for the latest trends in men's fashion.
                </p>
                <Button className="w-full" onClick={handleNext}>Get Started</Button>
            </>
            )}
            {step === 2 && (
            <>
                <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
                How would you like to continue?
                </h1>
                <div className="flex justify-around pt-4">
                <Button onClick={() => handleChoice('login')}>Login</Button>
                <Button onClick={() => handleChoice('signup')}>Sign Up</Button>
                </div>
            </>
            )}
        </div>
        </div>
    );
};

export default Onboarding;