import { Head, Link, usePage } from '@inertiajs/react';
import { AnnouncementsSidebar } from '@/components/announcements-sidebar';
import type { AnnouncementItem } from '@/components/announcements-sidebar';
import LandingLayout from '@/layouts/landing-layout';

type BarangayItem = { id: string; image_url: string };

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
            <section className="relative h-[200px] border-b-4 border-amber-500/80 text-white sm:h-[240px]">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/hinobaan-banner/banner2.png')",
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
                                    <div className="mt-4 border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                                        <ul className="flex flex-wrap items-center justify-center gap-10">
                                            {barangays.map((barangay) => (
                                                <li key={barangay.id}>
                                                    <img
                                                        src={barangay.image_url}
                                                        alt=""
                                                        width={1500}
                                                        height={240}
                                                        className="border border-slate-200 object-cover shadow-sm"
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : (
                                    <div className="mt-4 border border-slate-200 bg-white px-8 py-16 text-center shadow-sm">
                                        <p className="text-slate-600">
                                            Barangay images are not yet
                                            available.
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
