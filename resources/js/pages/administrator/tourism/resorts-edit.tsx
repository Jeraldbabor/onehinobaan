import { Waves } from 'lucide-react';
import { TourismItemEditor } from '@/components/tourism-item-editor';
import type { BreadcrumbItem } from '@/types';
import type { TourismItemRow } from '@/components/tourism-item-editor';

const dashboardUrl = '/dashboard';
const resortsEditUrl = '/dashboard/tourism/resorts';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboardUrl },
    { title: 'Tourism', href: dashboardUrl },
    { title: 'Resorts', href: resortsEditUrl },
];

type ResortsEditPageProps = {
    items: TourismItemRow[];
    type: string;
};

export default function TourismResortsEditPage({
    items,
    type,
}: ResortsEditPageProps) {
    return (
        <TourismItemEditor
            type={type as 'attraction' | 'resort' | 'festival'}
            pageTitle="Resorts"
            pageDescription="Add and edit resorts. They appear on the public Tourism → Resorts page."
            breadcrumbs={breadcrumbs}
            headTitle="Resorts - Tourism content editor"
            baseUrl={resortsEditUrl}
            items={items}
            emptyMessage="No resorts yet. Add one using the form above."
            addTitle="Add resort"
            addDescription="Title, description, and 1 or more images. JPEG, PNG, GIF or WebP, max 100 MB each."
            Icon={Waves}
            currentLabel="resort"
        />
    );
}
