import { Head, Link } from '@inertiajs/react';
import {
    Building2,
    ChevronRight,
    History,
    Landmark,
    LayoutGrid,
    MapPin,
    Megaphone,
    PartyPopper,
    Phone,
    Target,
    Users,
    Waves,
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const dashboardUrl = '/dashboard';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboardUrl },
];

const quickLinks = [
    {
        title: 'News & Announcements',
        href: '/dashboard/announcements',
        description:
            'Post news, updates, and announcements for the public site.',
        icon: Megaphone,
    },
    {
        title: 'About Us',
        href: '/dashboard/history',
        description:
            'Edit History, Vision & Mission, Key Officials, and Barangay.',
        icon: LayoutGrid,
        subLinks: [
            { label: 'History', href: '/dashboard/history', icon: History },
            {
                label: 'Vision & Mission',
                href: '/dashboard/vision-mission',
                icon: Target,
            },
            {
                label: 'Key Officials',
                href: '/dashboard/officials',
                icon: Users,
            },
            { label: 'Barangay', href: '/dashboard/barangay', icon: Building2 },
            { label: 'Contact Us', href: '/dashboard/contact', icon: Phone },
        ],
    },
    {
        title: 'Tourism',
        href: '/dashboard/tourism/attraction',
        description: 'Manage Attractions, Resorts, and Festivals.',
        icon: Landmark,
        subLinks: [
            {
                label: 'Attraction',
                href: '/dashboard/tourism/attraction',
                icon: MapPin,
            },
            {
                label: 'Resorts',
                href: '/dashboard/tourism/resorts',
                icon: Waves,
            },
            {
                label: 'Festivals',
                href: '/dashboard/tourism/festivals',
                icon: PartyPopper,
            },
        ],
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex flex-1 flex-col gap-6 overflow-x-auto p-4 md:p-6">
                <header>
                    <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
                        Welcome to the admin
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Municipality of Hinobaan · Manage your site content from
                        here.
                    </p>
                </header>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {quickLinks.map((section) => {
                        const Icon = section.icon;
                        return (
                            <div
                                key={section.title}
                                className="flex flex-col rounded-xl border border-border bg-card p-4 shadow-sm"
                            >
                                <Link
                                    href={section.href}
                                    className="group flex items-start gap-3"
                                >
                                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Icon className="size-5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h2 className="font-semibold text-foreground group-hover:underline">
                                            {section.title}
                                        </h2>
                                        <p className="mt-0.5 text-sm text-muted-foreground">
                                            {section.description}
                                        </p>
                                    </div>
                                    <ChevronRight className="size-4 shrink-0 text-muted-foreground group-hover:text-foreground" />
                                </Link>
                                {section.subLinks && (
                                    <ul className="mt-3 space-y-1 border-t border-border pt-3">
                                        {section.subLinks.map((sub) => {
                                            const SubIcon = sub.icon;
                                            return (
                                                <li key={sub.href}>
                                                    <Link
                                                        href={sub.href}
                                                        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                                                    >
                                                        <SubIcon className="size-3.5 shrink-0" />
                                                        {sub.label}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}
