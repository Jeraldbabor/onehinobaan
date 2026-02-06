import { Link } from '@inertiajs/react';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const DROPDOWN_CLOSE_DELAY_MS = 120;
const BANNER_SCROLL_THRESHOLD_PX = 60;
const BANNER_SCROLL_DELTA_PX = 20; // min scroll movement before toggling (reduces shake)

type NavLink = { label: string; href: string };
type NavLinkWithNested = { label: string; children: NavLink[] };
type NavChild = NavLink | NavLinkWithNested;
type NavItemWithChildren = {
    label: string;
    href?: string;
    children: NavChild[];
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
            {
                label: 'Key Officials',
                children: [
                    { label: 'Our Mayor', href: '/about/officials/mayor' },
                    { label: 'Vice Mayor', href: '/about/officials/vice-mayor' },
                    { label: 'SB Member', href: '/about/officials/sb-member' },
                ],
            },
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
    {
        label: 'Governance',
        children: [
            {
                label: 'Executive Section',
                children: [
                    { label: 'Executive Orders', href: '/executive/executive-orders' },
                    { label: 'Resolutions', href: '/legislative/resolutions' },
                ],
            },
            {
                label: 'Legislative Section',
                children: [
                    { label: 'Ordinances', href: '/legislative/ordinances' },
                    { label: 'Resolutions', href: '/legislative/resolutions' },
                ],
            },
            {
                label: 'Departments',
                children: [
                    { label: 'Budget Office', href: '/departments/budget-office' },
                    { label: 'Accounting Office', href: '/departments/accounting-office' },
                    { label: 'MPDO', href: '/departments/mpdo' },
                    { label: 'HRMO', href: '/departments/hrmo' },
                    { label: 'Legal Office', href: '/departments/municipal-legal-office' },
                    { label: 'MSWDO', href: '/departments/municipal-social-welfare-and-development-office' },
                    { label: 'MAO', href: '/departments/municipal-agriculture-office' },
                    { label: 'PESO/TLDC', href: '/departments/peso-tldc' },
                    { label: 'DRRMO', href: '/departments/drrmo' },
                    { label: 'ENRO', href: '/departments/enro' },
                    { label: 'Civil Registrar', href: '/departments/civil-registrar' },
                ],
            },

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
            {
                label: 'Key Officials',
                children: [
                    { label: 'Our Mayor', href: '/about/officials/mayor' },
                    { label: 'Vice Mayor', href: '/about/officials/vice-mayor' },
                    { label: 'SB Member', href: '/about/officials/sb-member' },
                ],
            },
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
function hasNestedChildren(child: NavChild): child is NavLinkWithNested {
    return (
        'children' in child &&
        Array.isArray((child as NavLinkWithNested).children) &&
        (child as NavLinkWithNested).children.length > 0
    );
}
export function LandingHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);
    const [bannerVisible, setBannerVisible] = useState(true);
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const subCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const lastScrollY = useRef(0);
    const tickingRef = useRef(false);

    useEffect(() => {
        const updateBanner = () => {
            const current = window.scrollY;
            const delta = current - lastScrollY.current;
            lastScrollY.current = current;
            tickingRef.current = false;

            if (current <= BANNER_SCROLL_THRESHOLD_PX) {
                setBannerVisible(true);
                return;
            }
            // Require minimum scroll delta to avoid rapid toggling (reduces shake)
            if (Math.abs(delta) < BANNER_SCROLL_DELTA_PX) return;

            if (delta > 0) {
                setBannerVisible(false);
            } else {
                setBannerVisible(true);
            }
        };

        const handleScroll = () => {
            if (tickingRef.current) return;
            tickingRef.current = true;
            requestAnimationFrame(updateBanner);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
            setOpenSubDropdown(null);
            closeTimeoutRef.current = null;
        }, DROPDOWN_CLOSE_DELAY_MS);
    };

    const handleSubDropdownEnter = (key: string) => {
        if (subCloseTimeoutRef.current) {
            clearTimeout(subCloseTimeoutRef.current);
            subCloseTimeoutRef.current = null;
        }
        setOpenSubDropdown(key);
    };

    const handleSubDropdownLeave = () => {
        subCloseTimeoutRef.current = setTimeout(() => {
            setOpenSubDropdown(null);
            subCloseTimeoutRef.current = null;
        }, DROPDOWN_CLOSE_DELAY_MS);
    };

    return (
        <div className="sticky top-0 z-50 w-full">
            {/* Top banner - hides on scroll down, shows on scroll up or near top (grid collapse = smooth) */}
            <div
                className={cn(
                    'grid overflow-hidden border-b border-neutral-200/80 bg-neutral-100 transition-[grid-template-rows] duration-300 ease-in-out',
                    bannerVisible ? '[grid-template-rows:1fr]' : '[grid-template-rows:0fr]',
                )}
            >
                <div className="min-h-0">
                    <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5 xl:px-8">
                        {/* Tagline */}
                        <img
                        src="/hinobaan-logo/Hinobaan_logo.png"
                        alt=""
                        className="h-12 w-auto object-contain sm:h-14 md:h-18"
                    />
                        <p className="min-w-0 flex-1 truncate text-xs font-medium text-neutral-600 sm:text-sm">
                            <span className="sm:inline text-lg font-medium text-neutral-700 sm:text-xl md:text-medium">
                                Official Website of the
                              
                            </span>
                            <br></br>
                            <span className="sm:inline text-lg font-medium text-neutral-700 sm:text-xl md:text-3xl">
                                <span className="font-bold text-orange-700">L</span>ocal  <span className="font-bold text-orange-700">G</span>overnment <span className="font-bold text-orange-700">U</span>nit of <span className="font-bold text-orange-700">H</span>inoba-an
                            </span>
                        </p>
                        {/* Two logos together on the right */}
                        <div className="flex shrink-0 items-center gap-1 sm:gap-1">
                            <img
                                src="/hinobaan-logo/BP_Logo.webp"
                                alt=""
                                className="h-12 w-auto object-contain sm:h-14 md:h-18"
                            />
                            <img
                                src="/hinobaan-logo/Onehinoba-an%20logo.png"
                                alt="One Hinoba-an"
                                className="h-12 w-auto object-contain sm:h-14 md:h-18"
                            />
                             <img
                                src="/hinobaan-logo/transparency.png"
                                alt="Transparency Seal"
                                className="h-12 w-auto object-contain sm:h-14 md:h-18"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* Main nav */}
            <header className="border-b border-neutral-200/80 bg-white/98 shadow-sm shadow-neutral-200/50 backdrop-blur-sm">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 xl:px-8">
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
                    <span className="hidden text-base font-semibold tracking-tight text-neutral-800 sm:inline md:text-lg">
                        Municipality of Hinoba-an
                    </span>
                </Link>

                {/* Desktop nav — only on xl+ so bar isn't crammed */}
                <nav
                    className="hidden items-center gap-1 xl:flex"
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
                                            'flex items-center gap-1.5 rounded-lg px-4 py-3 text-base font-medium text-neutral-700 transition-colors duration-150',
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
                                                'size-4 shrink-0 transition-transform duration-200',
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
                                            'absolute top-full right-0 mt-0 w-[300px] rounded-lg border border-neutral-200/90 bg-white py-3 shadow-lg transition-all duration-200 ease-out',
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
                                                <p className="mb-1.5 px-4 pt-2 text-sm font-semibold tracking-wider text-neutral-500 uppercase first:pt-0">
                                                    {group.sectionTitle}
                                                </p>
                                                {group.links.map((link) => (
                                                    <Link
                                                        key={link.href}
                                                        href={link.href}
                                                        role="menuitem"
                                                        className="block px-4 py-2.5 text-base text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
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
                                            'flex items-center gap-1.5 rounded-lg px-4 py-3 text-base font-medium text-neutral-700 transition-colors duration-150',
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
                                                'size-4 shrink-0 transition-transform duration-200',
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
                                            'absolute top-full left-0 mt-0 min-w-[220px] rounded-lg border border-neutral-200/90 bg-white py-2.5 shadow-lg transition-all duration-200 ease-out',
                                            isOpen
                                                ? 'visible translate-y-0 opacity-100'
                                                : 'pointer-events-none invisible -translate-y-1 opacity-0',
                                        )}
                                    >
                                        {item.children.map((child) => {
                                            const subKey = `${id}-${child.label.toLowerCase().replace(/\s+/g, '-')}`;
                                            const isSubOpen = openSubDropdown === subKey;
                                            if (hasNestedChildren(child)) {
                                                return (
                                                    <div
                                                        key={subKey}
                                                        className="relative"
                                                        onMouseEnter={() =>
                                                            handleSubDropdownEnter(subKey)
                                                        }
                                                        onMouseLeave={
                                                            handleSubDropdownLeave
                                                        }
                                                    >
                                                        <span
                                                            role="menuitem"
                                                            className={cn(
                                                                'flex cursor-default items-center justify-between px-4 py-3 text-base text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900',
                                                                isSubOpen &&
                                                                    'bg-neutral-50',
                                                            )}
                                                        >
                                                            {child.label}
                                                            <ChevronRight
                                                                className="size-4 shrink-0 text-neutral-400"
                                                                aria-hidden
                                                            />
                                                        </span>
                                                        <div
                                                            role="menu"
                                                            className={cn(
                                                                'absolute left-full top-0 z-10 ml-0 rounded-lg border border-neutral-200/90 bg-white py-3 shadow-lg transition-all duration-200 ease-out',
                                                                child.children.length > 5
                                                                    ? 'grid min-w-[380px] grid-cols-2 gap-x-6 gap-y-0.5'
                                                                    : 'flex min-w-[200px] flex-col gap-1',
                                                                isSubOpen
                                                                    ? 'visible translate-y-0 opacity-100'
                                                                    : 'pointer-events-none invisible -translate-x-1 opacity-0',
                                                            )}
                                                        >
                                                            {child.children.map(
                                                                (sub) => (
                                                                    <Link
                                                                        key={
                                                                            sub.href
                                                                        }
                                                                        href={
                                                                            sub.href
                                                                        }
                                                                        role="menuitem"
                                                                        className="block px-4 py-2.5 text-base text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
                                                                    >
                                                                        {
                                                                            sub.label
                                                                        }
                                                                    </Link>
                                                                ),
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return (
                                                <Link
                                                    key={
                                                        (child as NavLink).href
                                                    }
                                                    href={(child as NavLink).href}
                                                    role="menuitem"
                                                    className="block px-4 py-3 text-base text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
                                                >
                                                    {child.label}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        }
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="rounded-lg px-4 py-3 text-base font-medium text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right: Search + menu button */}
                <div className="flex shrink-0 items-center gap-2">
                    <button
                        type="button"
                        className="flex size-10 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-700 sm:size-11"
                        aria-label="Search"
                    >
                        <Search className="size-5 sm:size-6" />
                    </button>
                    {/* Hamburger: show below xl so desktop nav only when there's room */}
                    <button
                        type="button"
                        className="flex size-10 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 xl:hidden sm:size-11"
                        aria-expanded={mobileMenuOpen}
                        aria-controls="mobile-menu"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <span className="sr-only">Toggle menu</span>
                        <svg
                            className="size-6 sm:size-7"
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
                    className="flex flex-col gap-2 px-4 py-5"
                    aria-label="Mobile main"
                >
                    {mobileNavItems.map((item) => {
                        if (hasGroups(item)) {
                            return (
                                <div
                                    key={item.label}
                                    className="flex flex-col gap-2"
                                >
                                    <span className="px-3 py-2 text-sm font-semibold tracking-wider text-neutral-500 uppercase">
                                        {item.label}
                                    </span>
                                    {item.groups.map((group) => (
                                        <div
                                            key={group.sectionTitle}
                                            className="flex flex-col gap-1 pl-2"
                                        >
                                            <span className="px-2 py-1.5 text-sm font-medium text-neutral-500">
                                                {group.sectionTitle}
                                            </span>
                                            {group.links.map((link) => (
                                                <Link
                                                    key={link.href}
                                                    href={link.href}
                                                    className="rounded-lg px-4 py-3 text-base text-neutral-700 hover:bg-neutral-50"
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
                                    className="flex flex-col gap-2"
                                >
                                    <span className="px-3 py-2 text-sm font-semibold tracking-wider text-neutral-500 uppercase">
                                        {item.label}
                                    </span>
                                    {item.children.map((child) => {
                                        if (hasNestedChildren(child)) {
                                            const useTwoCols = child.children.length > 5;
                                            return (
                                                <div
                                                    key={child.label}
                                                    className={
                                                        useTwoCols
                                                            ? 'flex flex-col gap-1.5 pl-2'
                                                            : 'flex flex-col gap-1 pl-2'
                                                    }
                                                >
                                                    <span className="px-2 py-1.5 text-sm font-medium text-neutral-500">
                                                        {child.label}
                                                    </span>
                                                    <div
                                                        className={
                                                            useTwoCols
                                                                ? 'grid grid-cols-2 gap-x-4 gap-y-0.5'
                                                                : 'flex flex-col'
                                                        }
                                                    >
                                                        {child.children.map(
                                                            (sub) => (
                                                                <Link
                                                                    key={sub.href}
                                                                    href={sub.href}
                                                                    className="rounded-lg px-4 py-3 text-base text-neutral-700 hover:bg-neutral-50"
                                                                    onClick={() =>
                                                                        setMobileMenuOpen(
                                                                            false,
                                                                        )
                                                                    }
                                                                >
                                                                    {sub.label}
                                                                </Link>
                                                            ),
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return (
                                            <Link
                                                key={(child as NavLink).href}
                                                href={(child as NavLink).href}
                                                className="rounded-lg px-4 py-3 text-base text-neutral-700 hover:bg-neutral-50"
                                                onClick={() =>
                                                    setMobileMenuOpen(false)
                                                }
                                            >
                                                {child.label}
                                            </Link>
                                        );
                                    })}
                                </div>
                            );
                        }
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="rounded-lg px-4 py-3 text-base font-medium text-neutral-700 hover:bg-neutral-50"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            </header>
        </div>
    );
}
