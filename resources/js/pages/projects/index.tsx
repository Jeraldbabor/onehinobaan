import { Head, Link, usePage } from '@inertiajs/react';
import { HardHat } from 'lucide-react';
import LandingLayout from '@/layouts/landing-layout';
import type { PageProps } from '@/types';

type ProjectItem = {
    id: number;
    title: string;
    description: string;
    status: string;
    link_url: string | null;
    image_url: string | null;
    video_url: string | null;
    published_at: string | null;
};

type PaginatedProjects = {
    data: ProjectItem[];
    current_page: number;
    last_page: number;
    next_page_url: string | null;
    prev_page_url: string | null;
    links: { url: string | null; label: string; active: boolean }[];
};

type ProjectsIndexProps = {
    projects: PaginatedProjects;
};

export default function ProjectsIndex({ projects }: ProjectsIndexProps) {
    const { generalSettings } = usePage<PageProps>().props;

    return (
        <LandingLayout>
            <Head title="Municipal Projects" />

            {/* Banner */}
            <section className="relative h-64 w-full bg-slate-900 text-white">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
                    style={{
                        backgroundImage: `url('${generalSettings?.sub_page_banner_url || '/hinobaan-banner/banner2.png'}')`,
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
                        <span className="text-white">Municipal Projects</span>
                    </nav>
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Municipal Projects
                    </h1>
                    <p className="mt-2 max-w-2xl text-lg text-slate-300">
                        Municipality of Hinobaan · Province of Negros Occidental
                    </p>
                </div>
            </section>

            {/* Content */}
            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
                {projects.data.length === 0 ? (
                    <p className="text-slate-500">
                        No projects published yet. Check back later.
                    </p>
                ) : (
                    <>
                        <ul className="space-y-4 sm:space-y-6">
                            {projects.data.map((item) => (
                                <li key={item.id}>
                                    <Link
                                        href={`/projects/${item.id}`}
                                        className="group flex flex-col gap-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:shadow-md sm:flex-row sm:gap-4 sm:rounded-none"
                                    >
                                        <div className="relative h-48 w-full shrink-0 overflow-hidden bg-slate-100 sm:h-36 sm:w-52">
                                            {item.video_url ? (
                                                <video
                                                    src={item.video_url}
                                                    muted
                                                    loop
                                                    autoPlay
                                                    playsInline
                                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                                />
                                            ) : item.image_url ? (
                                                <img
                                                    src={item.image_url}
                                                    alt=""
                                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-slate-400">
                                                    <HardHat className="size-10" />
                                                </div>
                                            )}
                                            <div className="absolute top-2 left-2">
                                                <span
                                                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase shadow-sm ${
                                                        item.status ===
                                                        'completed'
                                                            ? 'bg-green-500 text-white'
                                                            : 'bg-blue-600 text-white'
                                                    }`}
                                                >
                                                    {item.status}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="min-w-0 flex-1 p-3 sm:px-0 sm:pt-2 sm:pr-2 sm:pb-0">
                                            <h2 className="text-sm leading-snug font-bold text-blue-800 uppercase group-hover:underline sm:text-base md:text-lg">
                                                {item.title}
                                            </h2>
                                            {item.published_at && (
                                                <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                                                    Updated{' '}
                                                    {new Date(
                                                        item.published_at,
                                                    ).toLocaleDateString(
                                                        undefined,
                                                        { dateStyle: 'long' },
                                                    )}
                                                </p>
                                            )}
                                            <p className="mt-2 line-clamp-2 text-sm text-slate-700">
                                                {item.description}
                                            </p>
                                            <span className="mt-1 inline-block text-xs font-medium text-blue-800 underline underline-offset-2">
                                                view project details
                                            </span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Pagination */}
                        {projects.last_page > 1 && (
                            <nav
                                className="mt-8 flex flex-wrap justify-center gap-1"
                                aria-label="Pagination"
                            >
                                {projects.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url ?? '#'}
                                        preserveScroll
                                        className={`inline-flex items-center rounded border px-3 py-1.5 text-sm font-medium transition ${
                                            link.active
                                                ? 'border-blue-800 bg-blue-800 text-white'
                                                : link.url
                                                  ? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                                                  : 'cursor-default border-slate-200 bg-white text-slate-300'
                                        }`}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ))}
                            </nav>
                        )}
                    </>
                )}
            </div>
        </LandingLayout>
    );
}
