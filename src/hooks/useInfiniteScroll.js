import { useEffect, useCallback } from 'react';

const useInfiniteScroll = (onLoadMore, options = {}) => {
    const {
        threshold = 100,
        disabled = false,
        rootMargin = '20px',
        root = null
    } = options;

    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting && !disabled) {
            onLoadMore();
        }
    }, [onLoadMore, disabled]);

    useEffect(() => {
        if (disabled) return;

        const observer = new IntersectionObserver(handleObserver, {
            root,
            rootMargin,
            threshold: 0.1
        });

        // Create and observe a sentinel element
        const sentinel = document.createElement('div');
        sentinel.style.height = '1px';
        sentinel.style.width = '100%';
        sentinel.style.visibility = 'hidden';
        
        document.querySelector('#root')?.appendChild(sentinel);
        observer.observe(sentinel);

        return () => {
            if (sentinel.parentNode) {
                sentinel.parentNode.removeChild(sentinel);
            }
            observer.disconnect();
        };
    }, [handleObserver, root, rootMargin, disabled]);
};

export default useInfiniteScroll;