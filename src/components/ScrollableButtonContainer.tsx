'use client'
import React, { ReactNode, useRef, useState, MouseEvent } from 'react';

interface ScrollableButtonContainerProps {
    children: ReactNode;
    className?: string;
}

const ScrollableButtonContainer: React.FC<ScrollableButtonContainerProps> = ({ children, className = '' }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: MouseEvent) => {
        setIsDragging(true);
        if (containerRef.current) {
            setStartX(e.pageX - containerRef.current.offsetLeft);
            setScrollLeft(containerRef.current.scrollLeft);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        if (containerRef.current) {
            const x = e.pageX - containerRef.current.offsetLeft;
            const walk = (x - startX) * 2; // 滚动速度倍数
            containerRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    return (
        <div className="relative w-full">
            <div
                ref={containerRef}
                className={`
                    flex overflow-x-auto scrollbar-hide
                    gap-2 py-2 px-1
                    scroll-smooth
                    whitespace-nowrap
                    cursor-grab active:cursor-grabbing
                    select-none
                    ${className}
                `}
                style={{
                    msOverflowStyle: 'none',  /* IE and Edge */
                    scrollbarWidth: 'none',   /* Firefox */
                }}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
            >
                {/* 隐藏 Webkit 浏览器的滚动条 */}
                <style jsx global>{`
                    .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
                {children}
            </div>
        </div>
    );
};

export default ScrollableButtonContainer; 