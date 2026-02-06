import { PartyPopper } from 'lucide-react';
import { TourismItemEditor } from '@/components/tourism-item-editor';
import type { TourismItemRow } from '@/components/tourism-item-editor';
import type { BreadcrumbItem } from '@/types';

const dashboardUrl = '/dashboard';
const festivalsEditUrl = '/dashboard/tourism/festivals';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboardUrl },
    { title: 'Tourism', href: dashboardUrl },
    { title: 'Festivals', href: festivalsEditUrl },
];

type FestivalsEditPageProps = {
    items: TourismItemRow[];
    type: string;
};

export default function TourismFestivalsEditPage({
    items,
    type,
}: FestivalsEditPageProps) {
    return (
        <TourismItemEditor
            type={type as 'attraction' | 'resort' | 'festival'}
            pageTitle="Festivals"
            pageDescription="Add and edit festivals. They appear on the public Tourism → Festivals page."
            breadcrumbs={breadcrumbs}
            headTitle="Festivals - Tourism content editor"
            baseUrl={festivalsEditUrl}
            items={items}
            emptyMessage="No festivals yet. Add one using the form above."
            addTitle="Add festival"
            addDescription="Title, description, and 1 or more images. JPEG, PNG, GIF or WebP, max 100 MB each."
            Icon={PartyPopper}
            currentLabel="festival"
        />
    );
}
