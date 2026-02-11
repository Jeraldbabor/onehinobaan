import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Mail, MapPin, Phone, Share2 } from 'lucide-react';
import { AnnouncementsSidebar } from '@/components/announcements-sidebar';
import type { AnnouncementItem } from '@/components/announcements-sidebar';
import { LocationMap } from '@/components/location-map';
import { TourismImageCarousel } from '@/components/tourism-image-carousel';
import LandingLayout from '@/layouts/landing-layout';

type TourismItem = {
    id: number;
    title: string;
    description: string | null;
    address: string | null;
    email: string | null;
    contact_number: string | null;
    social_media_url: string | null;
    map_embed_url: string | null;
    map_latitude: number | null;
    map_longitude: number | null;
    image_url: string | null;
    image_urls: string[];
};

type TourismItemPageProps = {
    type: string;
    title: string;
    item: TourismItem;
    announcements?: AnnouncementItem[];
};

/** Only attraction and resort show the map section. */
const SHOW_MAP_TYPES = ['attraction', 'resorts'];

export default function TourismItemPage({
    type,
    title,
    item,
    announcements = [],
}: TourismItemPageProps) {
    const listUrl = `/tourism/${type}`;
    const isMapType = SHOW_MAP_TYPES.includes(type);
    const showMapSection = isMapType && (item.map_embed_url || item.address);

    /** Valid embed URL for iframe (security: only Google Maps embed). */
    const isEmbedUrl =
        item.map_embed_url &&
        (item.map_embed_url.startsWith('https://www.google.com/maps/embed') ||
            item.map_embed_url.startsWith('https://maps.google.com/'));
    const safeMapSrc =
        showMapSection && isEmbedUrl ? item.map_embed_url! : null;

    /** Address or place query for "View on Google Maps" link and for map marker title. */
    const mapQuery =
        showMapSection && item.map_embed_url && !isEmbedUrl
            ? item.map_embed_url.trim()
            : (item.address?.trim() ?? null);
    const mapSearchUrl = mapQuery
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`
        : null;

    /** Show Leaflet map when we have no embed iframe but have address or place query. */
    const showLocationMap =
        showMapSection && !safeMapSrc && (mapSearchUrl || item.address);

    /** Map center and marker: use item coordinates when set, else default (Hinoba-an). */
    const hasMapCoords =
        item.map_latitude != null &&
        item.map_longitude != null &&
        Number.isFinite(item.map_latitude) &&
        Number.isFinite(item.map_longitude);
    const mapCenter: [number, number] = hasMapCoords
        ? [Number(item.map_latitude), Number(item.map_longitude)]
        : [9.6017, 122.467];

    const sectionTitleClass =
        'border-l-4 border-blue-800 bg-white pl-4 text-lg font-semibold text-slate-900';

    return (
        <LandingLayout>
            <Head
                title={`${item.title} - ${title} · Tourism · Municipality of Hinobaan`}
            />
            {/* Government-style header with banner */}
            <section className="relative h-[200px] border-b-4 border-amber-500/80 text-white sm:h-[240px]">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('${(usePage().props as any).generalSettings?.sub_page_banner_url || "/hinobaan-banner/banner2.png"}')`,
                    }}
                />
                <div className="relative flex h-full flex-col justify-center px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto w-full max-w-5xl [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">
                        <nav className="mb-4 text-sm text-slate-200">
                            <Link href="/" className="hover:text-white">
                                Home
                            </Link>
                            <span className="mx-2">/</span>
                            <Link href="/tourism" className="hover:text-white">
                                Tourism
                            </Link>
                            <span className="mx-2">/</span>
                            <Link href={listUrl} className="hover:text-white">
                                {title}
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="text-white">{item.title}</span>
                        </nav>
                        <Link
                            href={listUrl}
                            className="mb-2 inline-flex items-center gap-2 text-sm text-slate-200 hover:text-white"
                        >
                            <ArrowLeft className="size-4" aria-hidden />
                            Back to {title}
                        </Link>
                        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            {item.title}
                        </h1>
                        <p className="mt-1 text-sm text-slate-200">
                            {title} · Municipality of Hinobaan · Province of
                            Negros Occidental
                        </p>
                    </div>
                </div>
            </section>

            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        {/* Image gallery */}
                        {(item.image_urls?.length ?? 0) > 0 && (
                            <section className="border-b border-slate-200 bg-white py-8 sm:py-10">
                                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                                    <h2 className={sectionTitleClass}>
                                        Photo Gallery
                                    </h2>
                                    <div className="mt-4">
                                        <TourismImageCarousel
                                            images={item.image_urls}
                                            alt={item.title}
                                        />
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Overview / Description */}
                        <section className="border-b border-slate-200 bg-slate-50 py-8 sm:py-10">
                            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                                <h2 className={sectionTitleClass}>Overview</h2>
                                {item.description ? (
                                    <div className="mt-4 border border-slate-200 bg-white p-5 leading-relaxed text-slate-700 shadow-sm">
                                        <div className="whitespace-pre-wrap">
                                            {item.description}
                                        </div>
                                    </div>
                                ) : (
                                    <p className="mt-4 border border-slate-200 bg-white p-5 text-slate-500 italic shadow-sm">
                                        No description available.
                                    </p>
                                )}
                            </div>
                        </section>

                        {/* Location & contact */}
                        {(safeMapSrc ||
                            mapSearchUrl ||
                            item.address ||
                            item.email ||
                            item.contact_number ||
                            item.social_media_url) && (
                                <section className="bg-white py-8 sm:py-10">
                                    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                                        <h2 className={sectionTitleClass}>
                                            Location & Contact Information
                                        </h2>
                                        <div className="mt-6 grid gap-8 lg:grid-cols-5">
                                            <div
                                                className={
                                                    item.address ||
                                                        item.email ||
                                                        item.contact_number ||
                                                        item.social_media_url
                                                        ? 'lg:col-span-2'
                                                        : 'hidden'
                                                }
                                            >
                                                {(item.address ||
                                                    item.email ||
                                                    item.contact_number ||
                                                    item.social_media_url) && (
                                                        <div className="border border-slate-200 bg-slate-50 p-5 shadow-sm">
                                                            <ul className="space-y-4">
                                                                {item.address && (
                                                                    <li className="flex items-start gap-3 text-slate-700">
                                                                        <MapPin className="mt-0.5 size-5 shrink-0 text-blue-800" />
                                                                        <span className="text-sm leading-relaxed sm:text-base">
                                                                            {
                                                                                item.address
                                                                            }
                                                                        </span>
                                                                    </li>
                                                                )}
                                                                {item.contact_number && (
                                                                    <li className="flex items-center gap-3 text-slate-700">
                                                                        <Phone className="size-5 shrink-0 text-blue-800" />
                                                                        <a
                                                                            href={`tel:${item.contact_number.replace(/\s/g, '')}`}
                                                                            className="text-sm text-blue-800 hover:underline sm:text-base"
                                                                        >
                                                                            {
                                                                                item.contact_number
                                                                            }
                                                                        </a>
                                                                    </li>
                                                                )}
                                                                {item.email && (
                                                                    <li className="flex items-center gap-3 text-slate-700">
                                                                        <Mail className="size-5 shrink-0 text-blue-800" />
                                                                        <a
                                                                            href={`mailto:${item.email}`}
                                                                            className="text-sm text-blue-800 hover:underline sm:text-base"
                                                                        >
                                                                            {item.email}
                                                                        </a>
                                                                    </li>
                                                                )}
                                                                {item.social_media_url && (
                                                                    <li className="flex items-center gap-3 text-slate-700">
                                                                        <Share2 className="size-5 shrink-0 text-blue-800" />
                                                                        <a
                                                                            href={
                                                                                item.social_media_url
                                                                            }
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="text-sm text-blue-800 hover:underline sm:text-base"
                                                                        >
                                                                            Social media
                                                                        </a>
                                                                    </li>
                                                                )}
                                                            </ul>
                                                        </div>
                                                    )}
                                            </div>
                                            {(safeMapSrc || showLocationMap) && (
                                                <div
                                                    className={
                                                        item.address ||
                                                            item.email ||
                                                            item.contact_number ||
                                                            item.social_media_url
                                                            ? 'lg:col-span-3'
                                                            : 'lg:col-span-5'
                                                    }
                                                >
                                                    {safeMapSrc ? (
                                                        <div className="overflow-hidden border border-slate-200 shadow-sm">
                                                            <iframe
                                                                src={safeMapSrc}
                                                                title={`Map: ${item.title}`}
                                                                width="100%"
                                                                height="320"
                                                                style={{
                                                                    border: 0,
                                                                }}
                                                                allowFullScreen
                                                                loading="lazy"
                                                                referrerPolicy="no-referrer-when-downgrade"
                                                                className="block w-full"
                                                            />
                                                        </div>
                                                    ) : showLocationMap ? (
                                                        <div className="space-y-3">
                                                            <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
                                                                <LocationMap
                                                                    center={
                                                                        mapCenter
                                                                    }
                                                                    marker={
                                                                        mapCenter
                                                                    }
                                                                    markerTitle={
                                                                        item.address ??
                                                                        item.title
                                                                    }
                                                                    height={320}
                                                                />
                                                            </div>
                                                            {mapSearchUrl && (
                                                                <a
                                                                    href={
                                                                        mapSearchUrl
                                                                    }
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-2 rounded-lg border border-blue-800 bg-blue-800 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-900"
                                                                >
                                                                    <MapPin className="size-5 shrink-0" />
                                                                    View location on
                                                                    Google Maps
                                                                </a>
                                                            )}
                                                        </div>
                                                    ) : null}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </section>
                            )}
                    </div>
                    <aside className="lg:col-span-1">
                        <div className="sticky top-4">
                            <AnnouncementsSidebar items={announcements} />
                        </div>
                    </aside>
                </div>
            </div>
        </LandingLayout>
    );
}
