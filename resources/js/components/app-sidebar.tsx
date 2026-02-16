import { Link, usePage } from '@inertiajs/react';
import {
    Building2,
    CalendarDays,
    ChevronDown,
    History,
    Info,
    Landmark,
    LayoutGrid,
    MapPin,
    Megaphone,
    PartyPopper,
    Phone,
    Settings,
    Target,
    Users,
    Waves,
    HardHat,
    Briefcase,
    ShieldAlert,
    UserCog,
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
import type { SharedData } from '@/types';
import AppLogo from './app-logo';

const dashboardUrl = '/dashboard';
const editHistoryUrl = '/dashboard/history';
const editVisionMissionUrl = '/dashboard/vision-mission';
const editOfficialsUrl = '/dashboard/officials';
const editBarangayUrl = '/dashboard/barangay';
const editContactUrl = '/dashboard/contact';
const editTourismAttractionUrl = '/dashboard/tourism/attraction';
const editTourismResortsUrl = '/dashboard/tourism/resorts';
const editTourismFestivalsUrl = '/dashboard/tourism/festivals';
const announcementsUrl = '/dashboard/announcements';
const activitiesUrl = '/dashboard/activities';
const projectsUrl = '/dashboard/projects';
const jobsUrl = '/dashboard/jobs';
const editGeneralSettingsUrl = '/dashboard/general-settings';
const editPoliciesUrl = '/dashboard/policies';
const usersUrl = '/dashboard/users';

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const userRole = auth.user.role;
    const isAdmin = userRole === 'admin';

    const [aboutOpen, setAboutOpen] = useState(false);
    const [tourismOpen, setTourismOpen] = useState(false);
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
            currentUrl.startsWith(editBarangayUrl + '/') ||
            currentUrl === editContactUrl ||
            currentUrl.startsWith(editContactUrl + '/');
        if (isAboutPage) {
            const id = setTimeout(() => setAboutOpen(true), 0);
            return () => clearTimeout(id);
        }
    }, [currentUrl]);

    useEffect(() => {
        const isTourismPage =
            currentUrl === editTourismAttractionUrl ||
            currentUrl.startsWith(editTourismAttractionUrl + '/') ||
            currentUrl === editTourismResortsUrl ||
            currentUrl.startsWith(editTourismResortsUrl + '/') ||
            currentUrl === editTourismFestivalsUrl ||
            currentUrl.startsWith(editTourismFestivalsUrl + '/');
        if (isTourismPage) {
            const id = setTimeout(() => setTourismOpen(true), 0);
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
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                isActive={isCurrentUrl(announcementsUrl)}
                                tooltip={{ children: 'News & Announcements' }}
                            >
                                <Link href={announcementsUrl} prefetch>
                                    <Megaphone className="size-4" />
                                    <span>News & Announcements</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                isActive={isCurrentUrl(activitiesUrl)}
                                tooltip={{
                                    children: 'Municipality Activities',
                                }}
                            >
                                <Link href={activitiesUrl} prefetch>
                                    <CalendarDays className="size-4" />
                                    <span>Municipality Activities</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                isActive={isCurrentUrl(projectsUrl)}
                                tooltip={{
                                    children: 'Municipal Projects',
                                }}
                            >
                                <Link href={projectsUrl} prefetch>
                                    <HardHat className="size-4" />
                                    <span>Municipal Projects</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton
                                asChild
                                isActive={isCurrentUrl(jobsUrl)}
                                tooltip={{
                                    children: 'Job Opportunities',
                                }}
                            >
                                <Link href={jobsUrl} prefetch>
                                    <Briefcase className="size-4" />
                                    <span>Job Opportunities</span>
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
                                        <Info className="size-4" />
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
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton
                                                asChild
                                                isActive={isCurrentUrl(
                                                    editContactUrl,
                                                )}
                                            >
                                                <Link
                                                    href={editContactUrl}
                                                    prefetch
                                                >
                                                    <Phone className="size-4" />
                                                    <span>Edit Contact Us</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                        <Collapsible
                            open={tourismOpen}
                            onOpenChange={setTourismOpen}
                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton
                                        isActive={false}
                                        tooltip={{ children: 'Tourism' }}
                                    >
                                        <Landmark className="size-4" />
                                        <span>Tourism</span>
                                        <ChevronDown
                                            className={cn(
                                                'ml-auto size-4 shrink-0 transition-transform',
                                                tourismOpen && 'rotate-180',
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
                                                    editTourismAttractionUrl,
                                                )}
                                            >
                                                <Link
                                                    href={
                                                        editTourismAttractionUrl
                                                    }
                                                    prefetch
                                                >
                                                    <MapPin className="size-4" />
                                                    <span>Attraction</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton
                                                asChild
                                                isActive={isCurrentUrl(
                                                    editTourismResortsUrl,
                                                )}
                                            >
                                                <Link
                                                    href={editTourismResortsUrl}
                                                    prefetch
                                                >
                                                    <Waves className="size-4" />
                                                    <span>Resorts</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton
                                                asChild
                                                isActive={isCurrentUrl(
                                                    editTourismFestivalsUrl,
                                                )}
                                            >
                                                <Link
                                                    href={
                                                        editTourismFestivalsUrl
                                                    }
                                                    prefetch
                                                >
                                                    <PartyPopper className="size-4" />
                                                    <span>Festivals</span>
                                                </Link>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isCurrentUrl(editPoliciesUrl)}
                                    tooltip={{
                                        children: 'Legal & Privacy Policies',
                                    }}
                                >
                                    <Link href={editPoliciesUrl} prefetch>
                                        <ShieldAlert className="size-4" />
                                        <span>Legal & Policies</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            {isAdmin && (
                                <>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isCurrentUrl(
                                                editGeneralSettingsUrl,
                                            )}
                                            tooltip={{
                                                children: 'General Settings',
                                            }}
                                        >
                                            <Link
                                                href={editGeneralSettingsUrl}
                                                prefetch
                                            >
                                                <Settings className="size-4" />
                                                <span>General Settings</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isCurrentUrl(usersUrl)}
                                            tooltip={{
                                                children: 'User Management',
                                            }}
                                        >
                                            <Link href={usersUrl} prefetch>
                                                <UserCog className="size-4" />
                                                <span>User Management</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </>
                            )}
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
