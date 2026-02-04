import { Link } from '@inertiajs/react';
import {
    Building2,
    ChevronDown,
    History,
    LayoutGrid,
    Target,
    Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { NavUser } from '@/components/nav-user';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import { cn } from '@/lib/utils';
import AppLogo from './app-logo';

const dashboardUrl = '/dashboard';
const editHistoryUrl = '/dashboard/history';
const editVisionMissionUrl = '/dashboard/vision-mission';
const editOfficialsUrl = '/dashboard/officials';
const editBarangayUrl = '/dashboard/barangay';

export function AppSidebar() {
    const [aboutOpen, setAboutOpen] = useState(false);
    const { currentUrl, isCurrentUrl } = useCurrentUrl();

    useEffect(() => {
        const isAboutPage =
            currentUrl === editHistoryUrl ||
            currentUrl.startsWith(editHistoryUrl + '/') ||
            currentUrl === editVisionMissionUrl ||
            currentUrl.startsWith(editVisionMissionUrl + '/') ||
            currentUrl === editOfficialsUrl ||
            currentUrl.startsWith(editOfficialsUrl + '/') ||
            currentUrl === editBarangayUrl ||
            currentUrl.startsWith(editBarangayUrl + '/');
        if (isAboutPage) {
            const id = setTimeout(() => setAboutOpen(true), 0);
            return () => clearTimeout(id);
        }
    }, [currentUrl]);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboardUrl} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup className="px-2 py-0">
                    <SidebarGroupLabel>Platform</SidebarGroupLabel>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                isActive={isCurrentUrl(dashboardUrl)}
                                tooltip={{ children: 'Dashboard' }}
                            >
                                <Link href={dashboardUrl} prefetch>
                                    <LayoutGrid className="size-4" />
                                    <span>Dashboard</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>

                <SidebarGroup className="px-2 py-0">
                    <SidebarGroupLabel>Page content editor</SidebarGroupLabel>
                    <SidebarMenu>
                        <Collapsible
                            open={aboutOpen}
                            onOpenChange={setAboutOpen}
                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton
                                        isActive={false}
                                        tooltip={{ children: 'About Us' }}
                                    >
                                        <span>About Us</span>
                                        <ChevronDown
                                            className={cn(
                                                'ml-auto size-4 shrink-0 transition-transform',
                                                aboutOpen && 'rotate-180',
                                            )}
                                        />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton
                                                asChild
                                                isActive={isCurrentUrl(
                                                    editHistoryUrl,
                                                )}
                                            >
                                                <Link
                                                    href={editHistoryUrl}
                                                    prefetch
                                                >
                                                    <History className="size-4" />
                                                    <span>Edit History</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton
                                                asChild
                                                isActive={isCurrentUrl(
                                                    editVisionMissionUrl,
                                                )}
                                            >
                                                <Link
                                                    href={editVisionMissionUrl}
                                                    prefetch
                                                >
                                                    <Target className="size-4" />
                                                    <span>
                                                        Edit Vision & Mission
                                                    </span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton
                                                asChild
                                                isActive={isCurrentUrl(
                                                    editOfficialsUrl,
                                                )}
                                            >
                                                <Link
                                                    href={editOfficialsUrl}
                                                    prefetch
                                                >
                                                    <Users className="size-4" />
                                                    <span>
                                                        Edit Key Officials
                                                    </span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton
                                                asChild
                                                isActive={isCurrentUrl(
                                                    editBarangayUrl,
                                                )}
                                            >
                                                <Link
                                                    href={editBarangayUrl}
                                                    prefetch
                                                >
                                                    <Building2 className="size-4" />
                                                    <span>Edit Barangay</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
