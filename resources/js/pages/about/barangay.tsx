import { Head, Link, usePage } from '@inertiajs/react';
import { AnnouncementsSidebar } from '@/components/announcements-sidebar';
import type { AnnouncementItem } from '@/components/announcements-sidebar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LandingLayout from '@/layouts/landing-layout';
import type { PageProps } from '@/types';

type BarangayItem = {
    id: string;
    name: string;
    population?: string;
    history?: string;
    festival?: string;
    land_area?: string;
    officials?: string;
    image_url: string;
};

type BarangayPageProps = {
    barangays?: BarangayItem[];
    announcements?: AnnouncementItem[];
};

export default function BarangayPage() {
    const { props: pageProps } = usePage();
    const props = pageProps as BarangayPageProps;
    const barangays = props.barangays ?? [];
    const announcements = props.announcements ?? [];
    const hasAny = barangays.length > 0;

    const sectionTitleClass =
        'border-l-4 border-blue-800 bg-white pl-4 text-lg font-semibold text-slate-900';

    return (
        <LandingLayout>
            <Head title="Barangay - Municipality of Hinobaan" />
            {/* Government-style header with banner */}
            <section className="relative h-50 border-b-4 border-amber-500/80 text-white sm:h-60">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('${usePage<PageProps>().props.generalSettings?.sub_page_banner_url || '/hinobaan-banner/banner2.png'}')`,
                    }}
                />
                <div className="relative flex h-full flex-col justify-center px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto w-full max-w-5xl [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">
                        <nav className="mb-4 text-sm text-slate-200">
                            <Link href="/" className="hover:text-white">
                                Home
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="text-white">About Us</span>
                            <span className="mx-2">/</span>
                            <span className="text-white">Barangay</span>
                        </nav>
                        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            Barangay
                        </h1>
                        <p className="mt-1 text-sm text-slate-200">
                            Municipality of Hinobaan · Province of Negros
                            Occidental
                        </p>
                    </div>
                </div>
            </section>

            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 py-10 sm:py-14 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <section className="bg-slate-50 py-10 sm:py-14">
                            <div className="max-w-5xl">
                                <h2 className={sectionTitleClass}>Barangays</h2>
                                {hasAny ? (
                                    <div className="mt-8 grid gap-6 sm:grid-cols-2">
                                        {barangays.map((barangay) => (
                                            <div
                                                key={barangay.id}
                                                className="group flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
                                            >
                                                <Link href={`/about/barangay/${barangay.id}`} className="block relative aspect-video w-full overflow-hidden bg-slate-100">
                                                    <img
                                                        src={barangay.image_url}
                                                        alt={barangay.name}
                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                </Link>
                                                <div className="flex flex-1 flex-col p-4">
                                                    <Link href={`/about/barangay/${barangay.id}`}>
                                                        <h3 className="mb-2 text-lg font-bold text-slate-900 group-hover:text-blue-800 transition-colors">
                                                            {barangay.name}
                                                        </h3>
                                                    </Link>
                                                    <div className="mb-4 space-y-1 text-sm text-slate-600">
                                                        {barangay.population && (
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-semibold text-slate-700">Pop:</span>
                                                                {barangay.population}
                                                            </div>
                                                        )}
                                                        {barangay.festival && (
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-semibold text-slate-700">Festival:</span>
                                                                {barangay.festival}
                                                            </div>
                                                        )}
                                                        {barangay.land_area && (
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-semibold text-slate-700">Area:</span>
                                                                {barangay.land_area}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Optional: Show history snippet or just keep it clean */}
                                                    {barangay.history && (
                                                        <p className="mb-4 line-clamp-3 text-sm text-slate-500">
                                                            {barangay.history}
                                                        </p>
                                                    )}

                                                    <div className="mt-auto pt-4 border-t border-slate-100">
                                                        <Link
                                                            href={`/about/barangay/${barangay.id}`}
                                                            className="text-sm font-medium text-blue-700 hover:text-blue-900 flex items-center gap-1"
                                                        >
                                                            View Details & Officials &rarr;
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="mt-4 border border-slate-200 bg-white px-8 py-16 text-center shadow-sm">
                                        <p className="text-slate-600">
                                            Barangay data is not yet available.
                                        </p>
                                        <Link
                                            href="/"
                                            className="mt-6 inline-block text-sm font-medium text-blue-800 hover:underline"
                                        >
                                            Return to Home
                                        </Link>
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
