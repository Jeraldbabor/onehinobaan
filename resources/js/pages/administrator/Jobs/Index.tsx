import { Head, Link, router } from '@inertiajs/react';
import { Briefcase, Pencil, Plus, Trash2, FileText } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Toast } from '@/components/ui/toast';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const dashboardUrl = '/dashboard';
const jobsUrl = '/dashboard/jobs';

type JobRow = {
    id: number;
    title: string;
    description: string | null;
    file_url: string | null;
    published_at: string | null;
    created_at: string;
};

type JobsIndexPageProps = {
    jobs: {
        data: JobRow[];
        links: unknown[];
    };
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboardUrl },
    { title: 'Job Opportunities', href: jobsUrl },
];

export default function JobsIndexPage({ jobs }: JobsIndexPageProps) {
    const [showToast, setShowToast] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        if (!confirm('Remove this job opportunity?')) return;
        setDeletingId(id);
        router.delete(`${jobsUrl}/${id}`, {
            onSuccess: () => setShowToast(true),
            onFinish: () => setDeletingId(null),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Job Opportunities" />
            <div className="flex flex-1 flex-col gap-6 overflow-x-auto px-4 py-6 md:px-6 lg:max-w-4xl">
                <header className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
                            Job Opportunities
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Post job openings and career opportunities.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={`${jobsUrl}/create`}>
                            <Plus className="size-4" />
                            Add Job
                        </Link>
                    </Button>
                </header>

                {jobs.data.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <Briefcase className="size-12 text-muted-foreground" />
                            <p className="mt-4 text-sm text-muted-foreground">
                                No job opportunities yet.
                            </p>
                            <Button asChild className="mt-4">
                                <Link href={`${jobsUrl}/create`}>
                                    <Plus className="size-4" />
                                    Add Job
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <ul className="space-y-3">
                        {jobs.data.map((job) => (
                            <li key={job.id}>
                                <Card>
                                    <CardHeader className="flex flex-row items-start justify-between gap-4 py-4">
                                        <div className="min-w-0 flex-1">
                                            <CardTitle className="text-base">
                                                {job.title}
                                            </CardTitle>
                                            <CardDescription className="mt-1 flex flex-wrap items-center gap-2">
                                                <span>
                                                    {job.published_at
                                                        ? new Date(
                                                            job.published_at,
                                                        ).toLocaleDateString()
                                                        : 'Draft'}
                                                </span>
                                                {job.file_url && (
                                                    <>
                                                        <span>·</span>
                                                        <a
                                                            href={job.file_url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-1 hover:underline"
                                                        >
                                                            <FileText className="size-3" />
                                                            Attachment
                                                        </a>
                                                    </>
                                                )}
                                            </CardDescription>
                                        </div>
                                        <div className="flex shrink-0 gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                asChild
                                            >
                                                <Link
                                                    href={`${jobsUrl}/${job.id}/edit`}
                                                >
                                                    <Pencil className="size-3.5" />
                                                    Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() =>
                                                    handleDelete(job.id)
                                                }
                                                disabled={deletingId === job.id}
                                            >
                                                <Trash2 className="size-3.5" />
                                                Remove
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    {job.description && (
                                        <CardContent className="border-t py-3">
                                            <p className="line-clamp-2 text-sm text-muted-foreground">
                                                {job.description}
                                            </p>
                                        </CardContent>
                                    )}
                                </Card>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Toast open={showToast} onOpenChange={setShowToast} title="Done" />
        </AppLayout>
    );
}
