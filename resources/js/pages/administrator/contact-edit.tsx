import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import { Check, MapPin, Phone, Share2 } from 'lucide-react';
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

const dashboardUrl = '/dashboard';
const contactEditUrl = '/dashboard/contact';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboardUrl },
    { title: 'Edit Contact Us', href: contactEditUrl },
];

type ContactEditPageProps = {
    contact: {
        address: string;
        phone: string;
        email: string;
        map_embed_url: string;
        facebook_municipality_url?: string;
        facebook_mayor_url?: string;
        hotlines: Array<{ label: string; number: string }>;
    };
};

const inputClass =
    'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 flex h-10 w-full rounded-lg border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:opacity-50 md:text-sm';

export default function ContactEditPage({ contact }: ContactEditPageProps) {
    const { data, setData, put, processing, errors, recentlySuccessful } =
        useForm({
            address: contact?.address ?? '',
            phone: contact?.phone ?? '',
            email: contact?.email ?? '',
            map_embed_url: contact?.map_embed_url ?? '',
            facebook_municipality_url: contact?.facebook_municipality_url ?? '',
            facebook_mayor_url: contact?.facebook_mayor_url ?? '',
            hotlines: contact?.hotlines ?? [],
        });

    const [showToast, setShowToast] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Contact Us" />
            <h1 className="sr-only">Edit Contact Us</h1>
            <div className="flex flex-1 flex-col gap-6 overflow-x-auto px-4 py-6 md:px-6 lg:max-w-3xl">
                <header className="space-y-1">
                    <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
                        Contact information & map
                    </h2>
                    <p className="max-w-2xl text-sm text-muted-foreground">
                        Edit the address, phone, email, and map shown on the
                        public Contact Us page. For the map, paste the embed URL
                        from Google Maps (Share → Embed a map → copy the{' '}
                        <code className="rounded bg-muted px-1 py-0.5 text-xs">
                            src
                        </code>{' '}
                        of the iframe).
                    </p>
                </header>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        put(contactEditUrl, {
                            onSuccess: () => setShowToast(true),
                        });
                    }}
                    className="space-y-6"
                >
                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <MapPin className="size-4" aria-hidden />
                                </span>
                                <CardTitle className="text-base">
                                    Contact details
                                </CardTitle>
                            </div>
                            <CardDescription>
                                Shown on the Contact Us page. Leave blank to
                                hide a field.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
                                    type="text"
                                    value={data.address}
                                    onChange={(e) =>
                                        setData('address', e.target.value)
                                    }
                                    className={inputClass}
                                    placeholder="e.g. Municipal Hall, Hinobaan, Negros Occidental 6114"
                                />
                                <InputError message={errors.address} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    id="phone"
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) =>
                                        setData('phone', e.target.value)
                                    }
                                    className={inputClass}
                                    placeholder="e.g. (034) 468 4002"
                                />
                                <InputError message={errors.phone} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData('email', e.target.value)
                                    }
                                    className={inputClass}
                                    placeholder="e.g. info@hinobaan.gov.ph"
                                />
                                <InputError message={errors.email} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="map_embed_url">
                                    Map embed URL
                                </Label>
                                <Input
                                    id="map_embed_url"
                                    type="url"
                                    value={data.map_embed_url}
                                    onChange={(e) =>
                                        setData('map_embed_url', e.target.value)
                                    }
                                    className={inputClass}
                                    placeholder="https://www.google.com/maps/embed?pb=..."
                                />
                                <InputError message={errors.map_embed_url} />
                                {data.map_embed_url &&
                                    data.map_embed_url.includes(
                                        'google.com/maps',
                                    ) &&
                                    !data.map_embed_url.includes(
                                        'google.com/maps/embed',
                                    ) && (
                                        <p className="text-xs text-amber-600 dark:text-amber-500">
                                            This is a regular map link. Use the
                                            embed URL instead: In Google Maps
                                            click Share → Embed a map → copy the
                                            iframe src (must contain
                                            /maps/embed).
                                        </p>
                                    )}
                                <p className="text-xs text-muted-foreground">
                                    In Google Maps: Share → Embed a map → copy
                                    the iframe <strong>src</strong> URL only
                                    (must contain{' '}
                                    <code className="rounded bg-muted px-0.5">
                                        /maps/embed
                                    </code>
                                    ). The normal map link will not work here.
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Phone className="size-4" aria-hidden />
                                </span>
                                <CardTitle className="text-base">
                                    Hotlines
                                </CardTitle>
                            </div>
                            <CardDescription>
                                Emergency hotlines or secondary contact numbers.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {data.hotlines.map((hotline, index) => (
                                <div
                                    key={index}
                                    className="flex items-end gap-3 rounded-lg border bg-neutral-50/50 p-4"
                                >
                                    <div className="flex-1 space-y-2">
                                        <Label>Label</Label>
                                        <Input
                                            value={hotline.label}
                                            onChange={(e) => {
                                                const newHotlines = [
                                                    ...data.hotlines,
                                                ];
                                                newHotlines[index].label =
                                                    e.target.value;
                                                setData(
                                                    'hotlines',
                                                    newHotlines,
                                                );
                                            }}
                                            placeholder="e.g. MDRRMO"
                                            className={inputClass}
                                        />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <Label>Number</Label>
                                        <Input
                                            value={hotline.number}
                                            onChange={(e) => {
                                                const newHotlines = [
                                                    ...data.hotlines,
                                                ];
                                                newHotlines[index].number =
                                                    e.target.value;
                                                setData(
                                                    'hotlines',
                                                    newHotlines,
                                                );
                                            }}
                                            placeholder="e.g. 09123456789"
                                            className={inputClass}
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="mb-[1px] h-10 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                        onClick={() =>
                                            setData(
                                                'hotlines',
                                                data.hotlines.filter(
                                                    (_, i) => i !== index,
                                                ),
                                            )
                                        }
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full border-dashed"
                                onClick={() =>
                                    setData('hotlines', [
                                        ...data.hotlines,
                                        { label: '', number: '' },
                                    ])
                                }
                            >
                                + Add hotline
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                    <Share2 className="size-4" aria-hidden />
                                </span>
                                <CardTitle className="text-base">
                                    Facebook pages (for landing page)
                                </CardTitle>
                            </div>
                            <CardDescription>
                                Full URLs to your Municipality and Mayor
                                Facebook pages. They will be embedded on the
                                right side of the homepage. Leave blank to hide.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="facebook_mayor_url">
                                    Mayor Facebook page URL
                                </Label>
                                <Input
                                    id="facebook_mayor_url"
                                    type="url"
                                    value={data.facebook_mayor_url}
                                    onChange={(e) =>
                                        setData(
                                            'facebook_mayor_url',
                                            e.target.value,
                                        )
                                    }
                                    className={inputClass}
                                    placeholder="https://www.facebook.com/MayorPage"
                                />
                                <InputError
                                    message={errors.facebook_mayor_url}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="facebook_municipality_url">
                                    Municipality Facebook page URL
                                </Label>
                                <Input
                                    id="facebook_municipality_url"
                                    type="url"
                                    value={data.facebook_municipality_url}
                                    onChange={(e) =>
                                        setData(
                                            'facebook_municipality_url',
                                            e.target.value,
                                        )
                                    }
                                    className={inputClass}
                                    placeholder="https://www.facebook.com/YourMunicipalityPage"
                                />
                                <InputError
                                    message={errors.facebook_municipality_url}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex flex-wrap items-center gap-3 border-t pt-6">
                        <Button type="submit" disabled={processing} size="lg">
                            {processing ? 'Saving...' : 'Save contact info'}
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
