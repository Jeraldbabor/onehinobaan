import type { InertiaLinkProps } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import { toUrl } from '@/lib/utils';

export type IsCurrentUrlFn = (
    urlToCheck: NonNullable<InertiaLinkProps['href']>,
    currentUrl?: string,
) => boolean;

export type WhenCurrentUrlFn = <TIfTrue, TIfFalse = null>(
    urlToCheck: NonNullable<InertiaLinkProps['href']>,
    ifTrue: TIfTrue,
    ifFalse?: TIfFalse,
) => TIfTrue | TIfFalse;

export type UseCurrentUrlReturn = {
    currentUrl: string;
    isCurrentUrl: IsCurrentUrlFn;
    whenCurrentUrl: WhenCurrentUrlFn;
};

function normalizePath(path: string): string {
    const p = path.replace(/\/+$/, '') || '/';
    return p;
}

export function useCurrentUrl(): UseCurrentUrlReturn {
    const page = usePage();
    const rawPath = new URL(page.url, window?.location.origin).pathname;
    const currentUrlPath = normalizePath(rawPath);

    const isCurrentUrl: IsCurrentUrlFn = (
        urlToCheck: NonNullable<InertiaLinkProps['href']>,
        currentUrl?: string,
    ) => {
        const urlToCompare = normalizePath(currentUrl ?? currentUrlPath);
        let urlString = toUrl(urlToCheck);
        if (!urlString.startsWith('http')) {
            urlString = normalizePath(urlString);
            return urlString === urlToCompare;
        }

        try {
            const absoluteUrl = new URL(urlString);
            return normalizePath(absoluteUrl.pathname) === urlToCompare;
        } catch {
            return false;
        }
    };

    const whenCurrentUrl: WhenCurrentUrlFn = <TIfTrue, TIfFalse = null>(
        urlToCheck: NonNullable<InertiaLinkProps['href']>,
        ifTrue: TIfTrue,
        ifFalse: TIfFalse = null as TIfFalse,
    ): TIfTrue | TIfFalse => {
        return isCurrentUrl(urlToCheck) ? ifTrue : ifFalse;
    };

    return {
        currentUrl: currentUrlPath,
        isCurrentUrl,
        whenCurrentUrl,
    };
}
