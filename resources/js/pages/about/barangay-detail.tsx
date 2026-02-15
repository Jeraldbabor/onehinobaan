
import { Head, Link, usePage } from '@inertiajs/react';
import { AnnouncementsSidebar } from '@/components/announcements-sidebar';
import type { AnnouncementItem } from '@/components/announcements-sidebar';
import LandingLayout from '@/layouts/landing-layout';
import type { PageProps } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

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
    const { props: pageProps } = usePage();
    const props = pageProps as unknown as BarangayDetailPageProps;
    const { barangay, announcements = [] } = props;

    const sectionTitleClass =
        'border-l-4 border-blue-800 bg-white pl-4 text-lg font-semibold text-slate-900';

    return (
        <LandingLayout>
            <Head title={`${barangay.name} - Municipality of Hinobaan`} />

            {/* Government-style header with banner */}
            <section className="relative h-64 border-b-4 border-amber-500/80 text-white sm:h-80">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('${barangay.image_url || usePage<PageProps>().props.generalSettings?.sub_page_banner_url || '/hinobaan-banner/banner2.png'}')`,
                    }}
                >
                    <div className="absolute inset-0 bg-slate-900/60" />
                </div>
                <div className="relative flex h-full flex-col justify-end pb-10 px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto w-full max-w-5xl [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">
                        <nav className="mb-4 text-sm text-slate-200">
                            <Link href="/" className="hover:text-white">
                                Home
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="text-white">About Us</span>
                            <span className="mx-2">/</span>
                            <Link href="/about/barangay" className="hover:text-white">
                                Barangay
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="text-white font-medium">{barangay.name}</span>
                        </nav>
                        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                            {barangay.name}
                        </h1>
                    </div>
                </div>
            </section>

            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 py-10 sm:py-14 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-10">
                        {/* Quick Facts */}
                        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                                <div className="p-4 rounded-lg bg-blue-50 text-blue-900">
                                    <div className="text-sm font-semibold uppercase tracking-wider text-blue-700/80 mb-1">Population</div>
                                    <div className="text-xl font-bold">{barangay.population || 'N/A'}</div>
                                </div>
                                <div className="p-4 rounded-lg bg-amber-50 text-amber-900">
                                    <div className="text-sm font-semibold uppercase tracking-wider text-amber-700/80 mb-1">Land Area</div>
                                    <div className="text-xl font-bold">{barangay.land_area || 'N/A'}</div>
                                </div>
                                <div className="p-4 rounded-lg bg-emerald-50 text-emerald-900">
                                    <div className="text-sm font-semibold uppercase tracking-wider text-emerald-700/80 mb-1">Festival</div>
                                    <div className="text-xl font-bold">{barangay.festival || 'N/A'}</div>
                                </div>
                            </div>
                        </section>

                        {/* History */}
                        <section>
                            <h2 className={`mb-6 ${sectionTitleClass}`}>History & Profile</h2>
                            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed bg-white p-6 md:p-8 rounded-xl border border-slate-100 shadow-sm">
                                {barangay.history ? (
                                    <div className="whitespace-pre-wrap">{barangay.history}</div>
                                ) : (
                                    <p className="text-slate-500 italic">No history available.</p>
                                )}
                            </div>
                        </section>

                        {/* Officials */}
                        <section>
                            <h2 className={`mb-6 ${sectionTitleClass}`}>Barangay Officials</h2>

                            {barangay.officials && barangay.officials.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {barangay.officials.map((official) => (
                                        <div key={official.id} className="group bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
                                            <div className="aspect-square w-full bg-slate-100 relative overflow-hidden">
                                                {official.image_url ? (
                                                    <img
                                                        src={official.image_url}
                                                        alt={official.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center text-slate-300">
                                                        <Users className="h-16 w-16" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-4 text-center">
                                                <h3 className="font-bold text-slate-900 text-lg">{official.name}</h3>
                                                <p className="text-blue-700 font-medium text-sm mt-1">{official.position || 'Official'}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : barangay.officials_text ? (
                                /* Fallback for legacy text officials */
                                <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-100 shadow-sm whitespace-pre-wrap text-slate-700">
                                    {barangay.officials_text}
                                </div>
                            ) : (
                                <div className="bg-slate-50 p-8 rounded-xl text-center text-slate-500">
                                    No officials listed.
                                </div>
                            )}
                        </section>
                    </div>

                    <aside className="lg:col-span-1">
                        <div className="sticky top-4 space-y-8">
                            {/* Map or Other Info could go here */}
                            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <h3 className="font-bold text-slate-800 mb-4 pb-2 border-b">Municipality Updates</h3>
                                <AnnouncementsSidebar items={announcements} />
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </LandingLayout>
    );
}
