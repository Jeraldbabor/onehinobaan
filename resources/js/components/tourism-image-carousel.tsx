import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type TourismImageCarouselProps = {
    images: string[];
    alt?: string;
    className?: string;
};

export function TourismImageCarousel({
    images,
    alt = 'Gallery',
    className,
}: TourismImageCarouselProps) {
    const [index, setIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);

    const count = images.length;

    useEffect(() => {
        if (!lightboxOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setLightboxOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [lightboxOpen]);

    if (count === 0) return null;

    const openPreview = (i: number) => {
        setIndex(i);
        setLightboxOpen(true);
    };

    const currentSrc = images[index];

    return (
        <>
            {/* Grid of clickable pictures — no carousel */}
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
                        className="group overflow-hidden rounded-xl bg-neutral-900 shadow-md ring-1 ring-black/10 transition focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                        aria-label={`View image ${i + 1} of ${count}`}
                    >
                        <img
                            src={src}
                            alt={`${alt} — ${i + 1}`}
                            className="aspect-video w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                        />
                    </button>
                ))}
            </div>

            {/* Lightbox — image only, no carousel (no arrows / thumbnails / counter) */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image preview"
                    onClick={() => setLightboxOpen(false)}
                >
                    <button
                        type="button"
                        onClick={() => setLightboxOpen(false)}
                        className="absolute right-4 top-4 z-10 flex size-12 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white sm:right-6 sm:top-6"
                        aria-label="Close"
                    >
                        <X className="size-7" />
                    </button>

                    <div
                        className="flex h-[70vh] w-full max-w-4xl items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={currentSrc}
                            alt={`${alt} — ${index + 1} of ${count}`}
                            className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
                            draggable={false}
                        />
                    </div>
                </div>
            )}
        </>
    );
}
