import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { search } from '@/routes';
import type { PageProps } from '@/types';

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

type SearchResult = {
    id: string | number;
    url: string;
    title: string;
};

/** Primary nav: fewer items so the bar is less busy. Transparency, Services, Job Opportunities live under "More". */
const primaryNavItems: NavItem[] = [
    { label: 'Home', href: '/' },
    {
        label: 'About Us',
        children: [
            { label: 'History', href: '/about/history' },
            { label: 'Vision & Mission', href: '/about/vision-mission' },
            { label: 'Barangay', href: '/about/barangay' },
        ],
    },
    {
        label: 'Officials',
        children: [
            { label: 'All Officials', href: '/about/officials' },
            { label: 'Our Mayor', href: '/about/officials/mayor' },
            {
                label: 'Vice Mayor',
                href: '/about/officials/vice-mayor',
            },
            { label: 'SB Member', href: '/about/officials/sb-member' },
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
            { label: 'Barangay', href: '/about/barangay' },
        ],
    },
    {
        label: 'Key Officials',
        children: [
            { label: 'All Officials', href: '/about/officials' },
            { label: 'Our Mayor', href: '/about/officials/mayor' },
            {
                label: 'Vice Mayor',
                href: '/about/officials/vice-mayor',
            },
            { label: 'SB Member', href: '/about/officials/sb-member' },
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
function hasNestedChildren(child: NavChild): child is NavLinkWithNested {
    return (
        'children' in child &&
        Array.isArray((child as NavLinkWithNested).children) &&
        (child as NavLinkWithNested).children.length > 0
    );
}
export function LandingHeader() {
    const { generalSettings } = usePage<PageProps>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileExpandedSection, setMobileExpandedSection] = useState<
        string | null
    >(null);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);
    const [bannerVisible, setBannerVisible] = useState(true);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const subCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
        null,
    );
    const lastScrollY = useRef(0);
    const tickingRef = useRef(false);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileMenuOpen]);

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
                    bannerVisible ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                )}
            >
                <div className="min-h-0">
                    <div className="mx-auto flex max-w-7xl flex-col items-center gap-1.5 px-3 py-2 sm:flex-row sm:justify-between sm:gap-4 sm:px-6 sm:py-4 xl:px-8">
                        {/* Logo + Text - centered on mobile, left-aligned on desktop */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            <img
                                src={
                                    generalSettings?.main_logo_url ||
                                    '/hinobaan-logo/Hinobaan_logo.png'
                                }
                                alt=""
                                className="h-8 w-auto shrink-0 object-contain sm:h-12 md:h-16"
                            />
                            <div className="text-center sm:text-left">
                                <p className="text-[10px] font-medium text-neutral-600 sm:text-sm">
                                    Official Website of the
                                </p>
                                <p className="text-xs font-semibold text-neutral-700 sm:text-base md:text-xl">
                                    <span className="font-bold text-orange-700">
                                        L
                                    </span>
                                    ocal{' '}
                                    <span className="font-bold text-orange-700">
                                        G
                                    </span>
                                    overnment{' '}
                                    <span className="font-bold text-orange-700">
                                        U
                                    </span>
                                    nit of{' '}
                                    <span className="font-bold text-orange-700">
                                        H
                                    </span>
                                    inoba-an
                                </p>
                            </div>
                        </div>
                        {/* Partner logos - smaller on mobile */}
                        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                            <img
                                src={
                                    generalSettings?.bp_logo_url ||
                                    '/hinobaan-logo/BP_Logo.webp'
                                }
                                alt=""
                                className="h-6 w-auto object-contain sm:h-10 md:h-14"
                            />
                            <img
                                src={
                                    generalSettings?.one_hinobaan_logo_url ||
                                    '/hinobaan-logo/Onehinoba-an%20logo.png'
                                }
                                alt="One Hinoba-an"
                                className="h-6 w-auto object-contain sm:h-10 md:h-14"
                            />
                            <img
                                src={
                                    generalSettings?.transparency_seal_url ||
                                    '/hinobaan-logo/transparency.png'
                                }
                                alt="Transparency Seal"
                                className="h-6 w-auto object-contain sm:h-10 md:h-14"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* Main nav */}
            <header className="border-b border-neutral-200/80 bg-white/98 shadow-sm shadow-neutral-200/50 backdrop-blur-sm">
                <div className="mx-auto flex h-12 max-w-7xl items-center justify-between gap-2 px-3 sm:h-16 sm:gap-4 sm:px-6 xl:px-8">
                    {/* Left: logos + name — slightly smaller for less visual weight */}
                    <Link
                        href="/"
                        className="flex shrink-0 items-center gap-2 opacity-90 transition hover:opacity-100 sm:gap-3"
                        aria-label="Municipality of Hinoba-an - Home"
                    >
                        <img
                            src={
                                generalSettings?.main_logo_url ||
                                '/hinobaan-logo/Hinobaan_logo.png'
                            }
                            alt=""
                            className="h-7 w-auto object-contain sm:h-9"
                        />
                        <span className="hidden text-sm font-semibold tracking-tight text-neutral-800 sm:inline sm:text-base md:text-lg">
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
                                        onMouseEnter={() =>
                                            handleDropdownEnter(id)
                                        }
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
                                                'absolute top-full right-0 mt-0 w-75 rounded-lg border border-neutral-200/90 bg-white py-3 shadow-lg transition-all duration-200 ease-out',
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
                                        onMouseEnter={() =>
                                            handleDropdownEnter(id)
                                        }
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
                                                'absolute top-full left-0 mt-0 min-w-55 rounded-lg border border-neutral-200/90 bg-white py-2.5 shadow-lg transition-all duration-200 ease-out',
                                                isOpen
                                                    ? 'visible translate-y-0 opacity-100'
                                                    : 'pointer-events-none invisible -translate-y-1 opacity-0',
                                            )}
                                        >
                                            {item.children.map((child) => {
                                                const subKey = `${id}-${child.label.toLowerCase().replace(/\s+/g, '-')}`;
                                                const isSubOpen =
                                                    openSubDropdown === subKey;
                                                if (hasNestedChildren(child)) {
                                                    return (
                                                        <div
                                                            key={subKey}
                                                            className="relative"
                                                            onMouseEnter={() =>
                                                                handleSubDropdownEnter(
                                                                    subKey,
                                                                )
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
                                                                    'absolute top-0 left-full z-10 ml-0 rounded-lg border border-neutral-200/90 bg-white py-3 shadow-lg transition-all duration-200 ease-out',
                                                                    child
                                                                        .children
                                                                        .length >
                                                                        5
                                                                        ? 'grid min-w-95 grid-cols-2 gap-x-6 gap-y-0.5'
                                                                        : 'flex min-w-50 flex-col gap-1',
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
                                                            (child as NavLink)
                                                                .href
                                                        }
                                                        href={
                                                            (child as NavLink)
                                                                .href
                                                        }
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
                    <div className="flex shrink-0 items-center gap-1 sm:gap-2">
                        {isSearchOpen ? (
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    import('@inertiajs/react').then(
                                        ({ router }) => {
                                            router.visit(
                                                search.url({
                                                    query: { q: searchQuery },
                                                }),
                                            );
                                        },
                                    );
                                }}
                                className="relative flex items-center"
                            >
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        const query = e.target.value;
                                        setSearchQuery(query);
                                        if (query.length > 0) {
                                            fetch(
                                                search.url({
                                                    query: { q: query },
                                                }),
                                                {
                                                    headers: {
                                                        Accept: 'application/json',
                                                        'X-Requested-With':
                                                            'XMLHttpRequest',
                                                    },
                                                },
                                            )
                                                .then((res) => res.json())
                                                .then((data) => {
                                                    setSearchResults(data);
                                                })
                                                .catch((err) =>
                                                    console.error(err),
                                                );
                                        } else {
                                            setSearchResults([]);
                                        }
                                    }}
                                    placeholder="Search..."
                                    className="h-9 w-40 rounded-lg border border-neutral-300 bg-white px-3 py-1 text-sm text-neutral-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 focus:outline-none sm:w-60"
                                    onBlur={() => {
                                        // Delay closing to allow clicking on results
                                        setTimeout(() => {
                                            if (!searchQuery)
                                                setIsSearchOpen(false);
                                            setSearchResults([]);
                                        }, 200);
                                    }}
                                    onFocus={() => {
                                        if (searchQuery.length > 0) {
                                            fetch(
                                                search.url({
                                                    query: { q: searchQuery },
                                                }),
                                                {
                                                    headers: {
                                                        Accept: 'application/json',
                                                        'X-Requested-With':
                                                            'XMLHttpRequest',
                                                    },
                                                },
                                            )
                                                .then((res) => res.json())
                                                .then((data) =>
                                                    setSearchResults(data),
                                                );
                                        }
                                    }}
                                />

                                {searchQuery.length > 0 && (
                                    <div className="absolute top-full left-0 z-50 mt-1 w-full rounded-lg border border-neutral-200 bg-white py-1 shadow-lg">
                                        {searchResults.length > 0 ? (
                                            searchResults.map(
                                                (
                                                    result: {
                                                        id: string | number;
                                                        url: string;
                                                        title: string;
                                                    },
                                                    idx,
                                                ) => (
                                                    <Link
                                                        key={`search-result-${result.id}-${idx}`}
                                                        href={result.url || '#'}
                                                        className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                                                    >
                                                        {result.title}
                                                    </Link>
                                                ),
                                            )
                                        ) : (
                                            <div className="px-4 py-2 text-sm text-neutral-500">
                                                No results found.
                                            </div>
                                        )}
                                        <Link
                                            href={search.url({
                                                query: { q: searchQuery },
                                            })}
                                            className="block border-t border-neutral-100 px-4 py-2 text-center text-xs font-medium text-blue-600 hover:bg-neutral-50"
                                        >
                                            View all results
                                        </Link>
                                    </div>
                                )}
                                <button
                                    type="submit"
                                    className="absolute right-2 text-neutral-400 hover:text-orange-600"
                                >
                                    <Search className="size-4" />
                                </button>
                            </form>
                        ) : (
                            <button
                                type="button"
                                className="flex size-9 items-center justify-center rounded-lg text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-700 sm:size-11"
                                aria-label="Search"
                                onClick={() => {
                                    setIsSearchOpen(true);
                                    setTimeout(
                                        () => searchInputRef.current?.focus(),
                                        100,
                                    );
                                }}
                            >
                                <Search className="size-4 sm:size-6" />
                            </button>
                        )}
                        {/* Hamburger: show below xl so desktop nav only when there's room */}
                        <button
                            type="button"
                            className="flex size-9 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100 sm:size-11 xl:hidden"
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-menu"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className="sr-only">Toggle menu</span>
                            <svg
                                className="size-5 sm:size-7"
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
            </header>

            {/* Mobile / tablet menu – full-screen slide-in drawer from right */}
            <div
                id="mobile-menu"
                className={cn(
                    'fixed inset-0 z-100 xl:hidden',
                    mobileMenuOpen
                        ? 'visible'
                        : 'pointer-events-none invisible',
                )}
            >
                {/* Backdrop */}
                <div
                    className={cn(
                        'absolute inset-0 bg-black/40 transition-opacity duration-300',
                        mobileMenuOpen ? 'opacity-100' : 'opacity-0',
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-hidden="true"
                />
                {/* Drawer panel */}
                <div
                    className={cn(
                        'absolute top-0 right-0 flex h-full w-[85vw] max-w-sm flex-col bg-white shadow-xl transition-transform duration-300 ease-in-out',
                        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full',
                    )}
                >
                    {/* Drawer header */}
                    <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
                        <div className="flex items-center gap-2">
                            <img
                                src={
                                    generalSettings?.main_logo_url ||
                                    '/hinobaan-logo/Hinobaan_logo.png'
                                }
                                alt=""
                                className="h-8 w-auto object-contain"
                            />
                            <span className="text-sm font-semibold text-neutral-800">
                                Hinoba-an
                            </span>
                        </div>
                        <button
                            type="button"
                            className="flex size-9 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-100"
                            onClick={() => setMobileMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <svg
                                className="size-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    {/* Drawer body – scrollable */}
                    <nav
                        className="flex-1 overflow-y-auto overscroll-contain px-4 py-3"
                        aria-label="Mobile main"
                    >
                        <div className="flex flex-col gap-1">
                            {mobileNavItems.map((item, index) => {
                                const sectionKey = `mobile-section-${item.label}-${index}`;
                                const isExpanded =
                                    mobileExpandedSection === item.label;

                                // Simple link without children
                                if (!hasChildren(item) && !hasGroups(item)) {
                                    return (
                                        <Link
                                            key={`mobile-link-${item.href}`}
                                            href={item.href}
                                            className="rounded-lg px-3 py-2.5 text-base font-medium text-neutral-700 hover:bg-neutral-50"
                                            onClick={() =>
                                                setMobileMenuOpen(false)
                                            }
                                        >
                                            {item.label}
                                        </Link>
                                    );
                                }

                                // Collapsible section with children or groups
                                return (
                                    <div
                                        key={sectionKey}
                                        className="flex flex-col"
                                    >
                                        <button
                                            type="button"
                                            className={cn(
                                                'flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-base font-medium transition-colors',
                                                isExpanded
                                                    ? 'bg-neutral-100 text-neutral-900'
                                                    : 'text-neutral-700 hover:bg-neutral-50',
                                            )}
                                            onClick={() =>
                                                setMobileExpandedSection(
                                                    isExpanded
                                                        ? null
                                                        : item.label,
                                                )
                                            }
                                            aria-expanded={isExpanded}
                                        >
                                            {item.label}
                                            <ChevronDown
                                                className={cn(
                                                    'size-5 shrink-0 text-neutral-400 transition-transform duration-200',
                                                    isExpanded && 'rotate-180',
                                                )}
                                                aria-hidden
                                            />
                                        </button>
                                        <div
                                            className={cn(
                                                'grid transition-all duration-200 ease-out',
                                                isExpanded
                                                    ? 'grid-rows-[1fr] opacity-100'
                                                    : 'grid-rows-[0fr] opacity-0',
                                            )}
                                        >
                                            <div className="overflow-hidden">
                                                <div className="flex flex-col gap-0.5 pt-1 pb-1 pl-3">
                                                    {hasGroups(item) &&
                                                        item.groups.map(
                                                            (group, gIdx) => (
                                                                <div
                                                                    key={`mobile-group-${group.sectionTitle}-${gIdx}`}
                                                                    className="flex flex-col"
                                                                >
                                                                    <span className="px-3 py-1.5 text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                                                                        {
                                                                            group.sectionTitle
                                                                        }
                                                                    </span>
                                                                    {group.links.map(
                                                                        (
                                                                            link,
                                                                        ) => (
                                                                            <Link
                                                                                key={`mobile-group-link-${link.href}`}
                                                                                href={
                                                                                    link.href
                                                                                }
                                                                                className="rounded-lg px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                                                                                onClick={() =>
                                                                                    setMobileMenuOpen(
                                                                                        false,
                                                                                    )
                                                                                }
                                                                            >
                                                                                {
                                                                                    link.label
                                                                                }
                                                                            </Link>
                                                                        ),
                                                                    )}
                                                                </div>
                                                            ),
                                                        )}
                                                    {hasChildren(item) &&
                                                        item.children.map(
                                                            (child, cIdx) => {
                                                                if (
                                                                    hasNestedChildren(
                                                                        child,
                                                                    )
                                                                ) {
                                                                    return (
                                                                        <div
                                                                            key={`mobile-child-nested-${child.label}-${cIdx}`}
                                                                            className="flex flex-col"
                                                                        >
                                                                            <span className="px-3 py-1.5 text-xs font-semibold tracking-wider text-neutral-400 uppercase">
                                                                                {
                                                                                    child.label
                                                                                }
                                                                            </span>
                                                                            {child.children.map(
                                                                                (
                                                                                    sub,
                                                                                ) => (
                                                                                    <Link
                                                                                        key={`mobile-sub-link-${sub.href}`}
                                                                                        href={
                                                                                            sub.href
                                                                                        }
                                                                                        className="rounded-lg px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                                                                                        onClick={() =>
                                                                                            setMobileMenuOpen(
                                                                                                false,
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            sub.label
                                                                                        }
                                                                                    </Link>
                                                                                ),
                                                                            )}
                                                                        </div>
                                                                    );
                                                                }
                                                                return (
                                                                    <Link
                                                                        key={`mobile-child-link-${(child as NavLink).href}`}
                                                                        href={
                                                                            (
                                                                                child as NavLink
                                                                            )
                                                                                .href
                                                                        }
                                                                        className="rounded-lg px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                                                                        onClick={() =>
                                                                            setMobileMenuOpen(
                                                                                false,
                                                                            )
                                                                        }
                                                                    >
                                                                        {
                                                                            child.label
                                                                        }
                                                                    </Link>
                                                                );
                                                            },
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}
