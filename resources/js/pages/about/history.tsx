import { Head, Link, usePage } from '@inertiajs/react';
import { AnnouncementsSidebar } from '@/components/announcements-sidebar';
import type { AnnouncementItem } from '@/components/announcements-sidebar';
import LandingLayout from '@/layouts/landing-layout';

type HistoryPageProps = {
    history?: { content: string };
    announcements?: AnnouncementItem[];
};

export default function HistoryPage() {
    const { props: pageProps } = usePage();
    const props = pageProps as HistoryPageProps;
    const history = props.history ?? { content: '' };
    const announcements = props.announcements ?? [];
    const content = history?.content ?? '';
    const hasContent = content.trim().length > 0;
    const isHtml = hasContent && /<[a-z][\s\S]*>/i.test(content);

    const sectionTitleClass =
        'border-l-4 border-blue-800 bg-white pl-4 text-lg font-semibold text-slate-900';

    return (
        <LandingLayout>
            <Head title="History - Municipality of Hinobaan" />
            {/* Government-style header with banner */}
            <section className="relative h-50 border-b-4 border-amber-500/80 text-white sm:h-60">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('${(usePage().props as any).generalSettings?.sub_page_banner_url || "/hinobaan-banner/banner2.png"}')`,
                    }}
                />
                <div className="relative flex h-full flex-col justify-center px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto w-full max-w-5xl [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">
                        <nav className="mb-4 text-sm text-slate-200">
                            <Link href="/" className="hover:text-white">
                                Home
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="text-white">About Us</span>
                            <span className="mx-2">/</span>
                            <span className="text-white">History</span>
                        </nav>
                        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            History
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
                        <section className="bg-slate-50 py-10 sm:py-14">
                            <div className="max-w-5xl">
                                <h2 className={sectionTitleClass}>Overview</h2>
                                {hasContent ? (
                                    <div className="mt-4 border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                                        {isHtml ? (
                                            <article
                                                className="max-w-none text-left text-base text-slate-700 [&_a]:font-medium [&_a]:text-blue-800 [&_a]:underline [&_a]:hover:text-blue-900 [&_blockquote]:border-l-4 [&_blockquote]:border-blue-800 [&_blockquote]:pl-4 [&_blockquote]:text-slate-600 [&_blockquote]:italic [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-slate-900 [&_h2]:first:mt-0 [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-slate-800 [&_p]:mb-6 [&_p]:leading-[1.65] [&_strong]:font-semibold [&_strong]:text-slate-900 [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:leading-[1.6]"
                                                dangerouslySetInnerHTML={{
                                                    __html: content,
                                                }}
                                            />
                                        ) : (
                                            <div className="text-base leading-relaxed whitespace-pre-wrap text-slate-700">
                                                {content}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="mt-4 border border-slate-200 bg-white px-8 py-16 text-center shadow-sm">
                                        <p className="text-slate-600">
                                            History content is not yet
                                            available.
                                        </p>
                                        <Link
                                            href="/"
                                            className="mt-6 inline-block text-sm font-medium text-blue-800 hover:underline"
                                        >
                                            Return to Home
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </section>
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
