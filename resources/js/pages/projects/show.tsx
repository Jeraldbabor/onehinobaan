import { Head, Link, usePage } from '@inertiajs/react';
import { HardHat, ArrowLeft, ExternalLink, Calendar, CheckCircle2, Circle } from 'lucide-react';
import LandingLayout from '@/layouts/landing-layout';
import { ProjectGallery } from '@/components/project-gallery';
import { useState } from 'react';
import { PageProps } from '@/types';

type Project = {
    // ... same as before
    id: number;
    title: string;
    description: string;
    status: string;
    link_url: string | null;
    image_url: string | null;
    video_url: string | null;
    other_images_urls: string[];
    published_at: string | null;
};

type ProjectShowProps = {
    project: Project;
};

export default function ProjectShow({ project }: ProjectShowProps) {
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [galleryIndex, setGalleryIndex] = useState(0);

    const { generalSettings } = usePage<PageProps>().props;

    // Combine main image and other images for a single gallery experience
    const allImages = [
        ...(project.image_url ? [project.image_url] : []),
        ...project.other_images_urls
    ];

    const openGallery = (index: number) => {
        setGalleryIndex(index);
        setGalleryOpen(true);
    };

    return (
        <LandingLayout>
            <Head title={project.title} />

            {/* Government-style header with banner */}
            <section className="relative h-50 border-b-4 border-amber-500/80 text-white sm:h-60">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('${generalSettings?.sub_page_banner_url || '/hinobaan-banner/banner2.png'}')`,
                    }}
                />
                <div className="relative flex h-full flex-col justify-center px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto w-full max-w-5xl [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">
                        <nav className="mb-4 text-sm text-slate-200">
                            <Link href="/" className="hover:text-white">
                                Home
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="text-white">Municipal Projects</span>
                            <span className="mx-2">/</span>
                            <span className="text-white truncate max-w-[200px] inline-block align-bottom">{project.title}</span>
                        </nav>
                        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                            {project.title}
                        </h1>
                        <p className="mt-1 text-sm text-slate-200">
                            Municipality of Hinobaan · Municipal Projects
                        </p>
                    </div>
                </div>
            </section>

            <div className="bg-slate-50 py-12 min-h-screen">
                <div className="mx-auto max-w-5xl px-4 md:px-6">
                    {/* Replaced old back button with breadcrumbs in banner */}

                    <div className="grid gap-8 lg:grid-cols-3">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Media Display */}
                            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                                {project.video_url ? (
                                    <video
                                        src={project.video_url}
                                        controls
                                        className="w-full h-auto aspect-video object-cover"
                                    />
                                ) : project.image_url ? (
                                    <div className="relative group cursor-pointer" onClick={() => openGallery(0)}>
                                        <img
                                            src={project.image_url}
                                            alt={project.title}
                                            className="w-full h-auto aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white text-sm font-medium border border-white/30 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                                Click to enlarge
                                            </span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex aspect-video items-center justify-center bg-slate-100 text-slate-400">
                                        <HardHat className="size-24 opacity-20" />
                                    </div>
                                )}
                            </div>

                            {/* Info */}
                            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm ring-1 ring-slate-200">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${project.status === 'completed'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-blue-100 text-blue-700'
                                        }`}>
                                        {project.status === 'completed' ? (
                                            <CheckCircle2 className="size-3.5" />
                                        ) : (
                                            <Circle className="size-3.5" />
                                        )}
                                        {project.status}
                                    </span>
                                    {project.published_at && (
                                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
                                            <Calendar className="size-3.5" />
                                            {new Date(project.published_at).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    )}
                                </div>

                                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-6">
                                    {project.title}
                                </h1>

                                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
                                    {project.description}
                                </div>
                            </div>

                            {/* Gallery Section */}
                            {project.other_images_urls.length > 0 && (
                                <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                        Project Gallery
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                        {project.other_images_urls.map((url, idx) => (
                                            <button
                                                key={idx}
                                                type="button"
                                                onClick={() => openGallery(project.image_url ? idx + 1 : idx)}
                                                className="aspect-video overflow-hidden rounded-xl ring-1 ring-slate-200 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                            >
                                                <img
                                                    src={url}
                                                    alt={`Gallery image ${idx + 1}`}
                                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Unified Lightbox */}
                            {allImages.length > 0 && (
                                <ProjectGallery
                                    images={allImages}
                                    alt={project.title}
                                    isOpen={galleryOpen}
                                    initialIndex={galleryIndex}
                                    onClose={() => setGalleryOpen(false)}
                                    className="hidden" // We only use this instance for the lightbox
                                />
                            )}
                        </div>

                        {/* Sidebar / Actions */}
                        <div className="space-y-6">
                            {project.link_url && (
                                <div className="bg-white rounded-2xl p-6 shadow-sm ring-1 ring-slate-200">
                                    <h4 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">
                                        External Resources
                                    </h4>
                                    <a
                                        href={project.link_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700 shadow-md"
                                    >
                                        <span>Visit Project Site</span>
                                        <ExternalLink className="size-4" />
                                    </a>
                                </div>
                            )}

                            <div className="bg-blue-900 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
                                <div className="relative z-10">
                                    <HardHat className="size-8 mb-4 text-blue-300" />
                                    <h4 className="text-lg font-bold mb-2">Municipal Projects</h4>
                                    <p className="text-sm text-blue-100 mb-4">
                                        Transforming our town through sustainable infrastructure and community-driven initiatives.
                                    </p>
                                    <Link
                                        href="/"
                                        className="text-xs font-bold text-blue-300 hover:text-white transition uppercase tracking-widest"
                                    >
                                        View more projects
                                    </Link>
                                </div>
                                <div className="absolute -right-4 -bottom-4 opacity-10">
                                    <HardHat className="size-32" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
