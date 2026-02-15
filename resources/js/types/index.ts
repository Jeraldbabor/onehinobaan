export type * from './auth';
export type * from './navigation';
export type * from './ui';

import type { Auth } from './auth';

export type GeneralSettings = {
    main_logo_url: string;
    bp_logo_url: string;
    one_hinobaan_logo_url: string;
    transparency_seal_url: string;
    landing_video_url: string;
    sub_page_banner_url: string;
    full_disclosure_banner_url: string;
    full_disclosure_url: string;
};

export type SharedData = {
    name: string;
    auth: Auth;
    sidebarOpen: boolean;
    generalSettings: GeneralSettings;
    [key: string]: unknown;
};

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & SharedData;
