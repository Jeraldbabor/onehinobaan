import { Head, Link, usePage } from '@inertiajs/react';
import {
    ExternalLink,
    X,
    ChevronLeft,
    ChevronRight,
    Landmark,
} from 'lucide-react';
import { useState, useRef, useCallback, useEffect } from 'react';
import { AnnouncementsSidebar } from '@/components/announcements-sidebar';
import type { AnnouncementItem } from '@/components/announcements-sidebar';
import LandingLayout from '@/layouts/landing-layout';
import type { PageProps } from '@/types';

type OfficialItem = {
    id: string;
    name: string;
    title: string;
    image_url: string;
};

type AnnouncementShowPageProps = {
    title: string;
    listPath: string;
    item: AnnouncementItem & { other_images_urls?: string[] };
    announcements?: AnnouncementItem[];
    mayor?: OfficialItem | null;
    viceMayor?: OfficialItem | null;
    sbMembers?: OfficialItem[];
};

// Compact carousel configuration for officials
const CARD_WIDTH = 120;
const CARD_GAP = 12;
const SCROLL_AMOUNT = CARD_WIDTH + CARD_GAP;
const IMAGE_SIZE = 80;

export default function AnnouncementShowPage({
    title,
    listPath,
    item,
    announcements = [],
    mayor,
    viceMayor,
    sbMembers = [],
}: AnnouncementShowPageProps) {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const otherImages = item.other_images_urls ?? [];
    const hasGallery = otherImages.length > 0;

    // Build officials list
    const officialsList: { item: OfficialItem; role: string }[] = [];
    if (mayor && (mayor.image_url || mayor.name)) {
        officialsList.push({ item: mayor, role: 'Municipal Mayor' });
    }
    if (viceMayor && (viceMayor.image_url || viceMayor.name)) {
        officialsList.push({ item: viceMayor, role: 'Vice Mayor' });
    }
    (sbMembers ?? []).forEach((m) => {
        officialsList.push({ item: m, role: 'SB Member' });
    });

    // Carousel state
    const scrollRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentIndexRef = useRef(0);
    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const dragStartScrollLeft = useRef(0);
    const dragRafId = useRef<number | null>(null);
    const dragTargetScrollLeft = useRef(0);
    const n = officialsList.length;
    const totalSlides = n * 2;

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);
    const nextImage = () => {
        if (lightboxIndex !== null && lightboxIndex < otherImages.length - 1) {
            setLightboxIndex(lightboxIndex + 1);
        }
    };
    const prevImage = () => {
        if (lightboxIndex !== null && lightboxIndex > 0) {
            setLightboxIndex(lightboxIndex - 1);
        }
    };

    // Carousel scroll functions
    const scrollToIndex = useCallback(
        (index: number) => {
            const el = scrollRef.current;
            if (!el || n === 0) return;
            const clamped = Math.max(0, Math.min(totalSlides - 1, index));
            el.scrollTo({ left: clamped * SCROLL_AMOUNT, behavior: 'smooth' });
            currentIndexRef.current = clamped % n;
            setCurrentIndex(clamped % n);
        },
        [n, totalSlides],
    );

    const smoothScrollToIndex = useCallback(
        (index: number) => {
            const el = scrollRef.current;
            if (!el || n === 0) return;
            const clamped = Math.max(0, Math.min(n - 1, index));
            const target = clamped * SCROLL_AMOUNT;
            el.scrollTo({ left: target, behavior: 'smooth' });
            currentIndexRef.current = clamped;
            setCurrentIndex(clamped);
        },
        [n],
    );

    const goPrev = useCallback(() => {
        if (n === 0) return;
        const el = scrollRef.current;
        if (!el) return;
        const newScrollLeft = el.scrollLeft - SCROLL_AMOUNT;
        el.scrollTo({ left: Math.max(0, newScrollLeft), behavior: 'smooth' });
    }, [n]);

    const goNext = useCallback(() => {
        if (n === 0) return;
        const el = scrollRef.current;
        if (!el) return;
        const newScrollLeft = el.scrollLeft + SCROLL_AMOUNT;
        const maxScroll = el.scrollWidth - el.clientWidth;
        el.scrollTo({
            left: Math.min(maxScroll, newScrollLeft),
            behavior: 'smooth',
        });
    }, [n]);

    const updateCurrentIndexFromScroll = useCallback(() => {
        const el = scrollRef.current;
        if (!el || n === 0) return;
        const scrollLeft = el.scrollLeft;
        let index = Math.round(scrollLeft / SCROLL_AMOUNT);
        if (index >= n) {
            el.scrollLeft = (index - n) * SCROLL_AMOUNT;
            index = index - n;
        }
        index = Math.max(0, Math.min(n - 1, index));
        currentIndexRef.current = index;
        setCurrentIndex(index);
    }, [n]);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        el.addEventListener('scroll', updateCurrentIndexFromScroll);
        window.addEventListener('resize', updateCurrentIndexFromScroll);
        return () => {
            el.removeEventListener('scroll', updateCurrentIndexFromScroll);
            window.removeEventListener('resize', updateCurrentIndexFromScroll);
        };
    }, [updateCurrentIndexFromScroll, n]);

    // Drag handlers
    const endDrag = useCallback(() => {
        const el = scrollRef.current;
        if (el && isDragging.current) {
            el.style.scrollSnapType = 'x mandatory';
        }
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        isDragging.current = false;
    }, []);

    const snapToNearest = useCallback(() => {
        const el = scrollRef.current;
        if (!el || n === 0) return;
        let index = Math.round(el.scrollLeft / SCROLL_AMOUNT);
        if (index >= n) index -= n;
        index = Math.max(0, Math.min(n - 1, index));
        smoothScrollToIndex(index);
    }, [n, smoothScrollToIndex]);

    const applyDragScroll = useCallback(() => {
        dragRafId.current = null;
        const el = scrollRef.current;
        if (el && isDragging.current) {
            const target = Math.max(
                0,
                Math.min(
                    el.scrollWidth - el.clientWidth,
                    dragTargetScrollLeft.current,
                ),
            );
            el.scrollLeft = target;
        }
    }, []);

    const handleCarouselMouseDown = useCallback((e: React.MouseEvent) => {
        const el = scrollRef.current;
        if (!el) return;
        isDragging.current = true;
        el.style.scrollSnapType = 'none';
        document.body.style.userSelect = 'none';
        dragStartX.current = e.clientX;
        dragStartScrollLeft.current = el.scrollLeft;
    }, []);

    const handleCarouselMouseMove = useCallback(
        (e: MouseEvent) => {
            if (!isDragging.current || !scrollRef.current) return;
            document.body.style.cursor = 'grabbing';
            const dx = e.clientX - dragStartX.current;
            dragTargetScrollLeft.current = dragStartScrollLeft.current - dx;
            if (dragRafId.current === null) {
                dragRafId.current = requestAnimationFrame(applyDragScroll);
            }
        },
        [applyDragScroll],
    );

    const handleCarouselMouseUp = useCallback(() => {
        if (!isDragging.current) return;
        endDrag();
        snapToNearest();
    }, [endDrag, snapToNearest]);

    const handleCarouselTouchStart = useCallback((e: React.TouchEvent) => {
        const el = scrollRef.current;
        if (!el || e.touches.length !== 1) return;
        isDragging.current = true;
        el.style.scrollSnapType = 'none';
        dragStartX.current = e.touches[0].clientX;
        dragStartScrollLeft.current = el.scrollLeft;
    }, []);

    const handleCarouselTouchMove = useCallback(
        (e: React.TouchEvent) => {
            if (
                !isDragging.current ||
                !scrollRef.current ||
                e.touches.length !== 1
            )
                return;
            e.preventDefault();
            const dx = e.touches[0].clientX - dragStartX.current;
            dragTargetScrollLeft.current = dragStartScrollLeft.current - dx;
            if (dragRafId.current === null) {
                dragRafId.current = requestAnimationFrame(applyDragScroll);
            }
        },
        [applyDragScroll],
    );

    const handleCarouselTouchEnd = useCallback(() => {
        if (!isDragging.current) return;
        endDrag();
        snapToNearest();
    }, [endDrag, snapToNearest]);

    useEffect(() => {
        window.addEventListener('mousemove', handleCarouselMouseMove);
        window.addEventListener('mouseup', handleCarouselMouseUp);
        window.addEventListener('mouseleave', handleCarouselMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleCarouselMouseMove);
            window.removeEventListener('mouseup', handleCarouselMouseUp);
            window.removeEventListener('mouseleave', handleCarouselMouseUp);
            if (dragRafId.current !== null)
                cancelAnimationFrame(dragRafId.current);
        };
    }, [handleCarouselMouseMove, handleCarouselMouseUp]);

    return (
        <LandingLayout>
            <Head
                title={`${item.title} - ${title} · Municipality of Hinobaan`}
            />
            {/* Banner Section */}
            <section className="relative h-64 w-full bg-slate-900 text-white">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
                    style={{
                        backgroundImage: `url('${usePage<PageProps>().props.generalSettings?.sub_page_banner_url || '/hinobaan-banner/banner2.png'}')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
                <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 py-12 sm:px-6 lg:px-8">
                    <nav className="mb-4 text-sm font-medium text-slate-300">
                        <Link
                            href="/"
                            className="transition-colors hover:text-white"
                        >
                            Home
                        </Link>
                        <span className="mx-2">/</span>
                        <Link
                            href={listPath}
                            className="transition-colors hover:text-white"
                        >
                            {title}
                        </Link>
                    </nav>
                    <Link
                        href={listPath}
                        className="mb-4 inline-flex items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white"
                    >
                        <ChevronLeft className="size-4" aria-hidden />
                        Back to {title}
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {item.title}
                    </h1>
                    <p className="mt-2 max-w-2xl text-lg text-slate-300">
                        Municipality of Hinobaan · Province of Negros Occidental
                    </p>
                </div>
            </section>

            {/* The Elected Officials carousel – government-style (smaller version) */}
            {officialsList.length > 0 && (
                <section className="border-t-4 border-blue-800 bg-slate-50 py-6 sm:py-8">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        {/* Institutional header */}
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-xs font-semibold tracking-widest text-blue-800 uppercase">
                                    Republic of the Philippines · Municipality
                                    of Hinobaan
                                </p>
                                <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                                    The Elected Officials
                                </h2>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        goPrev();
                                    }}
                                    className="flex size-8 items-center justify-center rounded border border-slate-300 bg-white text-slate-600 shadow-sm transition hover:border-blue-700 hover:bg-blue-50 hover:text-blue-800 focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 focus:ring-offset-slate-50 focus:outline-none"
                                    aria-label="Previous officials"
                                >
                                    <ChevronLeft className="size-4" />
                                </button>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        goNext();
                                    }}
                                    className="flex size-8 items-center justify-center rounded border border-slate-300 bg-white text-slate-600 shadow-sm transition hover:border-blue-700 hover:bg-blue-50 hover:text-blue-800 focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 focus:ring-offset-slate-50 focus:outline-none"
                                    aria-label="Next officials"
                                >
                                    <ChevronRight className="size-4" />
                                </button>
                            </div>
                        </div>

                        <div className="relative mt-4 overflow-hidden">
                            <div
                                ref={scrollRef}
                                role="region"
                                aria-label="Elected officials carousel"
                                onMouseDown={handleCarouselMouseDown}
                                onTouchStart={handleCarouselTouchStart}
                                onTouchMove={handleCarouselTouchMove}
                                onTouchEnd={handleCarouselTouchEnd}
                                onTouchCancel={handleCarouselTouchEnd}
                                className="flex cursor-grab touch-pan-x gap-3 overflow-x-auto overflow-y-hidden py-2 pb-2 select-none [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
                                style={{
                                    scrollSnapType: 'x mandatory',
                                    WebkitOverflowScrolling: 'touch',
                                }}
                            >
                                {[...officialsList, ...officialsList].map(
                                    ({ item: official, role }, slideIndex) => (
                                        <div
                                            key={`${official.id}-${slideIndex}`}
                                            className="flex shrink-0 flex-col items-center overflow-hidden rounded-sm border border-slate-200 bg-white shadow"
                                            style={{
                                                scrollSnapAlign: 'center',
                                                width: CARD_WIDTH,
                                            }}
                                        >
                                            {/* Official role bar – government blue */}
                                            <div className="w-full border-b-2 border-blue-800 bg-blue-800 px-2 py-1.5 text-center">
                                                <p className="text-[9px] font-bold tracking-wider text-white uppercase">
                                                    {role}
                                                </p>
                                            </div>
                                            {/* Official photo – formal frame */}
                                            <div
                                                className="flex shrink-0 overflow-hidden border-x border-b border-slate-200 bg-slate-100"
                                                style={{
                                                    width: IMAGE_SIZE,
                                                    height: IMAGE_SIZE,
                                                }}
                                            >
                                                {official.image_url ? (
                                                    <img
                                                        src={official.image_url}
                                                        alt=""
                                                        className="pointer-events-none h-full w-full object-cover object-top select-none"
                                                        draggable={false}
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                                                        <Landmark className="size-6" />
                                                    </div>
                                                )}
                                            </div>
                                            {/* Name – formal typography */}
                                            <div className="w-full border-t border-slate-100 bg-slate-50/80 px-2 py-2 text-center">
                                                <p className="text-[10px] font-semibold text-slate-800">
                                                    {official.name || '—'}
                                                </p>
                                            </div>
                                        </div>
                                    ),
                                )}
                            </div>

                            {/* Pagination – government blue active state */}
                            <div className="mt-4 flex flex-wrap justify-center gap-1">
                                {officialsList.map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => scrollToIndex(index)}
                                        className={`size-2 rounded-full transition focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 focus:ring-offset-slate-50 focus:outline-none ${
                                            index === currentIndex
                                                ? 'scale-125 bg-blue-800'
                                                : 'bg-slate-300 hover:bg-slate-400'
                                        }`}
                                        aria-label={`Go to official ${index + 1}`}
                                        aria-current={
                                            index === currentIndex
                                                ? 'true'
                                                : undefined
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Title Section below banner */}
            <section className="border-b border-slate-200 bg-white py-6 sm:py-8">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                        {item.title}
                    </h1>
                    {item.published_at && (
                        <time
                            dateTime={item.published_at}
                            className="mt-2 block text-sm text-slate-500"
                        >
                            {new Date(item.published_at).toLocaleDateString(
                                undefined,
                                { dateStyle: 'long' },
                            )}
                        </time>
                    )}
                    <p className="mt-1 text-sm text-slate-500">
                        Municipality of Hinobaan · Province of Negros Occidental
                    </p>
                </div>
            </section>

            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 py-10 sm:py-14 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <article className="border border-slate-200 bg-white shadow-sm">
                            {/* Featured Image at top (full bleed) */}
                            {item.image_url && (
                                <img
                                    src={item.image_url}
                                    alt=""
                                    className="w-full object-cover"
                                />
                            )}

                            {/* Title and content below image */}
                            <div className="p-6 sm:p-8">
                                {/* Content */}
                                <div
                                    className="prose prose-slate mt-6 max-w-none text-slate-700 [&_a]:font-medium [&_a]:text-blue-800 [&_a]:underline [&_a]:hover:text-blue-900 [&_blockquote]:border-l-4 [&_blockquote]:border-blue-800 [&_blockquote]:pl-4 [&_blockquote]:italic [&_h2]:mt-8 [&_h2]:text-xl [&_h3]:mt-6 [&_h3]:text-lg [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6"
                                    dangerouslySetInnerHTML={{
                                        __html: item.content,
                                    }}
                                />
                                {item.link_url && (
                                    <a
                                        href={item.link_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-6 inline-flex items-center gap-2 font-medium text-blue-800 hover:underline"
                                    >
                                        Read more at source
                                        <ExternalLink
                                            className="size-4"
                                            aria-hidden
                                        />
                                    </a>
                                )}

                                {/* Photo Gallery Section */}
                                {hasGallery && (
                                    <div className="mt-8 border-t border-slate-200 pt-6">
                                        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-800">
                                            <span>📷</span>
                                            Photo Gallery
                                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-sm font-normal text-slate-600">
                                                {otherImages.length}{' '}
                                                {otherImages.length === 1
                                                    ? 'photo'
                                                    : 'photos'}
                                            </span>
                                        </h3>
                                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-3">
                                            {otherImages.map((url, index) => (
                                                <button
                                                    key={url}
                                                    type="button"
                                                    onClick={() =>
                                                        openLightbox(index)
                                                    }
                                                    className="group relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-slate-100 transition-all hover:border-blue-400 hover:shadow-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                                >
                                                    <img
                                                        src={url}
                                                        alt={`Photo ${index + 1}`}
                                                        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 transition-all group-hover:bg-black/10" />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </article>
                    </div>
                    <aside className="lg:col-span-1">
                        <div className="sticky top-4">
                            <AnnouncementsSidebar items={announcements} />
                        </div>
                    </aside>
                </div>
            </div>

            {/* Lightbox Modal */}
            {lightboxIndex !== null && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                    onClick={closeLightbox}
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') closeLightbox();
                        if (e.key === 'ArrowRight') nextImage();
                        if (e.key === 'ArrowLeft') prevImage();
                    }}
                    tabIndex={0}
                    role="dialog"
                    aria-modal="true"
                >
                    {/* Close button */}
                    <button
                        type="button"
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                        aria-label="Close"
                    >
                        <X className="size-6" />
                    </button>

                    {/* Image counter */}
                    <div className="absolute top-4 left-4 rounded-full bg-white/10 px-3 py-1 text-sm text-white">
                        {lightboxIndex + 1} / {otherImages.length}
                    </div>

                    {/* Previous button */}
                    {lightboxIndex > 0 && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                prevImage();
                            }}
                            className="absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
                            aria-label="Previous image"
                        >
                            <ChevronLeft className="size-8" />
                        </button>
                    )}

                    {/* Next button */}
                    {lightboxIndex < otherImages.length - 1 && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                nextImage();
                            }}
                            className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
                            aria-label="Next image"
                        >
                            <ChevronRight className="size-8" />
                        </button>
                    )}

                    {/* Main image */}
                    <img
                        src={otherImages[lightboxIndex]}
                        alt={`Photo ${lightboxIndex + 1}`}
                        className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </LandingLayout>
    );
}
