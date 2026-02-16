import { Head, Link, usePage } from '@inertiajs/react';
import { AnnouncementsSidebar } from '@/components/announcements-sidebar';
import type { AnnouncementItem } from '@/components/announcements-sidebar';
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
                        <Link href="/" className="hover:text-white transition-colors">
                            Home
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-white">About Us</span>
                        <span className="mx-2">/</span>
                        <span className="text-white">Barangay</span>
                    </nav>
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Barangay
                    </h1>
                    <p className="mt-2 text-lg text-slate-300 max-w-2xl">
                        Municipality of Hinobaan · Province of Negros Occidental
                    </p>
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
                                                <Link
                                                    href={`/about/barangay/${barangay.id}`}
                                                    className="relative block aspect-video w-full overflow-hidden bg-slate-100"
                                                >
                                                    <img
                                                        src={barangay.image_url}
                                                        alt={barangay.name}
                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                </Link>
                                                <div className="flex flex-1 flex-col p-4">
                                                    <Link
                                                        href={`/about/barangay/${barangay.id}`}
                                                    >
                                                        <h3 className="mb-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-blue-800">
                                                            {barangay.name}
                                                        </h3>
                                                    </Link>
                                                    <div className="mb-4 space-y-1 text-sm text-slate-600">
                                                        {barangay.population && (
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-semibold text-slate-700">
                                                                    Pop:
                                                                </span>
                                                                {
                                                                    barangay.population
                                                                }
                                                            </div>
                                                        )}
                                                        {barangay.festival && (
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-semibold text-slate-700">
                                                                    Festival:
                                                                </span>
                                                                {
                                                                    barangay.festival
                                                                }
                                                            </div>
                                                        )}
                                                        {barangay.land_area && (
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-semibold text-slate-700">
                                                                    Area:
                                                                </span>
                                                                {
                                                                    barangay.land_area
                                                                }
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Optional: Show history snippet or just keep it clean */}
                                                    {barangay.history && (
                                                        <p className="mb-4 line-clamp-3 text-sm text-slate-500">
                                                            {barangay.history}
                                                        </p>
                                                    )}

                                                    <div className="mt-auto border-t border-slate-100 pt-4">
                                                        <Link
                                                            href={`/about/barangay/${barangay.id}`}
                                                            className="flex items-center gap-1 text-sm font-medium text-blue-700 hover:text-blue-900"
                                                        >
                                                            View Details &
                                                            Officials &rarr;
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
