import { useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router';

function ScrollToTopOnNavigate({ children }) {
    const location = useLocation();
    const navigationType = useNavigationType();

    useLayoutEffect(() => {
        if (navigationType === 'PUSH' || navigationType === 'REPLACE') {
            window.scrollTo(0, 0);
            document.getElementById('app-main').scrollTop = 0;
            
        }
    }, [location.pathname, navigationType]);

    return children;
}

export default ScrollToTopOnNavigate;