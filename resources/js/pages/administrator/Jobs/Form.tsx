import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Toast } from '@/components/ui/toast';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const dashboardUrl = '/dashboard';
const jobsUrl = '/dashboard/jobs';

type JobForm = {
    id?: number;
    title: string;
    description: string | null;
    employment_type: string;
    image_url?: string | null;
    file_url?: string | null;
    published_at: string | null;
};

type FormPageProps = {
    job?: JobForm; // Made optional to handle create mode where it might be null/undefined logic in controller
};

const textareaClass =
    'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 min-h-[200px] w-full rounded-lg border bg-transparent px-3 py-2.5 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:opacity-50 md:text-sm resize-y';

export default function JobFormPage({ job }: FormPageProps) {
    const isEdit = job != null;
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: dashboardUrl },
        { title: 'Job Opportunities', href: jobsUrl },
        {
            title: isEdit ? 'Edit Job' : 'New Job',
            href: isEdit
                ? `${jobsUrl}/${job.id}/edit`
                : `${jobsUrl}/create`,
        },
    ];

    const { data, setData, post, processing, errors } = useForm({
        title: job?.title ?? '',
        description: job?.description ?? '',
        employment_type: job?.employment_type ?? 'Full-time',
        image: null as File | null,
        remove_image: false,
        file: null as File | null,
        remove_file: false,
        published_at: job?.published_at ?? '',
    });

    // Inertia useForm 'put' conflicts with http verb 'put', renamed to 'putMethod'

    const [showToast, setShowToast] = useState(false);
    const currentImageUrl = job?.image_url ?? null;
    const currentFileUrl = job?.file_url ?? null;

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const options = {
            onSuccess: () => setShowToast(true),
            forceFormData: true,
        };
        if (isEdit && job?.id) {
            // Use post with _method: PUT for file uploads if needed, but Inertia/Laravel handles this better with post + _method field if using FormData, 
            // OR we can use the router.post with `_method: 'put'` in data.
            // However, Inertia's `put` method doesn't support file uploads well strictly speaking in some versions, but let's try standard 'post' for creation.
            // For update with files, Laravel recommends POST with _method=PUT.
            // Let's use `post` for both but add `_method` for update.
            // Actually, let's use router.post

            // Workaround for file upload with PUT in Laravel/Inertia
            router.post(`${jobsUrl}/${job.id}`, {
                _method: 'put',
                ...data,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } as any, options);

        } else {
            post(jobsUrl, options);
        }
    };

    // Nvm, let's just use the form helper
    // If I use the form helper `put`, it might not send files correctly if it uses JSON.
    // The `forceFormData: true` option in `put` should work in newer Inertia versions?
    // Let's stick to the `router.post` override for updates to be safe with files.

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Edit Job' : 'New Job'} />
            <div className="flex flex-1 flex-col gap-6 overflow-x-auto px-4 py-6 md:px-6 lg:max-w-2xl">
                <header>
                    <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
                        {isEdit ? 'Edit Job' : 'New Job'}
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {isEdit
                            ? 'Update this job opportunity.'
                            : 'Post a new job opportunity.'}
                    </p>
                </header>

                <form onSubmit={onSubmit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Job Title</Label>
                                <input
                                    id="title"
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
                                    placeholder="e.g. Administrative Assistant"
                                    required
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="employment_type">Employment Type</Label>
                                <select
                                    id="employment_type"
                                    value={data.employment_type}
                                    onChange={(e) =>
                                        setData('employment_type', e.target.value)
                                    }
                                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
                                    required
                                >
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                </select>
                                <InputError message={errors.employment_type} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="image">
                                    Cover Image (Optional)
                                </Label>
                                <input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setData(
                                            'image',
                                            e.target.files?.[0] ?? null,
                                        )
                                    }
                                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none file:mr-2 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1 file:text-sm file:font-medium focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
                                />
                                {currentImageUrl && (
                                    <div className="mt-2 flex items-center gap-2">
                                        <div className="text-sm text-muted-foreground">
                                            Current image: <a href={currentImageUrl} target="_blank" className="underline">View</a>
                                        </div>
                                        {!data.image && (
                                            <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                                                <input
                                                    type="checkbox"
                                                    checked={data.remove_image}
                                                    onChange={(e) =>
                                                        setData(
                                                            'remove_image',
                                                            e.target.checked,
                                                        )
                                                    }
                                                    className="rounded border-slate-300"
                                                />
                                                Remove image
                                            </label>
                                        )}
                                    </div>
                                )}
                                <InputError message={errors.image} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="file">
                                    Attachment (PDF, DOC) - Optional
                                </Label>
                                <input
                                    id="file"
                                    type="file"
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                                    onChange={(e) =>
                                        setData(
                                            'file',
                                            e.target.files?.[0] ?? null,
                                        )
                                    }
                                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none file:mr-2 file:rounded-md file:border-0 file:bg-muted file:px-3 file:py-1 file:text-sm file:font-medium focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
                                />
                                {currentFileUrl && (
                                    <div className="mt-2 flex items-center gap-2">
                                        <div className="text-sm text-muted-foreground">
                                            Current file: <a href={currentFileUrl} target="_blank" className="underline">View</a>
                                        </div>
                                        {!data.file && (
                                            <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                                                <input
                                                    type="checkbox"
                                                    checked={data.remove_file}
                                                    onChange={(e) =>
                                                        setData(
                                                            'remove_file',
                                                            e.target.checked,
                                                        )
                                                    }
                                                    className="rounded border-slate-300"
                                                />
                                                Remove file
                                            </label>
                                        )}
                                    </div>
                                )}
                                <InputError message={errors.file} />
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
                                <Label htmlFor="description">Description (Optional)</Label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    className={textareaClass}
                                    placeholder="Job description, requirements, etc..."
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
                                    : 'Publish Job'}
                        </Button>
                        <Button type="button" variant="outline" asChild>
                            <Link href={jobsUrl}>Cancel</Link>
                        </Button>
                    </div>
                </form>
            </div>
            <Toast open={showToast} onOpenChange={setShowToast} title="Saved" />
        </AppLayout>
    );
}
