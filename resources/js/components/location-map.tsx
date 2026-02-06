import { Suspense, lazy, useEffect, useState } from 'react';

/** Default center: Hinoba-an, Negros Occidental [lat, lng] */
export const DEFAULT_CENTER: [number, number] = [9.6017, 122.467];

const LocationMapLeaflet = lazy(() =>
    import('./location-map-leaflet').then((m) => ({
        default: m.LocationMapLeaflet,
    })),
);

type LocationMapProps = {
    /** Center [lat, lng]. Defaults to Hinoba-an. */
    center?: [number, number];
    /** Optional marker position [lat, lng]. If not set, uses center. */
    marker?: [number, number] | null;
    /** Optional marker popup text. */
    markerTitle?: string;
    className?: string;
    height?: string | number;
};

export function LocationMap({
    center = DEFAULT_CENTER,
    marker = null,
    markerTitle,
    className = '',
    height = 320,
}: LocationMapProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const markerPos = marker ?? center;
    const heightStyle =
        typeof height === 'number' ? `${height}px` : height;

    if (!mounted) {
        return (
            <div
                className={className}
                style={{
                    height: heightStyle,
                    background: '#e2e8f0',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#64748b',
                    fontSize: '0.875rem',
                }}
            >
                Loading map…
            </div>
        );
    }

    return (
        <div className={className} style={{ height: heightStyle }}>
            <Suspense
                fallback={
                    <div
                        style={{
                            height: '100%',
                            background: '#e2e8f0',
                            borderRadius: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#64748b',
                            fontSize: '0.875rem',
                        }}
                    >
                        Loading map…
                    </div>
                }
            >
                <LocationMapLeaflet
                    center={center}
                    marker={markerPos}
                    markerTitle={markerTitle}
                />
            </Suspense>
        </div>
    );
}
