import { Transition } from '@headlessui/react';
import { Head, router, useForm } from '@inertiajs/react';
import { Check, ImagePlus, Trash2, Users } from 'lucide-react';
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
import { Toast } from '@/components/ui/toast';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const dashboardUrl = '/dashboard';
const officialsIndexUrl = '/dashboard/officials';
const officialsStoreUrl = '/dashboard/officials';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboardUrl },
    { title: 'Edit Key Officials', href: officialsIndexUrl },
];

type OfficialItem = { id: string; image_url: string };

type OfficialsEditPageProps = {
    officials: OfficialItem[];
};

export default function OfficialsEditPage({
    officials,
}: OfficialsEditPageProps) {
    const { data, setData, post, processing, errors, recentlySuccessful } =
        useForm({
            image: null as File | null,
        });

    const imagePreview =
        data.image instanceof File ? URL.createObjectURL(data.image) : null;

    const handleRemove = (id: string) => {
        if (confirm('Remove this official?')) {
            router.delete(`${officialsIndexUrl}/${id}`);
        }
    };

    const [showToast, setShowToast] = useState(false);

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
                        Upload images for Key Officials. They appear on the
                        public About → Key Officials page. Order is by upload
                        order.
                    </p>
                </header>

                {/* Add new official */}
                <Card className="border-dashed">
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                            <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                                <ImagePlus className="size-4" aria-hidden />
                            </span>
                            <CardTitle className="text-base">
                                Add official
                            </CardTitle>
                        </div>
                        <CardDescription>
                            Upload an image. JPEG, PNG, GIF or WebP, max 100 MB.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (!data.image) return;
                            post(officialsStoreUrl, {
                                forceFormData: true,
                                onSuccess: () => {
                                    setData('image', null);
                                    setShowToast(true);
                                },
                            });
                            }}
                            className="flex flex-col gap-4 sm:flex-row sm:items-start"
                        >
                            <label
                                htmlFor="official_image"
                                className="flex min-w-0 flex-1 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 px-6 py-8 text-center transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 hover:border-muted-foreground/40 hover:bg-muted/50 sm:max-w-xs"
                            >
                                <input
                                    id="official_image"
                                    type="file"
                                    accept="image/jpeg,image/png,image/gif,image/webp"
                                    className="sr-only"
                                    onChange={(e) =>
                                        setData(
                                            'image',
                                            e.target.files?.[0] ?? null,
                                        )
                                    }
                                />
                                <ImagePlus className="mb-2 size-8 text-muted-foreground" />
                                <span className="text-sm font-medium text-muted-foreground">
                                    Choose file
                                </span>
                                <span className="mt-1 text-xs text-muted-foreground">
                                    or drag and drop
                                </span>
                            </label>
                            {imagePreview && (
                                <div className="flex flex-wrap items-center gap-3">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="h-24 w-24 rounded-lg border bg-muted object-cover shadow-sm"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setData('image', null)}
                                    >
                                        Clear
                                    </Button>
                                </div>
                            )}
                            <Button
                                type="submit"
                                disabled={processing || !data.image}
                                size="lg"
                            >
                                {processing ? 'Adding...' : 'Add official'}
                            </Button>
                        </form>
                        {!imagePreview && (
                            <p className="text-sm text-muted-foreground">
                                Select an image above, then click Add official.
                            </p>
                        )}
                        <InputError message={errors.image} />
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Badge
                                variant="secondary"
                                className="w-fit gap-1.5 font-normal"
                            >
                                <Check className="size-3.5" />
                                Added
                            </Badge>
                        </Transition>
                    </CardContent>
                </Card>

                {/* Current officials */}
                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                            <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <Users className="size-4" aria-hidden />
                            </span>
                            <CardTitle className="text-base">
                                Current officials
                            </CardTitle>
                        </div>
                        <CardDescription>
                            {officials.length === 0
                                ? 'No officials yet. Upload an image above to add one.'
                                : `${officials.length} official${officials.length === 1 ? '' : 's'}. Hover to remove.`}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {officials.length === 0 ? (
                            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-muted/20 py-12 text-center">
                                <Users className="mb-2 size-10 text-muted-foreground/50" />
                                <p className="text-sm text-muted-foreground">
                                    No officials yet. Add one using the form
                                    above.
                                </p>
                            </div>
                        ) : (
                            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                {officials.map((official) => (
                                    <li
                                        key={official.id}
                                        className="group relative overflow-hidden rounded-lg border bg-muted/30 shadow-sm transition-shadow hover:shadow-md"
                                    >
                                        <img
                                            src={official.image_url}
                                            alt=""
                                            className="aspect-square w-full object-cover"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                            <Button
                                                type="button"
                                                variant="destructive"
                                                size="sm"
                                                onClick={() =>
                                                    handleRemove(official.id)
                                                }
                                                className="gap-1.5"
                                            >
                                                <Trash2 className="size-4" />
                                                Remove
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </CardContent>
                </Card>
            </div>
            <Toast open={showToast} onOpenChange={setShowToast} title="Added" />
        </AppLayout>
    );
}
