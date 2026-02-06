import { Transition } from '@headlessui/react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import {
    Check,
    ImagePlus,
    Pencil,
    Trash2,
    X,
    type LucideIcon,
} from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
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
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Toast } from '@/components/ui/toast';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

export type TourismItemImageRow = {
    id: number;
    image_url: string;
};

export type TourismItemRow = {
    id: number;
    title: string;
    description: string | null;
    address: string | null;
    email: string | null;
    contact_number: string | null;
    social_media_url: string | null;
    map_embed_url: string | null;
    map_latitude: number | null;
    map_longitude: number | null;
    image_url: string | null;
    image_urls: TourismItemImageRow[];
    order_column: number;
};

const textareaClass =
    'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 min-h-[120px] w-full rounded-lg border bg-transparent px-3 py-2.5 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:opacity-50 md:text-sm resize-y';

type TourismItemEditorProps = {
    pageTitle: string;
    pageDescription: string;
    breadcrumbs: BreadcrumbItem[];
    headTitle: string;
    baseUrl: string;
    items: TourismItemRow[];
    emptyMessage: string;
    addTitle: string;
    addDescription: string;
    Icon: LucideIcon;
    currentLabel: string;
    /** When 'attraction' or 'resort', the optional social media URL field is shown. */
    type?: 'attraction' | 'resort' | 'festival';
};

export function TourismItemEditor({
    pageTitle,
    pageDescription,
    breadcrumbs,
    headTitle,
    baseUrl,
    items,
    emptyMessage,
    addTitle,
    addDescription,
    Icon,
    currentLabel,
    type: editorType,
}: TourismItemEditorProps) {
    const showSocialMedia =
        editorType === 'attraction' || editorType === 'resort';
    const rawErrors = (usePage().props.errors as Record<string, string | string[]> | undefined) ?? {};
    const pageErrors = Object.fromEntries(
        Object.entries(rawErrors).map(([k, v]) => [
            k,
            Array.isArray(v) ? v[0] : v,
        ]),
    ) as Record<string, string>;
    const addForm = useForm({
        title: '',
        description: '',
        address: '',
        email: '',
        contact_number: '',
        social_media_url: '',
        map_embed_url: '',
        map_latitude: '',
        map_longitude: '',
        images: [] as File[],
    });
    const editForm = useForm({
        title: '',
        description: '',
        address: '',
        email: '',
        contact_number: '',
        social_media_url: '',
        map_embed_url: '',
        map_latitude: '',
        map_longitude: '',
        images: [] as File[],
    });
    const [showAddToast, setShowAddToast] = useState(false);
    const [showEditToast, setShowEditToast] = useState(false);
    const [editItem, setEditItem] = useState<TourismItemRow | null>(null);
    const [editOpen, setEditOpen] = useState(false);

    const openEdit = (item: TourismItemRow) => {
        editForm.setData({
            title: item.title,
            description: item.description ?? '',
            address: item.address ?? '',
            email: item.email ?? '',
            contact_number: item.contact_number ?? '',
            social_media_url: item.social_media_url ?? '',
            map_embed_url: item.map_embed_url ?? '',
            map_latitude: item.map_latitude != null ? String(item.map_latitude) : '',
            map_longitude: item.map_longitude != null ? String(item.map_longitude) : '',
            images: [],
        });
        setEditItem(item);
        setEditOpen(true);
    };

    const closeEdit = () => {
        setEditOpen(false);
        setEditItem(null);
        editForm.reset();
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (addForm.data.images.length === 0) return;
        const formData = new FormData();
        formData.set('title', addForm.data.title);
        formData.set('description', addForm.data.description);
        formData.set('address', addForm.data.address);
        formData.set('email', addForm.data.email);
        formData.set('contact_number', addForm.data.contact_number);
        formData.set('social_media_url', addForm.data.social_media_url);
        formData.set('map_embed_url', addForm.data.map_embed_url);
        if (addForm.data.map_latitude) formData.set('map_latitude', addForm.data.map_latitude);
        if (addForm.data.map_longitude) formData.set('map_longitude', addForm.data.map_longitude);
        addForm.data.images.forEach((file) => formData.append('images[]', file));
        router.post(baseUrl, formData, {
            forceFormData: true,
            onSuccess: () => {
                addForm.reset();
                setShowAddToast(true);
            },
        });
    };

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editItem == null) return;
        const hasNewImages = editForm.data.images.length > 0;
        if (hasNewImages) {
            const formData = new FormData();
            formData.set('title', editForm.data.title);
            formData.set('description', editForm.data.description);
            formData.set('address', editForm.data.address);
            formData.set('email', editForm.data.email);
            formData.set('contact_number', editForm.data.contact_number);
            formData.set('social_media_url', editForm.data.social_media_url);
            formData.set('map_embed_url', editForm.data.map_embed_url);
            if (editForm.data.map_latitude) formData.set('map_latitude', editForm.data.map_latitude);
            if (editForm.data.map_longitude) formData.set('map_longitude', editForm.data.map_longitude);
            formData.set('_method', 'PUT');
            editForm.data.images.forEach((file) =>
                formData.append('images[]', file),
            );
            router.post(`${baseUrl}/${editItem.id}`, formData, {
                forceFormData: true,
                onSuccess: () => {
                    closeEdit();
                    setShowEditToast(true);
                },
            });
        } else {
            editForm.transform((data) => ({
                ...data,
                _method: 'PUT',
            }));
            editForm.post(`${baseUrl}/${editItem.id}`, {
                forceFormData: true,
                onSuccess: () => {
                    closeEdit();
                    setShowEditToast(true);
                },
            });
        }
    };

    const handleDelete = (id: number) => {
        if (!confirm(`Remove this ${currentLabel.toLowerCase()}?`)) return;
        router.delete(`${baseUrl}/${id}`);
    };

    const handleRemoveImage = (imageId: number) => {
        if (!confirm('Remove this image?')) return;
        // Remove from UI immediately (optimistic update)
        setEditItem((prev) =>
            prev
                ? {
                      ...prev,
                      image_urls: prev.image_urls.filter(
                          (img) => img.id !== imageId,
                      ),
                  }
                : null,
        );
        router.delete(`${baseUrl}/images/${imageId}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={headTitle} />
            <h1 className="sr-only">{pageTitle}</h1>
            <div className="flex flex-1 flex-col gap-6 overflow-x-auto px-4 py-6 md:px-6 lg:max-w-5xl">
                <header className="space-y-1">
                    <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                        {pageTitle}
                    </h2>
                    <p className="max-w-2xl text-sm text-muted-foreground">
                        {pageDescription}
                    </p>
                </header>

                {/* Add new */}
                <Card className="border-dashed">
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                            <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                                <ImagePlus className="size-4" aria-hidden />
                            </span>
                            <CardTitle className="text-base">{addTitle}</CardTitle>
                        </div>
                        <CardDescription>{addDescription}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <form onSubmit={handleAdd} className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="add-title">Title</Label>
                                    <input
                                        id="add-title"
                                        type="text"
                                        value={addForm.data.title}
                                        onChange={(e) =>
                                            addForm.setData(
                                                'title',
                                                e.target.value,
                                            )
                                        }
                                        className="border-input focus-visible:ring-ring/50 flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:ring-[3px] md:text-sm"
                                        placeholder="e.g. Beach View Point"
                                        required
                                    />
                                    <InputError
                                        message={
                                            addForm.errors.title ??
                                            pageErrors.title
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="add-images">
                                        Images (1, 2, or more)
                                    </Label>
                                    <div className="flex flex-col gap-2">
                                        <label
                                            htmlFor="add-images"
                                            className="flex cursor-pointer items-center gap-2 rounded-md border border-input px-3 py-2 text-sm transition-colors hover:bg-muted/50"
                                        >
                                            <ImagePlus className="size-4" />
                                            Choose 1 or more files
                                            <input
                                                id="add-images"
                                                type="file"
                                                accept="image/jpeg,image/png,image/gif,image/webp"
                                                className="sr-only"
                                                multiple
                                                onChange={(e) => {
                                                    const fileList = e.target.files;
                                                    const newFiles = fileList
                                                        ? Array.from(fileList)
                                                        : [];
                                                    addForm.setData('images', [
                                                        ...addForm.data.images,
                                                        ...newFiles,
                                                    ]);
                                                    e.target.value = '';
                                                }}
                                            />
                                        </label>
                                        {addForm.data.images.length > 0 && (
                                            <>
                                                <p className="text-xs text-muted-foreground">
                                                    {addForm.data.images.length}{' '}
                                                    image(s) selected
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {addForm.data.images.map(
                                                        (file, i) => {
                                                            const url =
                                                                file instanceof
                                                                File
                                                                    ? URL.createObjectURL(
                                                                          file,
                                                                      )
                                                                    : null;
                                                            return (
                                                                <div
                                                                    key={`add-${i}-${file.name}`}
                                                                    className="relative"
                                                                >
                                                                    {url ? (
                                                                        <img
                                                                            src={url}
                                                                            alt={`Preview ${i + 1}`}
                                                                            className="h-20 w-20 rounded-md border object-cover"
                                                                        />
                                                                    ) : (
                                                                        <div className="flex h-20 w-20 items-center justify-center rounded-md border bg-muted text-xs text-muted-foreground">
                                                                            {file.name}
                                                                        </div>
                                                                    )}
                                                                    <button
                                                                        type="button"
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            e.stopPropagation();
                                                                            addForm.setData(
                                                                                'images',
                                                                                addForm.data.images.filter(
                                                                                    (_, idx) =>
                                                                                        idx !== i,
                                                                                ),
                                                                            );
                                                                        }}
                                                                        className="absolute -top-1 -right-1 z-10 flex size-6 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-destructive text-white shadow-md transition-transform hover:scale-110 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring"
                                                                        aria-label="Remove from selection"
                                                                    >
                                                                        <X className="size-3.5 shrink-0 stroke-[2.5]" />
                                                                    </button>
                                                                </div>
                                                            );
                                                        },
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                    <InputError
                                        message={
                                            (addForm.errors.images as string) ??
                                            pageErrors.images
                                        }
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="add-description">
                                    Description or Story (optional)
                                </Label>
                                <textarea
                                    id="add-description"
                                    value={addForm.data.description}
                                    onChange={(e) =>
                                        addForm.setData(
                                            'description',
                                            e.target.value,
                                        )
                                    }
                                    className={textareaClass}
                                    placeholder="Short description..."
                                    rows={3}
                                />
                                <InputError
                                    message={
                                        addForm.errors.description ??
                                        pageErrors.description
                                    }
                                />
                            </div>
                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="space-y-2">
                                    <Label htmlFor="add-address">
                                        Address (optional)
                                    </Label>
                                    <input
                                        id="add-address"
                                        type="text"
                                        value={addForm.data.address}
                                        onChange={(e) =>
                                            addForm.setData(
                                                'address',
                                                e.target.value,
                                            )
                                        }
                                        className="border-input focus-visible:ring-ring/50 flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:ring-[3px] md:text-sm"
                                        placeholder="e.g. Brgy. Alimodian"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="add-email">
                                        Email (optional)
                                    </Label>
                                    <input
                                        id="add-email"
                                        type="email"
                                        value={addForm.data.email}
                                        onChange={(e) =>
                                            addForm.setData(
                                                'email',
                                                e.target.value,
                                            )
                                        }
                                        className="border-input focus-visible:ring-ring/50 flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:ring-[3px] md:text-sm"
                                        placeholder="contact@example.com"
                                    />
                                    <InputError
                                        message={
                                            addForm.errors.email ??
                                            pageErrors.email
                                        }
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="add-contact">
                                        Contact number (optional)
                                    </Label>
                                    <input
                                        id="add-contact"
                                        type="text"
                                        value={addForm.data.contact_number}
                                        onChange={(e) =>
                                            addForm.setData(
                                                'contact_number',
                                                e.target.value,
                                            )
                                        }
                                        className="border-input focus-visible:ring-ring/50 flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:ring-[3px] md:text-sm"
                                        placeholder="e.g. +63 912 345 6789"
                                    />
                                </div>
                            </div>
                            {showSocialMedia && (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="add-social">
                                            Social media link (optional)
                                        </Label>
                                        <input
                                            id="add-social"
                                            type="url"
                                            value={addForm.data.social_media_url}
                                            onChange={(e) =>
                                                addForm.setData(
                                                    'social_media_url',
                                                    e.target.value,
                                                )
                                            }
                                            className="border-input focus-visible:ring-ring/50 flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:ring-[3px] md:text-sm"
                                            placeholder="https://facebook.com/..."
                                        />
                                        <InputError
                                            message={
                                                addForm.errors.social_media_url ??
                                                pageErrors.social_media_url
                                            }
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="add-map">
                                            Google Map embed URL (optional)
                                        </Label>
                                        <input
                                            id="add-map"
                                            type="text"
                                            value={addForm.data.map_embed_url}
                                            onChange={(e) =>
                                                addForm.setData(
                                                    'map_embed_url',
                                                    e.target.value,
                                                )
                                            }
                                            className="border-input focus-visible:ring-ring/50 flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:ring-[3px] md:text-sm"
                                            placeholder="https://www.google.com/maps/embed?pb=..."
                                        />
                                        <p className="text-muted-foreground text-xs">
                                            In Google Maps: open the place → Share
                                            → Embed a map → copy the iframe{" "}
                                            <strong>src</strong> URL (starts with
                                            https://www.google.com/maps/embed).
                                            Or paste a Plus Code/address to show
                                            a &quot;View on Google Maps&quot;
                                            link instead.
                                        </p>
                                        <InputError
                                            message={
                                                addForm.errors.map_embed_url ??
                                                pageErrors.map_embed_url
                                            }
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="add-map-lat">
                                                Map latitude (optional)
                                            </Label>
                                            <input
                                                id="add-map-lat"
                                                type="text"
                                                inputMode="decimal"
                                                value={addForm.data.map_latitude}
                                                onChange={(e) =>
                                                    addForm.setData(
                                                        'map_latitude',
                                                        e.target.value,
                                                    )
                                                }
                                                className="border-input focus-visible:ring-ring/50 flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:ring-[3px] md:text-sm"
                                                placeholder="e.g. 9.62"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="add-map-lng">
                                                Map longitude (optional)
                                            </Label>
                                            <input
                                                id="add-map-lng"
                                                type="text"
                                                inputMode="decimal"
                                                value={addForm.data.map_longitude}
                                                onChange={(e) =>
                                                    addForm.setData(
                                                        'map_longitude',
                                                        e.target.value,
                                                    )
                                                }
                                                className="border-input focus-visible:ring-ring/50 flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:ring-[3px] md:text-sm"
                                                placeholder="e.g. 122.47"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground text-xs">
                                        Set the pin location for the map. In
                                        Google Maps: right-click the place →
                                        click the coordinates to copy.
                                    </p>
                                </>
                            )}
                            <div className="flex flex-wrap items-center gap-3">
                                <Button
                                    type="submit"
                                    disabled={
                                        addForm.processing ||
                                        addForm.data.images.length === 0
                                    }
                                    size="lg"
                                >
                                    {addForm.processing
                                        ? 'Adding...'
                                        : `Add ${currentLabel}`}
                                </Button>
                                <Transition
                                    show={addForm.recentlySuccessful}
                                    enter="transition ease-out duration-200"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="transition ease-in duration-150"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Badge
                                        variant="secondary"
                                        className="gap-1.5 font-normal"
                                    >
                                        <Check className="size-3.5" />
                                        Added
                                    </Badge>
                                </Transition>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Current items */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Icon className="size-4" aria-hidden />
                            </span>
                            <CardTitle className="text-base">
                                Current {currentLabel}s
                            </CardTitle>
                        </div>
                        <CardDescription>
                            {items.length === 0
                                ? emptyMessage
                                : `${items.length} item${items.length === 1 ? '' : 's'}. Click Edit to change or Remove to delete.`}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {items.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-muted/20 py-12 text-center">
                                <Icon className="mb-2 size-10 text-muted-foreground/50" />
                                <p className="text-sm text-muted-foreground">
                                    {emptyMessage}
                                </p>
                            </div>
                        ) : (
                            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {items.map((item) => (
                                    <li
                                        key={item.id}
                                        className="group overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow hover:shadow-md"
                                    >
                                        <div className="relative aspect-video w-full overflow-hidden bg-muted">
                                            {item.image_url ? (
                                                <img
                                                    src={item.image_url}
                                                    alt=""
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center text-muted-foreground">
                                                    <Icon className="size-12" />
                                                </div>
                                            )}
                                            {item.image_urls.length > 1 && (
                                                <div className="absolute bottom-1 right-1 rounded bg-black/60 px-1.5 py-0.5 text-xs text-white">
                                                    +{item.image_urls.length - 1}
                                                </div>
                                            )}
                                        </div>
                                        <div className="space-y-2 p-3">
                                            <h3 className="font-medium leading-tight line-clamp-2">
                                                {item.title}
                                            </h3>
                                            {item.description ? (
                                                <p className="line-clamp-2 text-sm text-muted-foreground">
                                                    {item.description}
                                                </p>
                                            ) : null}
                                            <div className="flex gap-2 pt-1">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    className="flex-1 gap-1.5"
                                                    onClick={() =>
                                                        openEdit(item)
                                                    }
                                                >
                                                    <Pencil className="size-3.5" />
                                                    Edit
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    className="gap-1.5"
                                                    onClick={() =>
                                                        handleDelete(item.id)
                                                    }
                                                >
                                                    <Trash2 className="size-3.5" />
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Edit dialog */}
            <Dialog open={editOpen} onOpenChange={(open) => !open && closeEdit()}>
                <DialogContent className="flex max-h-[90vh] flex-col sm:max-w-lg">
                    <DialogHeader className="shrink-0">
                        <DialogTitle>Edit {currentLabel}</DialogTitle>
                        <DialogDescription>
                            Update title, description, add more images, or
                            remove images.
                        </DialogDescription>
                    </DialogHeader>
                    <form
                        onSubmit={handleEdit}
                        className="flex min-h-0 flex-1 flex-col"
                        encType="multipart/form-data"
                    >
                        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
                        <div className="space-y-2">
                            <Label htmlFor="edit-title">Title</Label>
                            <input
                                id="edit-title"
                                type="text"
                                value={editForm.data.title}
                                onChange={(e) =>
                                    editForm.setData('title', e.target.value)
                                }
                                className="border-input focus-visible:ring-ring/50 flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:ring-[3px] md:text-sm"
                                required
                            />
                            <InputError message={editForm.errors.title} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-description">
                                Description (optional)
                            </Label>
                            <textarea
                                id="edit-description"
                                value={editForm.data.description}
                                onChange={(e) =>
                                    editForm.setData(
                                        'description',
                                        e.target.value,
                                    )
                                }
                                className={textareaClass}
                                rows={3}
                            />
                            <InputError
                                message={editForm.errors.description}
                            />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-3">
                            <div className="space-y-2">
                                <Label htmlFor="edit-address">
                                    Address (optional)
                                </Label>
                                <input
                                    id="edit-address"
                                    type="text"
                                    value={editForm.data.address}
                                    onChange={(e) =>
                                        editForm.setData(
                                            'address',
                                            e.target.value,
                                        )
                                    }
                                    className="border-input focus-visible:ring-ring/50 flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:ring-[3px] md:text-sm"
                                    placeholder="e.g. Brgy. Alimodian"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-email">
                                    Email (optional)
                                </Label>
                                <input
                                    id="edit-email"
                                    type="email"
                                    value={editForm.data.email}
                                    onChange={(e) =>
                                        editForm.setData(
                                            'email',
                                            e.target.value,
                                        )
                                    }
                                    className="border-input focus-visible:ring-ring/50 flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:ring-[3px] md:text-sm"
                                    placeholder="contact@example.com"
                                />
                                <InputError
                                    message={editForm.errors.email}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-contact">
                                    Contact number (optional)
                                </Label>
                                <input
                                    id="edit-contact"
                                    type="text"
                                    value={editForm.data.contact_number}
                                    onChange={(e) =>
                                        editForm.setData(
                                            'contact_number',
                                            e.target.value,
                                        )
                                    }
                                    className="border-input focus-visible:ring-ring/50 flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:ring-[3px] md:text-sm"
                                    placeholder="e.g. +63 912 345 6789"
                                />
                            </div>
                        </div>
                        {showSocialMedia && (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-social">
                                        Social media link (optional)
                                    </Label>
                                    <input
                                        id="edit-social"
                                        type="url"
                                        value={editForm.data.social_media_url}
                                        onChange={(e) =>
                                            editForm.setData(
                                                'social_media_url',
                                                e.target.value,
                                            )
                                        }
                                        className="border-input focus-visible:ring-ring/50 flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:ring-[3px] md:text-sm"
                                        placeholder="https://facebook.com/..."
                                    />
                                    <InputError
                                        message={editForm.errors.social_media_url}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edit-map">
                                        Google Map embed URL (optional)
                                    </Label>
                                    <input
                                        id="edit-map"
                                        type="text"
                                        value={editForm.data.map_embed_url}
                                        onChange={(e) =>
                                            editForm.setData(
                                                'map_embed_url',
                                                e.target.value,
                                            )
                                        }
                                        className="border-input focus-visible:ring-ring/50 flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:ring-[3px] md:text-sm"
                                        placeholder="https://www.google.com/maps/embed?pb=..."
                                    />
                                    <p className="text-muted-foreground text-xs">
                                        In Google Maps: open the place → Share →
                                        Embed a map → copy the iframe{" "}
                                        <strong>src</strong> URL. Or paste a
                                        Plus Code/address for a &quot;View on
                                        Google Maps&quot; link.
                                    </p>
                                    <InputError
                                        message={editForm.errors.map_embed_url}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-map-lat">
                                            Map latitude (optional)
                                        </Label>
                                        <input
                                            id="edit-map-lat"
                                            type="text"
                                            inputMode="decimal"
                                            value={editForm.data.map_latitude}
                                            onChange={(e) =>
                                                editForm.setData(
                                                    'map_latitude',
                                                    e.target.value,
                                                )
                                            }
                                            className="border-input focus-visible:ring-ring/50 flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:ring-[3px] md:text-sm"
                                            placeholder="e.g. 9.62"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-map-lng">
                                            Map longitude (optional)
                                        </Label>
                                        <input
                                            id="edit-map-lng"
                                            type="text"
                                            inputMode="decimal"
                                            value={editForm.data.map_longitude}
                                            onChange={(e) =>
                                                editForm.setData(
                                                    'map_longitude',
                                                    e.target.value,
                                                )
                                            }
                                            className="border-input focus-visible:ring-ring/50 flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:ring-[3px] md:text-sm"
                                            placeholder="e.g. 122.47"
                                        />
                                    </div>
                                </div>
                                <p className="text-muted-foreground text-xs">
                                    Pin location for the map. In Google Maps:
                                    right-click the place → click coordinates
                                    to copy.
                                </p>
                            </>
                        )}
                        {editItem && editItem.image_urls.length > 0 && (
                            <div className="space-y-2">
                                <Label>Current images</Label>
                                <div className="flex flex-wrap gap-2">
                                    {editItem.image_urls.map((img) => (
                                        <div
                                            key={img.id}
                                            className="relative inline-block"
                                        >
                                            <img
                                                src={img.image_url}
                                                alt=""
                                                className="h-20 w-20 rounded-md border object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    handleRemoveImage(img.id);
                                                }}
                                                className="absolute -top-1 -right-1 z-10 flex size-6 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-destructive text-white shadow-md transition-transform hover:scale-110 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring"
                                                aria-label="Remove this image"
                                            >
                                                <X className="size-3.5 shrink-0 stroke-[2.5]" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label>Add more images (optional)</Label>
                            <div className="flex flex-wrap items-center gap-2">
                                <label className="flex cursor-pointer items-center gap-2 rounded-md border border-input px-3 py-2 text-sm transition-colors hover:bg-muted/50">
                                    <ImagePlus className="size-4" />
                                    Choose new images
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/png,image/gif,image/webp"
                                        className="sr-only"
                                        multiple
                                        onChange={(e) => {
                                            const newFiles = Array.from(
                                                e.target.files ?? [],
                                            );
                                            editForm.setData('images', [
                                                ...editForm.data.images,
                                                ...newFiles,
                                            ]);
                                            e.target.value = '';
                                        }}
                                    />
                                </label>
                                {editForm.data.images.map((file, i) => {
                                    const url =
                                        file instanceof File
                                            ? URL.createObjectURL(file)
                                            : null;
                                    return (
                                        <div
                                            key={`edit-new-${i}-${file.name}`}
                                            className="relative"
                                        >
                                            {url ? (
                                                <img
                                                    src={url}
                                                    alt={`New ${i + 1}`}
                                                    className="h-16 w-16 rounded-md border object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-16 w-16 items-center justify-center rounded-md border bg-muted text-xs text-muted-foreground">
                                                    {file.name}
                                                </div>
                                            )}
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    editForm.setData(
                                                        'images',
                                                        editForm.data.images.filter(
                                                            (_, idx) =>
                                                                idx !== i,
                                                        ),
                                                    );
                                                }}
                                                className="absolute -top-1 -right-1 z-10 flex size-5 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-destructive text-white shadow hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-ring"
                                                aria-label="Remove from selection"
                                            >
                                                <X className="size-3 shrink-0 stroke-[2.5]" />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        </div>
                        <DialogFooter className="shrink-0 border-t pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={closeEdit}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={editForm.processing}
                            >
                                {editForm.processing ? 'Saving...' : 'Save'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Toast
                open={showAddToast}
                onOpenChange={setShowAddToast}
                title="Added"
            />
            <Toast
                open={showEditToast}
                onOpenChange={setShowEditToast}
                title="Updated"
            />
        </AppLayout>
    );
}
