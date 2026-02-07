import { Head, Link } from '@inertiajs/react';
import { ExternalLink } from 'lucide-react';
import { AnnouncementsSidebar } from '@/components/announcements-sidebar';
import type { AnnouncementItem } from '@/components/announcements-sidebar';
import LandingLayout from '@/layouts/landing-layout';

type ListItem = AnnouncementItem;

type AnnouncementsListPageProps = {
    title: string;
    type: string;
    items: ListItem[];
    announcements?: AnnouncementItem[];
};

/** URL path for list (e.g. /news, /updates, /announcements, /activities) */
function listPathForType(type: string): string {
    if (type === 'news') return '/news';
    if (type === 'update') return '/updates';
    if (type === 'activity') return '/activities';
    return '/announcements';
}

export default function AnnouncementsListPage({
    title,
    type,
    items,
    announcements = [],
}: AnnouncementsListPageProps) {
    const listPath = listPathForType(type);
    return (
        <LandingLayout>
            <Head title={`${title} - Municipality of Hinobaan`} />
            {/* Government-style header with banner */}
            <section className="relative h-50 border-b-4 border-amber-500/80 text-white sm:h-60">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/hinobaan-banner/banner2.png')",
                    }}
                />
                <div className="relative flex h-full flex-col justify-center px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto w-full max-w-5xl [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">
                        <nav className="mb-4 text-sm text-slate-200">
                            <Link href="/" className="hover:text-white">
                                Home
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="text-white">{title}</span>
                        </nav>
                        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            All {title}
                        </h1>
                        <p className="mt-1 text-sm text-slate-200">
                            Municipality of Hinobaan · Province of Negros
                            Occidental
                        </p>
                    </div>
                </div>
            </section>

            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 py-10 sm:py-14 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        {items.length === 0 ? (
                            <div className="border border-slate-200 bg-white px-8 py-16 text-center shadow-sm">
                                <p className="text-slate-600">
                                    No {title.toLowerCase()} at the moment.
                                </p>
                                <Link
                                    href="/"
                                    className="mt-6 inline-block text-sm font-medium text-blue-800 hover:underline"
                                >
                                    Return to Home
                                </Link>
                            </div>
                        ) : (
                            <ul className="space-y-6">
                                {items.map((a) => (
                                    <li key={a.id}>
                                        <Link
                                            href={`${listPath}/${a.id}`}
                                            className="block border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                                        >
                                            <article>
                                                {a.image_url && (
                                                    <img
                                                        src={a.image_url}
                                                        alt=""
                                                        className="mb-4 h-48 w-full rounded border border-slate-200 object-cover"
                                                    />
                                                )}
                                                <h2 className="text-xl font-semibold text-slate-900 hover:text-blue-800">
                                                    {a.title}
                                                </h2>
                                                {a.published_at && (
                                                    <time
                                                        dateTime={
                                                            a.published_at
                                                        }
                                                        className={`mt-1 block text-sm ${type === 'activity' ? 'font-semibold text-blue-800' : 'text-slate-500'}`}
                                                    >
                                                        {new Date(
                                                            a.published_at,
                                                        ).toLocaleDateString(
                                                            undefined,
                                                            {
                                                                dateStyle:
                                                                    'long',
                                                            },
                                                        )}
                                                    </time>
                                                )}
                                                <div
                                                    className="mt-3 line-clamp-3 text-slate-700 [&_a]:font-medium [&_a]:text-blue-800 [&_p]:mb-2 [&_p]:leading-relaxed"
                                                    dangerouslySetInnerHTML={{
                                                        __html: a.content,
                                                    }}
                                                />
                                                <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-blue-800">
                                                    Read full story
                                                    <ExternalLink
                                                        className="size-4"
                                                        aria-hidden
                                                    />
                                                </span>
                                            </article>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
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
