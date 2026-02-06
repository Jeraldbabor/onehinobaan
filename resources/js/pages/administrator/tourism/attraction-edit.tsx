import { MapPin } from 'lucide-react';
import { TourismItemEditor } from '@/components/tourism-item-editor';
import type { BreadcrumbItem } from '@/types';
import type { TourismItemRow } from '@/components/tourism-item-editor';

const dashboardUrl = '/dashboard';
const attractionEditUrl = '/dashboard/tourism/attraction';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboardUrl },
    { title: 'Tourism', href: dashboardUrl },
    { title: 'Attraction', href: attractionEditUrl },
];

type AttractionEditPageProps = {
    items: TourismItemRow[];
    type: string;
};

export default function TourismAttractionEditPage({
    items,
    type,
}: AttractionEditPageProps) {
    return (
        <TourismItemEditor
            type={type as 'attraction' | 'resort' | 'festival'}
            pageTitle="Attraction"
            pageDescription="Add and edit tourist attractions. They appear on the public Tourism → Attraction page."
            breadcrumbs={breadcrumbs}
            headTitle="Attraction - Tourism content editor"
            baseUrl={attractionEditUrl}
            items={items}
            emptyMessage="No attractions yet. Add one using the form above."
            addTitle="Add attraction"
            addDescription="Title, description, and 1 or more images. JPEG, PNG, GIF or WebP, max 100 MB each."
            Icon={MapPin}
            currentLabel="attraction"
        />
    );
}
