import { Head, Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, FileText, Landmark } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnnouncementsSidebar } from '@/components/announcements-sidebar';
import type { AnnouncementItem } from '@/components/announcements-sidebar';
import LandingLayout from '@/layouts/landing-layout';
import type { SharedData } from '@/types';

type OfficialItem = {
    id: string;
    name: string;
    title: string;
    image_url: string;
};

type ActivityItem = {
    id: number;
    title: string;
    content: string;
    link_url: string | null;
    image_url: string | null;
    published_at: string | null;
};

type LandingProps = SharedData & {
    mayor?: OfficialItem | null;
    viceMayor?: OfficialItem | null;
    sbMembers?: OfficialItem[];
    activities?: ActivityItem[];
    announcements?: AnnouncementItem[];
    facebookMunicipalityUrl?: string;
    facebookMayorUrl?: string;
};

const CAROUSEL_AUTOPLAY_MS = 5000;

function stripHtml(html: string, maxLength: number): string {
    const text = html
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    return text.length <= maxLength
        ? text
        : text.slice(0, maxLength).trim() + '…';
}

function FacebookPageEmbed({ url, title }: { url: string; title: string }) {
    const href = url.trim();
    if (!href) return null;
    const embedSrc = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(href)}&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`;
    return (
        <div className="overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 bg-slate-50 px-3 py-2">
                <h3 className="text-sm font-bold text-slate-900">{title}</h3>
            </div>
            <div className="relative w-full overflow-hidden">
                <iframe
                    src={embedSrc}
                    width="340"
                    height="500"
                    style={{ border: 'none', overflow: 'hidden' }}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    title={title}
                    className="max-h-[500px] w-full"
                />
            </div>
        </div>
    );
}

export default function Landing() {
    const {
        auth,
        mayor,
        viceMayor,
        sbMembers,
        activities = [],
        announcements = [],
        facebookMunicipalityUrl = '',
        facebookMayorUrl = '',
    } = usePage<LandingProps>().props;
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

    const scrollRef = useRef<HTMLDivElement>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentIndexRef = useRef(0);
    const isScrollingByUser = useRef(false);
    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const dragStartScrollLeft = useRef(0);
    const dragRafId = useRef<number | null>(null);
    const dragTargetScrollLeft = useRef(0);

    const CARD_WIDTH = 160;
    const CARD_GAP = 16;
    const SCROLL_AMOUNT = CARD_WIDTH + CARD_GAP;
    const IMAGE_SIZE = 110;
    const n = officialsList.length;
    const totalSlides = n * 2;

    const scrollToIndex = useCallback(
        (index: number) => {
            const el = scrollRef.current;
            if (!el || n === 0) return;
            const clamped = Math.max(0, Math.min(totalSlides - 1, index));
            isScrollingByUser.current = true;
            el.scrollLeft = clamped * SCROLL_AMOUNT;
            requestAnimationFrame(() => {
                isScrollingByUser.current = false;
            });
        },
        [n, totalSlides, SCROLL_AMOUNT],
    );

    const smoothScrollToIndex = useCallback(
        (index: number) => {
            const el = scrollRef.current;
            if (!el || n === 0) return;
            const clamped = Math.max(0, Math.min(n - 1, index));
            const target = clamped * SCROLL_AMOUNT;
            isScrollingByUser.current = true;
            el.scrollTo({ left: target, behavior: 'smooth' });
            currentIndexRef.current = clamped;
            setCurrentIndex(clamped);
            requestAnimationFrame(() => {
                isScrollingByUser.current = false;
            });
        },
        [n, SCROLL_AMOUNT],
    );

    const goPrev = useCallback(() => {
        if (n === 0) return;
        if (currentIndexRef.current <= 0) {
            scrollToIndex(totalSlides - 1);
        } else {
            scrollToIndex(currentIndexRef.current - 1);
        }
    }, [n, totalSlides, scrollToIndex]);

    const goNext = useCallback(() => {
        if (n === 0) return;
        if (currentIndexRef.current >= n - 1) {
            scrollToIndex(n);
        } else {
            scrollToIndex(currentIndexRef.current + 1);
        }
    }, [n, scrollToIndex]);

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
    }, [n, SCROLL_AMOUNT]);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const rafId = requestAnimationFrame(() =>
            updateCurrentIndexFromScroll(),
        );
        el.addEventListener('scroll', updateCurrentIndexFromScroll);
        window.addEventListener('resize', updateCurrentIndexFromScroll);
        return () => {
            cancelAnimationFrame(rafId);
            el.removeEventListener('scroll', updateCurrentIndexFromScroll);
            window.removeEventListener('resize', updateCurrentIndexFromScroll);
        };
    }, [updateCurrentIndexFromScroll, n]);

    useEffect(() => {
        if (n <= 1) return;
        const interval = setInterval(() => {
            if (currentIndexRef.current >= n - 1) {
                scrollToIndex(n);
            } else {
                scrollToIndex(currentIndexRef.current + 1);
            }
        }, CAROUSEL_AUTOPLAY_MS);
        return () => clearInterval(interval);
    }, [n, scrollToIndex]);

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
    }, [n, SCROLL_AMOUNT, smoothScrollToIndex]);

    const handleCarouselMouseDown = useCallback((e: React.MouseEvent) => {
        const el = scrollRef.current;
        if (!el) return;
        isDragging.current = true;
        el.style.scrollSnapType = 'none';
        document.body.style.userSelect = 'none';
        dragStartX.current = e.clientX;
        dragStartScrollLeft.current = el.scrollLeft;
    }, []);

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
            <Head title="Municipality of Hinobaan - Official Website" />
            {/* Hero */}
            <section className="relative min-h-screen overflow-hidden text-white">
                {/* Video background - object-cover fills width and height, no black bars */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                >
                    <source src="/hinobaan-videos/daph.mp4" type="video/mp4" />
                </video>
                {/* Slight dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/40 via-neutral-800/30 to-neutral-900/40" />
                <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-28 sm:px-6 sm:py-36 lg:px-8">
                    <div className="max-w-2xl">
                        <p className="text-sm font-medium tracking-[0.2em] text-neutral-200/90 uppercase">
                            Negros Occidental
                        </p>
                        <h1 className="mt-2 text-4xl font-bold tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)] sm:text-5xl lg:text-6xl xl:text-7xl">
                            Municipality of Hinobaan
                        </h1>
                        <p className="mt-4 text-2xl font-light text-neutral-100 italic drop-shadow-[0_1px_4px_rgba(0,0,0,0.2)] sm:text-3xl lg:text-4xl">
                            Your gateway to transparent governance and community
                        </p>
                        <p className="mt-6 max-w-xl text-lg leading-relaxed text-neutral-50/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]">
                            Access government services, stay informed with
                            official updates, and connect with your local
                            community—all in one place. We are here to serve
                            you.
                        </p>
                        <div className="mt-10 flex flex-wrap gap-4">
                            {auth?.user && (
                                <Link
                                    href="/dashboard"
                                    className="inline-flex items-center rounded-xl bg-white px-6 py-3.5 text-base font-semibold text-neutral-800 shadow-lg shadow-black/20 transition hover:bg-neutral-50 hover:shadow-xl hover:shadow-black/25 active:scale-[0.98]"
                                >
                                    Go to Dashboard
                                </Link>
                            )}
                            <Link
                                href="/contact"
                                className="inline-flex items-center rounded-xl border-2 border-white/90 bg-white/5 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition hover:border-white hover:bg-white/15 active:scale-[0.98]"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Elected Officials carousel – government-style */}
            {officialsList.length > 0 && (
                <section className="border-t-4 border-blue-800 bg-slate-50 py-12 sm:py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Institutional header */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-xs font-semibold tracking-widest text-blue-800 uppercase sm:text-sm">
                                    Republic of the Philippines · Municipality
                                    of Hinobaan
                                </p>
                                <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
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
                                    className="flex size-10 items-center justify-center rounded border border-slate-300 bg-white text-slate-600 shadow-sm transition hover:border-blue-700 hover:bg-blue-50 hover:text-blue-800 focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 focus:ring-offset-slate-50 focus:outline-none"
                                    aria-label="Previous officials"
                                >
                                    <ChevronLeft className="size-5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        goNext();
                                    }}
                                    className="flex size-10 items-center justify-center rounded border border-slate-300 bg-white text-slate-600 shadow-sm transition hover:border-blue-700 hover:bg-blue-50 hover:text-blue-800 focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 focus:ring-offset-slate-50 focus:outline-none"
                                    aria-label="Next officials"
                                >
                                    <ChevronRight className="size-5" />
                                </button>
                            </div>
                        </div>

                        <div className="relative mt-8 overflow-hidden">
                            <div
                                ref={scrollRef}
                                role="region"
                                aria-label="Elected officials carousel"
                                onMouseDown={handleCarouselMouseDown}
                                onTouchStart={handleCarouselTouchStart}
                                onTouchMove={handleCarouselTouchMove}
                                onTouchEnd={handleCarouselTouchEnd}
                                onTouchCancel={handleCarouselTouchEnd}
                                className="flex cursor-grab touch-pan-x gap-4 overflow-x-auto overflow-y-hidden py-4 pb-2 select-none [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
                                style={{
                                    scrollSnapType: 'x mandatory',
                                    WebkitOverflowScrolling: 'touch',
                                }}
                            >
                                {[...officialsList, ...officialsList].map(
                                    ({ item, role }, slideIndex) => (
                                        <div
                                            key={`${item.id}-${slideIndex}`}
                                            className="flex shrink-0 flex-col items-center overflow-hidden rounded-sm border border-slate-200 bg-white shadow"
                                            style={{
                                                scrollSnapAlign: 'center',
                                                width: CARD_WIDTH,
                                            }}
                                        >
                                            {/* Official role bar – government blue */}
                                            <div className="w-full border-b-2 border-blue-800 bg-blue-800 px-2 py-2 text-center">
                                                <p className="text-[11px] font-bold tracking-wider text-white uppercase">
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
                                                {item.image_url ? (
                                                    <img
                                                        src={item.image_url}
                                                        alt=""
                                                        className="pointer-events-none h-full w-full object-cover object-top select-none"
                                                        draggable={false}
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                                                        <Landmark className="size-8" />
                                                    </div>
                                                )}
                                            </div>
                                            {/* Name – formal typography */}
                                            <div className="w-full border-t border-slate-100 bg-slate-50/80 px-2 py-2.5 text-center">
                                                <p className="text-xs font-semibold text-slate-800">
                                                    {item.name || '—'}
                                                </p>
                                            </div>
                                        </div>
                                    ),
                                )}
                            </div>

                            {/* Pagination – government blue active state */}
                            <div className="mt-6 flex flex-wrap justify-center gap-1.5">
                                {officialsList.map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => scrollToIndex(index)}
                                        className={`size-2.5 rounded-full transition focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 focus:ring-offset-slate-50 focus:outline-none ${
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

            {/* Municipality Activities (left) + News & Updates (right) side by side */}
            <section className="border-t-4 border-blue-800 bg-white py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Left: Municipality Activities (wider – main focus) */}
                        <div className="lg:col-span-2">
                            <p className="text-xs font-semibold tracking-widest text-blue-800 uppercase sm:text-sm">
                                Republic of the Philippines · Municipality of
                                Hinobaan
                            </p>
                            <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                Municipality Activities
                            </h2>
                            <p className="mt-1 text-sm text-slate-600">
                                Daily and weekly updates on activities carried
                                out by the LGU
                            </p>
                            {activities.length === 0 ? (
                                <p className="mt-6 text-slate-500">
                                    No activities posted yet. Check back later.
                                </p>
                            ) : (
                                <>
                                    <ul className="mt-8 space-y-6">
                                        {activities.map((a) => (
                                            <li key={a.id}>
                                                <Link
                                                    href={`/activities/${a.id}`}
                                                    className="flex flex-col gap-4 border border-slate-200 bg-white shadow-sm transition hover:shadow-md sm:flex-row"
                                                >
                                                    <div className="h-40 w-full shrink-0 overflow-hidden bg-slate-100 sm:h-36 sm:w-52">
                                                        {a.image_url ? (
                                                            <img
                                                                src={
                                                                    a.image_url
                                                                }
                                                                alt=""
                                                                className="h-full w-full object-cover object-center"
                                                            />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center text-slate-400">
                                                                <FileText className="size-10" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="min-w-0 flex-1 px-4 pt-0 pb-4 sm:px-0 sm:pt-2 sm:pr-2 sm:pb-0">
                                                        <h3 className="text-base leading-snug font-bold text-blue-800 uppercase sm:text-lg">
                                                            {a.title}
                                                        </h3>
                                                        {a.published_at && (
                                                            <p className="mt-1 text-sm">
                                                                <span className="text-slate-500">
                                                                    Posted
                                                                    on{' '}
                                                                </span>
                                                                <time
                                                                    dateTime={
                                                                        a.published_at
                                                                    }
                                                                    className="font-semibold text-blue-800"
                                                                >
                                                                    {new Date(
                                                                        a.published_at,
                                                                    ).toLocaleDateString(
                                                                        undefined,
                                                                        {
                                                                            dateStyle:
                                                                                'long',
                                                                        },
                                                                    )}
                                                                </time>
                                                            </p>
                                                        )}
                                                        <p className="mt-2 line-clamp-2 text-sm text-slate-700">
                                                            {stripHtml(
                                                                a.content,
                                                                200,
                                                            )}
                                                        </p>
                                                        <span className="mt-1 inline-block text-xs font-medium text-blue-800 underline underline-offset-2">
                                                            continue reading
                                                        </span>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-6">
                                        <Link
                                            href="/activities"
                                            className="inline-flex items-center rounded border-2 border-blue-800 bg-white px-4 py-2 text-sm font-semibold text-blue-800 transition hover:bg-blue-50"
                                        >
                                            View all activities
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Right: News & Updates + Facebook (narrower) */}
                        <div className="space-y-6 lg:col-span-1">
                            <AnnouncementsSidebar items={announcements} />
                            {facebookMayorUrl.trim() && (
                                <FacebookPageEmbed
                                    url={facebookMayorUrl}
                                    title="Municipal Mayor Facebook Page"
                                />
                            )}
                            {facebookMunicipalityUrl.trim() && (
                                <FacebookPageEmbed
                                    url={facebookMunicipalityUrl}
                                    title="Municipality of Hinobaan Official Facebook Page"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}
