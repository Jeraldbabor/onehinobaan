import { Head, usePage } from '@inertiajs/react';
import { Download, FileText, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LandingLayout from '@/layouts/landing-layout';
import type { PageProps } from '@/types';

export default function CitizensCharter() {
    const { generalSettings } = usePage<PageProps>().props;
    const charterUrl = generalSettings?.citizens_charter_url;

    return (
        <LandingLayout>
            <Head title="Citizen's Charter - Municipality of Hinoba-an" />

            {/* Professional Banner */}
            <section className="relative h-64 border-b-4 border-amber-500/80 text-white">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('${generalSettings?.sub_page_banner_url || '/hinobaan-banner/banner2.png'}')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
                <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 py-12 sm:px-6 lg:px-8">
                    <nav className="mb-4 flex" aria-label="Breadcrumb">
                        <ol className="flex items-center space-x-2 text-sm text-slate-300">
                            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                            <li className="flex items-center space-x-2">
                                <span className="text-slate-500">/</span>
                                <span className="text-white font-medium">Citizen's Charter</span>
                            </li>
                        </ol>
                    </nav>
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Citizen's Charter
                    </h1>
                </div>
            </section>

            <div className="bg-slate-50 py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-4">
                        {/* Sidebar/Info */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-6">
                                <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
                                    <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <FileText className="size-5 text-blue-600" />
                                        Document Info
                                    </h2>
                                    <p className="text-sm text-slate-600 leading-relaxed mb-6">
                                        The Citizen's Charter is a guide on the different services provided by the Municipality of Hinoba-an, including the requirements and processing times.
                                    </p>

                                    {charterUrl ? (
                                        <div className="space-y-3">
                                            <Button asChild className="w-full bg-blue-700 hover:bg-blue-800">
                                                <a href={charterUrl} download="Citizens_Charter_Hinobaan.pdf">
                                                    <Download className="mr-2 size-4" />
                                                    Download PDF
                                                </a>
                                            </Button>
                                            <Button variant="outline" asChild className="w-full border-slate-300">
                                                <a href={charterUrl} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="mr-2 size-4" />
                                                    Open in New Tab
                                                </a>
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="rounded-lg bg-amber-50 p-4 border border-amber-200">
                                            <p className="text-xs text-amber-800 italic">
                                                The digital copy of the charter is currently being updated. Please check back later.
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="rounded-xl bg-blue-900 p-6 text-white shadow-lg overflow-hidden relative">
                                    <div className="absolute -right-4 -bottom-4 opacity-10">
                                        <FileText size={120} />
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">Need Help?</h3>
                                    <p className="text-sm text-blue-100 mb-4">
                                        For inquiries regarding municipal services, feel free to contact our office.
                                    </p>
                                    <a href="/contact" className="text-sm font-bold underline hover:text-blue-200">
                                        Contact Us &rarr;
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* PDF Viewer */}
                        <div className="lg:col-span-3">
                            <div className="rounded-2xl bg-white shadow-xl border border-slate-200 overflow-hidden h-[800px] flex flex-col">
                                <div className="bg-slate-900 p-4 flex items-center justify-between text-white">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-500 p-1.5 rounded">
                                            <FileText className="size-4" />
                                        </div>
                                        <span className="text-sm font-medium">Digital Viewer</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[10px] uppercase tracking-wider font-bold opacity-70">Interactive Mode</span>
                                    </div>
                                </div>

                                {charterUrl ? (
                                    <iframe
                                        src={`${charterUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                                        className="w-full flex-1"
                                        title="Citizen's Charter PDF"
                                    />
                                ) : (
                                    <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-slate-50">
                                        <div className="size-20 bg-slate-200 rounded-full flex items-center justify-center mb-6">
                                            <FileText className="size-10 text-slate-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">Charter Not Available</h3>
                                        <p className="text-slate-600 max-w-sm">
                                            The document is currently unavailable for online viewing. You can visit the Municipal Hall to view the physical copy.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
