import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Target, Compass } from 'lucide-react';
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
                className="max-w-none text-left text-base text-neutral-800 [&_a]:font-medium [&_a]:text-emerald-700 [&_a]:underline [&_a]:decoration-emerald-300 [&_a]:underline-offset-2 [&_a]:hover:text-emerald-800 [&_blockquote]:border-l-4 [&_blockquote]:border-emerald-200 [&_blockquote]:pl-4 [&_blockquote]:text-neutral-600 [&_blockquote]:italic [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:text-lg [&_h2]:leading-snug [&_h2]:font-semibold [&_h2]:text-neutral-900 [&_h2]:first:mt-0 [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-neutral-800 [&_p]:mb-6 [&_p]:leading-[1.65] [&_p]:text-neutral-700 [&_strong]:font-semibold [&_strong]:text-neutral-900 [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:leading-[1.6]"
                dangerouslySetInnerHTML={{ __html: text }}
            />
        );
    }
    return (
        <div className="text-base leading-[1.6] whitespace-pre-wrap text-neutral-800">
            {text}
        </div>
    );
}

export default function VisionMissionPage() {
    const { props: pageProps } = usePage();
    const vision = (pageProps as VisionMissionPageProps).vision ?? {
        content: '',
    };
    const mission = (pageProps as VisionMissionPageProps).mission ?? {
        content: '',
    };
    const vision_mission_image_url =
        (pageProps as VisionMissionPageProps).vision_mission_image_url ?? null;
    const hasVisionText = vision?.content?.trim().length > 0;
    const hasMissionText = mission?.content?.trim().length > 0;
    const hasImage = Boolean(vision_mission_image_url);
    const hasVision = hasVisionText;
    const hasMission = hasMissionText;
    const hasAny = hasImage || hasVision || hasMission;

    return (
        <LandingLayout>
            <Head title="Vision & Mission - Municipality of Hinobaan" />
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
                        Vision & Mission
                    </h1>
                    <p className="mt-2 text-emerald-50/90">
                        Municipality of Hinobaan · Negros Occidental
                    </p>
                </div>
            </section>

            <section className="bg-neutral-50 py-10 sm:py-14">
                <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-14">
                    {hasAny ? (
                        <div className="space-y-12">
                            {/* One combined photo for Vision & Mission */}
                            {hasImage && (
                                <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
                                    <div className="flex min-h-[min(60vh,600px)] items-center justify-center p-0">
                                        <img
                                            src={vision_mission_image_url!}
                                            alt="Vision & Mission"
                                            className="w-full object-contain object-center"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Vision – text only */}
                            {hasVision && (
                                <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
                                    <div className="flex items-center gap-3 border-b border-neutral-100 px-6 py-4 sm:px-10 sm:py-5">
                                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                                            <Compass
                                                className="size-5"
                                                aria-hidden
                                            />
                                        </div>
                                        <h2 className="text-xl font-semibold text-neutral-900">
                                            Vision
                                        </h2>
                                    </div>
                                    <div className="p-6 sm:p-10">
                                        {renderContent(vision.content)}
                                    </div>
                                </div>
                            )}

                            {/* Mission – text only */}
                            {hasMission && (
                                <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
                                    <div className="flex items-center gap-3 border-b border-neutral-100 px-6 py-4 sm:px-10 sm:py-5">
                                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                                            <Target
                                                className="size-5"
                                                aria-hidden
                                            />
                                        </div>
                                        <h2 className="text-xl font-semibold text-neutral-900">
                                            Mission
                                        </h2>
                                    </div>
                                    <div className="p-6 sm:p-10">
                                        {renderContent(mission.content)}
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="rounded-xl border border-dashed border-neutral-300 bg-white px-8 py-16 text-center">
                            <p className="text-neutral-600">
                                Vision and Mission content is not yet available.
                                Please check back later.
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
