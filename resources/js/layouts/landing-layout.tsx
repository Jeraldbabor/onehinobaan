import type { ReactNode } from 'react';
import { CookieConsent } from '@/components/landing/cookie-consent';
import { LandingFooter } from '@/components/landing/landing-footer';
import { LandingHeader } from '@/components/landing/landing-header';

type LandingLayoutProps = {
    children: ReactNode;
};

export default function LandingLayout({ children }: LandingLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-neutral-50">
            <LandingHeader />
            <main className="flex-1">{children}</main>
            <LandingFooter />
            <CookieConsent />
        </div>
    );
}
