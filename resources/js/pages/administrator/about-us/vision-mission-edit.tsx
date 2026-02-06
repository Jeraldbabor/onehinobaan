import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { Check, Flag, ImagePlus, Target, X } from 'lucide-react';
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
import { Label } from '@/components/ui/label';
import { Toast } from '@/components/ui/toast';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const dashboardUrl = '/dashboard';
const visionMissionEditUrl = '/dashboard/vision-mission';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboardUrl },
    { title: 'Edit Vision & Mission', href: visionMissionEditUrl },
];

type VisionMissionEditPageProps = {
    vision: { content: string };
    mission: { content: string };
    vision_mission_image_url: string | null;
};

const textareaClass =
    'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 min-h-[200px] w-full rounded-lg border bg-transparent px-3 py-2.5 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:opacity-50 md:text-sm resize-y';

export default function VisionMissionEditPage({
    vision,
    mission,
    vision_mission_image_url,
}: VisionMissionEditPageProps) {
    const { data, setData, post, processing, errors, recentlySuccessful } =
        useForm({
            _method: 'PUT',
            vision: vision?.content ?? '',
            mission: mission?.content ?? '',
            vision_mission_image: null as File | null,
            remove_vision_mission_image: false,
        });

    const imagePreview =
        data.vision_mission_image instanceof File
            ? URL.createObjectURL(data.vision_mission_image)
            : data.remove_vision_mission_image
              ? null
              : (vision_mission_image_url ?? null);

    const [showToast, setShowToast] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Vision & Mission" />
            <h1 className="sr-only">Edit Vision & Mission</h1>
            <div className="flex flex-1 flex-col gap-6 overflow-x-auto px-4 py-6 md:px-6 lg:max-w-5xl">
                {/* Page header */}
                <header className="space-y-1">
                    <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                        Vision & Mission
                    </h2>
                    <p className="max-w-2xl text-sm text-muted-foreground">
                        Edit the vision and mission shown on the public About →
                        Vision & Mission page. You can use HTML for formatting
                        (e.g.{' '}
                        <code className="rounded bg-muted px-1 py-0.5 text-xs">
                            &lt;p&gt;
                        </code>
                        ,{' '}
                        <code className="rounded bg-muted px-1 py-0.5 text-xs">
                            &lt;strong&gt;
                        </code>
                        ). Optionally add a photo below.
                    </p>
                </header>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        post(visionMissionEditUrl, {
                            forceFormData: true,
                            onSuccess: () => setShowToast(true),
                        });
                    }}
                    className="space-y-6"
                    encType="multipart/form-data"
                >
                    {/* Vision & Mission cards – two columns on md+ */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-2">
                                    <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Target
                                            className="size-4"
                                            aria-hidden
                                        />
                                    </span>
                                    <CardTitle className="text-base">
                                        Vision
                                    </CardTitle>
                                </div>
                                <CardDescription>
                                    Text shown as the vision (optional)
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Label htmlFor="vision" className="sr-only">
                                    Vision text
                                </Label>
                                <textarea
                                    id="vision"
                                    name="vision"
                                    rows={10}
                                    value={data.vision}
                                    onChange={(e) =>
                                        setData('vision', e.target.value)
                                    }
                                    className={textareaClass}
                                    placeholder="Enter the vision..."
                                />
                                <InputError message={errors.vision} />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-2">
                                    <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Flag className="size-4" aria-hidden />
                                    </span>
                                    <CardTitle className="text-base">
                                        Mission
                                    </CardTitle>
                                </div>
                                <CardDescription>
                                    Text shown as the mission (optional)
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Label htmlFor="mission" className="sr-only">
                                    Mission text
                                </Label>
                                <textarea
                                    id="mission"
                                    name="mission"
                                    rows={10}
                                    value={data.mission}
                                    onChange={(e) =>
                                        setData('mission', e.target.value)
                                    }
                                    className={textareaClass}
                                    placeholder="Enter the mission..."
                                />
                                <InputError message={errors.mission} />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Upload photo */}
                    <Card className="border-dashed">
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                                <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                                    <ImagePlus className="size-4" aria-hidden />
                                </span>
                                <CardTitle className="text-base">
                                    Photo
                                </CardTitle>
                            </div>
                            <CardDescription>
                                One image for Vision & Mission. JPEG, PNG, GIF
                                or WebP, max 100 MB.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
                                <label
                                    htmlFor="vision_mission_image"
                                    className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 px-6 py-8 text-center transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 hover:border-muted-foreground/40 hover:bg-muted/50"
                                >
                                    <input
                                        id="vision_mission_image"
                                        type="file"
                                        accept="image/jpeg,image/png,image/gif,image/webp"
                                        className="sr-only"
                                        onChange={(e) => {
                                            setData(
                                                'vision_mission_image',
                                                e.target.files?.[0] ?? null,
                                            );
                                            setData(
                                                'remove_vision_mission_image',
                                                false,
                                            );
                                        }}
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
                                    <div className="relative inline-flex w-fit shrink-0">
                                        <img
                                            src={imagePreview}
                                            alt="Vision & Mission preview"
                                            className="max-h-56 rounded-lg border bg-muted object-contain shadow-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setData(
                                                    'vision_mission_image',
                                                    null,
                                                );
                                                setData(
                                                    'remove_vision_mission_image',
                                                    true,
                                                );
                                            }}
                                            className="absolute -top-2 -right-2 flex size-8 items-center justify-center rounded-full border bg-background text-muted-foreground shadow-md transition-colors hover:bg-destructive hover:text-destructive-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                                            aria-label="Remove photo"
                                        >
                                            <X className="size-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <InputError message={errors.vision_mission_image} />
                        </CardContent>
                    </Card>

                    {/* Submit & feedback */}
                    <div className="flex flex-wrap items-center gap-3 border-t pt-6">
                        <Button type="submit" disabled={processing} size="lg">
                            {processing ? 'Saving...' : 'Save Vision & Mission'}
                        </Button>
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
                                className="gap-1.5 font-normal"
                            >
                                <Check className="size-3.5" />
                                Saved
                            </Badge>
                        </Transition>
                    </div>
                </form>
            </div>
            <Toast open={showToast} onOpenChange={setShowToast} title="Saved" />
        </AppLayout>
    );
}
