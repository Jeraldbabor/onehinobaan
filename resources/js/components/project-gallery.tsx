import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type ProjectGalleryProps = {
    images: string[];
    alt?: string;
    className?: string;
    initialIndex?: number;
    isOpen?: boolean;
    onClose?: () => void;
};

export function ProjectGallery({
    images,
    alt = 'Project Image',
    className,
    initialIndex = 0,
    isOpen: externalIsOpen,
    onClose: externalOnClose,
}: ProjectGalleryProps) {
    const [internalIndex, setInternalIndex] = useState(0);
    const [internalIsOpen, setInternalIsOpen] = useState(false);

    const index = externalIsOpen !== undefined ? (externalIsOpen ? initialIndex : internalIndex) : internalIndex;
    const setIndex = (i: number | ((prev: number) => number)) => {
        if (typeof i === 'function') {
            setInternalIndex((prev) => i(prev));
        } else {
            setInternalIndex(i);
        }
    };

    const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
    const setIsOpen = (val: boolean) => {
        if (externalOnClose && !val) {
            externalOnClose();
        } else {
            setInternalIsOpen(val);
        }
    };

    const count = images.length;

    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
            if (e.key === 'ArrowLeft') setInternalIndex((i) => (i > 0 ? i - 1 : count - 1));
            if (e.key === 'ArrowRight') setInternalIndex((i) => (i < count - 1 ? i + 1 : 0));
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen, count]);

    if (count === 0) return null;

    const openPreview = (i: number) => {
        setInternalIndex(i);
        setInternalIsOpen(true);
    };

    const currentSrc = images[internalIndex];

    return (
        <>
            {/* Grid of clickable pictures */}
            <div
                className={cn(
                    'grid gap-4 sm:grid-cols-2 lg:grid-cols-3',
                    className,
                )}
            >
                {images.map((src, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => openPreview(i)}
                        className="group overflow-hidden rounded-xl bg-slate-900 shadow-sm ring-1 ring-slate-200 transition focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                        aria-label={`View image ${i + 1} of ${count}`}
                    >
                        <img
                            src={src}
                            alt={`${alt} — ${i + 1}`}
                            className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                    </button>
                ))}
            </div>

            {/* Lightbox */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-md"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image preview"
                    onClick={() => setIsOpen(false)}
                >
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="absolute top-4 right-4 z-10 flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 focus:ring-2 focus:ring-white focus:outline-none sm:top-6 sm:right-6"
                        aria-label="Close"
                    >
                        <X className="size-7" />
                    </button>

                    <div
                        className="relative flex h-full w-full max-w-5xl items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={currentSrc}
                            alt={`${alt} — ${internalIndex + 1} of ${count}`}
                            className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
                            draggable={false}
                        />

                        {/* Navigation Arrows if more than 1 image */}
                        {count > 1 && (
                            <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-4">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setInternalIndex((i) => (i > 0 ? i - 1 : count - 1));
                                    }}
                                    className="flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                                    aria-label="Previous"
                                >
                                    <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setInternalIndex((i) => (i < count - 1 ? i + 1 : 0));
                                    }}
                                    className="flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                                    aria-label="Next"
                                >
                                    <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        )}

                        {/* Counter */}
                        {count > 1 && (
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-white">
                                {internalIndex + 1} / {count}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
