import { Head, Link, usePage } from '@inertiajs/react';
import {
    Download,
    FileText,
    Briefcase,
    Calendar,
    ChevronLeft,
} from 'lucide-react';
import {
    AnnouncementsSidebar,
    type AnnouncementItem,
} from '@/components/announcements-sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LandingLayout from '@/layouts/landing-layout';
import type { PageProps } from '@/types';

type Job = {
    id: number;
    title: string;
    description: string | null;
    employment_type: string;
    image_url: string | null;
    file_url: string | null;
    published_at: string | null;
};

type JobShowPageProps = {
    job: Job;
    announcements: AnnouncementItem[];
};

export default function JobShowPage({ job, announcements }: JobShowPageProps) {
    const { generalSettings } = usePage<PageProps>().props;

    return (
        <LandingLayout>
            <Head title={`${job.title} - Job Opportunities`} />

            {/* Banner Section */}
            <section className="relative h-48 w-full bg-slate-900 text-white">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
                    style={{
                        backgroundImage: `url('${generalSettings?.sub_page_banner_url || '/hinobaan-banner/banner2.png'}')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
                <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-4 py-8 sm:px-6 lg:px-8">
                    <nav className="mb-2 text-sm font-medium text-slate-300">
                        <Link
                            href="/"
                            className="transition-colors hover:text-white"
                        >
                            Home
                        </Link>
                        <span className="mx-2">/</span>
                        <Link
                            href="/jobs"
                            className="transition-colors hover:text-white"
                        >
                            Job Opportunities
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="inline-block max-w-[200px] truncate align-bottom text-white">
                            {job.title}
                        </span>
                    </nav>
                    <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
                        {job.title}
                    </h1>
                </div>
            </section>

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <Button
                            variant="ghost"
                            asChild
                            className="mb-6 -ml-4 gap-2 text-slate-600"
                        >
                            <Link href="/jobs">
                                <ChevronLeft className="size-4" />
                                Back to all jobs
                            </Link>
                        </Button>

                        <div className="space-y-8">
                            {job.image_url && (
                                <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm">
                                    <img
                                        src={job.image_url}
                                        alt={job.title}
                                        className="mx-auto h-auto max-h-[500px] w-full object-contain"
                                    />
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className="flex flex-wrap items-center gap-4 border-b border-slate-100 pb-4 text-sm text-slate-500">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="size-4" />
                                        <span>
                                            Posted on{' '}
                                            {job.published_at
                                                ? new Date(
                                                      job.published_at,
                                                  ).toLocaleDateString()
                                                : 'Recently'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Briefcase className="size-4" />
                                        <span>
                                            {job.employment_type} / Government
                                        </span>
                                    </div>
                                </div>

                                <div className="prose prose-slate prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed max-w-none">
                                    {job.description ? (
                                        <div className="text-lg whitespace-pre-line">
                                            {job.description}
                                        </div>
                                    ) : (
                                        <p className="text-slate-400 italic">
                                            No detailed description provided.
                                        </p>
                                    )}
                                </div>
                            </div>

                            <Card className="border-slate-200 bg-slate-50">
                                <CardContent className="pt-6">
                                    <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
                                        <FileText className="size-5 text-slate-600" />
                                        Application Requirements
                                    </h3>
                                    {job.file_url ? (
                                        <div className="flex flex-col items-center gap-4 sm:flex-row">
                                            <div className="flex-1 text-sm text-slate-600">
                                                Please download the official
                                                document for complete
                                                instructions and requirements.
                                            </div>
                                            <Button
                                                className="w-full gap-2 sm:w-auto"
                                                size="lg"
                                                asChild
                                            >
                                                <a
                                                    href={job.file_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    download
                                                >
                                                    <Download className="size-4" />
                                                    Download Attachment
                                                </a>
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="text-sm text-slate-500 italic">
                                            No downloadable attachment provided
                                            for this listing. Please contact the
                                            municipal office for more details.
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
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
