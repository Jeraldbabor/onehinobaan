import { Link } from '@inertiajs/react';
import { ChevronDown, Search } from 'lucide-react';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const DROPDOWN_CLOSE_DELAY_MS = 120;

type NavLink = { label: string; href: string };
type NavItemWithChildren = {
    label: string;
    href?: string;
    children: NavLink[];
};
type NavItemWithGroups = {
    label: string;
    groups: { sectionTitle: string; links: NavLink[] }[];
};
type NavItemSimple = {
    label: string;
    href: string;
    children?: never;
    groups?: never;
};
type NavItem = NavItemWithChildren | NavItemWithGroups | NavItemSimple;

/** Primary nav: fewer items so the bar is less busy. Transparency, Services, Job Opportunities live under "More". */
const primaryNavItems: NavItem[] = [
    { label: 'Home', href: '/' },
    {
        label: 'About Us',
        children: [
            { label: 'History', href: '/about/history' },
            { label: 'Vision & Mission', href: '/about/vision-mission' },
            { label: 'Key Officials', href: '/about/officials' },
            { label: 'Barangay', href: '/about/barangay' },
        ],
    },
    {
        label: 'Tourism',
        children: [
            { label: 'Attraction', href: '/tourism/attraction' },
            { label: 'Resorts', href: '/tourism/resorts' },
            { label: 'Festivals', href: '/tourism/festivals' },
        ],
    },
    { label: 'Contact Us', href: '/contact' },
    {
        label: 'More',
        groups: [
            {
                sectionTitle: 'Opportunities',
                links: [{ label: 'Job Opportunities', href: '/jobs' }],
            },
            {
                sectionTitle: 'Transparency',
                links: [
                    {
                        label: "Citizen's Charter",
                        href: '/transparency/citizens-charter',
                    },
                    {
                        label: 'Full Disclosure Policy',
                        href: '/transparency/full-disclosure',
                    },
                    {
                        label: 'Invitation to Bid',
                        href: '/transparency/invitation-to-bid',
                    },
                    {
                        label: 'Notice of Awards',
                        href: '/transparency/notice-of-awards',
                    },
                ],
            },
            {
                sectionTitle: 'Services',
                links: [
                    {
                        label: 'Business Permits',
                        href: '/services/business-permits',
                    },
                    {
                        label: 'Civil Registry',
                        href: '/services/civil-registry',
                    },
                    {
                        label: 'Social Welfare',
                        href: '/services/social-welfare',
                    },
                ],
            },
        ],
    },
];

/** Full flat list for mobile menu (same structure as before, for easy scanning). */
const mobileNavItems: NavItem[] = [
    { label: 'Home', href: '/' },
    {
        label: 'About Us',
        children: [
            { label: 'History', href: '/about/history' },
            { label: 'Vision & Mission', href: '/about/vision-mission' },
            { label: 'Key Officials', href: '/about/officials' },
            { label: 'Barangay', href: '/about/barangay' },
        ],
    },
    {
        label: 'Transparency',
        children: [
            {
                label: "Citizen's Charter",
                href: '/transparency/citizens-charter',
            },
            {
                label: 'Full Disclosure Policy',
                href: '/transparency/full-disclosure',
            },
            {
                label: 'Invitation to Bid',
                href: '/transparency/invitation-to-bid',
            },
            {
                label: 'Notice of Awards',
                href: '/transparency/notice-of-awards',
            },
        ],
    },
    {
        label: 'Services',
        children: [
            { label: 'Business Permits', href: '/services/business-permits' },
            { label: 'Civil Registry', href: '/services/civil-registry' },
            { label: 'Social Welfare', href: '/services/social-welfare' },
        ],
    },
    {
        label: 'Tourism',
        children: [
            { label: 'Attraction', href: '/tourism/attraction' },
            { label: 'Resorts', href: '/tourism/resorts' },
            { label: 'Festivals', href: '/tourism/festivals' },
        ],
    },
    { label: 'Job Opportunities', href: '/jobs' },
    { label: 'Contact Us', href: '/contact' },
];

function hasChildren(item: NavItem): item is NavItemWithChildren {
    return (
        'children' in item &&
        Array.isArray((item as NavItemWithChildren).children) &&
        (item as NavItemWithChildren).children.length > 0
    );
}
function hasGroups(item: NavItem): item is NavItemWithGroups {
    return (
        'groups' in item &&
        Array.isArray((item as NavItemWithGroups).groups) &&
        (item as NavItemWithGroups).groups.length > 0
    );
}
export function LandingHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleDropdownEnter = (id: string) => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setOpenDropdown(id);
    };

    const handleDropdownLeave = () => {
        closeTimeoutRef.current = setTimeout(() => {
            setOpenDropdown(null);
            closeTimeoutRef.current = null;
        }, DROPDOWN_CLOSE_DELAY_MS);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-neutral-200/80 bg-white/98 shadow-sm shadow-neutral-200/50 backdrop-blur-sm">
            <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 xl:px-8">
                {/* Left: logos + name — slightly smaller for less visual weight */}
                <Link
                    href="/"
                    className="flex shrink-0 items-center gap-2.5 opacity-90 transition hover:opacity-100 sm:gap-3"
                    aria-label="Municipality of Hinoba-an - Home"
                >
                    <img
                        src="/hinobaan-logo/Hinobaan_logo.png"
                        alt=""
                        className="h-8 w-auto object-contain sm:h-9"
                    />
                    <img
                        src="/hinobaan-logo/Onehinoba-an%20logo.png"
                        alt=""
                        className="h-8 w-auto object-contain sm:h-9"
                    />
                    <span className="hidden text-base font-semibold tracking-tight text-neutral-800 sm:inline md:text-lg">
                        Municipality of Hinoba-an
                    </span>
                </Link>

                {/* Desktop nav — only on xl+ so bar isn't crammed */}
                <nav
                    className="hidden items-center gap-0.5 xl:flex"
                    aria-label="Main"
                >
                    {primaryNavItems.map((item) => {
                        if (hasGroups(item)) {
                            const id = `nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`;
                            const isOpen = openDropdown === id;
                            return (
                                <div
                                    key={id}
                                    className="relative"
                                    onMouseEnter={() => handleDropdownEnter(id)}
                                    onMouseLeave={handleDropdownLeave}
                                >
                                    <button
                                        type="button"
                                        className={cn(
                                            'flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-neutral-700 transition-colors duration-150',
                                            isOpen
                                                ? 'bg-neutral-100 text-neutral-900'
                                                : 'hover:bg-neutral-50 hover:text-neutral-900',
                                        )}
                                        aria-expanded={isOpen}
                                        aria-haspopup="true"
                                        aria-controls={`${id}-menu`}
                                        id={id}
                                    >
                                        {item.label}
                                        <ChevronDown
                                            className={cn(
                                                'size-3.5 shrink-0 transition-transform duration-200',
                                                isOpen && 'rotate-180',
                                            )}
                                            aria-hidden
                                        />
                                    </button>
                                    <div
                                        className={cn(
                                            'absolute top-full right-0 left-0 h-1',
                                            isOpen
                                                ? 'block'
                                                : 'pointer-events-none',
                                        )}
                                        aria-hidden
                                    />
                                    <div
                                        id={`${id}-menu`}
                                        role="menu"
                                        className={cn(
                                            'absolute top-full right-0 mt-0 w-[280px] rounded-lg border border-neutral-200/90 bg-white py-3 shadow-lg transition-all duration-200 ease-out',
                                            isOpen
                                                ? 'visible translate-y-0 opacity-100'
                                                : 'pointer-events-none invisible -translate-y-1 opacity-0',
                                        )}
                                    >
                                        {item.groups.map((group) => (
                                            <div
                                                key={group.sectionTitle}
                                                className="border-b border-neutral-100 last:border-0 last:pb-0"
                                            >
                                                <p className="mb-1.5 px-4 pt-2 text-xs font-semibold tracking-wider text-neutral-500 uppercase first:pt-0">
                                                    {group.sectionTitle}
                                                </p>
                                                {group.links.map((link) => (
                                                    <Link
                                                        key={link.href}
                                                        href={link.href}
                                                        role="menuitem"
                                                        className="block px-4 py-2 text-sm text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
                                                    >
                                                        {link.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        }
                        if (hasChildren(item)) {
                            const id = `nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`;
                            const isOpen = openDropdown === id;
                            return (
                                <div
                                    key={id}
                                    className="relative"
                                    onMouseEnter={() => handleDropdownEnter(id)}
                                    onMouseLeave={handleDropdownLeave}
                                >
                                    <button
                                        type="button"
                                        className={cn(
                                            'flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-neutral-700 transition-colors duration-150',
                                            isOpen
                                                ? 'bg-neutral-100 text-neutral-900'
                                                : 'hover:bg-neutral-50 hover:text-neutral-900',
                                        )}
                                        aria-expanded={isOpen}
                                        aria-haspopup="true"
                                        aria-controls={`${id}-menu`}
                                        id={id}
                                    >
                                        {item.label}
                                        <ChevronDown
                                            className={cn(
                                                'size-3.5 shrink-0 transition-transform duration-200',
                                                isOpen && 'rotate-180',
                                            )}
                                            aria-hidden
                                        />
                                    </button>
                                    <div
                                        className={cn(
                                            'absolute top-full right-0 left-0 h-1',
                                            isOpen
                                                ? 'block'
                                                : 'pointer-events-none',
                                        )}
                                        aria-hidden
                                    />
                                    <div
                                        id={`${id}-menu`}
                                        role="menu"
                                        className={cn(
                                            'absolute top-full left-0 mt-0 min-w-[200px] rounded-lg border border-neutral-200/90 bg-white py-2 shadow-lg transition-all duration-200 ease-out',
                                            isOpen
                                                ? 'visible translate-y-0 opacity-100'
                                                : 'pointer-events-none invisible -translate-y-1 opacity-0',
                                        )}
                                    >
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                role="menuitem"
                                                className="block px-4 py-2.5 text-sm text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            );
                        }
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="rounded-md px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right: Search + menu button */}
                <div className="flex shrink-0 items-center gap-1">
                    <button
                        type="button"
                        className="flex size-8 items-center justify-center rounded-md text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-700 sm:size-9"
                        aria-label="Search"
                    >
                        <Search className="size-4 sm:size-5" />
                    </button>
                    {/* Hamburger: show below xl so desktop nav only when there's room */}
                    <button
                        type="button"
                        className="flex size-8 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 xl:hidden"
                        aria-expanded={mobileMenuOpen}
                        aria-controls="mobile-menu"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <span className="sr-only">Toggle menu</span>
                        <svg
                            className="size-5 sm:size-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {mobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile / tablet menu (shown when desktop nav is hidden) */}
            <div
                id="mobile-menu"
                className={cn(
                    'border-t border-neutral-200/80 bg-white xl:hidden',
                    mobileMenuOpen ? 'block' : 'hidden',
                )}
            >
                <nav
                    className="flex flex-col gap-1 px-4 py-4"
                    aria-label="Mobile main"
                >
                    {mobileNavItems.map((item) => {
                        if (hasGroups(item)) {
                            return (
                                <div
                                    key={item.label}
                                    className="flex flex-col gap-1"
                                >
                                    <span className="px-3 py-2 text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                                        {item.label}
                                    </span>
                                    {item.groups.map((group) => (
                                        <div
                                            key={group.sectionTitle}
                                            className="flex flex-col gap-0.5 pl-2"
                                        >
                                            <span className="px-2 py-1 text-xs font-medium text-neutral-500">
                                                {group.sectionTitle}
                                            </span>
                                            {group.links.map((link) => (
                                                <Link
                                                    key={link.href}
                                                    href={link.href}
                                                    className="rounded-md px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50"
                                                    onClick={() =>
                                                        setMobileMenuOpen(false)
                                                    }
                                                >
                                                    {link.label}
                                                </Link>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            );
                        }
                        if (hasChildren(item)) {
                            return (
                                <div
                                    key={item.label}
                                    className="flex flex-col gap-1"
                                >
                                    <span className="px-3 py-2 text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                                        {item.label}
                                    </span>
                                    {item.children.map((child) => (
                                        <Link
                                            key={child.href}
                                            href={child.href}
                                            className="rounded-md px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50"
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                        >
                                            {child.label}
                                        </Link>
                                    ))}
                                </div>
                            );
                        }
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="rounded-md px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}
