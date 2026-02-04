import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import LandingLayout from '@/layouts/landing-layout';

type HistoryPageProps = {
    history: {
        content: string;
    };
};

export default function HistoryPage({ history }: HistoryPageProps) {
    const hasContent = history?.content?.trim().length > 0;
    const content = history?.content ?? '';
    const isHtml = hasContent && /<[a-z][\s\S]*>/i.test(content);

    return (
        <LandingLayout>
            <Head title="History - Municipality of Hinobaan" />
            {/* Hero – matches landing branding */}
            <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900/95 via-emerald-800 to-teal-900 text-white">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
                    <Link
                        href="/"
                        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-100 transition hover:text-white"
                    >
                        <ArrowLeft className="size-4" aria-hidden />
                        Back to Home
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        History
                    </h1>
                    <p className="mt-2 text-emerald-50/90">
                        Municipality of Hinobaan · Negros Occidental
                    </p>
                </div>
            </section>

            {/* Content – wide column, readable spacing */}
            <section className="bg-neutral-50 py-10 sm:py-14">
                <div className="mx-auto w-full max-w-[78%] px-6 sm:px-10 lg:px-14">
                    {hasContent ? (
                        <div className="rounded-xl border border-neutral-200 bg-white px-6 py-8 shadow-sm sm:px-10 sm:py-10">
                            {isHtml ? (
                                <article
                                    className="history-content max-w-none text-left text-base text-neutral-800 [&_a]:font-medium [&_a]:text-emerald-700 [&_a]:underline [&_a]:decoration-emerald-300 [&_a]:underline-offset-2 [&_a]:hover:text-emerald-800 [&_blockquote]:border-l-4 [&_blockquote]:border-emerald-200 [&_blockquote]:pl-4 [&_blockquote]:text-neutral-600 [&_blockquote]:italic [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:text-lg [&_h2]:leading-snug [&_h2]:font-semibold [&_h2]:text-neutral-900 [&_h2]:first:mt-0 [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-neutral-800 [&_p]:mb-6 [&_p]:leading-[1.65] [&_p]:text-neutral-700 [&_strong]:font-semibold [&_strong]:text-neutral-900 [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:leading-[1.6]"
                                    dangerouslySetInnerHTML={{
                                        __html: content,
                                    }}
                                />
                            ) : (
                                <div className="text-base leading-[1.6] whitespace-pre-wrap text-neutral-800">
                                    {content}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="rounded-xl border border-dashed border-neutral-300 bg-white px-8 py-16 text-center">
                            <p className="text-neutral-600">
                                History content is not yet available. Please
                                check back later.
                            </p>
                            <Link
                                href="/"
                                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-800"
                            >
                                <ArrowLeft className="size-4" aria-hidden />
                                Return to home
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </LandingLayout>
    );
}
