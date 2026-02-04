import { Head, Link } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import type { SharedData } from '@/types';
import LandingLayout from '@/layouts/landing-layout';

export default function Landing() {
    const { auth } = usePage<SharedData>().props;

    return (
        <LandingLayout>
            <Head title="Municipality of Hinobaan - Official Website" />
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900/95 via-emerald-800 to-teal-900 text-white">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                            Know more about
                        </h1>
                        <p className="mt-4 text-2xl font-light italic text-emerald-100 sm:text-3xl">
                            the Municipality of Hinobaan
                        </p>
                        <p className="mt-6 max-w-xl text-lg leading-relaxed text-emerald-50/90">
                            Your gateway to local government services, transparency, and community updates. Hinobaan,
                            Negros Occidental — committed to serving our citizens.
                        </p>
                        <div className="mt-10 flex flex-wrap gap-4">
                            {auth?.user && (
                                <Link
                                    href="/dashboard"
                                    className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-emerald-800 shadow-sm transition hover:bg-emerald-50"
                                >
                                    Go to Dashboard
                                </Link>
                            )}
                            <Link
                                href="/contact"
                                className="inline-flex items-center rounded-lg border-2 border-white/80 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            {/* Quick links / features */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <h2 className="text-center text-2xl font-semibold text-neutral-800">Quick links</h2>
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        { title: 'History', desc: 'History of Hinoba-an', href: '/about/history' },
                        { title: 'Transparency', desc: 'Citizen\'s Charter, bids & awards', href: '/transparency/citizens-charter' },
                        { title: 'Services', desc: 'Permits, registry & welfare', href: '/services/business-permits' },
                        { title: 'Officials', desc: 'Local government leaders', href: '/about/officials' },
                        { title: 'Jobs', desc: 'Career opportunities', href: '/jobs' },
                    ].map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="group rounded-xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
                        >
                            <h3 className="font-semibold text-neutral-900 group-hover:text-emerald-700">{item.title}</h3>
                            <p className="mt-1 text-sm text-neutral-600">{item.desc}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </LandingLayout>
    );
}
