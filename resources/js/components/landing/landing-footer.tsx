import { Link } from '@inertiajs/react';
import { Mail, MapPin, Phone } from 'lucide-react';

const footerSections = [
    {
        title: 'About',
        links: [
            { label: 'History', href: '/about/history' },
            { label: 'Vision & Mission', href: '/about/vision-mission' },
            { label: 'Officials', href: '/about/officials' },
        ],
    },
    {
        title: 'Transparency',
        links: [
            {
                label: "Citizen's Charter",
                href: '/transparency/citizens-charter',
            },
            { label: 'Full Disclosure', href: '/transparency/full-disclosure' },
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
        title: 'Services',
        links: [
            { label: 'Business Permits', href: '/services/business-permits' },
            { label: 'Civil Registry', href: '/services/civil-registry' },
            { label: 'Contact Us', href: '/contact' },
        ],
    },
];

const contactInfo = [
    { icon: MapPin, label: 'Hinobaan, Negros Occidental, Philippines' },
    { icon: Phone, label: '(034) 123-4567' },
    { icon: Mail, label: 'info@hinobaan.gov.ph' },
];

export function LandingFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-neutral-200 bg-neutral-900 text-neutral-300">
            <div className="mx-auto max-w-7xl px-3 py-8 sm:px-6 sm:py-14 lg:px-8">
                <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-5">
                    {/* Brand + logos + contact */}
                    <div className="sm:col-span-2 lg:col-span-2">
                        <Link
                            href="/"
                            className="inline-flex flex-wrap items-center gap-2 sm:gap-4"
                        >
                            <img
                                src="/hinobaan-logo/Hinobaan_logo.png"
                                alt=""
                                className="h-10 w-auto object-contain sm:h-14"
                            />
                            <img
                                src="/hinobaan-logo/Onehinoba-an%20logo.png"
                                alt=""
                                className="h-8 w-auto object-contain sm:h-12"
                            />
                            <img
                                src="/hinobaan-logo/BP_Logo.webp"
                                alt=""
                                className="h-7 w-auto object-contain opacity-90 sm:h-9"
                            />
                        </Link>
                        <p className="mt-4 text-base font-semibold text-white">
                            Municipality of Hinobaan
                        </p>
                        <p className="mt-2 max-w-sm text-sm leading-relaxed text-neutral-400">
                            Official website of the Municipal Government of
                            Hinobaan, Negros Occidental. Serving our community
                            with transparency and dedication.
                        </p>
                        <ul className="mt-6 space-y-3">
                            {contactInfo.map(({ icon: Icon, label }) => (
                                <li
                                    key={label}
                                    className="flex items-start gap-3 text-sm text-neutral-400"
                                >
                                    <Icon
                                        className="mt-0.5 size-4 shrink-0 text-neutral-500"
                                        aria-hidden
                                    />
                                    <span>{label}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Link columns */}
                    {footerSections.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-sm font-semibold tracking-wider text-white">
                                {section.title}
                            </h3>
                            <ul className="mt-4 space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-neutral-400 transition hover:text-white"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                {/* Bottom bar */}
                <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-neutral-800 pt-6 sm:mt-14 sm:flex-row sm:gap-4 sm:pt-8">
                    <p className="text-center text-xs text-neutral-500 sm:text-left sm:text-sm">
                        © {currentYear} Municipality of Hinobaan. All rights
                        reserved.
                    </p>
                    <div className="flex gap-6 text-sm">
                        <Link
                            href="/privacy"
                            className="text-neutral-500 transition hover:text-neutral-400"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="/accessibility"
                            className="text-neutral-500 transition hover:text-neutral-400"
                        >
                            Accessibility
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
