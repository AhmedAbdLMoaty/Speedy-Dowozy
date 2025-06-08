"use client";

import { useEffect, useRef } from "react";

interface UseScrollAnimationOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
    fadeDirection?: "up" | "down" | "left" | "right" | "fade";
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
    const {
        threshold = 0.2,
        rootMargin = "0px 0px -50px 0px",
        triggerOnce = true,
        fadeDirection = "up",
    } = options;

    const elementRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const target = entry.target as HTMLElement;
                    if (entry.isIntersecting) {
                        target.classList.add("animate-in");

                        const animatedChildren =
                            target.querySelectorAll(".animate-child");
                        animatedChildren.forEach((child, index) => {
                            setTimeout(() => {
                                child.classList.add("visible");
                            }, index * 100);
                        });

                        if (triggerOnce) {
                            observer.unobserve(target);
                        }
                    } else if (!triggerOnce) {
                        target.classList.remove("animate-in");
                        const animatedChildren =
                            target.querySelectorAll(".animate-child");
                        animatedChildren.forEach((child) => {
                            child.classList.remove("visible");
                        });
                    }
                });
            },
            { threshold, rootMargin }
        );

        if (elementRef.current) {
            elementRef.current.classList.add(`fade-${fadeDirection}`);
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [threshold, rootMargin, triggerOnce, fadeDirection]);

    return elementRef;
};
