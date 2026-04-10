export function smoothScrollTo(targetY: number, duration = 500) {
    const start = window.scrollY;
    const distance = targetY - start;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        window.scrollTo(0, start + distance * ease);
        if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
}

export function smoothScrollToTop(duration = 500) {
    smoothScrollTo(0, duration);
}

export function smoothScrollToElement(id: string, duration = 500) {
    const el = document.getElementById(id);
    if (!el) return;
    smoothScrollTo(el.getBoundingClientRect().top + window.scrollY, duration);
}
