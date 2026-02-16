import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { Check, ShieldAlert, Cookie, Accessibility } from 'lucide-react';
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

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Legal & Privacy Policies', href: '/dashboard/policies' },
];

type PoliciesEditProps = {
    privacy: string;
    cookies: string;
    accessibility: string;
};

const textareaClass =
    'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 min-h-[240px] w-full rounded-lg border bg-transparent px-3 py-2.5 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:opacity-50 md:text-sm resize-y font-mono';

export default function PoliciesEdit({
    privacy,
    cookies,
    accessibility,
}: PoliciesEditProps) {
    const { data, setData, post, processing, errors, recentlySuccessful } =
        useForm({
            privacy: privacy || '',
            cookies: cookies || '',
            accessibility: accessibility || '',
        });

    const [showToast, setShowToast] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/dashboard/policies', {
            onSuccess: () => setShowToast(true),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Legal & Privacy Policies" />
            <div className="flex flex-1 flex-col gap-6 px-4 py-6 md:px-6 lg:max-w-4xl">
                <header className="space-y-1">
                    <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                        Legal & Privacy Policies
                    </h2>
                    <p className="max-w-2xl text-sm text-muted-foreground">
                        Manage the content for your site's Privacy Policy,
                        Cookie Policy, and Accessibility Statement. You can use
                        HTML tags for formatting.
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Privacy Policy */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <ShieldAlert
                                        className="size-4"
                                        aria-hidden
                                    />
                                </span>
                                <CardTitle className="text-base">
                                    Privacy Policy
                                </CardTitle>
                            </div>
                            <CardDescription>
                                Defines how the municipality handles user data
                                and privacy.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Label htmlFor="privacy" className="sr-only">
                                Privacy Policy Content
                            </Label>
                            <textarea
                                id="privacy"
                                value={data.privacy}
                                onChange={(e) =>
                                    setData('privacy', e.target.value)
                                }
                                className={textareaClass}
                                placeholder="Enter Privacy Policy content..."
                            />
                            <InputError message={errors.privacy} />
                        </CardContent>
                    </Card>

                    {/* Cookie Policy */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Cookie className="size-4" aria-hidden />
                                </span>
                                <CardTitle className="text-base">
                                    Cookie Policy
                                </CardTitle>
                            </div>
                            <CardDescription>
                                Information about how your site uses cookies.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Label htmlFor="cookies" className="sr-only">
                                Cookie Policy Content
                            </Label>
                            <textarea
                                id="cookies"
                                value={data.cookies}
                                onChange={(e) =>
                                    setData('cookies', e.target.value)
                                }
                                className={textareaClass}
                                placeholder="Enter Cookie Policy content..."
                            />
                            <InputError message={errors.cookies} />
                        </CardContent>
                    </Card>

                    {/* Accessibility Statement */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Accessibility
                                        className="size-4"
                                        aria-hidden
                                    />
                                </span>
                                <CardTitle className="text-base">
                                    Accessibility Statement
                                </CardTitle>
                            </div>
                            <CardDescription>
                                Your commitment to making the website accessible
                                for all.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Label htmlFor="accessibility" className="sr-only">
                                Accessibility Statement Content
                            </Label>
                            <textarea
                                id="accessibility"
                                value={data.accessibility}
                                onChange={(e) =>
                                    setData('accessibility', e.target.value)
                                }
                                className={textareaClass}
                                placeholder="Enter Accessibility Statement content..."
                            />
                            <InputError message={errors.accessibility} />
                        </CardContent>
                    </Card>

                    <div className="flex items-center gap-3 border-t pt-6">
                        <Button type="submit" disabled={processing} size="lg">
                            {processing ? 'Saving...' : 'Save All Policies'}
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
                title="Policies Saved"
            />
        </AppLayout>
    );
}
