import { Head, Link } from '@inertiajs/react';
import { ExternalLink } from 'lucide-react';
import { AnnouncementsSidebar } from '@/components/announcements-sidebar';
import type { AnnouncementItem } from '@/components/announcements-sidebar';
import LandingLayout from '@/layouts/landing-layout';

type AnnouncementShowPageProps = {
    title: string;
    listPath: string;
    item: AnnouncementItem;
    announcements?: AnnouncementItem[];
};

export default function AnnouncementShowPage({
    title,
    listPath,
    item,
    announcements = [],
}: AnnouncementShowPageProps) {
    return (
        <LandingLayout>
            <Head title={`${item.title} - ${title} · Municipality of Hinobaan`} />
            <section className="border-b-4 border-blue-800 bg-slate-800 text-white">
                <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
                    <nav className="mb-4 text-sm text-slate-300">
                        <Link href="/" className="hover:text-white">
                            Home
                        </Link>
                        <span className="mx-2">/</span>
                        <Link href={listPath} className="hover:text-white">
                            {title}
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-white line-clamp-1">{item.title}</span>
                    </nav>
                    <Link
                        href={listPath}
                        className="mb-4 inline-block text-sm text-slate-300 hover:text-white"
                    >
                        Back to {title}
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        {item.title}
                    </h1>
                    {item.published_at && (
                        <time
                            dateTime={item.published_at}
                            className="mt-1 block text-sm text-slate-300"
                        >
                            {new Date(item.published_at).toLocaleDateString(
                                undefined,
                                { dateStyle: 'long' },
                            )}
                        </time>
                    )}
                    <p className="mt-1 text-sm text-slate-300">
                        Municipality of Hinobaan · Province of Negros Occidental
                    </p>
                </div>
            </section>

            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 py-10 sm:py-14 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <article className="border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                            {item.image_url && (
                                <img
                                    src={item.image_url}
                                    alt=""
                                    className="mb-6 w-full rounded border border-slate-200 object-cover"
                                />
                            )}
                            <div
                                className="prose prose-slate max-w-none text-slate-700 [&_a]:font-medium [&_a]:text-blue-800 [&_a]:underline [&_a]:hover:text-blue-900 [&_blockquote]:border-l-4 [&_blockquote]:border-blue-800 [&_blockquote]:pl-4 [&_blockquote]:italic [&_h2]:mt-8 [&_h2]:text-xl [&_h3]:mt-6 [&_h3]:text-lg [&_p]:mb-4 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6"
                                dangerouslySetInnerHTML={{ __html: item.content }}
                            />
                            {item.link_url && (
                                <a
                                    href={item.link_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 inline-flex items-center gap-2 font-medium text-blue-800 hover:underline"
                                >
                                    Read more at source
                                    <ExternalLink className="size-4" aria-hidden />
                                </a>
                            )}
                        </article>
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
