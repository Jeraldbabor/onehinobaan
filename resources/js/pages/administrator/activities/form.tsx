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
const activitiesUrl = '/dashboard/activities';

type ActivityForm = {
    id?: number;
    title: string;
    content: string;
    link_url?: string | null;
    image_url?: string | null;
    published_at: string | null;
    created_at?: string;
};

type FormPageProps = {
    activity: ActivityForm | null;
};

const textareaClass =
    'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 min-h-[200px] w-full rounded-lg border bg-transparent px-3 py-2.5 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:opacity-50 md:text-sm resize-y';

export default function ActivityFormPage({ activity }: FormPageProps) {
    const isEdit = activity != null;
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboardUrl },
        { title: 'Municipality Activities', href: activitiesUrl },
        {
            title: isEdit ? 'Edit activity' : 'New activity',
            href: isEdit
                ? `${activitiesUrl}/${activity.id}/edit`
                : `${activitiesUrl}/create`,
        },
    ];

    const { data, setData, post, put, processing, errors } = useForm({
        title: activity?.title ?? '',
        content: activity?.content ?? '',
        link_url: activity?.link_url ?? '',
        image: null as File | null,
        remove_image: false,
        published_at: activity?.published_at ?? '',
    });

    const [showToast, setShowToast] = useState(false);
    const currentImageUrl = activity?.image_url ?? null;
    const previewUrl = useMemo(
        () => (data.image ? URL.createObjectURL(data.image) : null),
        [data.image],
    );

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const options = {
            onSuccess: () => setShowToast(true),
            forceFormData: true,
        };
        if (isEdit && activity?.id) {
            put(`${activitiesUrl}/${activity.id}`, options);
        } else {
            post(activitiesUrl, options);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Edit activity' : 'New activity'} />
            <div className="flex flex-1 flex-col gap-6 overflow-x-auto px-4 py-6 md:px-6 lg:max-w-2xl">
                <header>
                    <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
                        {isEdit ? 'Edit activity' : 'New activity'}
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {isEdit
                            ? 'Update this activity post.'
                            : 'Add a municipality activity. It will appear on the homepage and at /activities.'}
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
                                    placeholder="e.g. LGU leads relief distribution"
                                    required
                                />
                                <InputError message={errors.title} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="link_url">
                                    Link to source (optional)
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
                                    Picture (optional)
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
                                {(currentImageUrl || previewUrl) && (
                                    <div className="flex flex-wrap items-start gap-3 pt-1">
                                        <img
                                            src={
                                                previewUrl ??
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
                                <p className="text-xs text-muted-foreground">
                                    Leave empty to publish immediately.
                                </p>
                                <InputError message={errors.published_at} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="content">Content</Label>
                                <textarea
                                    id="content"
                                    value={data.content}
                                    onChange={(e) =>
                                        setData('content', e.target.value)
                                    }
                                    className={textareaClass}
                                    placeholder="Write the activity summary..."
                                    required
                                />
                                <InputError message={errors.content} />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex flex-wrap gap-3">
                        <Button type="submit" disabled={processing}>
                            {processing
                                ? 'Saving...'
                                : isEdit
                                  ? 'Save changes'
                                  : 'Publish activity'}
                        </Button>
                        <Button type="button" variant="outline" asChild>
                            <Link href={activitiesUrl}>Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
            <Toast open={showToast} onOpenChange={setShowToast} title="Saved" />
        </AppLayout>
    );
}
