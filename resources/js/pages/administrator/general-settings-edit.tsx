import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { Check, Image as ImageIcon, Video } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Toast } from '@/components/ui/toast';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'General Settings', href: '/dashboard/general-settings' },
];

type GeneralSettingsProps = {
    settings: {
        main_logo_url: string;
        bp_logo_url: string;
        one_hinobaan_logo_url: string;
        transparency_seal_url: string;
        landing_video_url: string;
        sub_page_banner_url: string;
    };
};

export default function GeneralSettingsEdit({
    settings,
}: GeneralSettingsProps) {
    const { setData, post, processing, errors, recentlySuccessful } = useForm({
        main_logo: null as File | null,
        bp_logo: null as File | null,
        one_hinobaan_logo: null as File | null,
        transparency_seal: null as File | null,
        landing_video: null as File | null,
        sub_page_banner: null as File | null,
    });

    const [fileErrors, setFileErrors] = useState<{ [key: string]: string }>({});
    const [showToast, setShowToast] = useState(false);

    const checkFileSize = (file: File, maxSizeMB: number, field: string) => {
        const maxSize = maxSizeMB * 1024 * 1024;
        if (file.size > maxSize) {
            setFileErrors((prev) => ({
                ...prev,
                [field]: `File size exceeds ${maxSizeMB}MB limit.`,
            }));
            return false;
        }
        setFileErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[field];
            return newErrors;
        });
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (Object.keys(fileErrors).length > 0) {
            return;
        }

        post('/dashboard/general-settings', {
            onSuccess: () => setShowToast(true),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="General Settings" />
            <div className="flex flex-1 flex-col gap-6 px-4 py-6 md:px-6 lg:max-w-4xl">
                <header className="space-y-1">
                    <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                        General Settings
                    </h2>
                    <p className="max-w-2xl text-sm text-muted-foreground">
                        Update the main logos and the landing page background
                        video.
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <ImageIcon className="size-4" aria-hidden />
                                </span>
                                <CardTitle className="text-base">
                                    Logos
                                </CardTitle>
                            </div>
                            <CardDescription>
                                These logos appear in the header and top banner.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6 md:grid-cols-2">
                            {/* Main Logo */}
                            <div className="space-y-2">
                                <Label htmlFor="main_logo">
                                    Main Logo (LGU)
                                </Label>
                                <div className="flex items-center gap-4">
                                    <div className="size-16 overflow-hidden rounded border bg-neutral-100">
                                        <img
                                            src={settings.main_logo_url}
                                            alt="Current"
                                            className="h-full w-full object-contain"
                                        />
                                    </div>
                                    <Input
                                        id="main_logo"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file =
                                                e.target.files?.[0] || null;
                                            if (
                                                file &&
                                                checkFileSize(
                                                    file,
                                                    5,
                                                    'main_logo',
                                                )
                                            ) {
                                                setData('main_logo', file);
                                            } else if (!file) {
                                                setData('main_logo', null);
                                                setFileErrors((prev) => {
                                                    const newErrors = {
                                                        ...prev,
                                                    };
                                                    delete newErrors[
                                                        'main_logo'
                                                    ];
                                                    return newErrors;
                                                });
                                            }
                                        }}
                                    />
                                </div>
                                <InputError
                                    message={
                                        errors.main_logo || fileErrors.main_logo
                                    }
                                />
                            </div>

                            {/* BP Logo */}
                            <div className="space-y-2">
                                <Label htmlFor="bp_logo">BP Logo</Label>
                                <div className="flex items-center gap-4">
                                    <div className="size-16 overflow-hidden rounded border bg-neutral-100">
                                        <img
                                            src={settings.bp_logo_url}
                                            alt="Current"
                                            className="h-full w-full object-contain"
                                        />
                                    </div>
                                    <Input
                                        id="bp_logo"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file =
                                                e.target.files?.[0] || null;
                                            if (
                                                file &&
                                                checkFileSize(
                                                    file,
                                                    5,
                                                    'bp_logo',
                                                )
                                            ) {
                                                setData('bp_logo', file);
                                            } else if (!file) {
                                                setData('bp_logo', null);
                                                setFileErrors((prev) => {
                                                    const newErrors = {
                                                        ...prev,
                                                    };
                                                    delete newErrors['bp_logo'];
                                                    return newErrors;
                                                });
                                            }
                                        }}
                                    />
                                </div>
                                <InputError
                                    message={
                                        errors.bp_logo || fileErrors.bp_logo
                                    }
                                />
                            </div>

                            {/* One Hinobaan Logo */}
                            <div className="space-y-2">
                                <Label htmlFor="one_hinobaan_logo">
                                    One Hinobaan Logo
                                </Label>
                                <div className="flex items-center gap-4">
                                    <div className="size-16 overflow-hidden rounded border bg-neutral-100">
                                        <img
                                            src={settings.one_hinobaan_logo_url}
                                            alt="Current"
                                            className="h-full w-full object-contain"
                                        />
                                    </div>
                                    <Input
                                        id="one_hinobaan_logo"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file =
                                                e.target.files?.[0] || null;
                                            if (
                                                file &&
                                                checkFileSize(
                                                    file,
                                                    5,
                                                    'one_hinobaan_logo',
                                                )
                                            ) {
                                                setData(
                                                    'one_hinobaan_logo',
                                                    file,
                                                );
                                            } else if (!file) {
                                                setData(
                                                    'one_hinobaan_logo',
                                                    null,
                                                );
                                                setFileErrors((prev) => {
                                                    const newErrors = {
                                                        ...prev,
                                                    };
                                                    delete newErrors[
                                                        'one_hinobaan_logo'
                                                    ];
                                                    return newErrors;
                                                });
                                            }
                                        }}
                                    />
                                </div>
                                <InputError
                                    message={
                                        errors.one_hinobaan_logo ||
                                        fileErrors.one_hinobaan_logo
                                    }
                                />
                            </div>

                            {/* Transparency Seal */}
                            <div className="space-y-2">
                                <Label htmlFor="transparency_seal">
                                    Transparency Seal
                                </Label>
                                <div className="flex items-center gap-4">
                                    <div className="size-16 overflow-hidden rounded border bg-neutral-100">
                                        <img
                                            src={settings.transparency_seal_url}
                                            alt="Current"
                                            className="h-full w-full object-contain"
                                        />
                                    </div>
                                    <Input
                                        id="transparency_seal"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file =
                                                e.target.files?.[0] || null;
                                            if (
                                                file &&
                                                checkFileSize(
                                                    file,
                                                    5,
                                                    'transparency_seal',
                                                )
                                            ) {
                                                setData(
                                                    'transparency_seal',
                                                    file,
                                                );
                                            } else if (!file) {
                                                setData(
                                                    'transparency_seal',
                                                    null,
                                                );
                                                setFileErrors((prev) => {
                                                    const newErrors = {
                                                        ...prev,
                                                    };
                                                    delete newErrors[
                                                        'transparency_seal'
                                                    ];
                                                    return newErrors;
                                                });
                                            }
                                        }}
                                    />
                                </div>
                                <InputError
                                    message={
                                        errors.transparency_seal ||
                                        fileErrors.transparency_seal
                                    }
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <ImageIcon className="size-4" aria-hidden />
                                </span>
                                <CardTitle className="text-base">
                                    Sub-page Banner
                                </CardTitle>
                            </div>
                            <CardDescription>
                                The banner image shown at the top of sub-pages
                                (History, Vision, etc.).
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="sub_page_banner">
                                    Banner Image (Recommended: 1920x400)
                                </Label>
                                <div className="flex flex-col gap-4">
                                    <div className="aspect-[19/4] w-full overflow-hidden rounded border bg-neutral-100">
                                        <img
                                            src={settings.sub_page_banner_url}
                                            alt="Current"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <Input
                                        id="sub_page_banner"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file =
                                                e.target.files?.[0] || null;
                                            if (
                                                file &&
                                                checkFileSize(
                                                    file,
                                                    5,
                                                    'sub_page_banner',
                                                )
                                            ) {
                                                setData(
                                                    'sub_page_banner',
                                                    file,
                                                );
                                            } else if (!file) {
                                                setData(
                                                    'sub_page_banner',
                                                    null,
                                                );
                                                setFileErrors((prev) => {
                                                    const newErrors = {
                                                        ...prev,
                                                    };
                                                    delete newErrors[
                                                        'sub_page_banner'
                                                    ];
                                                    return newErrors;
                                                });
                                            }
                                        }}
                                    />
                                </div>
                                <InputError
                                    message={
                                        errors.sub_page_banner ||
                                        fileErrors.sub_page_banner
                                    }
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Video className="size-4" aria-hidden />
                                </span>
                                <CardTitle className="text-base">
                                    Landing Video
                                </CardTitle>
                            </div>
                            <CardDescription>
                                The background video shown in the hero section
                                of the landing page.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="landing_video">
                                    Hero Video (MP4 recommended)
                                </Label>
                                <div className="flex flex-col gap-4">
                                    {settings.landing_video_url && (
                                        <div className="aspect-video w-full max-w-md overflow-hidden rounded border bg-neutral-100">
                                            <video
                                                src={settings.landing_video_url}
                                                className="h-full w-full object-cover"
                                                muted
                                                loop
                                                autoPlay
                                                playsInline
                                            />
                                        </div>
                                    )}
                                    <Input
                                        id="landing_video"
                                        type="file"
                                        accept="video/*"
                                        onChange={(e) => {
                                            const file =
                                                e.target.files?.[0] || null;
                                            if (
                                                file &&
                                                checkFileSize(
                                                    file,
                                                    40,
                                                    'landing_video',
                                                )
                                            ) {
                                                setData('landing_video', file);
                                            } else if (!file) {
                                                setData('landing_video', null);
                                                setFileErrors((prev) => {
                                                    const newErrors = {
                                                        ...prev,
                                                    };
                                                    delete newErrors[
                                                        'landing_video'
                                                    ];
                                                    return newErrors;
                                                });
                                            }
                                        }}
                                    />
                                </div>
                                <InputError
                                    message={
                                        errors.landing_video ||
                                        fileErrors.landing_video
                                    }
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex items-center gap-3 border-t pt-6">
                        <Button type="submit" disabled={processing} size="lg">
                            {processing ? 'Saving...' : 'Save General Settings'}
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
            <Toast
                open={showToast}
                onOpenChange={setShowToast}
                title="Settings Saved"
            />
        </AppLayout>
    );
}
