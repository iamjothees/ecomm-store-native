import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

function ScrollToTopFAB() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <button
            className={`fixed bottom-4 right-4 bg-primary-500 text-white p-3 rounded-full shadow-lg transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            onClick={scrollToTop}
        >
            <ArrowUp />
        </button>
    );
}

export default ScrollToTopFAB;
