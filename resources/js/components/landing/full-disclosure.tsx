import { Link, usePage } from '@inertiajs/react';
import type { PageProps } from '@/types';

interface FullDisclosureProps {
    className?: string;
}

export default function FullDisclosure({
    className = '',
}: FullDisclosureProps) {
    const { generalSettings } = usePage<PageProps>().props;

    return (
        <section className={`bg-white py-6 sm:py-8 ${className}`}>
            <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
                <Link
                    href="/transparency/full-disclosure"
                    className="block overflow-hidden rounded-lg shadow-md transition hover:shadow-lg focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 focus:outline-none"
                >
                    <img
                        src={
                            generalSettings?.full_disclosure_banner_url ||
                            '/images/full-disclosure.png'
                        }
                        alt="Full Disclosure Policy Portal - Advancing Transparency, Promoting Accountability"
                        className="h-auto w-full object-cover"
                        onError={(e) => {
                            // Fallback if image doesn't load immediately - show a styled placeholder
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.parentElement?.classList.add(
                                'bg-blue-900',
                                'p-8',
                                'text-white',
                                'text-center',
                            );
                            if (target.parentElement) {
                                target.parentElement.innerHTML = `
                                    <div class="flex flex-col items-center justify-center space-y-2">
                                        <h2 class="text-2xl font-bold uppercase tracking-widest">Full Disclosure Policy Portal</h2>
                                        <p class="text-sm font-medium opacity-90">Advancing Transparency, Promoting Accountability</p>
                                    </div>
                                `;
                            }
                        }}
                    />
                </Link>
            </div>
        </section>
    );
}
