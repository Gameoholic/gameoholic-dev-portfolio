import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface MediaPreviewProps {
    src: string;
    type: "image" | "video";
    caption?: string;
    startTimestamp?: number;
    className?: string;
}

export default function MediaPreview({
    src,
    type,
    caption,
    startTimestamp,
    className = "",
}: MediaPreviewProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleOpen = () => {
        if (type === "video" && videoRef.current) {
            setStartTime(videoRef.current.currentTime);
        }
        setIsOpen(true);
    };

    return (
        <>
            <div
                className={`group mt-4 cursor-pointer ${className}`}
                onClick={handleOpen}
            >
                <div className="aspect-video w-full overflow-hidden border border-stone-800 bg-stone-900 transition-colors group-hover:border-stone-600">
                    {type === "video" ? (
                        <video
                            ref={videoRef}
                            src={src}
                            autoPlay
                            loop
                            muted
                            playsInline
                            disablePictureInPicture
                            className="h-full w-full object-cover"
                            onLoadedMetadata={() => {
                                if (
                                    videoRef.current &&
                                    startTimestamp !== undefined
                                ) {
                                    videoRef.current.currentTime =
                                        startTimestamp;
                                }
                            }}
                        />
                    ) : (
                        <img
                            src={src}
                            alt={caption}
                            className="h-full w-full object-cover"
                        />
                    )}
                </div>
                <p className="font-body mt-2 text-sm leading-relaxed text-stone-500">
                    {caption}
                </p>
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
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            <button
                onClick={onClose}
                className="absolute top-6 right-6 z-50 cursor-pointer rounded-full bg-black/40 p-2 text-stone-400 backdrop-blur-sm transition-all hover:bg-black/80 hover:text-white"
                aria-label="Close lightbox"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>

            <div
                className="relative max-h-[85vh] max-w-[85vw]"
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
                        disablePictureInPicture
                        controlsList="nodownload nopictureinpicture"
                        className="max-h-[85vh] max-w-[85vw] border border-stone-700"
                    />
                ) : (
                    <img
                        src={src}
                        alt={caption}
                        className="max-h-[85vh] max-w-[85vw] border border-stone-700"
                    />
                )}
                <p className="font-body mt-3 text-center text-sm text-stone-400">
                    {caption}
                </p>
            </div>
        </div>,
        document.body
    );
}
