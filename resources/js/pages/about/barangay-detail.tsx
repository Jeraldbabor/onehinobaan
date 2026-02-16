import { Head, Link, usePage } from '@inertiajs/react';
import { Users } from 'lucide-react';
import { AnnouncementsSidebar } from '@/components/announcements-sidebar';
import type { AnnouncementItem } from '@/components/announcements-sidebar';
import LandingLayout from '@/layouts/landing-layout';
import type { PageProps } from '@/types';

type OfficialItem = {
    id: string;
    name: string;
    position: string | null;
    image_url: string | null;
};

type BarangayDetail = {
    id: string;
    name: string;
    population?: string;
    history?: string;
    festival?: string;
    land_area?: string;
    officials_text?: string;
    image_url: string | null;
    officials?: OfficialItem[];
};

type BarangayDetailPageProps = {
    barangay: BarangayDetail;
    announcements?: AnnouncementItem[];
};

export default function BarangayDetailPage() {
    const { props: pageProps } = usePage<PageProps>();
    const props = pageProps as unknown as BarangayDetailPageProps;
    const { barangay, announcements = [] } = props;
    const defaultBanner =
        pageProps.generalSettings?.sub_page_banner_url ||
        '/hinobaan-banner/banner2.png';

    const sectionTitleClass =
        'border-l-4 border-blue-800 bg-white pl-4 text-lg font-semibold text-slate-900';

    return (
        <LandingLayout>
            <Head title={`${barangay.name} - Municipality of Hinobaan`} />

            {/* Banner Section */}
            <section className="relative h-64 w-full bg-slate-900 text-white">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
                    style={{
                        backgroundImage: `url('${barangay.image_url || defaultBanner}')`,
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
                        <span className="text-white">About Us</span>
                        <span className="mx-2">/</span>
                        <Link
                            href="/about/barangay"
                            className="transition-colors hover:text-white"
                        >
                            Barangay
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="inline-block max-w-[200px] truncate align-bottom text-white">
                            {barangay.name}
                        </span>
                    </nav>
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                        {barangay.name}
                    </h1>
                    <p className="mt-2 max-w-2xl text-lg text-slate-300">
                        Municipality of Hinobaan · Province of Negros Occidental
                    </p>
                </div>
            </section>

            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 py-10 sm:py-14 lg:grid-cols-3">
                    <div className="space-y-10 lg:col-span-2">
                        {/* Quick Facts */}
                        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="grid grid-cols-1 gap-6 text-center sm:grid-cols-3">
                                <div className="rounded-lg bg-blue-50 p-4 text-blue-900">
                                    <div className="mb-1 text-sm font-semibold tracking-wider text-blue-700/80 uppercase">
                                        Population
                                    </div>
                                    <div className="text-xl font-bold">
                                        {barangay.population || 'N/A'}
                                    </div>
                                </div>
                                <div className="rounded-lg bg-amber-50 p-4 text-amber-900">
                                    <div className="mb-1 text-sm font-semibold tracking-wider text-amber-700/80 uppercase">
                                        Land Area
                                    </div>
                                    <div className="text-xl font-bold">
                                        {barangay.land_area || 'N/A'}
                                    </div>
                                </div>
                                <div className="rounded-lg bg-emerald-50 p-4 text-emerald-900">
                                    <div className="mb-1 text-sm font-semibold tracking-wider text-emerald-700/80 uppercase">
                                        Festival
                                    </div>
                                    <div className="text-xl font-bold">
                                        {barangay.festival || 'N/A'}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* History */}
                        <section>
                            <h2 className={`mb-6 ${sectionTitleClass}`}>
                                History & Profile
                            </h2>
                            <div className="prose prose-slate max-w-none rounded-xl border border-slate-100 bg-white p-6 leading-relaxed text-slate-700 shadow-sm md:p-8">
                                {barangay.history ? (
                                    <div className="whitespace-pre-wrap">
                                        {barangay.history}
                                    </div>
                                ) : (
                                    <p className="text-slate-500 italic">
                                        No history available.
                                    </p>
                                )}
                            </div>
                        </section>

                        {/* Officials */}
                        <section>
                            <h2 className={`mb-6 ${sectionTitleClass}`}>
                                Barangay Officials
                            </h2>

                            {barangay.officials &&
                            barangay.officials.length > 0 ? (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {barangay.officials.map((official) => (
                                        <div
                                            key={official.id}
                                            className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
                                        >
                                            <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                                                {official.image_url ? (
                                                    <img
                                                        src={official.image_url}
                                                        alt={official.name}
                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center text-slate-300">
                                                        <Users className="h-16 w-16" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-4 text-center">
                                                <h3 className="text-lg font-bold text-slate-900">
                                                    {official.name}
                                                </h3>
                                                <p className="mt-1 text-sm font-medium text-blue-700">
                                                    {official.position ||
                                                        'Official'}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : barangay.officials_text ? (
                                /* Fallback for legacy text officials */
                                <div className="rounded-xl border border-slate-100 bg-white p-6 whitespace-pre-wrap text-slate-700 shadow-sm md:p-8">
                                    {barangay.officials_text}
                                </div>
                            ) : (
                                <div className="rounded-xl bg-slate-50 p-8 text-center text-slate-500">
                                    No officials listed.
                                </div>
                            )}
                        </section>
                    </div>

                    <aside className="lg:col-span-1">
                        <div className="sticky top-4 space-y-8">
                            {/* Map or Other Info could go here */}
                            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                                <h3 className="mb-4 border-b pb-2 font-bold text-slate-800">
                                    Municipality Updates
                                </h3>
                                <AnnouncementsSidebar items={announcements} />
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </LandingLayout>
    );
}
