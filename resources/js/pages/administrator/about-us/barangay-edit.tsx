import { Head, router, useForm } from '@inertiajs/react';
import { Edit, MapPin, Plus, Trash2, Users } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Toast } from '@/components/ui/toast';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const dashboardUrl = '/dashboard';
const barangayIndexUrl = '/dashboard/barangay';
const barangayStoreUrl = '/dashboard/barangay';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboardUrl },
    { title: 'Barangay Management', href: barangayIndexUrl },
];

type OfficialItem = {
    id: string;
    name: string;
    position: string | null;
    image_url: string | null;
};

type BarangayItem = {
    id: string;
    name: string;
    population?: string;
    history?: string;
    festival?: string;
    land_area?: string;
    officials?: string;
    image_url: string;
    officials_list?: OfficialItem[];
};

type BarangayEditPageProps = {
    barangays: BarangayItem[];
};

export default function BarangayEditPage({ barangays }: BarangayEditPageProps) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isOfficialsDialogOpen, setIsOfficialsDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<BarangayItem | null>(null);

    // Form for Barangay
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            name: '',
            population: '',
            history: '',
            festival: '',
            land_area: '',
            officials: '', // Legacy text field
            image: null as File | null,
        });

    // Form for Officials
    const {
        data: officialData,
        setData: setOfficialData,
        post: postOfficial,
        processing: processingOfficial,
        errors: officialErrors,
        reset: resetOfficial,
    } = useForm({
        name: '',
        position: '',
        image: null as File | null,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [officialImagePreview, setOfficialImagePreview] = useState<
        string | null
    >(null);

    const [toastOpen, setToastOpen] = useState(false);
    const [toastMessage, setToastMessage] = useState('Action successful.');

    const handleOpenChange = (open: boolean) => {
        setIsDialogOpen(open);
        if (!open) {
            reset();
            clearErrors();
            setEditingItem(null);
            setImagePreview(null);
        }
    };

    // We removed the sync effect to avoid 'set-state-in-effect' errors. 
    // Changes from server will be reflected through props.

    const openCreateDialog = () => {
        setEditingItem(null);
        reset();
        setImagePreview(null);
        setIsDialogOpen(true);
    };

    const openEditDialog = (item: BarangayItem) => {
        setEditingItem(item);
        setData({
            name: item.name || '',
            population: item.population || '',
            history: item.history || '',
            festival: item.festival || '',
            land_area: item.land_area || '',
            officials: item.officials || '',
            image: null,
        });
        setImagePreview(item.image_url);
        setIsDialogOpen(true);
    };

    const openOfficialsDialog = (item: BarangayItem) => {
        setEditingItem(item);
        setIsOfficialsDialogOpen(true);
        resetOfficial();
        setOfficialImagePreview(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingItem) {
            router.post(
                `${barangayIndexUrl}/${editingItem.id}`,
                {
                    _method: 'put',
                    ...data,
                },
                {
                    forceFormData: true,
                    onSuccess: () => {
                        setIsDialogOpen(false);
                        setToastMessage('Barangay updated successfully.');
                        setToastOpen(true);
                    },
                },
            );
        } else {
            post(barangayStoreUrl, {
                forceFormData: true,
                onSuccess: () => {
                    setIsDialogOpen(false);
                    setToastMessage('Barangay created successfully.');
                    setToastOpen(true);
                },
            });
        }
    };

    const handleOfficialSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingItem) return;

        postOfficial(`${barangayIndexUrl}/${editingItem.id}/officials`, {
            forceFormData: true,
            onSuccess: () => {
                resetOfficial();
                setOfficialImagePreview(null);
                setToastMessage('Official added successfully.');
                setToastOpen(true);
            },
        });
    };

    const handleRemove = (id: string) => {
        if (confirm('Are you sure you want to delete this barangay?')) {
            router.delete(`${barangayIndexUrl}/${id}`, {
                onSuccess: () => {
                    setToastMessage('Barangay deleted.');
                    setToastOpen(true);
                },
            });
        }
    };

    const handleRemoveOfficial = (id: string) => {
        if (confirm('Remove this official?')) {
            router.delete(`${barangayIndexUrl}/officials/${id}`, {
                onSuccess: () => {
                    setToastMessage('Official removed.');
                    setToastOpen(true);
                },
            });
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleOfficialImageChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const file = e.target.files?.[0];
        if (file) {
            setOfficialData('image', file);
            setOfficialImagePreview(URL.createObjectURL(file));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Barangay Management" />

            <div className="mx-auto flex w-full flex-1 flex-col gap-6 p-4 md:p-6 lg:max-w-7xl">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                            Barangays
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Manage municipality barangays, including population,
                            officials, and details.
                        </p>
                    </div>
                    <Button onClick={openCreateDialog} className="gap-2">
                        <Plus className="h-4 w-4" /> Add Barangay
                    </Button>
                </div>

                {barangays.length === 0 ? (
                    <Card className="border-dashed">
                        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                            <MapPin className="mb-4 h-12 w-12 text-muted-foreground/50" />
                            <h3 className="text-lg font-medium">
                                No barangays added
                            </h3>
                            <p className="mt-1 mb-4 text-sm text-muted-foreground">
                                Get started by adding the first barangay.
                            </p>
                            <Button onClick={openCreateDialog}>
                                Add Barangay
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {barangays.map((barangay) => (
                            <Card
                                key={barangay.id}
                                className="group flex h-full flex-col overflow-hidden"
                            >
                                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                                    <img
                                        src={barangay.image_url}
                                        alt={barangay.name}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            className="h-8 w-8"
                                            title="Edit Details"
                                            onClick={() =>
                                                openEditDialog(barangay)
                                            }
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            className="h-8 w-8"
                                            title="Manage Officials"
                                            onClick={() =>
                                                openOfficialsDialog(barangay)
                                            }
                                        >
                                            <Users className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            className="h-8 w-8"
                                            title="Delete"
                                            onClick={() =>
                                                handleRemove(barangay.id)
                                            }
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <CardHeader className="p-4 pb-2">
                                    <CardTitle className="line-clamp-1">
                                        {barangay.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1 space-y-2 p-4 pt-0 text-sm">
                                    <div className="flex justify-between border-b py-1">
                                        <span className="text-muted-foreground">
                                            Population:
                                        </span>
                                        <span className="font-medium">
                                            {barangay.population || '-'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between border-b py-1">
                                        <span className="text-muted-foreground">
                                            Festival:
                                        </span>
                                        <span className="max-w-[50%] truncate font-medium">
                                            {barangay.festival || '-'}
                                        </span>
                                    </div>
                                    <div className="flex justify-between py-1">
                                        <span className="text-muted-foreground">
                                            Area:
                                        </span>
                                        <span className="font-medium">
                                            {barangay.land_area || '-'}
                                        </span>
                                    </div>
                                    <div className="pt-2 text-xs text-muted-foreground">
                                        {barangay.officials_list?.length || 0}{' '}
                                        officials linked
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Edit/Create Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
                <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {editingItem ? 'Edit Barangay' : 'Add New Barangay'}
                        </DialogTitle>
                        <DialogDescription>
                            Fill in the details below. Click save when you're
                            done.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-6 py-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">
                                    Barangay Name{' '}
                                    <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    placeholder="e.g. Barangay I"
                                    required
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="population">Population</Label>
                                <Input
                                    id="population"
                                    value={data.population}
                                    onChange={(e) =>
                                        setData('population', e.target.value)
                                    }
                                    placeholder="e.g. 5,000"
                                />
                                <InputError message={errors.population} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="festival">Festival</Label>
                                <Input
                                    id="festival"
                                    value={data.festival}
                                    onChange={(e) =>
                                        setData('festival', e.target.value)
                                    }
                                    placeholder="e.g. Sinulog Festival"
                                />
                                <InputError message={errors.festival} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="land_area">Land Area</Label>
                                <Input
                                    id="land_area"
                                    value={data.land_area}
                                    onChange={(e) =>
                                        setData('land_area', e.target.value)
                                    }
                                    placeholder="e.g. 150 hectares"
                                />
                                <InputError message={errors.land_area} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="history">History</Label>
                            <textarea
                                id="history"
                                value={data.history}
                                onChange={(e) =>
                                    setData('history', e.target.value)
                                }
                                className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Brief history of the barangay..."
                            />
                            <InputError message={errors.history} />
                        </div>

                        <div className="hidden space-y-2">
                            <Label htmlFor="officials">
                                Officials (Legacy Text)
                            </Label>
                            <textarea
                                id="officials"
                                value={data.officials}
                                onChange={(e) =>
                                    setData('officials', e.target.value)
                                }
                                className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Legacy officials list..."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image">
                                Barangay Image{' '}
                                {editingItem
                                    ? '(Optional)'
                                    : '<span className="text-destructive">*</span>'}
                            </Label>
                            <div className="flex items-center gap-4">
                                {imagePreview && (
                                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                )}
                                <div className="flex-1">
                                    <Input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        required={!editingItem}
                                    />
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Recommended size: 800x600px. Max 10MB.
                                    </p>
                                </div>
                            </div>
                            <InputError message={errors.image} />
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing
                                    ? editingItem
                                        ? 'Updating...'
                                        : 'Adding...'
                                    : editingItem
                                        ? 'Save Changes'
                                        : 'Add Barangay'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Officials Management Dialog */}
            <Dialog
                open={isOfficialsDialogOpen}
                onOpenChange={(open) => {
                    setIsOfficialsDialogOpen(open);
                    if (!open) {
                        setEditingItem(null);
                        resetOfficial();
                        setOfficialImagePreview(null);
                    }
                }}
            >
                <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            Manage Officials for {editingItem?.name}
                        </DialogTitle>
                        <DialogDescription>
                            Add and remove officials for this barangay.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6 py-4 md:grid-cols-2">
                        {/* List of existing officials */}
                        <div className="space-y-4">
                            <h4 className="font-medium">Current Officials</h4>
                            {!editingItem?.officials_list?.length ? (
                                <p className="text-sm text-muted-foreground">
                                    No officials added yet.
                                </p>
                            ) : (
                                <ul className="max-h-[400px] space-y-3 overflow-y-auto pr-2">
                                    {editingItem.officials_list.map(
                                        (official) => (
                                            <li
                                                key={official.id}
                                                className="flex items-center gap-3 rounded-lg border p-3"
                                            >
                                                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
                                                    {official.image_url ? (
                                                        <img
                                                            src={
                                                                official.image_url
                                                            }
                                                            alt={official.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        <Users className="h-full w-full p-2 text-muted-foreground" />
                                                    )}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate text-sm font-medium">
                                                        {official.name}
                                                    </p>
                                                    <p className="truncate text-xs text-muted-foreground">
                                                        {official.position}
                                                    </p>
                                                </div>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                                                    onClick={() =>
                                                        handleRemoveOfficial(
                                                            official.id,
                                                        )
                                                    }
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </li>
                                        ),
                                    )}
                                </ul>
                            )}
                        </div>

                        {/* Add new official form */}
                        <div className="space-y-4 rounded-lg border bg-muted/30 p-4">
                            <h4 className="font-medium">Add New Official</h4>
                            <form
                                onSubmit={handleOfficialSubmit}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <Label htmlFor="official_name">Name</Label>
                                    <Input
                                        id="official_name"
                                        value={officialData.name}
                                        onChange={(e) =>
                                            setOfficialData(
                                                'name',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Full Name"
                                        required
                                    />
                                    <InputError message={officialErrors.name} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="official_position">
                                        Position
                                    </Label>
                                    <Input
                                        id="official_position"
                                        value={officialData.position}
                                        onChange={(e) =>
                                            setOfficialData(
                                                'position',
                                                e.target.value,
                                            )
                                        }
                                        placeholder="e.g. Captain, Kagawad"
                                    />
                                    <InputError
                                        message={officialErrors.position}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="official_image">
                                        Photo (Optional)
                                    </Label>
                                    <Input
                                        id="official_image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleOfficialImageChange}
                                        className="text-xs"
                                    />
                                    {officialImagePreview && (
                                        <div className="mt-2 h-20 w-20 overflow-hidden rounded-lg border">
                                            <img
                                                src={officialImagePreview}
                                                alt="Preview"
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <InputError
                                        message={officialErrors.image}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={processingOfficial}
                                    className="w-full"
                                >
                                    {processingOfficial
                                        ? 'Adding...'
                                        : 'Add Official'}
                                </Button>
                            </form>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            <Toast
                open={toastOpen}
                onOpenChange={setToastOpen}
                title={toastMessage}
            />
        </AppLayout>
    );
}
