import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Toast } from '@/components/ui/toast';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const dashboardUrl = '/dashboard';
const projectsUrl = '/dashboard/projects';

type ProjectForm = {
    id?: number;
    title: string;
    description: string;
    status: string;
    link_url?: string | null;
    image_url?: string | null;
    video_url?: string | null;
    other_images_urls?: string[];
    published_at: string | null;
    created_at?: string;
};

type FormPageProps = {
    project: ProjectForm | null;
};

const textareaClass =
    'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 min-h-[200px] w-full rounded-lg border bg-transparent px-3 py-2.5 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:opacity-50 md:text-sm resize-y';

const selectClass =
    'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm';

export default function ProjectFormPage({ project }: FormPageProps) {
    const isEdit = project != null;
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboardUrl },
        { title: 'Municipal Projects', href: projectsUrl },
        {
            title: isEdit ? 'Edit project' : 'New project',
            href: isEdit
                ? `${projectsUrl}/${project.id}/edit`
                : `${projectsUrl}/create`,
        },
    ];

    const { data, setData, post, put, processing, errors } = useForm({
        title: project?.title ?? '',
        description: project?.description ?? '',
        status: project?.status ?? 'ongoing',
        link_url: project?.link_url ?? '',
        image: null as File | null,
        remove_image: false,
        video: null as File | null,
        remove_video: false,
        other_images: [] as File[],
        remove_other_images: [] as number[],
        published_at: project?.published_at ?? '',
    });

    const [showToast, setShowToast] = useState(false);
    const currentImageUrl = project?.image_url ?? null;
    const currentVideoUrl = project?.video_url ?? null;

    const previewImageUrl = useMemo(
        () => (data.image ? URL.createObjectURL(data.image) : null),
        [data.image],
    );

    const previewVideoUrl = useMemo(
        () => (data.video ? URL.createObjectURL(data.video) : null),
        [data.video],
    );

    useEffect(() => {
        return () => {
            if (previewImageUrl) URL.revokeObjectURL(previewImageUrl);
            if (previewVideoUrl) URL.revokeObjectURL(previewVideoUrl);
        };
    }, [previewImageUrl, previewVideoUrl]);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const options = {
            onSuccess: () => setShowToast(true),
            forceFormData: true,
        };
        if (isEdit && project?.id) {
            post(`${projectsUrl}/${project.id}`, {
                ...options,
                data: { ...data, _method: 'PUT' }
            } as any);
        } else {
            post(projectsUrl, options);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Edit project' : 'New project'} />
            <div className="flex flex-1 flex-col gap-6 overflow-x-auto px-4 py-6 md:px-6 lg:max-w-2xl">
                <header>
                    <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
                        {isEdit ? 'Edit project' : 'New project'}
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {isEdit
                            ? 'Update this project.'
                            : 'Add a municipal project. It will appear on the homepage.'}
                    </p>
                </header>

                <form onSubmit={onSubmit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <input
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
                                    placeholder="e.g. Construction of New Market"
                                    required
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <select
                                        id="status"
                                        value={data.status}
                                        onChange={(e) =>
                                            setData('status', e.target.value)
                                        }
                                        className={selectClass}
                                        required
                                    >
                                        <option value="ongoing">Ongoing</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                    <InputError message={errors.status} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="published_at">
                                        Publish date & time (optional)
                                    </Label>
                                    <input
                                        id="published_at"
                                        type="datetime-local"
                                        value={data.published_at}
                                        onChange={(e) =>
                                            setData('published_at', e.target.value)
                                        }
                                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
                                    />
                                    <InputError message={errors.published_at} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="link_url">
                                    Project Website/Link (optional)
                                </Label>
                                <input
                                    id="link_url"
                                    type="url"
                                    value={data.link_url}
                                    onChange={(e) =>
                                        setData('link_url', e.target.value)
                                    }
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
                                    placeholder="https://..."
                                />
                                <InputError message={errors.link_url} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="image">
                                    Main Image (optional)
                                </Label>
                                <input
                                    id="image"
                                    type="file"
                                    accept="image/jpeg,image/png,image/gif,image/webp"
                                    onChange={(e) =>
                                        setData(
                                            'image',
                                            e.target.files?.[0] ?? null,
                                        )
                                    }
                                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none file:mr-2 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1 file:text-sm file:font-medium focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
                                />
                                <p className="text-xs text-muted-foreground">
                                    JPEG, PNG, GIF or WebP. Max 5 MB.
                                </p>
                                {(currentImageUrl || previewImageUrl) && (
                                    <div className="flex flex-wrap items-start gap-3 pt-1">
                                        <img
                                            src={
                                                previewImageUrl ??
                                                currentImageUrl ??
                                                ''
                                            }
                                            alt=""
                                            className="h-24 w-auto rounded-md border border-slate-200 object-cover"
                                        />
                                        {isEdit &&
                                            currentImageUrl &&
                                            !data.image && (
                                                <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            data.remove_image
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                'remove_image',
                                                                e.target
                                                                    .checked,
                                                            )
                                                        }
                                                        className="rounded border-slate-300"
                                                    />
                                                    Remove picture
                                                </label>
                                            )}
                                    </div>
                                )}
                                <InputError message={errors.image} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="video">
                                    Project Video (optional)
                                </Label>
                                <input
                                    id="video"
                                    type="file"
                                    accept="video/mp4,video/quicktime"
                                    onChange={(e) =>
                                        setData(
                                            'video',
                                            e.target.files?.[0] ?? null,
                                        )
                                    }
                                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none file:mr-2 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1 file:text-sm file:font-medium focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
                                />
                                <p className="text-xs text-muted-foreground">
                                    MP4 or MOV. Max 40 MB.
                                </p>
                                {(currentVideoUrl || previewVideoUrl) && (
                                    <div className="space-y-2 pt-1">
                                        <video
                                            src={
                                                previewVideoUrl ??
                                                currentVideoUrl ??
                                                ''
                                            }
                                            controls
                                            className="h-40 w-auto rounded-md border border-slate-200"
                                        />
                                        {isEdit &&
                                            currentVideoUrl &&
                                            !data.video && (
                                                <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                                                    <input
                                                        type="checkbox"
                                                        checked={
                                                            data.remove_video
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                'remove_video',
                                                                e.target
                                                                    .checked,
                                                            )
                                                        }
                                                        className="rounded border-slate-300"
                                                    />
                                                    Remove video
                                                </label>
                                            )}
                                    </div>
                                )}
                                <InputError message={errors.video} />
                            </div>

                            {/* Other Pictures Section */}
                            <div className="space-y-2">
                                <Label htmlFor="other_images">
                                    Additional Images (optional)
                                </Label>
                                <input
                                    id="other_images"
                                    type="file"
                                    accept="image/jpeg,image/png,image/gif,image/webp"
                                    multiple
                                    onChange={(e) => {
                                        const files = e.target.files;
                                        if (files) {
                                            setData('other_images', [
                                                ...data.other_images,
                                                ...Array.from(files),
                                            ]);
                                        }
                                        e.target.value = '';
                                    }}
                                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none file:mr-2 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1 file:text-sm file:font-medium focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Select multiple images. Max 10 images, 5 MB
                                    each.
                                </p>

                                {project?.other_images_urls &&
                                    project.other_images_urls.length > 0 && (
                                        <div className="space-y-2 pt-1">
                                            <p className="text-xs font-medium text-muted-foreground">
                                                Existing images:
                                            </p>
                                            <div className="flex flex-wrap gap-3">
                                                {project.other_images_urls.map(
                                                    (url, index) => {
                                                        const isMarkedForRemoval =
                                                            data.remove_other_images.includes(
                                                                index,
                                                            );
                                                        return (
                                                            <div
                                                                key={url}
                                                                className="group relative"
                                                            >
                                                                <img
                                                                    src={url}
                                                                    alt=""
                                                                    className={`h-20 w-20 rounded-md border border-slate-200 object-cover transition-opacity ${isMarkedForRemoval ? 'opacity-40' : ''}`}
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        if (
                                                                            isMarkedForRemoval
                                                                        ) {
                                                                            setData(
                                                                                'remove_other_images',
                                                                                data.remove_other_images.filter(
                                                                                    (i) => i !== index,
                                                                                ),
                                                                            );
                                                                        } else {
                                                                            setData(
                                                                                'remove_other_images',
                                                                                [
                                                                                    ...data.remove_other_images,
                                                                                    index,
                                                                                ],
                                                                            );
                                                                        }
                                                                    }}
                                                                    className={`absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold shadow-sm transition-colors ${isMarkedForRemoval
                                                                        ? 'bg-green-500 text-white hover:bg-green-600'
                                                                        : 'bg-red-500 text-white hover:bg-red-600'
                                                                        }`}
                                                                >
                                                                    {isMarkedForRemoval ? '↺' : '×'}
                                                                </button>
                                                            </div>
                                                        );
                                                    },
                                                )}
                                            </div>
                                        </div>
                                    )}

                                {data.other_images.length > 0 && (
                                    <div className="space-y-2 pt-1">
                                        <p className="text-xs font-medium text-muted-foreground">
                                            New images to upload:
                                        </p>
                                        <div className="flex flex-wrap gap-3">
                                            {data.other_images.map(
                                                (file, index) => (
                                                    <div
                                                        key={`${file.name}-${index}`}
                                                        className="group relative"
                                                    >
                                                        <img
                                                            src={URL.createObjectURL(file)}
                                                            alt=""
                                                            className="h-20 w-20 rounded-md border border-slate-200 object-cover"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setData(
                                                                    'other_images',
                                                                    data.other_images.filter(
                                                                        (_, i) => i !== index,
                                                                    ),
                                                                );
                                                            }}
                                                            className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-sm hover:bg-red-600"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    </div>
                                )}
                                <InputError message={errors.other_images} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    className={textareaClass}
                                    placeholder="Write details about the project..."
                                    required
                                />
                                <InputError message={errors.description} />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex flex-wrap gap-3">
                        <Button type="submit" disabled={processing}>
                            {processing
                                ? 'Saving...'
                                : isEdit
                                    ? 'Save changes'
                                    : 'Publish project'}
                        </Button>
                        <Button type="button" variant="outline" asChild>
                            <Link href={projectsUrl}>Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
            <Toast open={showToast} onOpenChange={setShowToast} title="Saved" />
        </AppLayout>
    );
}
