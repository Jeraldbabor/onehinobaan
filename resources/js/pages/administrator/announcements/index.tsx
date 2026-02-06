import { Head, Link, router } from '@inertiajs/react';
import { ExternalLink, Megaphone, Pencil, Plus, Trash2 } from 'lucide-react';
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
const announcementsUrl = '/dashboard/announcements';

type AnnouncementRow = {
    id: number;
    title: string;
    content: string;
    link_url: string | null;
    image_url: string | null;
    type: string;
    published_at: string | null;
    created_at: string;
};

type AnnouncementsIndexPageProps = {
    announcements: AnnouncementRow[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboardUrl },
    { title: 'News & Announcements', href: announcementsUrl },
];

const typeLabel: Record<string, string> = {
    news: 'News',
    update: 'Update',
    announcement: 'Announcement',
};

export default function AnnouncementsIndexPage({
    announcements,
}: AnnouncementsIndexPageProps) {
    const [showToast, setShowToast] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleDelete = (id: number) => {
        if (!confirm('Remove this item? It will no longer appear on the site.'))
            return;
        setDeletingId(id);
        router.delete(`${announcementsUrl}/${id}`, {
            onSuccess: () => setShowToast(true),
            onFinish: () => setDeletingId(null),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="News & Announcements" />
            <div className="flex flex-1 flex-col gap-6 overflow-x-auto px-4 py-6 md:px-6 lg:max-w-4xl">
                <header className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
                            News & Announcements
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Post news, updates, and announcements. They appear
                            in the right sidebar on About and Tourism pages.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={`${announcementsUrl}/create`}>
                            <Plus className="size-4" />
                            Add post
                        </Link>
                    </Button>
                </header>

                {announcements.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <Megaphone className="size-12 text-muted-foreground" />
                            <p className="mt-4 text-sm text-muted-foreground">
                                No posts yet. Add one to show on the public
                                site.
                            </p>
                            <Button asChild className="mt-4">
                                <Link href={`${announcementsUrl}/create`}>
                                    <Plus className="size-4" />
                                    Add post
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <ul className="space-y-3">
                        {announcements.map((a) => (
                            <li key={a.id}>
                                <Card>
                                    <CardHeader className="flex flex-row items-start justify-between gap-4 py-4">
                                        <div className="min-w-0 flex-1">
                                            <CardTitle className="text-base">
                                                {a.title}
                                            </CardTitle>
                                            <CardDescription className="mt-1 flex flex-wrap items-center gap-2">
                                                <span className="capitalize">
                                                    {typeLabel[a.type] ??
                                                        a.type}
                                                </span>
                                                <span>·</span>
                                                <span>
                                                    {a.published_at
                                                        ? new Date(
                                                              a.published_at,
                                                          ).toLocaleDateString()
                                                        : 'Draft'}
                                                </span>
                                                {a.link_url && (
                                                    <>
                                                        <span>·</span>
                                                        <span className="inline-flex items-center gap-1">
                                                            <ExternalLink className="size-3" />
                                                            Link
                                                        </span>
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
                                                    href={`${announcementsUrl}/${a.id}/edit`}
                                                >
                                                    <Pencil className="size-3.5" />
                                                    Edit
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() =>
                                                    handleDelete(a.id)
                                                }
                                                disabled={deletingId === a.id}
                                            >
                                                <Trash2 className="size-3.5" />
                                                Remove
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    {a.content && (
                                        <CardContent className="border-t py-3">
                                            <p className="line-clamp-2 text-sm text-muted-foreground">
                                                {a.content
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
