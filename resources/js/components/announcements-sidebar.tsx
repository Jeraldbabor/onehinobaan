import { Link } from '@inertiajs/react';
import { ExternalLink, Megaphone } from 'lucide-react';

export type AnnouncementItem = {
    id: number;
    title: string;
    content: string;
    link_url: string | null;
    image_url: string | null;
    type: string;
    published_at: string | null;
};

type AnnouncementsSidebarProps = {
    items: AnnouncementItem[];
};

const typeLabel: Record<string, string> = {
    news: 'News',
    update: 'Update',
    announcement: 'Announcement',
};

const typeHref: Record<string, string> = {
    news: '/news',
    update: '/updates',
    announcement: '/announcements',
};

/** Strip HTML and truncate for preview */
function stripAndTruncate(html: string, maxLen: number): string {
    const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    return text.length <= maxLen ? text : text.slice(0, maxLen) + '…';
}

export function AnnouncementsSidebar({ items }: AnnouncementsSidebarProps) {
    return (
        <aside
            className="space-y-4"
            aria-label="News and announcements"
        >
            <div className="border-l-4 border-blue-800 bg-white px-4 py-2 shadow-sm">
                <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                    <Megaphone className="size-5 text-blue-800" aria-hidden />
                    News & Updates
                </h2>
                <nav className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-sm" aria-label="View all by type">
                    <Link
                        href="/news"
                        className="font-medium text-blue-800 hover:underline"
                    >
                        News
                    </Link>
                    <span className="text-slate-400" aria-hidden>·</span>
                    <Link
                        href="/updates"
                        className="font-medium text-blue-800 hover:underline"
                    >
                        Updates
                    </Link>
                    <span className="text-slate-400" aria-hidden>·</span>
                    <Link
                        href="/announcements"
                        className="font-medium text-blue-800 hover:underline"
                    >
                        Announcements
                    </Link>
                </nav>
            </div>
            {items.length === 0 ? (
                <div className="border border-slate-200 bg-white p-4 text-center text-sm text-slate-500 shadow-sm">
                    No news at the moment. Check back later.
                </div>
            ) : (
            <ul className="space-y-3">
                {items.map((a) => {
                    const detailUrl = `${typeHref[a.type] ?? '#'}/${a.id}`;
                    return (
                        <li key={a.id}>
                            <div className="border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                                <Link href={detailUrl} className="block">
                                    <article>
                                        {a.image_url && (
                                            <img
                                                src={a.image_url}
                                                alt=""
                                                className="mb-3 h-32 w-full rounded border border-slate-200 object-cover"
                                            />
                                        )}
                                        <div className="mb-1 text-xs font-medium uppercase tracking-wide text-blue-800">
                                            {typeLabel[a.type] ?? a.type}
                                        </div>
                                        <h3 className="font-semibold text-slate-900 hover:text-blue-800">
                                            {a.title}
                                        </h3>
                                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
                                            {stripAndTruncate(a.content, 160)}
                                        </p>
                                        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                                            {a.published_at && (
                                                <time
                                                    dateTime={a.published_at}
                                                    className="text-xs text-slate-500"
                                                >
                                                    {new Date(a.published_at).toLocaleDateString(
                                                        undefined,
                                                        { dateStyle: 'medium' },
                                                    )}
                                                </time>
                                            )}
                                            <span className="text-xs font-medium text-blue-800">
                                                View full story
                                            </span>
                                        </div>
                                    </article>
                                </Link>
                                {a.link_url && (
                                    <a
                                        href={a.link_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 flex items-center gap-1 text-xs font-medium text-blue-800 hover:underline"
                                    >
                                        Read more at source
                                        <ExternalLink className="size-3.5 shrink-0" aria-hidden />
                                    </a>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
            )}
        </aside>
    );
}
