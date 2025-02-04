'use client';

import { useEffect } from 'react';

const CustomCursor = () => {
    useEffect(() => {
        const cursor = document.querySelector('.cursor') as HTMLElement;

        const handleMouseMove = (e: MouseEvent) => {
            cursor.style.top = `${e.pageY - 10}px`;
            cursor.style.left = `${e.pageX - 10}px`;
        };

        const handleClick = () => {
            cursor.classList.add('expand');
            setTimeout(() => {
                cursor.classList.remove('expand');
            }, 800);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('click', handleClick);
        };
    }, []);

    return <div className="cursor"></div>;
};

export default CustomCursor;
