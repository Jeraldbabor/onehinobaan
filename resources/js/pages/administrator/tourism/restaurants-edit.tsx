import { LayoutGrid } from 'lucide-react';
import { TourismItemEditor } from '@/components/tourism-item-editor';
import type { TourismItemRow } from '@/components/tourism-item-editor';
import type { BreadcrumbItem } from '@/types';

const dashboardUrl = '/dashboard';
const restaurantsEditUrl = '/dashboard/tourism/restaurants';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboardUrl },
    { title: 'Tourism', href: dashboardUrl },
    { title: 'Restaurants', href: restaurantsEditUrl },
];

type RestaurantsEditPageProps = {
    items: TourismItemRow[];
    type: string;
};

export default function TourismRestaurantsEditPage({
    items,
    type,
}: RestaurantsEditPageProps) {
    return (
        <TourismItemEditor
            type={type as 'attraction' | 'resort' | 'festival' | 'restaurant'}
            pageTitle="Restaurants"
            pageDescription="Add and edit restaurants. They appear on the public Tourism section of the website."
            breadcrumbs={breadcrumbs}
            headTitle="Restaurants - Tourism content editor"
            baseUrl={restaurantsEditUrl}
            items={items}
            emptyMessage="No restaurants yet. Add one using the form above."
            addTitle="Add restaurant"
            addDescription="Title, description, and 1 or more images. JPEG, PNG, GIF or WebP, max 100 MB each."
            Icon={LayoutGrid}
            currentLabel="restaurant"
        />
    );
}
