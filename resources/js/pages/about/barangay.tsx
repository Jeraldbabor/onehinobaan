import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import LandingLayout from '@/layouts/landing-layout';

type BarangayItem = { id: string; image_url: string };

type BarangayPageProps = {
    barangays?: BarangayItem[];
};

export default function BarangayPage() {
    const { props: pageProps } = usePage();
    const barangays = (pageProps as BarangayPageProps).barangays ?? [];
    const hasAny = barangays.length > 0;

    return (
        <LandingLayout>
            <Head title="Barangay - Municipality of Hinobaan" />
            <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900/95 via-emerald-800 to-teal-900 text-white">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                    <Link
                        href="/"
                        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-100 transition hover:text-white"
                    >
                        <ArrowLeft className="size-4" aria-hidden />
                        Back to Home
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Barangay
                    </h1>
                    <p className="mt-2 text-emerald-50/90">
                        Municipality of Hinobaan · Negros Occidental
                    </p>
                </div>
            </section>

            <section className="bg-neutral-50 py-10 sm:py-14">
                <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-14">
                    {hasAny ? (
                        <ul className="flex flex-wrap items-center justify-center gap-12">
                            {barangays.map((barangay) => (
                                <li key={barangay.id}>
                                    <img
                                        src={barangay.image_url}
                                        alt=""
                                        width={1500}
                                        height={240}
                                        className="rounded-lg object-cover shadow-md"
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="rounded-xl border border-dashed border-neutral-300 bg-white px-8 py-16 text-center">
                            <p className="text-neutral-600">
                                Barangay images are not yet available. Please
                                check back later.
                            </p>
                            <Link
                                href="/"
                                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-800"
                            >
                                <ArrowLeft className="size-4" aria-hidden />
                                Return to home
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </LandingLayout>
    );
}
