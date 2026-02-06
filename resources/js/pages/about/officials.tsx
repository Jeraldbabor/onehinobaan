import { Head, Link, usePage } from '@inertiajs/react';
import { AnnouncementsSidebar } from '@/components/announcements-sidebar';
import type { AnnouncementItem } from '@/components/announcements-sidebar';
import LandingLayout from '@/layouts/landing-layout';

type OfficialItem = {
    id: string;
    name: string;
    title: string;
    image_url: string;
};

type OfficialsSection = 'mayor' | 'vice-mayor' | 'sb-member';

type OfficialsPageProps = {
    section?: OfficialsSection | null;
    mayor?: OfficialItem | null;
    viceMayor?: OfficialItem | null;
    sbMembers?: OfficialItem[];
    announcements?: AnnouncementItem[];
};

const SECTION_CONFIG: Record<
    OfficialsSection,
    { title: string; breadcrumbLabel: string }
> = {
    mayor: { title: 'Our Mayor', breadcrumbLabel: 'Our Mayor' },
    'vice-mayor': { title: 'Vice Mayor', breadcrumbLabel: 'Vice Mayor' },
    'sb-member': { title: 'SB Members', breadcrumbLabel: 'SB Members' },
};

const INSTITUTION_LINE = 'Municipality of Hinobaan, Negros Occidental';

/** Government-style profile card for Mayor / Vice Mayor (single official, prominent). */
function OfficialProfileCard({
    item,
    roleLabel,
}: {
    item: OfficialItem;
    roleLabel: string;
}) {
    return (
        <article className="overflow-hidden border border-slate-200 bg-white shadow-md">
            <div className="border-b-4 border-blue-800 bg-slate-50 px-4 py-3">
                <p className="text-center text-xs font-bold tracking-[0.2em] text-blue-800 uppercase">
                    {roleLabel}
                </p>
                <p className="mt-0.5 text-center text-xs text-slate-600">
                    {INSTITUTION_LINE}
                </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-stretch">
                <div className="flex shrink-0 justify-center border-b border-slate-100 bg-slate-50/50 p-6 sm:min-w-[240px] sm:border-r sm:border-b-0">
                    {item.image_url ? (
                        <img
                            src={item.image_url}
                            alt=""
                            width={220}
                            height={280}
                            className="h-52 w-44 object-cover object-top shadow-sm sm:h-64 sm:w-52"
                        />
                    ) : (
                        <div className="flex h-52 w-44 items-center justify-center bg-slate-200 text-slate-500 sm:h-64 sm:w-52">
                            <span className="text-sm">No photo</span>
                        </div>
                    )}
                </div>
                <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
                    <p className="font-serif text-2xl font-semibold text-slate-900 sm:text-3xl">
                        {item.name || '—'}
                    </p>
                    {item.title && item.title !== roleLabel && (
                        <p className="mt-1 text-base text-slate-600">
                            {item.title}
                        </p>
                    )}
                    <div className="mt-4 border-t border-slate-200 pt-4">
                        <p className="text-xs tracking-wider text-slate-500 uppercase">
                            Local Government Unit
                        </p>
                        <p className="mt-0.5 text-sm text-slate-700">
                            Province of Negros Occidental · Republic of the
                            Philippines
                        </p>
                    </div>
                </div>
            </div>
        </article>
    );
}

/** Government-style card for SB members (grid). */
function OfficialCard({
    item,
    roleLabel,
}: {
    item: OfficialItem;
    roleLabel: string;
}) {
    return (
        <article className="flex flex-col border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
            <div className="border-b-2 border-blue-800 bg-blue-50/80 px-3 py-2 text-center">
                <p className="text-xs font-bold tracking-wider text-blue-800 uppercase">
                    {roleLabel}
                </p>
            </div>
            <div className="flex flex-1 flex-col items-center p-4">
                {item.image_url ? (
                    <img
                        src={item.image_url}
                        alt=""
                        width={160}
                        height={160}
                        className="h-40 w-40 object-cover object-top shadow-sm"
                    />
                ) : (
                    <div className="flex h-40 w-40 items-center justify-center bg-slate-100 text-slate-400">
                        <span className="text-xs">No photo</span>
                    </div>
                )}
                <p className="mt-4 text-center font-serif text-lg font-semibold text-slate-900">
                    {item.name || '—'}
                </p>
                {item.title && item.title !== roleLabel && (
                    <p className="mt-0.5 text-center text-sm text-slate-600">
                        {item.title}
                    </p>
                )}
            </div>
        </article>
    );
}

export default function OfficialsPage() {
    const { props: pageProps } = usePage();
    const props = pageProps as OfficialsPageProps;
    const section = props.section ?? null;
    const mayor = props.mayor ?? null;
    const viceMayor = props.viceMayor ?? null;
    const sbMembers = props.sbMembers ?? [];
    const announcements = props.announcements ?? [];

    const config = section ? SECTION_CONFIG[section] : null;
    const pageTitle = config
        ? `${config.title} - Key Officials`
        : 'Key Officials';
    const breadcrumbLabel = config ? config.breadcrumbLabel : 'Key Officials';

    const hasMayor = mayor && (mayor.image_url || mayor.name);
    const hasViceMayor = viceMayor && (viceMayor.image_url || viceMayor.name);
    const hasSbMembers = Array.isArray(sbMembers) && sbMembers.length > 0;

    const showMayor = !section || section === 'mayor';
    const showViceMayor = !section || section === 'vice-mayor';
    const showSbMembers = !section || section === 'sb-member';

    const hasAny =
        (showMayor && hasMayor) ||
        (showViceMayor && hasViceMayor) ||
        (showSbMembers && hasSbMembers);

    const sectionTitleClass =
        'border-l-4 border-blue-800 bg-white pl-4 text-base font-bold uppercase tracking-wide text-slate-800';

    return (
        <LandingLayout>
            <Head title={`${pageTitle} - Municipality of Hinobaan`} />
            {/* Government-style header with banner */}
            <header className="relative h-[200px] border-b-4 border-amber-500/80 text-white sm:h-[240px]">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/hinobaan-banner/banner2.png')",
                    }}
                />
                <div className="relative flex h-full flex-col justify-center px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto w-full max-w-5xl [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">
                        <nav
                            className="mb-4 text-sm text-slate-200"
                            aria-label="Breadcrumb"
                        >
                            <Link href="/" className="hover:text-white">
                                Home
                            </Link>
                            <span className="mx-2" aria-hidden>
                                /
                            </span>
                            <Link
                                href="/about/officials"
                                className="hover:text-white"
                            >
                                About Us
                            </Link>
                            <span className="mx-2" aria-hidden>
                                /
                            </span>
                            <Link
                                href="/about/officials"
                                className="hover:text-white"
                            >
                                Key Officials
                            </Link>
                            {section && (
                                <>
                                    <span className="mx-2" aria-hidden>
                                        /
                                    </span>
                                    <span className="text-white">
                                        {breadcrumbLabel}
                                    </span>
                                </>
                            )}
                        </nav>
                        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            {config ? config.title : 'Key Officials'}
                        </h1>
                        <p className="mt-1 text-sm text-slate-200">
                            Municipality of Hinobaan · Province of Negros
                            Occidental
                        </p>
                        <p className="mt-1 text-xs tracking-wider text-slate-300 uppercase">
                            Republic of the Philippines
                        </p>
                    </div>
                </div>
            </header>

            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 py-10 sm:py-14 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <section className="rounded-lg border border-slate-200 bg-slate-50/80 py-10 shadow-sm sm:py-14">
                            <div className="max-w-5xl space-y-12 px-2 sm:px-4">
                                {!hasAny ? (
                                    <>
                                        {section && (
                                            <h2 className={sectionTitleClass}>
                                                {config?.title ??
                                                    'Key Officials'}
                                            </h2>
                                        )}
                                        <div className="border border-slate-200 bg-white px-8 py-16 text-center shadow-sm">
                                            <p className="text-slate-600">
                                                {section
                                                    ? `${config?.title ?? 'This section'} is not yet available.`
                                                    : 'Key Officials are not yet available.'}
                                            </p>
                                            <p className="mt-2 text-sm text-slate-500">
                                                Please check back later or view
                                                other sections.
                                            </p>
                                            <div className="mt-6 flex flex-wrap justify-center gap-4">
                                                {section ? (
                                                    <>
                                                        <Link
                                                            href="/about/officials"
                                                            className="text-sm font-medium text-blue-800 hover:underline"
                                                        >
                                                            View all Key
                                                            Officials
                                                        </Link>
                                                        <Link
                                                            href="/"
                                                            className="text-sm font-medium text-blue-800 hover:underline"
                                                        >
                                                            Return to Home
                                                        </Link>
                                                    </>
                                                ) : (
                                                    <Link
                                                        href="/"
                                                        className="text-sm font-medium text-blue-800 hover:underline"
                                                    >
                                                        Return to Home
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {/* Our Mayor */}
                                        {showMayor && hasMayor && mayor && (
                                            <div>
                                                {!section && (
                                                    <h2
                                                        className={
                                                            sectionTitleClass
                                                        }
                                                    >
                                                        Our Mayor
                                                    </h2>
                                                )}
                                                <div
                                                    className={
                                                        section ? '' : 'mt-4'
                                                    }
                                                >
                                                    <OfficialProfileCard
                                                        item={mayor}
                                                        roleLabel="Municipal Mayor"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Vice Mayor */}
                                        {showViceMayor &&
                                            hasViceMayor &&
                                            viceMayor && (
                                                <div>
                                                    {!section && (
                                                        <h2
                                                            className={
                                                                sectionTitleClass
                                                            }
                                                        >
                                                            Vice Mayor
                                                        </h2>
                                                    )}
                                                    <div
                                                        className={
                                                            section
                                                                ? ''
                                                                : 'mt-4'
                                                        }
                                                    >
                                                        <OfficialProfileCard
                                                            item={viceMayor}
                                                            roleLabel="Vice Mayor"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                        {/* SB Members */}
                                        {showSbMembers && hasSbMembers && (
                                            <div>
                                                {!section && (
                                                    <h2
                                                        className={
                                                            sectionTitleClass
                                                        }
                                                    >
                                                        Sangguniang Bayan
                                                        Members
                                                    </h2>
                                                )}
                                                <div
                                                    className={`grid gap-6 ${section ? 'sm:grid-cols-1' : 'mt-4 sm:grid-cols-2 lg:grid-cols-3'}`}
                                                >
                                                    {sbMembers.map((member) => (
                                                        <OfficialCard
                                                            key={member.id}
                                                            item={member}
                                                            roleLabel="SB Member"
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {section && (
                                            <div className="mt-10 border-t-2 border-slate-200 pt-6 text-center">
                                                <Link
                                                    href="/about/officials"
                                                    className="inline-flex items-center gap-2 rounded border border-blue-800 bg-white px-4 py-2 text-sm font-medium text-blue-800 transition-colors hover:bg-blue-800 hover:text-white"
                                                >
                                                    ← View all Key Officials
                                                </Link>
                                            </div>
                                        )}
                                    </>
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
