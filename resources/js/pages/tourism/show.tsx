import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, ChevronRight, MapPin } from 'lucide-react';
import { AnnouncementsSidebar } from '@/components/announcements-sidebar';
import type { AnnouncementItem } from '@/components/announcements-sidebar';
import LandingLayout from '@/layouts/landing-layout';
import type { PageProps } from '@/types';

type TourismItem = {
    id: number;
    title: string;
    description: string | null;
    address: string | null;
    email: string | null;
    contact_number: string | null;
    image_url: string | null;
    image_urls: string[];
};

type TourismShowPageProps = {
    type: string;
    title: string;
    items: TourismItem[];
    announcements?: AnnouncementItem[];
};

export default function TourismShowPage({
    type,
    title,
    items,
    announcements = [],
}: TourismShowPageProps) {
    const hasAny = items.length > 0;

    const primaryImage = (item: TourismItem) =>
        item.image_urls?.length > 0
            ? item.image_urls[0]
            : (item.image_url ?? null);

    return (
        <LandingLayout>
            <Head title={`${title} - Tourism · Municipality of Hinobaan`} />
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
                        <Link href="/" className="hover:text-white transition-colors">
                            Home
                        </Link>
                        <span className="mx-2">/</span>
                        <Link href="/tourism" className="hover:text-white transition-colors">
                            Tourism
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-white">{title}</span>
                    </nav>
                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {title}
                    </h1>
                    <p className="mt-2 text-lg text-slate-300 max-w-2xl">
                        Municipality of Hinobaan · Province of Negros Occidental
                    </p>
                </div>
            </section>

            {/* Content */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 py-10 sm:py-14 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <section className="bg-slate-50 py-10 sm:py-14">
                            <div className="max-w-5xl">
                                {hasAny ? (
                                    <>
                                        <p className="mb-8 border-l-4 border-blue-800 bg-white px-4 py-3 text-slate-700 shadow-sm">
                                            Official listing of{' '}
                                            {title.toLowerCase()} in the
                                            Municipality of Hinobaan. Select an
                                            item for full details.
                                        </p>
                                        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                            {items.map((item) => (
                                                <li key={item.id}>
                                                    <Link
                                                        href={`/tourism/${type}/${item.id}`}
                                                        className="group block border border-slate-200 bg-white text-left shadow-sm transition hover:border-blue-700 hover:shadow-md"
                                                    >
                                                        <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-100">
                                                            {primaryImage(
                                                                item,
                                                            ) ? (
                                                                <img
                                                                    src={
                                                                        primaryImage(
                                                                            item,
                                                                        )!
                                                                    }
                                                                    alt=""
                                                                    className="h-full w-full object-cover transition group-hover:opacity-95"
                                                                />
                                                            ) : (
                                                                <div className="flex h-full items-center justify-center text-slate-400">
                                                                    <MapPin className="size-12" />
                                                                </div>
                                                            )}
                                                            <div className="absolute right-2 bottom-2 flex size-8 items-center justify-center bg-blue-800 text-white">
                                                                <ChevronRight className="size-4" />
                                                            </div>
                                                            {item.image_urls
                                                                ?.length >
                                                                1 && (
                                                                    <div className="absolute bottom-2 left-2 bg-slate-800/90 px-2 py-1 text-xs font-medium text-white">
                                                                        {
                                                                            item
                                                                                .image_urls
                                                                                .length
                                                                        }{' '}
                                                                        photos
                                                                    </div>
                                                                )}
                                                        </div>
                                                        <div className="border-t border-slate-100 p-4">
                                                            <h2 className="font-semibold text-slate-900 group-hover:text-blue-800">
                                                                {item.title}
                                                            </h2>
                                                            {item.description ? (
                                                                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
                                                                    {
                                                                        item.description
                                                                    }
                                                                </p>
                                                            ) : (
                                                                <p className="mt-2 text-sm text-slate-500">
                                                                    View details
                                                                </p>
                                                            )}
                                                        </div>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                ) : (
                                    <div className="border border-slate-200 bg-white px-8 py-16 text-center shadow-sm">
                                        <MapPin className="mx-auto size-12 text-slate-300" />
                                        <p className="mt-4 text-slate-600">
                                            No {title.toLowerCase()} entries at
                                            this time.
                                        </p>
                                        <Link
                                            href="/"
                                            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-800 hover:underline"
                                        >
                                            <ArrowLeft
                                                className="size-4"
                                                aria-hidden
                                            />
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
