import { Head, usePage } from '@inertiajs/react';
import { Download, FileText, ExternalLink, Calendar, Info, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LandingLayout from '@/layouts/landing-layout';
import type { PageProps } from '@/types';

type PreviewProps = {
    file: {
        id: number;
        title: string;
        description: string | null;
        office: string | null;
        file_name: string;
        file_size: number;
        file_type: string;
        file_url: string;
        created_at: string;
    };
};

function formatDateTime(dateStr: string) {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date(dateStr));
}

function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export default function DownloadPreview({ file }: PreviewProps) {
    const { generalSettings } = usePage<PageProps>().props;

    return (
        <LandingLayout>
            <Head title={`${file.title} - Preview`} />

            {/* Professional Banner */}
            <section className="relative h-64 border-b-4 border-blue-600/80 text-white">
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
                            <li>
                                <a href="/" className="transition-colors hover:text-white">Home</a>
                            </li>
                            <li className="flex items-center space-x-2">
                                <span className="text-slate-500">/</span>
                                <a href="/downloads" className="transition-colors hover:text-white">Downloads</a>
                            </li>
                            <li className="flex items-center space-x-2">
                                <span className="text-slate-500">/</span>
                                <span className="font-medium text-white truncate max-w-[200px]">
                                    {file.title}
                                </span>
                            </li>
                        </ol>
                    </nav>
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl truncate">
                        {file.title}
                    </h1>
                </div>
            </section>

            <div className="bg-slate-50 py-12 sm:py-16 min-h-[calc(100vh-256px)]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-4">
                        {/* Sidebar/Info */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-6">
                                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <h2 className="mb-6 flex items-center gap-2 text-lg font-bold text-slate-900 border-b pb-4">
                                        <Info className="size-5 text-blue-600" />
                                        Document Details
                                    </h2>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Department / Office</label>
                                            <p className="flex items-center gap-2 text-sm font-semibold text-slate-700 mt-1 uppercase">
                                                <MapPin className="size-3.5 text-blue-500" />
                                                {file.office || 'General'}
                                            </p>
                                        </div>

                                        <div>
                                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Posted On</label>
                                            <p className="flex items-center gap-2 text-sm font-medium text-slate-600 mt-1">
                                                <Calendar className="size-3.5 text-blue-500" />
                                                {formatDateTime(file.created_at)}
                                            </p>
                                        </div>

                                        <div>
                                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">File Size</label>
                                            <p className="text-sm font-medium text-slate-600 mt-1">
                                                {formatBytes(file.file_size)}
                                            </p>
                                        </div>

                                        {file.description && (
                                            <div>
                                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Description</label>
                                                <p className="text-sm leading-relaxed text-slate-600 mt-1 italic">
                                                    "{file.description}"
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-8 space-y-3 pt-6 border-t">
                                        <Button asChild className="w-full bg-blue-700 hover:bg-blue-800 h-11">
                                            <a href={`/downloads/${file.id}/file`} target="_blank">
                                                <Download className="mr-2 size-4" />
                                                Download PDF
                                            </a>
                                        </Button>
                                    </div>
                                </div>

                                <div className="relative overflow-hidden rounded-xl bg-slate-900 p-6 text-white shadow-lg border border-slate-800">
                                    <div className="absolute -right-4 -bottom-4 opacity-10">
                                        <FileText size={120} />
                                    </div>
                                    <h3 className="mb-2 text-lg font-bold">
                                        Document Assistance
                                    </h3>
                                    <p className="mb-6 text-xs text-slate-400 leading-relaxed">
                                        If you're looking for a specific form that isn't listed here, please visit the relevant department's office.
                                    </p>
                                    <Button variant="outline" asChild className="w-full border-slate-700 bg-transparent hover:bg-slate-800 hover:text-white text-xs h-9">
                                        <a href="/contact">Contact Support</a>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* PDF Viewer */}
                        <div className="lg:col-span-3">
                            <div className="flex h-[900px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                                <div className="flex items-center justify-between bg-slate-900 p-4 text-white">
                                    <div className="flex items-center gap-3">
                                        <div className="rounded bg-blue-500 p-1.5">
                                            <FileText className="size-4" />
                                        </div>
                                        <span className="text-sm font-medium">
                                            Digital Viewer
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                                        <span className="text-[10px] font-bold tracking-wider uppercase opacity-70">
                                            Interactive Mode
                                        </span>
                                    </div>
                                </div>

                                <iframe
                                    src={`${file.file_url}#toolbar=0&navpanes=0&scrollbar=0`}
                                    className="w-full flex-1"
                                    title={file.title}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
