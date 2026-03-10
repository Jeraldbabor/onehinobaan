import { Head, Link, usePage } from '@inertiajs/react';
import {
    Calendar,
    Download,
    Eye,
    FileDown,
    FileText,
    ImageIcon,
    Info,
    Search,
    Filter,
    Table,
    X,
} from 'lucide-react';
import { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import LandingLayout from '@/layouts/landing-layout';
import type { PageProps } from '@/types';

type DownloadableFileRow = {
    id: number;
    title: string;
    description: string | null;
    office: string | null;
    file_name: string;
    file_size: number;
    file_type: string;
    file_url: string;
    view_count: number;
    download_count: number;
    created_at: string;
};

type DownloadsPageProps = {
    downloadableFiles: DownloadableFileRow[];
};

function formatDateTime(dateStr: string) {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
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

export default function DownloadsIndexPage({
    downloadableFiles = [],
}: DownloadsPageProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [officeFilter, setOfficeFilter] = useState('all');

    const offices = useMemo(() => {
        const uniqueOffices = new Set(
            downloadableFiles.map((f) => f.office).filter(Boolean),
        );
        return ['all', ...Array.from(uniqueOffices).sort()];
    }, [downloadableFiles]);

    const filteredFiles = useMemo(() => {
        return downloadableFiles.filter((file) => {
            const matchesSearch =
                file.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (file.description
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ??
                    false);

            const matchesOffice =
                officeFilter === 'all' || file.office === officeFilter;

            return matchesSearch && matchesOffice;
        });
    }, [downloadableFiles, searchQuery, officeFilter]);

    const isPreviewable = (type: string) => {
        return (
            type.includes('pdf') ||
            type.includes('image') ||
            type.includes('word') ||
            type.includes('officedocument') ||
            type.includes('excel') ||
            type.includes('spreadsheet')
        );
    };

    const getFileIcon = (type: string) => {
        if (type.includes('pdf')) return <FileText className="size-6" />;
        if (type.includes('image')) return <ImageIcon className="size-6" />;
        if (type.includes('word') || type.includes('officedocument.word'))
            return <FileText className="size-6 text-blue-600" />;
        if (type.includes('excel') || type.includes('spreadsheet'))
            return <Table className="size-6 text-green-600" />;
        return <FileDown className="size-6" />;
    };

    const getIconContainerClass = (type: string) => {
        if (type.includes('pdf')) return 'bg-red-50 text-red-600';
        if (type.includes('image')) return 'bg-blue-50 text-blue-600';
        if (type.includes('word') || type.includes('officedocument.word'))
            return 'bg-blue-50 text-blue-600';
        if (type.includes('excel') || type.includes('spreadsheet'))
            return 'bg-green-50 text-green-600';
        return 'bg-slate-50 text-slate-600';
    };

    return (
        <LandingLayout>
            <Head title="Downloadable Files - Municipality of Hinobaan" />

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
                        <Link
                            href="/"
                            className="transition-colors hover:text-white"
                        >
                            Home
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-white">Downloadable Files</span>
                    </nav>
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Resources & Downloads
                    </h1>
                    <p className="mt-2 max-w-2xl text-lg text-slate-300">
                        Access official forms, documents, and reports from the
                        Municipality of Hinobaan.
                    </p>
                </div>
            </section>

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-10 flex flex-col gap-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="group flex items-center gap-2 text-2xl font-bold text-slate-900">
                                <FileText className="size-6 text-blue-600" />
                                Available Documents
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                {filteredFiles.length}{' '}
                                {filteredFiles.length === 1 ? 'file' : 'files'}{' '}
                                found
                                {officeFilter !== 'all' && (
                                    <span>
                                        {' '}
                                        in{' '}
                                        <span className="font-semibold text-slate-900 uppercase">
                                            {officeFilter}
                                        </span>
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 md:flex-row">
                        <div className="relative flex-1">
                            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                            <Input
                                placeholder="Search by title or description..."
                                className="h-11 rounded-xl border-slate-200 pl-10 focus-visible:ring-blue-600"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    <X className="size-4" />
                                </button>
                            )}
                        </div>
                        <div className="w-full md:w-64">
                            <Select
                                value={officeFilter}
                                onValueChange={setOfficeFilter}
                            >
                                <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-white text-slate-900 focus:ring-blue-600">
                                    <div className="flex items-center gap-2">
                                        <Filter className="size-4 text-slate-400" />
                                        <SelectValue placeholder="Filter by Department" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-slate-200 bg-white text-slate-900 shadow-xl">
                                    {offices.map((office) => (
                                        <SelectItem
                                            key={office}
                                            value={office ?? 'all'}
                                            className="cursor-pointer py-2.5 text-xs font-semibold tracking-wide uppercase"
                                        >
                                            {office === 'all'
                                                ? 'All Departments'
                                                : office}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {filteredFiles.length === 0 ? (
                    <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-8 py-20 text-center">
                        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                            {downloadableFiles.length === 0 ? (
                                <FileDown className="size-8" />
                            ) : (
                                <Search className="size-8" />
                            )}
                        </div>
                        <h3 className="mt-4 text-lg font-semibold text-slate-900">
                            {downloadableFiles.length === 0
                                ? 'No documents found'
                                : 'No matching results'}
                        </h3>
                        <p className="mx-auto mt-2 max-w-sm text-slate-500">
                            {downloadableFiles.length === 0
                                ? 'Access official forms and reports will be available soon. Please check back later.'
                                : `We couldn't find anything matching "${searchQuery}" ${officeFilter !== 'all' ? `in ${officeFilter}` : ''}. Try adjusting your filters.`}
                        </p>
                        {downloadableFiles.length > 0 && (
                            <Button
                                variant="outline"
                                className="mt-6 rounded-xl border-slate-300"
                                onClick={() => {
                                    setSearchQuery('');
                                    setOfficeFilter('all');
                                }}
                            >
                                Clear all filters
                            </Button>
                        )}
                        {downloadableFiles.length === 0 && (
                            <Button
                                asChild
                                variant="outline"
                                className="mt-6 rounded-xl border-slate-300"
                            >
                                <Link href="/">Return to Home</Link>
                            </Button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredFiles.map((file) => (
                            <div
                                key={file.id}
                                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5"
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div
                                            className={`flex size-12 items-center justify-center rounded-xl ${getIconContainerClass(file.file_type)}`}
                                        >
                                            {getFileIcon(file.file_type)}
                                        </div>
                                        {file.office && (
                                            <Badge
                                                variant="secondary"
                                                className="border-none bg-slate-100 font-medium text-slate-600"
                                            >
                                                {file.office}
                                            </Badge>
                                        )}
                                    </div>

                                    <h3 className="mt-4 text-xl leading-snug font-bold text-slate-900 transition-colors group-hover:text-blue-700">
                                        {file.title}
                                    </h3>

                                    {file.description && (
                                        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">
                                            {file.description}
                                        </p>
                                    )}

                                    <div className="mt-4 flex flex-col gap-1.5 border-t border-slate-100 pt-4">
                                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                                            <Calendar className="size-3.5" />
                                            <span>
                                                Posted on:{' '}
                                                {formatDateTime(
                                                    file.created_at,
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-4 rounded-lg bg-slate-50 p-3 text-center">
                                        <div className="flex flex-col border-r border-slate-200">
                                            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                                Previews
                                            </span>
                                            <span className="text-sm font-bold text-slate-700">
                                                {file.view_count}
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                                                Downloads
                                            </span>
                                            <span className="text-sm font-bold text-slate-700">
                                                {file.download_count}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-auto flex items-center gap-2 border-t border-slate-100 p-4">
                                    {isPreviewable(file.file_type) ? (
                                        <Button
                                            variant="outline"
                                            asChild
                                            className="h-10 grow gap-2 transition-all hover:bg-slate-50"
                                        >
                                            <a
                                                href={`/downloads/${file.id}/preview`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Eye className="size-4" />
                                                Preview
                                            </a>
                                        </Button>
                                    ) : (
                                        <div className="flex grow items-center gap-2 px-3 text-xs text-slate-400 italic">
                                            <Info className="size-3" />
                                            No preview
                                        </div>
                                    )}
                                    <Button
                                        asChild
                                        className="h-10 grow gap-2 bg-blue-600 font-semibold text-white transition-all hover:bg-blue-700 active:scale-[0.98]"
                                        onClick={() => {
                                            // Analytics call is handled by the redirect route
                                        }}
                                    >
                                        <a
                                            href={`/downloads/${file.id}/file`}
                                            target="_blank"
                                        >
                                            <Download className="size-4" />
                                            Download
                                            <span className="ml-1 text-[10px] font-normal opacity-60">
                                                ({formatBytes(file.file_size)})
                                            </span>
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </LandingLayout>
    );
}
