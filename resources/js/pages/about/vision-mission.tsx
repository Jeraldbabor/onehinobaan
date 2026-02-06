import { Head, Link, usePage } from '@inertiajs/react';
import { AnnouncementsSidebar } from '@/components/announcements-sidebar';
import LandingLayout from '@/layouts/landing-layout';

type VisionMissionPageProps = {
    vision?: { content: string };
    mission?: { content: string };
    vision_mission_image_url?: string | null;
};

function renderContent(content: string) {
    const hasContent = content?.trim().length > 0;
    const isHtml = hasContent && /<[a-z][\s\S]*>/i.test(content);
    const text = content ?? '';

    if (!hasContent) return null;
    if (isHtml) {
        return (
            <article
                className="max-w-none text-left text-base text-slate-700 [&_a]:font-medium [&_a]:text-blue-800 [&_a]:underline [&_a]:hover:text-blue-900 [&_blockquote]:border-l-4 [&_blockquote]:border-blue-800 [&_blockquote]:pl-4 [&_blockquote]:text-slate-600 [&_blockquote]:italic [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-slate-900 [&_h2]:first:mt-0 [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-slate-800 [&_p]:mb-6 [&_p]:leading-[1.65] [&_strong]:font-semibold [&_strong]:text-slate-900 [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:leading-[1.6]"
                dangerouslySetInnerHTML={{ __html: text }}
            />
        );
    }
    return (
        <div className="whitespace-pre-wrap text-base leading-relaxed text-slate-700">
            {text}
        </div>
    );
}

export default function VisionMissionPage() {
    const { props: pageProps } = usePage();
    const props = pageProps as VisionMissionPageProps;
    const announcements = props.announcements ?? [];
    const vision = props.vision ?? {
        content: '',
    };
    const mission = props.mission ?? { content: '' };
    const vision_mission_image_url = props.vision_mission_image_url ?? null;
    const hasVisionText = vision?.content?.trim().length > 0;
    const hasMissionText = mission?.content?.trim().length > 0;
    const hasImage = Boolean(vision_mission_image_url);
    const hasVision = hasVisionText;
    const hasMission = hasMissionText;
    const hasAny = hasImage || hasVision || hasMission;

    const sectionTitleClass =
        'border-l-4 border-blue-800 bg-white pl-4 text-lg font-semibold text-slate-900';

    return (
        <LandingLayout>
            <Head title="Vision & Mission - Municipality of Hinobaan" />
            {/* Government-style header */}
            <section className="border-b-4 border-blue-800 bg-slate-800 text-white">
                <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
                    <nav className="mb-4 text-sm text-slate-300">
                        <Link href="/" className="hover:text-white">
                            Home
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-white">About Us</span>
                        <span className="mx-2">/</span>
                        <span className="text-white">Vision & Mission</span>
                    </nav>
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        Vision & Mission
                    </h1>
                    <p className="mt-1 text-sm text-slate-300">
                        Municipality of Hinobaan · Province of Negros Occidental
                    </p>
                </div>
            </section>

            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 py-10 sm:py-14 lg:grid-cols-3">
                    <div className="lg:col-span-2">
            <section className="bg-slate-50 py-10 sm:py-14">
                <div className="max-w-5xl">
                    {hasAny ? (
                        <div className="space-y-8">
                            {hasImage && (
                                <div>
                                    <h2 className={sectionTitleClass}>
                                        Image
                                    </h2>
                                    <div className="mt-4 overflow-hidden border border-slate-200 bg-white shadow-sm">
                                        <img
                                            src={vision_mission_image_url!}
                                            alt="Vision & Mission"
                                            className="w-full object-contain"
                                        />
                                    </div>
                                </div>
                            )}

                            {hasVision && (
                                <div>
                                    <h2 className={sectionTitleClass}>Vision</h2>
                                    <div className="mt-4 border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                                        {renderContent(vision.content)}
                                    </div>
                                </div>
                            )}

                            {hasMission && (
                                <div>
                                    <h2 className={sectionTitleClass}>Mission</h2>
                                    <div className="mt-4 border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                                        {renderContent(mission.content)}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="border border-slate-200 bg-white px-8 py-16 text-center shadow-sm">
                            <p className="text-slate-600">
                                Vision and Mission content is not yet available.
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
