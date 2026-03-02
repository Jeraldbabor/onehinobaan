import { Head, Link, usePage } from '@inertiajs/react';
import {
    Building2,
    Briefcase,
    CalendarDays,
    ChevronRight,
    HardHat,
    History,
    Landmark,
    LayoutGrid,
    MapPin,
    Megaphone,
    PartyPopper,
    Phone,
    Settings,
    ShieldAlert,
    Target,
    UserCog,
    Users,
    Waves,
} from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem, SharedData } from '@/types';

const dashboardUrl = '/dashboard';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboardUrl },
];

const ALL_QUICK_LINKS = [
    {
        title: 'News & Announcements',
        href: '/dashboard/announcements',
        description:
            'Post news, updates, and announcements for the public site.',
        icon: Megaphone,
        permission: 'manage_announcements',
    },
    {
        title: 'Municipality Activities',
        href: '/dashboard/activities',
        description: 'View and manage upcoming municipality activities.',
        icon: CalendarDays,
        permission: 'manage_activities',
    },
    {
        title: 'Municipal Projects',
        href: '/dashboard/projects',
        description: 'Update public infrastructure projects and progress.',
        icon: HardHat,
        permission: 'manage_projects',
    },
    {
        title: 'Job Opportunities',
        href: '/dashboard/jobs',
        description: 'Manage current job openings for the public.',
        icon: Briefcase,
        permission: 'manage_jobs',
    },
    {
        title: 'About Us',
        href: '/dashboard/history',
        description:
            'Edit History, Vision & Mission, Key Officials, and Barangay.',
        icon: LayoutGrid,
        permission: 'manage_about_us',
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
        description: 'Manage Attractions, Resorts, Festivals, and Restaurants.',
        icon: Landmark,
        permission: 'manage_tourism',
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
            {
                label: 'Restaurants',
                href: '/dashboard/tourism/restaurants',
                icon: LayoutGrid,
            },
        ],
    },
    {
        title: 'Legal & Policies',
        href: '/dashboard/policies',
        description: 'Update the legal documents and municipality policies.',
        icon: ShieldAlert,
        permission: 'manage_policies',
    },
    {
        title: 'General Settings',
        href: '/dashboard/general-settings',
        description: 'Manage core site settings.',
        icon: Settings,
        permission: 'admin', // Requires Admin
    },
    {
        title: 'User Management',
        href: '/dashboard/users',
        description: 'Manage admins, editors, and permissions.',
        icon: UserCog,
        permission: 'admin', // Requires Admin
    },
];

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;
    const userRole = auth.user.role;
    const userPermissions: string[] = (auth.user.permissions as string[]) || [];
    const isAdmin = userRole === 'admin';

    const hasPermission = (permission: string) => {
        if (isAdmin) return true;
        if (permission === 'admin') return false;
        return (
            Array.isArray(userPermissions) &&
            userPermissions.includes(permission)
        );
    };

    const quickLinks = ALL_QUICK_LINKS.filter((link) =>
        hasPermission(link.permission),
    );
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
