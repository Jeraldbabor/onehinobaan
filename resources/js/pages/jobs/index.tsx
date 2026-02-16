import { Head, Link, usePage } from '@inertiajs/react';
import { Download, Briefcase, Calendar, ChevronRight } from 'lucide-react';
import {
    AnnouncementsSidebar,
    type AnnouncementItem,
} from '@/components/announcements-sidebar';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
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

type JobsIndexPageProps = {
    jobs: {
        data: Job[];
        links: unknown[];
    };
    announcements: AnnouncementItem[];
};

export default function JobsIndexPage({
    jobs,
    announcements,
}: JobsIndexPageProps) {
    const { generalSettings } = usePage<PageProps>().props;

    return (
        <LandingLayout>
            <Head title="Job Opportunities - Municipality of Hinobaan" />

            {/* Banner Section */}
            <section className="relative h-64 w-full bg-slate-900 text-white">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
                    style={{
                        backgroundImage: `url('${generalSettings?.sub_page_banner_url || '/hinobaan-banner/banner2.png'}')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
                <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
                    <nav className="mb-4 text-sm font-medium text-slate-300">
                        <Link
                            href="/"
                            className="transition-colors hover:text-white"
                        >
                            Home
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-white">Job Opportunities</span>
                    </nav>
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                        Job Opportunities
                    </h1>
                    <p className="mt-2 max-w-2xl text-lg text-slate-300">
                        Join our team and serve the people of Hinobaan. View
                        current openings and download requirements below.
                    </p>
                </div>
            </section>

            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        {jobs.data.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 py-16 text-center">
                                <div className="rounded-full bg-slate-100 p-4">
                                    <Briefcase className="size-8 text-slate-400" />
                                </div>
                                <h3 className="mt-4 text-lg font-semibold text-slate-900">
                                    No openings at the moment
                                </h3>
                                <p className="mt-2 max-w-sm text-sm text-slate-500">
                                    We don't have any active job listings right
                                    now. Please check back later for updates.
                                </p>
                                <Button
                                    asChild
                                    className="mt-6"
                                    variant="outline"
                                >
                                    <Link href="/">Return Home</Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="grid gap-6 md:grid-cols-2">
                                {jobs.data.map((job) => (
                                    <Card
                                        key={job.id}
                                        className="group flex flex-col overflow-hidden border-slate-200 transition-all hover:shadow-md"
                                    >
                                        <Link
                                            href={`/jobs/${job.id}`}
                                            className="flex flex-1 flex-col"
                                        >
                                            {job.image_url && (
                                                <div className="aspect-video w-full overflow-hidden bg-slate-100">
                                                    <img
                                                        src={job.image_url}
                                                        alt={job.title}
                                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                </div>
                                            )}
                                            <CardHeader className="px-5 pt-5 pb-3">
                                                <div className="space-y-1">
                                                    <CardTitle className="line-clamp-2 text-xl font-bold text-slate-900 transition-colors group-hover:text-primary">
                                                        {job.title}
                                                    </CardTitle>
                                                    <CardDescription className="mt-1 flex items-center gap-4 text-sm">
                                                        <div className="flex items-center gap-1.5">
                                                            <Calendar className="size-3.5" />
                                                            <span>
                                                                Posted{' '}
                                                                {job.published_at
                                                                    ? new Date(
                                                                          job.published_at,
                                                                      ).toLocaleDateString()
                                                                    : 'Recently'}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium tracking-wider text-slate-600 uppercase">
                                                            {
                                                                job.employment_type
                                                            }
                                                        </div>
                                                    </CardDescription>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="flex flex-1 flex-col gap-4 px-5 pt-0 pb-5">
                                                <div className="flex-1">
                                                    {job.description ? (
                                                        <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">
                                                            {job.description}
                                                        </p>
                                                    ) : (
                                                        <p className="text-sm text-slate-400 italic">
                                                            No description
                                                            provided.
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="mt-2 flex items-center gap-1 text-sm font-medium text-primary">
                                                    View Details
                                                    <ChevronRight className="size-4" />
                                                </div>
                                            </CardContent>
                                        </Link>
                                        {job.file_url && (
                                            <div className="px-5 pb-5">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-8 w-full gap-2 text-xs"
                                                    asChild
                                                >
                                                    <a
                                                        href={job.file_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        download
                                                        onClick={(e) =>
                                                            e.stopPropagation()
                                                        }
                                                    >
                                                        <Download className="size-3.5" />
                                                        Requirements
                                                    </a>
                                                </Button>
                                            </div>
                                        )}
                                    </Card>
                                ))}
                            </div>
                        )}
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
