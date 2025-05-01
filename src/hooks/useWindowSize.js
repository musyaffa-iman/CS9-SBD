import { useState, useEffect } from 'react';

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
        isMobile: undefined,
        isTablet: undefined,
        isDesktop: undefined
    });

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
                isMobile: width < 640,
                isTablet: width >= 640 && width < 1024,
                isDesktop: width >= 1024
            });
        };

        // Add event listener
        window.addEventListener('resize', handleResize);
        
        // Call handler right away so state gets updated with initial window size
        handleResize();
        
        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures effect is only run on mount and unmount

    return windowSize;
};

export default useWindowSize;