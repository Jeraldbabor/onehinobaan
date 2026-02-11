import { Head, router, useForm, usePage } from '@inertiajs/react';
import { ImagePlus, Landmark, Trash2, UserPlus, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Toast } from '@/components/ui/toast';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import type { BreadcrumbItem } from '@/types';

const dashboardUrl = '/dashboard';
const officialsIndexUrl = '/dashboard/officials';
const mayorUpdateUrl = '/dashboard/officials/mayor';
const viceMayorUpdateUrl = '/dashboard/officials/vice-mayor';
const sbMembersStoreUrl = '/dashboard/officials/sb-members';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboardUrl },
    { title: 'Edit Key Officials', href: officialsIndexUrl },
];

type OfficialItem = {
    id: string;
    name: string;
    title: string;
    detail: string;
    image_url: string;
};

type OfficialsEditPageProps = {
    mayor?: OfficialItem | null;
    viceMayor?: OfficialItem | null;
    sbMembers?: (OfficialItem & { display_order?: number })[];
};

export default function OfficialsEditPage({
    mayor: mayorProp,
    viceMayor: viceMayorProp,
    sbMembers: sbMembersProp,
}: OfficialsEditPageProps) {
    const mayor = mayorProp ?? null;
    const viceMayor = viceMayorProp ?? null;
    const sbMembers = Array.isArray(sbMembersProp) ? sbMembersProp : [];
    const [showToast, setShowToast] = useState(false);
    const [editingSbId, setEditingSbId] = useState<string | null>(null);
    // Local preview URLs so preview works even if form doesn't preserve File refs
    const [mayorPreviewUrl, setMayorPreviewUrl] = useState<string | null>(null);
    const [viceMayorPreviewUrl, setViceMayorPreviewUrl] = useState<
        string | null
    >(null);
    const [addSbPreviewUrl, setAddSbPreviewUrl] = useState<string | null>(null);
    const [mayorSaving, setMayorSaving] = useState(false);
    const [viceMayorSaving, setViceMayorSaving] = useState(false);

    const { errors: pageErrors } = usePage().props as {
        errors?: Record<string, string | string[]>;
    };
    const getError = (key: string) => {
        const v = pageErrors?.[key];
        return Array.isArray(v) ? v[0] : v;
    };

    const mayorForm = useForm({
        name: mayor?.name ?? '',
        title: mayor?.title ?? 'Municipal Mayor',
        detail: mayor?.detail ?? '',
        image: null as File | null,
    });
    const viceMayorForm = useForm({
        name: viceMayor?.name ?? '',
        title: viceMayor?.title ?? 'Vice Mayor',
        detail: viceMayor?.detail ?? '',
        image: null as File | null,
    });
    const addSbForm = useForm({
        name: '',
        title: 'SB Member',
        detail: '',
        image: null as File | null,
    });

    // Revoke object URLs on unmount or when clearing
    useEffect(() => {
        return () => {
            if (mayorPreviewUrl) URL.revokeObjectURL(mayorPreviewUrl);
            if (viceMayorPreviewUrl) URL.revokeObjectURL(viceMayorPreviewUrl);
            if (addSbPreviewUrl) URL.revokeObjectURL(addSbPreviewUrl);
        };
    }, [mayorPreviewUrl, viceMayorPreviewUrl, addSbPreviewUrl]);

    const mayorPreview = mayorPreviewUrl ?? mayor?.image_url ?? null;
    const viceMayorPreview =
        viceMayorPreviewUrl ?? viceMayor?.image_url ?? null;
    const addSbPreview = addSbPreviewUrl;

    const handleRemoveSb = (id: string) => {
        if (confirm('Remove this SB Member?')) {
            router.delete(`${officialsIndexUrl}/sb-members/${id}`, {
                onSuccess: () => setShowToast(true),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Key Officials" />
            <h1 className="sr-only">Edit Key Officials</h1>
            <div className="flex flex-1 flex-col gap-6 overflow-x-auto px-4 py-6 md:px-6 lg:max-w-5xl">
                <header className="space-y-1">
                    <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                        Key Officials
                    </h2>
                    <p className="max-w-2xl text-sm text-muted-foreground">
                        Edit the Municipal Mayor, Vice Mayor, and Sangguniang
                        Bayan members. Each can have a name, title, and photo.
                    </p>
                </header>

                {/* Mayor */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Landmark className="size-4" aria-hidden />
                            </span>
                            <CardTitle className="text-base">
                                Our Mayor
                            </CardTitle>
                        </div>
                        <CardDescription>
                            Name, title, and photo for the Municipal Mayor.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                setMayorSaving(true);
                                router.post(
                                    mayorUpdateUrl,
                                    {
                                        _method: 'PUT',
                                        name: mayorForm.data.name,
                                        title: mayorForm.data.title,
                                        detail: mayorForm.data.detail,
                                        image: mayorForm.data.image,
                                    },
                                    {
                                        forceFormData: true,
                                        preserveScroll: true,
                                        onSuccess: () => {
                                            mayorForm.setData('image', null);
                                            if (mayorPreviewUrl)
                                                URL.revokeObjectURL(
                                                    mayorPreviewUrl,
                                                );
                                            setMayorPreviewUrl(null);
                                            setShowToast(true);
                                        },
                                        onFinish: () => setMayorSaving(false),
                                    },
                                );
                            }}
                            className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6"
                        >
                            <div className="flex min-w-0 flex-1 flex-col gap-4 sm:max-w-xs">
                                <div className="space-y-2">
                                    <Label htmlFor="mayor_name">Name</Label>
                                    <Input
                                        id="mayor_name"
                                        value={mayorForm.data.name}
                                        onChange={(e) =>
                                            mayorForm.setData(
                                                'name',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Full name"
                                        className="w-full"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="mayor_title">Title</Label>
                                    <Input
                                        id="mayor_title"
                                        value={mayorForm.data.title}
                                        onChange={(e) =>
                                            mayorForm.setData(
                                                'title',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="e.g. Municipal Mayor"
                                        className="w-full"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="mayor_detail">
                                        Detail (optional)
                                    </Label>
                                    <textarea
                                        id="mayor_detail"
                                        value={mayorForm.data.detail}
                                        onChange={(e) =>
                                            mayorForm.setData(
                                                'detail',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Brief background or description..."
                                        rows={3}
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="mayor_image">Photo</Label>
                                    <label
                                        htmlFor="mayor_image"
                                        className={cn(
                                            'flex min-h-30 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/30 text-center transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 hover:border-muted-foreground/40 hover:bg-muted/50',
                                            mayorPreviewUrl
                                                ? 'border-muted-foreground/25 p-1'
                                                : 'border-muted-foreground/25 px-4 py-6',
                                        )}
                                    >
                                        <input
                                            id="mayor_image"
                                            type="file"
                                            accept="image/jpeg,image/png,image/gif,image/webp"
                                            className="sr-only"
                                            onChange={(e) => {
                                                const file =
                                                    e.target.files?.[0] ?? null;
                                                mayorForm.setData(
                                                    'image',
                                                    file,
                                                );
                                                if (mayorPreviewUrl)
                                                    URL.revokeObjectURL(
                                                        mayorPreviewUrl,
                                                    );
                                                setMayorPreviewUrl(
                                                    file
                                                        ? URL.createObjectURL(
                                                              file,
                                                          )
                                                        : null,
                                                );
                                            }}
                                        />
                                        {mayorPreviewUrl ? (
                                            <img
                                                src={mayorPreviewUrl}
                                                alt="Preview"
                                                className="max-h-28 w-full rounded-md object-contain"
                                            />
                                        ) : (
                                            <>
                                                <ImagePlus className="mb-1 size-6 text-muted-foreground" />
                                                <span className="text-xs text-muted-foreground">
                                                    Choose image (optional)
                                                </span>
                                            </>
                                        )}
                                    </label>
                                </div>
                            </div>
                            <div className="flex flex-col items-start gap-2">
                                {(mayorPreview || mayor?.image_url) && (
                                    <img
                                        src={
                                            mayorPreview ??
                                            mayor?.image_url ??
                                            ''
                                        }
                                        alt=""
                                        className="h-32 w-32 rounded-lg border bg-muted object-cover shadow-sm"
                                    />
                                )}
                                <Button type="submit" disabled={mayorSaving}>
                                    {mayorSaving ? 'Saving...' : 'Save Mayor'}
                                </Button>
                            </div>
                        </form>
                        <InputError
                            message={
                                mayorForm.errors.image ?? getError('image')
                            }
                        />
                    </CardContent>
                </Card>

                {/* Vice Mayor */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Users className="size-4" aria-hidden />
                            </span>
                            <CardTitle className="text-base">
                                Vice Mayor
                            </CardTitle>
                        </div>
                        <CardDescription>
                            Name, title, and photo for the Vice Mayor.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                setViceMayorSaving(true);
                                router.post(
                                    viceMayorUpdateUrl,
                                    {
                                        _method: 'PUT',
                                        name: viceMayorForm.data.name,
                                        title: viceMayorForm.data.title,
                                        detail: viceMayorForm.data.detail,
                                        image: viceMayorForm.data.image,
                                    },
                                    {
                                        forceFormData: true,
                                        preserveScroll: true,
                                        onSuccess: () => {
                                            viceMayorForm.setData(
                                                'image',
                                                null,
                                            );
                                            if (viceMayorPreviewUrl)
                                                URL.revokeObjectURL(
                                                    viceMayorPreviewUrl,
                                                );
                                            setViceMayorPreviewUrl(null);
                                            setShowToast(true);
                                        },
                                        onFinish: () =>
                                            setViceMayorSaving(false),
                                    },
                                );
                            }}
                            className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6"
                        >
                            <div className="flex min-w-0 flex-1 flex-col gap-4 sm:max-w-xs">
                                <div className="space-y-2">
                                    <Label htmlFor="vice_mayor_name">
                                        Name
                                    </Label>
                                    <Input
                                        id="vice_mayor_name"
                                        value={viceMayorForm.data.name}
                                        onChange={(e) =>
                                            viceMayorForm.setData(
                                                'name',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Full name"
                                        className="w-full"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="vice_mayor_title">
                                        Title
                                    </Label>
                                    <Input
                                        id="vice_mayor_title"
                                        value={viceMayorForm.data.title}
                                        onChange={(e) =>
                                            viceMayorForm.setData(
                                                'title',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="e.g. Vice Mayor"
                                        className="w-full"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="vice_mayor_detail">
                                        Detail (optional)
                                    </Label>
                                    <textarea
                                        id="vice_mayor_detail"
                                        value={viceMayorForm.data.detail}
                                        onChange={(e) =>
                                            viceMayorForm.setData(
                                                'detail',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Brief background or description..."
                                        rows={3}
                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="vice_mayor_image">
                                        Photo
                                    </Label>
                                    <label
                                        htmlFor="vice_mayor_image"
                                        className={cn(
                                            'flex min-h-30 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/30 text-center transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 hover:border-muted-foreground/40 hover:bg-muted/50',
                                            viceMayorPreviewUrl
                                                ? 'border-muted-foreground/25 p-1'
                                                : 'border-muted-foreground/25 px-4 py-6',
                                        )}
                                    >
                                        <input
                                            id="vice_mayor_image"
                                            type="file"
                                            accept="image/jpeg,image/png,image/gif,image/webp"
                                            className="sr-only"
                                            onChange={(e) => {
                                                const file =
                                                    e.target.files?.[0] ?? null;
                                                viceMayorForm.setData(
                                                    'image',
                                                    file,
                                                );
                                                if (viceMayorPreviewUrl)
                                                    URL.revokeObjectURL(
                                                        viceMayorPreviewUrl,
                                                    );
                                                setViceMayorPreviewUrl(
                                                    file
                                                        ? URL.createObjectURL(
                                                              file,
                                                          )
                                                        : null,
                                                );
                                            }}
                                        />
                                        {viceMayorPreviewUrl ? (
                                            <img
                                                src={viceMayorPreviewUrl}
                                                alt="Preview"
                                                className="max-h-28 w-full rounded-md object-contain"
                                            />
                                        ) : (
                                            <>
                                                <ImagePlus className="mb-1 size-6 text-muted-foreground" />
                                                <span className="text-xs text-muted-foreground">
                                                    Choose image (optional)
                                                </span>
                                            </>
                                        )}
                                    </label>
                                </div>
                            </div>
                            <div className="flex flex-col items-start gap-2">
                                {(viceMayorPreview || viceMayor?.image_url) && (
                                    <img
                                        src={
                                            viceMayorPreview ??
                                            viceMayor?.image_url ??
                                            ''
                                        }
                                        alt=""
                                        className="h-32 w-32 rounded-lg border bg-muted object-cover shadow-sm"
                                    />
                                )}
                                <Button
                                    type="submit"
                                    disabled={viceMayorSaving}
                                >
                                    {viceMayorSaving
                                        ? 'Saving...'
                                        : 'Save Vice Mayor'}
                                </Button>
                            </div>
                        </form>
                        <InputError
                            message={
                                viceMayorForm.errors.image ?? getError('image')
                            }
                        />
                    </CardContent>
                </Card>

                {/* SB Members */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                            <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                                <UserPlus className="size-4" aria-hidden />
                            </span>
                            <CardTitle className="text-base">
                                SB Members
                            </CardTitle>
                        </div>
                        <CardDescription>
                            Add or edit Sangguniang Bayan members. Each needs a
                            name and photo.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Add new SB member */}
                        <div className="rounded-lg border border-dashed p-4">
                            <p className="mb-3 text-sm font-medium">
                                Add SB Member
                            </p>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    if (!addSbForm.data.image) return;
                                    addSbForm.post(sbMembersStoreUrl, {
                                        forceFormData: true,
                                        onSuccess: () => {
                                            addSbForm.reset();
                                            if (addSbPreviewUrl)
                                                URL.revokeObjectURL(
                                                    addSbPreviewUrl,
                                                );
                                            setAddSbPreviewUrl(null);
                                            setShowToast(true);
                                        },
                                    });
                                }}
                                className="flex flex-col gap-4 sm:flex-row sm:items-end"
                            >
                                <div className="flex flex-1 flex-wrap gap-3 sm:flex-nowrap">
                                    <div className="min-w-0 flex-1 space-y-1">
                                        <Label
                                            htmlFor="sb_name"
                                            className="text-xs"
                                        >
                                            Name
                                        </Label>
                                        <Input
                                            id="sb_name"
                                            value={addSbForm.data.name}
                                            onChange={(e) =>
                                                addSbForm.setData(
                                                    'name',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Full name"
                                            className="h-9"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1 space-y-1">
                                        <Label
                                            htmlFor="sb_title"
                                            className="text-xs"
                                        >
                                            Title
                                        </Label>
                                        <Input
                                            id="sb_title"
                                            value={addSbForm.data.title}
                                            onChange={(e) =>
                                                addSbForm.setData(
                                                    'title',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="SB Member"
                                            className="h-9"
                                        />
                                    </div>
                                    <div className="min-w-0 flex-1 space-y-1">
                                        <Label
                                            htmlFor="sb_detail"
                                            className="text-xs"
                                        >
                                            Detail (optional)
                                        </Label>
                                        <Input
                                            id="sb_detail"
                                            value={addSbForm.data.detail}
                                            onChange={(e) =>
                                                addSbForm.setData(
                                                    'detail',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Brief description..."
                                            className="h-9"
                                        />
                                    </div>
                                    <div className="flex items-end gap-2">
                                        <label className="flex h-9 cursor-pointer items-center rounded-md border border-input bg-background px-3 py-1 text-sm">
                                            <input
                                                type="file"
                                                accept="image/jpeg,image/png,image/gif,image/webp"
                                                className="sr-only"
                                                onChange={(e) => {
                                                    const file =
                                                        e.target.files?.[0] ??
                                                        null;
                                                    addSbForm.setData(
                                                        'image',
                                                        file,
                                                    );
                                                    if (addSbPreviewUrl)
                                                        URL.revokeObjectURL(
                                                            addSbPreviewUrl,
                                                        );
                                                    setAddSbPreviewUrl(
                                                        file
                                                            ? URL.createObjectURL(
                                                                  file,
                                                              )
                                                            : null,
                                                    );
                                                }}
                                            />
                                            {addSbForm.data.image
                                                ? (addSbForm.data.image as File)
                                                      .name
                                                : 'Photo *'}
                                        </label>
                                        <Button
                                            type="submit"
                                            size="sm"
                                            disabled={
                                                addSbForm.processing ||
                                                !addSbForm.data.image
                                            }
                                        >
                                            {addSbForm.processing
                                                ? 'Adding...'
                                                : 'Add'}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                            {addSbPreview && (
                                <img
                                    src={addSbPreview}
                                    alt=""
                                    className="mt-2 h-20 w-20 rounded border object-cover"
                                />
                            )}
                            <InputError message={addSbForm.errors.image} />
                        </div>

                        {/* List of SB members */}
                        <div>
                            <p className="mb-3 text-sm font-medium">
                                Current SB Members ({sbMembers.length})
                            </p>
                            {sbMembers.length === 0 ? (
                                <div className="rounded-lg border border-dashed bg-muted/20 py-8 text-center text-sm text-muted-foreground">
                                    No SB members yet. Add one above.
                                </div>
                            ) : (
                                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {sbMembers.map((member) => (
                                        <SbMemberCard
                                            key={member.id}
                                            member={member}
                                            isEditing={
                                                editingSbId === member.id
                                            }
                                            onStartEdit={() =>
                                                setEditingSbId(member.id)
                                            }
                                            onCancelEdit={() =>
                                                setEditingSbId(null)
                                            }
                                            onSaved={() => {
                                                setEditingSbId(null);
                                                setShowToast(true);
                                            }}
                                            onRemove={() =>
                                                handleRemoveSb(member.id)
                                            }
                                        />
                                    ))}
                                </ul>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Toast open={showToast} onOpenChange={setShowToast} title="Saved" />
        </AppLayout>
    );
}

function SbMemberCard({
    member,
    isEditing,
    onStartEdit,
    onCancelEdit,
    onSaved,
    onRemove,
}: {
    member: OfficialItem & { display_order?: number };
    isEditing: boolean;
    onStartEdit: () => void;
    onCancelEdit: () => void;
    onSaved: () => void;
    onRemove: () => void;
}) {
    const updateUrl = `${officialsIndexUrl}/sb-members/${member.id}`;
    const [editPreviewUrl, setEditPreviewUrl] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const form = useForm({
        name: member.name,
        title: member.title,
        detail: member.detail ?? '',
        image: null as File | null,
    });
    const preview = editPreviewUrl ?? member.image_url ?? '';

    if (isEditing) {
        return (
            <li className="rounded-lg border bg-card p-4 shadow-sm">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        setSaving(true);
                        router.post(
                            updateUrl,
                            {
                                _method: 'PUT',
                                name: form.data.name,
                                title: form.data.title,
                                detail: form.data.detail,
                                image: form.data.image,
                            },
                            {
                                forceFormData: true,
                                preserveScroll: true,
                                onSuccess: () => {
                                    if (editPreviewUrl)
                                        URL.revokeObjectURL(editPreviewUrl);
                                    setEditPreviewUrl(null);
                                    onSaved();
                                },
                                onFinish: () => setSaving(false),
                            },
                        );
                    }}
                    className="space-y-3"
                >
                    <div className="space-y-1">
                        <Label className="text-xs">Name</Label>
                        <Input
                            value={form.data.name}
                            onChange={(e) =>
                                form.setData('name', e.target.value)
                            }
                            placeholder="Full name"
                            className="h-9"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">Title</Label>
                        <Input
                            value={form.data.title}
                            onChange={(e) =>
                                form.setData('title', e.target.value)
                            }
                            className="h-9"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-xs">Detail (optional)</Label>
                        <Input
                            value={form.data.detail}
                            onChange={(e) =>
                                form.setData('detail', e.target.value)
                            }
                            placeholder="Brief description..."
                            className="h-9"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="flex cursor-pointer items-center rounded border bg-muted/50 px-2 py-1 text-xs">
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/gif,image/webp"
                                className="sr-only"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] ?? null;
                                    form.setData('image', file);
                                    if (editPreviewUrl)
                                        URL.revokeObjectURL(editPreviewUrl);
                                    setEditPreviewUrl(
                                        file ? URL.createObjectURL(file) : null,
                                    );
                                }}
                            />
                            New photo (optional)
                        </label>
                        {preview && (
                            <img
                                src={preview}
                                alt=""
                                className="h-14 w-14 rounded object-cover"
                            />
                        )}
                    </div>
                    <div className="flex gap-2">
                        <Button type="submit" size="sm" disabled={saving}>
                            {saving ? 'Saving...' : 'Save'}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                if (editPreviewUrl)
                                    URL.revokeObjectURL(editPreviewUrl);
                                setEditPreviewUrl(null);
                                onCancelEdit();
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </li>
        );
    }

    return (
        <li className="group relative flex gap-3 rounded-lg border bg-card p-3 shadow-sm">
            {member.image_url ? (
                <img
                    src={member.image_url}
                    alt=""
                    className="h-20 w-20 shrink-0 rounded-lg object-cover"
                />
            ) : (
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    <Users className="size-8" />
                </div>
            )}
            <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground">
                    {member.name || 'Unnamed'}
                </p>
                <p className="text-xs text-muted-foreground">
                    {member.title || 'SB Member'}
                </p>
                {member.detail && (
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                        {member.detail}
                    </p>
                )}
                <div className="mt-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={onStartEdit}
                    >
                        Edit
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="h-7 gap-1 text-xs"
                        onClick={onRemove}
                    >
                        <Trash2 className="size-3" />
                        Remove
                    </Button>
                </div>
            </div>
        </li>
    );
}
