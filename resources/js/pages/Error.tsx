import { Head, Link } from '@inertiajs/react';

interface Props {
    status: number;
}

export default function Error({ status }: Props) {
    const title =
        {
            503: '503: Service Unavailable',
            500: '500: Server Error',
            404: '404: Page Not Found',
            403: '403: Forbidden',
        }[status] || 'Error';

    const description =
        {
            503: 'Sorry, we are doing some maintenance. Please check back soon.',
            500: 'Whoops, something went wrong on our servers.',
            404: 'Sorry, the page you are looking for could not be found.',
            403: 'Sorry, you are forbidden from accessing this page.',
        }[status] || 'An unexpected error has occurred.';

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 p-6 text-neutral-300">
            <Head title={title} />

            <div className="flex flex-col items-center gap-8 text-center">
                <Link href="/" className="transition hover:opacity-80">
                    <img
                        src="/hinobaan-logo/Hinobaan_logo.png"
                        alt="Hinobaan Logo"
                        className="h-24 w-auto object-contain sm:h-32"
                    />
                </Link>

                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        {status || 'Error'}
                    </h1>
                    <p className="max-w-md text-base leading-relaxed text-neutral-400 sm:text-lg">
                        {description}
                    </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
                    >
                        Go back home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center rounded-lg border border-neutral-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-900"
                    >
                        Go back
                    </button>
                </div>
            </div>

            <footer className="mt-20 text-xs text-neutral-600">
                &copy; {new Date().getFullYear()} Municipality of Hinobaan. All
                rights reserved.
            </footer>
        </div>
    );
}
