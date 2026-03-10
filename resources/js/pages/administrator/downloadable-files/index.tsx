import { Head, router } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { Calendar, FileDown, Pencil, Plus, Trash2 } from 'lucide-react';
import type { FormEventHandler} from 'react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Toast } from '@/components/ui/toast';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const dashboardUrl = '/dashboard';
const downloadablesUrl = '/dashboard/downloadable-files';

type DownloadableFileRow = {
    id: number;
    title: string;
    description: string | null;
    office: string | null;
    file_name: string;
    file_size: number;
    file_type: string;
    is_active: boolean;
    file_url: string;
    created_at: string;
};

type IndexPageProps = {
    downloadableFiles: DownloadableFileRow[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboardUrl },
    { title: 'Downloadable Files', href: downloadablesUrl },
];

function formatDateTime(dateStr: string) {
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    }).format(new Date(dateStr));
}

function formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export default function DownloadableFilesIndexPage({
    downloadableFiles,
}: IndexPageProps) {
    const [showToast, setShowToast] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [formModalOpen, setFormModalOpen] = useState(false);
    const [editingFile, setEditingFile] = useState<DownloadableFileRow | null>(null);

    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        title: '',
        description: '',
        office: '',
        file: null as File | null,
        is_active: true,
    });

    const openCreateModal = () => {
        setEditingFile(null);
        reset();
        clearErrors();
        setFormModalOpen(true);
    };

    const openEditModal = (file: DownloadableFileRow) => {
        setEditingFile(file);
        setData({
            title: file.title,
            description: file.description || '',
            office: file.office || '',
            file: null, // Don't require file re-upload
            is_active: file.is_active,
        });
        clearErrors();
        setFormModalOpen(true);
    };

    const handleFormSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (editingFile) {
            put(`${downloadablesUrl}/${editingFile.id}`, {
                onSuccess: () => {
                    setFormModalOpen(false);
                    setShowToast(true);
                },
            });
        } else {
            post(downloadablesUrl, {
                onSuccess: () => {
                    setFormModalOpen(false);
                    setShowToast(true);
                },
            });
        }
    };

    const handleDelete = (id: number) => {
        if (!confirm('Remove this file? It will no longer be available for download.'))
            return;
        setDeletingId(id);
        router.delete(`${downloadablesUrl}/${id}`, {
            onSuccess: () => setShowToast(true),
            onFinish: () => setDeletingId(null),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Downloadable Files" />
            <div className="flex flex-1 flex-col gap-6 overflow-x-auto px-4 py-6 md:px-6 lg:max-w-5xl">
                <header className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
                            Downloadable Files
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage files available for public download, such as forms, reports, or policies.
                        </p>
                    </div>
                    <Button onClick={openCreateModal}>
                        <Plus className="mr-2 size-4" />
                        Upload file
                    </Button>
                </header>

                {downloadableFiles.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <FileDown className="size-12 text-muted-foreground" />
                            <p className="mt-4 text-sm text-muted-foreground">
                                No downloadable files uploaded yet.
                            </p>
                            <Button className="mt-4" onClick={openCreateModal}>
                                <Plus className="mr-2 size-4" />
                                Upload file
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {downloadableFiles.map((f) => (
                            <li key={f.id}>
                                <Card className="flex h-full flex-col">
                                    <CardHeader className="py-4">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="min-w-0 flex-1">
                                                <CardTitle className="truncate text-base" title={f.title}>
                                                    {f.title}
                                                </CardTitle>
                                                <CardDescription className="mt-1 flex flex-wrap items-center gap-2">
                                                    <span>{formatBytes(f.file_size)}</span>
                                                    <span>·</span>
                                                    <span>{f.is_active ? 'Active' : 'Hidden'}</span>
                                                    <div className="flex items-center gap-1.5 ml-1">
                                                        <Calendar className="size-3" />
                                                        <span>{formatDateTime(f.created_at)}</span>
                                                    </div>
                                                    {f.office && (
                                                        <>
                                                            <span>·</span>
                                                            <span className="text-blue-600 font-medium">{f.office}</span>
                                                        </>
                                                    )}
                                                </CardDescription>
                                            </div>
                                            <div className="flex shrink-0">
                                                <a
                                                    href={f.file_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex size-8 items-center justify-center rounded-md border text-muted-foreground hover:bg-slate-50 hover:text-foreground"
                                                    title="View file"
                                                >
                                                    <FileDown className="size-4" />
                                                </a>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex flex-1 flex-col border-t py-3">
                                        <p className="line-clamp-2 flex-1 text-sm text-muted-foreground" title={f.description || ''}>
                                            {f.description || <span className="italic opacity-50">No description</span>}
                                        </p>
                                        <div className="mt-4 flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-full"
                                                onClick={() => openEditModal(f)}
                                            >
                                                <Pencil className="mr-2 size-3.5" />
                                                Edit
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                className="w-full"
                                                onClick={() => handleDelete(f.id)}
                                                disabled={deletingId === f.id}
                                            >
                                                <Trash2 className="mr-2 size-3.5" />
                                                Remove
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <Dialog open={formModalOpen} onOpenChange={setFormModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingFile ? 'Edit File Details' : 'Upload File'}</DialogTitle>
                        <DialogDescription>
                            {editingFile ? 'Update the details for this downloadable file.' : 'Upload a new file for the public to download.'}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="e.g. Business Permit Form 2024"
                                required
                            />
                            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="office">Office / Department</Label>
                            <Input
                                id="office"
                                value={data.office}
                                onChange={(e) => setData('office', e.target.value)}
                                placeholder="e.g. Mayor's Office, MPDC, etc."
                            />
                            {errors.office && <p className="text-sm text-red-500">{errors.office}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description (Optional)</Label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('description', e.target.value)}
                                placeholder="Briefly describe what this file is for..."
                                rows={3}
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                        </div>

                        {!editingFile && (
                            <div className="space-y-2">
                                <Label htmlFor="file">File <span className="text-red-500">*</span></Label>
                                <Input
                                    id="file"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) => setData('file', e.target.files?.[0] || null)}
                                    required={!editingFile}
                                />
                                {errors.file && <p className="text-sm text-red-500">{errors.file}</p>}
                                <div className="mt-2 rounded-md bg-blue-50 p-3 text-[11px] text-blue-700 border border-blue-100 italic">
                                    <p className="font-bold mb-1 uppercase tracking-wider text-[9px]">Requirement:</p>
                                    Only **PDF files** are allowed for upload to ensure the best Interactive Viewer experience.
                                </div>
                            </div>
                        )}

                        <div className="flex items-center space-x-2 pt-2">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <Label htmlFor="is_active" className="cursor-pointer">
                                Active (visible to the public)
                            </Label>
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setFormModalOpen(false)}
                                disabled={processing}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Saving...' : 'Save File'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            <Toast open={showToast} onOpenChange={setShowToast} title="Done" />
        </AppLayout>
    );
}
