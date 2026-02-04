import { cn } from '@/lib/utils';

export default function AppLogo() {
    return (
        <div className="flex w-full items-center justify-center gap-2">
            <img
                src="/hinobaan-logo/Hinobaan_logo.png"
                alt=""
                className="size-8 shrink-0 object-contain align-middle"
            />
            <span
                className={cn(
                    'truncate text-sm font-semibold text-sidebar-foreground',
                    'group-data-[collapsible=icon]:hidden'
                )}
            >
                Hinoba-an
            </span>
            <img
                src="/hinobaan-logo/Onehinoba-an%20logo.png"
                alt=""
                className={cn(
                    'h-8 w-auto shrink-0 object-contain align-middle',
                    'hidden sm:block',
                    'group-data-[collapsible=icon]:hidden'
                )}
            />
        </div>
    );
}
