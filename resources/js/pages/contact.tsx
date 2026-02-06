import { Head, Link } from '@inertiajs/react';
import { AnnouncementsSidebar } from '@/components/announcements-sidebar';
import type { AnnouncementItem } from '@/components/announcements-sidebar';
import { LocationMap } from '@/components/location-map';
import { Mail, MapPin, Phone } from 'lucide-react';
import LandingLayout from '@/layouts/landing-layout';

type ContactPageProps = {
    contact: {
        address: string;
        phone: string;
        email: string;
        map_embed_url: string;
    };
    announcements?: AnnouncementItem[];
};

export default function ContactPage({
    contact,
    announcements = [],
}: ContactPageProps) {
    const { address, phone, email, map_embed_url } = contact ?? {};
    const hasAddress = (address ?? '').trim().length > 0;
    const hasPhone = (phone ?? '').trim().length > 0;
    const hasEmail = (email ?? '').trim().length > 0;
    const mapUrl = (map_embed_url ?? '').trim();
    const isEmbedUrl =
        mapUrl.length > 0 &&
        (mapUrl.includes('maps/embed') || mapUrl.includes('openstreetmap.org'));
    const hasMap = isEmbedUrl;
    const hasAnyContact = hasAddress || hasPhone || hasEmail;

    const sectionTitleClass =
        'border-l-4 border-blue-800 bg-white pl-4 text-lg font-semibold text-slate-900';

    return (
        <LandingLayout>
            <Head title="Contact Us - Municipality of Hinobaan" />
            <section className="border-b-4 border-blue-800 bg-slate-800 text-white">
                <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
                    <nav className="mb-4 text-sm text-slate-300">
                        <Link href="/" className="hover:text-white">
                            Home
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-white">Contact Us</span>
                    </nav>
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Contact Us
                    </h1>
                    <p className="mt-1 text-sm text-slate-300">
                        Municipality of Hinobaan · Province of Negros Occidental
                    </p>
                </div>
            </section>

            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 py-10 sm:py-14 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-8">
                        <section className="bg-slate-50 py-6 sm:py-8">
                            <div className="max-w-5xl">
                                <h2 className={sectionTitleClass}>
                                    Get in touch
                                </h2>
                                {hasAnyContact ? (
                                    <div className="mt-4 border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                                        <ul className="space-y-5">
                                            {hasAddress && (
                                                <li className="flex items-start gap-3">
                                                    <MapPin
                                                        className="mt-0.5 size-5 shrink-0 text-blue-800"
                                                        aria-hidden
                                                    />
                                                    <div>
                                                        <span className="font-medium text-slate-800">
                                                            Address
                                                        </span>
                                                        <p className="mt-0.5 text-slate-700">
                                                            {address}
                                                        </p>
                                                    </div>
                                                </li>
                                            )}
                                            {hasPhone && (
                                                <li className="flex items-start gap-3">
                                                    <Phone
                                                        className="mt-0.5 size-5 shrink-0 text-blue-800"
                                                        aria-hidden
                                                    />
                                                    <div>
                                                        <span className="font-medium text-slate-800">
                                                            Phone
                                                        </span>
                                                        <p className="mt-0.5">
                                                            <a
                                                                href={`tel:${phone!.replace(/\s/g, '')}`}
                                                                className="text-slate-700 hover:text-blue-800 hover:underline"
                                                            >
                                                                {phone}
                                                            </a>
                                                        </p>
                                                    </div>
                                                </li>
                                            )}
                                            {hasEmail && (
                                                <li className="flex items-start gap-3">
                                                    <Mail
                                                        className="mt-0.5 size-5 shrink-0 text-blue-800"
                                                        aria-hidden
                                                    />
                                                    <div>
                                                        <span className="font-medium text-slate-800">
                                                            Email
                                                        </span>
                                                        <p className="mt-0.5">
                                                            <a
                                                                href={`mailto:${email}`}
                                                                className="text-slate-700 hover:text-blue-800 hover:underline"
                                                            >
                                                                {email}
                                                            </a>
                                                        </p>
                                                    </div>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                ) : (
                                    <div className="mt-4 border border-slate-200 bg-white px-6 py-8 text-center shadow-sm">
                                        <p className="text-slate-600">
                                            Contact details are not yet
                                            available.
                                        </p>
                                        <Link
                                            href="/"
                                            className="mt-4 inline-block text-sm font-medium text-blue-800 hover:underline"
                                        >
                                            Return to Home
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </section>

                        <section className="bg-slate-50 py-6 sm:py-8">
                            <div className="max-w-5xl">
                                <h2 className={sectionTitleClass}>
                                    Location
                                </h2>
                                {hasMap ? (
                                    <>
                                        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-100 shadow-sm overflow-hidden">
                                            <div className="relative w-full aspect-video min-h-[280px]">
                                                <iframe
                                                    src={mapUrl}
                                                    title="Municipality of Hinobaan location map"
                                                    className="absolute top-0 left-0 w-full h-full border-0 block"
                                                    allowFullScreen
                                                    loading="lazy"
                                                    referrerPolicy="no-referrer-when-downgrade"
                                                />
                                            </div>
                                        </div>
                                        <p className="mt-2 text-xs text-slate-500">
                                            If the map does not load, an ad
                                            blocker may be blocking it. Try{' '}
                                            <a
                                                href="https://www.google.com/maps/search/Hinoba-an+Negros+Occidental+Philippines"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-800 hover:underline"
                                            >
                                                opening in Google Maps
                                            </a>
                                            , or add your embed URL in
                                            Dashboard → Contact Us.
                                        </p>
                                    </>
                                ) : (
                                    <div className="mt-4 space-y-3">
                                        <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
                                            <LocationMap
                                                markerTitle="Municipality of Hinoba-an"
                                                height={320}
                                            />
                                        </div>
                                        <a
                                            href="https://www.google.com/maps/search/Hinoba-an+Negros+Occidental+Philippines"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 rounded-lg bg-blue-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-900"
                                        >
                                            <MapPin className="size-4" />
                                            Open in Google Maps
                                        </a>
                                        <p className="text-xs text-slate-500">
                                            To show a custom embed here, add the
                                            embed URL in Dashboard → Contact
                                            Us.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </section>
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
