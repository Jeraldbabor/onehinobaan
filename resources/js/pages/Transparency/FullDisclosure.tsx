import { Head, usePage } from '@inertiajs/react';
import LandingLayout from '@/layouts/landing-layout';
import type { PageProps } from '@/types';

export default function FullDisclosure() {
    const { generalSettings } = usePage<PageProps>().props;

    return (
        <LandingLayout>
            <Head title="Full Disclosure Policy - Municipality of Hinoba-an" />

            <div className="bg-white py-12 sm:py-16 md:py-20">
                <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
                    <div className="mb-8 md:mb-12 text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Full Disclosure Policy
                        </h1>
                        <p className="mt-4 text-lg text-slate-600">
                            Promoting transparency and accountability in local governance.
                        </p>
                    </div>

                    <div className="flex flex-col items-center justify-center space-y-8">
                        <div className="w-full max-w-4xl overflow-hidden rounded-lg shadow-lg">
                            <img
                                src={generalSettings?.full_disclosure_banner_url || '/images/full-disclosure.png'}
                                alt="Full Disclosure Policy Banner"
                                className="w-full h-auto"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    target.parentElement?.classList.add('bg-blue-900', 'p-12', 'text-white', 'text-center');
                                    if (target.parentElement) {
                                        target.parentElement.innerHTML = `
                                            <div class="flex flex-col items-center justify-center space-y-4">
                                                <h2 class="text-3xl font-bold uppercase tracking-widest">Full Disclosure Policy Portal</h2>
                                                <p class="text-xl font-medium opacity-90">Advancing Transparency, Promoting Accountability</p>
                                            </div>
                                        `;
                                    }
                                }}
                            />
                        </div>

                        <div className="max-w-2xl text-center space-y-6">
                            <p className="text-slate-700 leading-relaxed">
                                The <strong>Full Disclosure Policy (FDP)</strong> requires local government units to fully disclose particular financial transactions to keep their constituents informed of how the local budget is managed, disbursed and used.
                            </p>
                            <p className="text-slate-700 leading-relaxed">
                                To view the official financial documents and reports of the Municipality of Hinoba-an, please visit the Department of the Interior and Local Government (DILG) Full Disclosure Policy Portal.
                            </p>

                            <div className="pt-4">
                                <a
                                    href={generalSettings?.full_disclosure_url || "https://fulldisclosure.dilg.gov.ph/"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center rounded-lg bg-blue-800 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2"
                                >
                                    Visit DILG Full Disclosure Portal
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="ml-2 w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
