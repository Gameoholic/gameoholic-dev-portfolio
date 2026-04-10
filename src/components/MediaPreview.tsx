import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface MediaPreviewProps {
    src: string;
    type: "image" | "video";
    caption?: string;
    className?: string;
}

export default function MediaPreview({
    src,
    type,
    caption,
    className = "",
}: MediaPreviewProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const inlineVideoRef = useRef<HTMLVideoElement>(null);

    const handleOpen = () => {
        if (type === "video" && inlineVideoRef.current) {
            setStartTime(inlineVideoRef.current.currentTime);
        }
        setIsOpen(true);
    };

    return (
        <>
            <div
                className={`group cursor-pointer overflow-hidden border border-stone-800 bg-stone-900 transition-colors hover:border-stone-600 ${className}`}
                onClick={handleOpen}
            >
                {type === "video" ? (
                    <video
                        ref={inlineVideoRef}
                        src={src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <img
                        src={src}
                        alt={caption}
                        className="h-full w-full object-cover"
                    />
                )}
            </div>

            {isOpen && (
                <Lightbox
                    src={src}
                    type={type}
                    caption={caption}
                    startTime={startTime}
                    onClose={() => setIsOpen(false)}
                />
            )}
        </>
    );
}

function Lightbox({
    src,
    type,
    caption,
    startTime,
    onClose,
}: {
    src: string;
    type: "image" | "video";
    caption?: string;
    startTime: number;
    onClose: () => void;
}) {
    const lightboxVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (type === "video" && lightboxVideoRef.current) {
            lightboxVideoRef.current.currentTime = startTime;
        }
    }, [startTime, type]);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    if (typeof document === "undefined") return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-8"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 z-50 rounded-full bg-white/10 p-2 text-stone-300 transition-all hover:bg-white/20 hover:text-white"
                aria-label="Close"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>

            <div
                className="relative max-h-[90vh] max-w-[90vw]"
                onClick={(e) => e.stopPropagation()}
            >
                {type === "video" ? (
                    <video
                        ref={lightboxVideoRef}
                        src={src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        controls
                        className="max-h-[85vh] max-w-full border border-stone-700 shadow-2xl"
                    />
                ) : (
                    <img
                        src={src}
                        alt={caption}
                        className="max-h-[85vh] max-w-full border border-stone-700 shadow-2xl"
                    />
                )}
                {caption && (
                    <p className="mt-4 text-center font-mono text-xs tracking-widest text-stone-400 uppercase">
                        {caption}
                    </p>
                )}
            </div>
        </div>,
        document.body
    );
}
