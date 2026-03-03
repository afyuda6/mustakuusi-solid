import { createSignal, onCleanup } from "solid-js";

export function createInView(threshold: number) {
    let element: HTMLElement | null = null;
    const [isVisible, setIsVisible] = createSignal(false);

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        },
        { threshold }
    );

    const ref = (el: HTMLElement | null) => {
        element = el;
        if (element) observer.observe(element);
    };

    onCleanup(() => observer.disconnect());

    return { ref, isVisible };
}
