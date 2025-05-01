import { useState, useEffect, useRef } from 'react';

const useInView = (options = {}) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting);
        }, {
            threshold: options.threshold || 0.1,
            root: options.root || null,
            rootMargin: options.rootMargin || '0px'
        });

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [options.threshold, options.root, options.rootMargin]);

    return [ref, isVisible];
};

export default useInView;