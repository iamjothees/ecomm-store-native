import { useNavigate } from 'react-router';
import Autoplay from 'embla-carousel-autoplay';
import { useState, useEffect, useRef } from 'react';

import { Button } from '@/components/ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
} from '@/components/ui/carousel';

const Onboarding = () => {
    const navigate = useNavigate();
    const [api, setApi] = useState();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true, stopOnLastSnap: true }));

    useEffect(() => {
        if (!api) {
        return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on('select', () => {
        setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    const handleChoice = (choice) => {
        if (choice === 'login') {
        navigate('/onboarding/auth/login');
        } else {
        navigate('/onboarding/auth/signup');
        }
    };

    const onboardingSteps = [
        {
        title: 'Welcome to Mens-Wear',
        description:
            "Your one-stop shop for the latest trends in men's fashion.",
        image:
            'https://images.unsplash.com/photo-1523452617300-93ebbf63ed61?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fE1lbnMlMjB3ZWFyfGVufDB8fDB8fHww',
        },
        {
        title: 'Discover Your Style',
        description:
            'Explore a wide range of collections to find the perfect look for you.',
        image:
            'https://images.unsplash.com/photo-1610271283578-a595c4608e13?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        {
        title: 'Shop with Ease',
        description:
            'Enjoy a seamless shopping experience, from browsing to checkout.',
        image:
            'https://images.unsplash.com/photo-1559582798-678dfc71ccd8?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
    ];

    return (
        <div className="relative w-full h-screen">
        <Carousel
            setApi={setApi}
            plugins={[plugin.current]}
            className="w-full h-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent>
            {onboardingSteps.map((step, index) => (
                <CarouselItem key={index} className="pl-0">
                <div className="relative w-full h-screen">
                    <img
                    src={step.image}
                    alt={step.title}
                    className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
                    <h1 className="text-4xl font-bold">{step.title}</h1>
                    <p className="mt-4 text-lg">{step.description}</p>
                    </div>
                </div>
                </CarouselItem>
            ))}
            </CarouselContent>
            <CarouselNext className="absolute transform -translate-y-1/2 top-1/2 right-4" />
        </Carousel>
        {current === count && (
            <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800">
            <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
                How would you like to continue?
            </h1>
            <div className="flex justify-around pt-4">
                <Button onClick={() => handleChoice('login')}>Login</Button>
                <Button className="ml-4" onClick={() => handleChoice('signup')}>
                Sign Up
                </Button>
            </div>
            </div>
        )}
        </div>
    );
};

export default Onboarding;