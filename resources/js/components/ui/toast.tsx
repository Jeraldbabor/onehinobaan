import { Transition } from '@headlessui/react';
import { Check, X } from 'lucide-react';
import { useEffect } from 'react';

import { cn } from '@/lib/utils';

export type ToastProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    description?: string;
    duration?: number;
    className?: string;
    /** Show a close button to dismiss early. Default true. */
    dismissible?: boolean;
};

const DEFAULT_DURATION = 3000;

export function Toast({
    open,
    onOpenChange,
    title = 'Saved',
    description,
    duration = DEFAULT_DURATION,
    className,
    dismissible = true,
}: ToastProps) {
    useEffect(() => {
        if (!open) return;
        const timer = setTimeout(() => onOpenChange(false), duration);
        return () => clearTimeout(timer);
    }, [open, duration, onOpenChange]);

    return (
        <Transition
            show={open}
            enter="transition ease-out duration-300"
            enterFrom="opacity-0 translate-x-6 scale-95"
            enterTo="opacity-100 translate-x-0 scale-100"
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100 translate-x-0 scale-100"
            leaveTo="opacity-0 translate-x-4 scale-95"
        >
            <div
                role="status"
                aria-live="polite"
                className={cn(
                    'fixed bottom-6 right-6 z-50 w-full max-w-sm flex items-start gap-3 rounded-xl border border-border/80 bg-card px-4 py-3.5 shadow-xl ring-1 ring-black/5',
                    className
                )}
            >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                    <Check className="size-5" strokeWidth={2.5} aria-hidden />
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                    <p className="font-semibold text-foreground">{title}</p>
                    {description && (
                        <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
                    )}
                </div>
                {dismissible && (
                    <button
                        type="button"
                        onClick={() => onOpenChange(false)}
                        className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                        aria-label="Dismiss"
                    >
                        <X className="size-4" />
                    </button>
                )}
            </div>
        </Transition>
    );
}
