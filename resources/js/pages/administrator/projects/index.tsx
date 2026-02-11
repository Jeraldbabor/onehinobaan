import { Head, Link, router } from '@inertiajs/react';
import { HardHat, Pencil, Plus, Trash2 } from 'lucide-react';
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
const projectsUrl = '/dashboard/projects';

type ProjectRow = {
    id: number;
    title: string;
    description: string;
    status: string;
    link_url: string | null;
    image_url: string | null;
    published_at: string | null;
    created_at: string;
};

type ProjectsIndexPageProps = {
    projects: ProjectRow[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboardUrl },
    { title: 'Municipal Projects', href: projectsUrl },
];

export default function ProjectsIndexPage({
    projects,
}: ProjectsIndexPageProps) {
    const [showToast, setShowToast] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        if (
            !confirm(
                'Remove this project? It will no longer appear on the site.',
            )
        )
            return;
        setDeletingId(id);
        router.delete(`${projectsUrl}/${id}`, {
            onSuccess: () => setShowToast(true),
            onFinish: () => setDeletingId(null),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Municipal Projects" />
            <div className="flex flex-1 flex-col gap-6 overflow-x-auto px-4 py-6 md:px-6 lg:max-w-4xl">
                <header className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
                            Municipal Projects
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage infrastructure and development projects. They appear on the homepage.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={`${projectsUrl}/create`}>
                            <Plus className="size-4" />
                            Add project
                        </Link>
                    </Button>
                </header>

                {projects.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <HardHat className="size-12 text-muted-foreground" />
                            <p className="mt-4 text-sm text-muted-foreground">
                                No projects yet. Add one to show on the homepage.
                            </p>
                            <Button asChild className="mt-4">
                                <Link href={`${projectsUrl}/create`}>
                                    <Plus className="size-4" />
                                    Add project
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <ul className="space-y-3">
                        {projects.map((p) => (
                            <li key={p.id}>
                                <Card>
                                    <CardHeader className="flex flex-row items-start justify-between gap-4 py-4">
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2">
                                                <CardTitle className="text-base">
                                                    {p.title}
                                                </CardTitle>
                                                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${p.status === 'completed'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {p.status}
                                                </span>
                                            </div>
                                            <CardDescription className="mt-1 flex flex-wrap items-center gap-2">
                                                <span>
                                                    {p.published_at
                                                        ? new Date(
                                                            p.published_at,
                                                        ).toLocaleDateString()
                                                        : 'Draft'}
                                                </span>
                                                {p.link_url && (
                                                    <>
                                                        <span>·</span>
                                                        <span>Has link</span>
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
                                                    href={`${projectsUrl}/${p.id}/edit`}
                                                >
                                                    <Pencil className="size-3.5" />
                                                    Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() =>
                                                    handleDelete(p.id)
                                                }
                                                disabled={deletingId === p.id}
                                            >
                                                <Trash2 className="size-3.5" />
                                                Remove
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    {p.description && (
                                        <CardContent className="border-t py-3">
                                            <p className="line-clamp-2 text-sm text-muted-foreground">
                                                {p.description
                                                    .replace(/<[^>]*>/g, ' ')
                                                    .trim()}
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
