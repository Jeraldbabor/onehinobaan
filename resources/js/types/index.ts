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
    citizens_charter_url: string;
};

export type Contact = {
    address: string;
    phone: string;
    email: string;
    facebook_municipality_url: string;
    facebook_mayor_url: string;
    map_embed_url: string;
    hotlines: Array<{ label: string; number: string }>;
};

export type SharedData = {
    name: string;
    auth: Auth;
    sidebarOpen: boolean;
    generalSettings: GeneralSettings;
    contact: Contact;
    [key: string]: unknown;
};

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & SharedData;
