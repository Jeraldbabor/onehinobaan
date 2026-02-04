import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { BookOpen, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Toast } from '@/components/ui/toast';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const dashboardUrl = '/dashboard';
const historyEditUrl = '/dashboard/history';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboardUrl },
    { title: 'Edit History', href: historyEditUrl },
];

type HistoryEditPageProps = {
    history: {
        content: string;
    };
};

const textareaClass =
    'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 min-h-[320px] w-full rounded-lg border bg-transparent px-3 py-2.5 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:opacity-50 md:text-sm resize-y';

export default function HistoryEditPage({ history }: HistoryEditPageProps) {
    const { data, setData, put, processing, errors, recentlySuccessful } = useForm({
        content: history?.content ?? '',
    });

    const [showToast, setShowToast] = useState(false);
    useEffect(() => {
        if (recentlySuccessful) setShowToast(true);
    }, [recentlySuccessful]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit History" />
            <h1 className="sr-only">Edit History</h1>
            <div className="flex flex-1 flex-col gap-6 overflow-x-auto px-4 py-6 md:px-6 lg:max-w-5xl">
                <header className="space-y-1">
                    <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                        Municipality history
                    </h2>
                    <p className="text-muted-foreground text-sm max-w-2xl">
                        Edit the history content shown on the public About → History page. You can
                        use HTML for formatting (e.g.{' '}
                        <code className="rounded bg-muted px-1 py-0.5 text-xs">&lt;p&gt;</code>,{' '}
                        <code className="rounded bg-muted px-1 py-0.5 text-xs">&lt;strong&gt;</code>
                        , <code className="rounded bg-muted px-1 py-0.5 text-xs">&lt;h2&gt;</code>).
                    </p>
                </header>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        put(historyEditUrl);
                    }}
                    className="space-y-6"
                >
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <BookOpen className="size-4" aria-hidden />
                                </span>
                                <CardTitle className="text-base">History content</CardTitle>
                            </div>
                            <CardDescription>
                                The main text displayed on the About → History page.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Label htmlFor="content" className="sr-only">
                                History content
                            </Label>
                            <textarea
                                id="content"
                                name="content"
                                rows={20}
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                className={textareaClass}
                                placeholder="Enter the history of Hinoba-an..."
                            />
                            <InputError message={errors.content} />
                        </CardContent>
                    </Card>

                    <div className="flex flex-wrap items-center gap-3 border-t pt-6">
                        <Button type="submit" disabled={processing} size="lg">
                            {processing ? 'Saving...' : 'Save history'}
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
                            <Badge variant="secondary" className="gap-1.5 font-normal">
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
