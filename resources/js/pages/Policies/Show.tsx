import { Head, Link, usePage } from '@inertiajs/react';
import { AnnouncementsSidebar } from '@/components/announcements-sidebar';
import type { AnnouncementItem } from '@/components/announcements-sidebar';
import LandingLayout from '@/layouts/landing-layout';
import type { PageProps } from '@/types';

type PolicyPageProps = {
    title: string;
    content: string;
    announcements?: AnnouncementItem[];
};

export default function PolicyShow() {
    const {
        title,
        content,
        announcements = [],
    } = usePage<PageProps & PolicyPageProps>().props;
    const hasContent = content.trim().length > 0;
    const isHtml = hasContent && /<[a-z][\s\S]*>/i.test(content);

    const sectionTitleClass =
        'border-l-4 border-blue-800 bg-white pl-4 text-lg font-semibold text-slate-900';

    return (
        <LandingLayout>
            <Head title={`${title} - Municipality of Hinobaan`} />
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
                        <span className="text-white">Legal & Privacy</span>
                        <span className="mx-2">/</span>
                        <span className="text-white">{title}</span>
                    </nav>
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {title}
                    </h1>
                    <p className="mt-2 max-w-2xl text-lg text-slate-300">
                        Municipality of Hinobaan · Province of Negros Occidental
                    </p>
                </div>
            </section>

            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 py-10 sm:py-14 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <section className="bg-slate-50 py-10 sm:py-14">
                            <div className="max-w-5xl">
                                <h2 className={sectionTitleClass}>Details</h2>
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
                                            {title} content is not yet
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
