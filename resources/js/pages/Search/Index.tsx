import { Head, Link } from '@inertiajs/react';
import LandingLayout from '@/layouts/landing-layout';

type SearchResult = {
    type: string;
    title: string;
    description: string;
    url: string;
    image: string | null;
    date: string | null;
};

type SearchProps = {
    query: string;
    results: SearchResult[];
};

export default function SearchIndex({ query, results }: SearchProps) {
    return (
        <LandingLayout>
            <Head title={`Search Results for "${query}"`} />

            <div className="bg-white py-12 sm:py-16 md:py-20 lg:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Search Results
                        </h1>
                        <p className="mt-2 text-lg text-slate-600">
                            {results.length} result(s) found for{' '}
                            <span className="font-semibold text-slate-900">
                                "{query}"
                            </span>
                        </p>

                        <div className="mt-8 space-y-8">
                            {results.length === 0 ? (
                                <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
                                    <p className="text-slate-500">
                                        No results found for your query. Try
                                        checking your spelling or use different
                                        keywords.
                                    </p>
                                </div>
                            ) : (
                                <ul className="divide-y divide-slate-200">
                                    {results.map((result, index) => (
                                        <li
                                            key={index}
                                            className="py-6 first:pt-0"
                                        >
                                            <article className="flex flex-col gap-4 sm:flex-row">
                                                {result.image && (
                                                    <div className="shrink-0">
                                                        <img
                                                            src={result.image}
                                                            alt=""
                                                            className="h-32 w-full rounded-lg object-cover sm:w-48"
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 text-xs text-slate-500">
                                                        <span className="rounded-full bg-blue-50 px-2 py-0.5 font-medium tracking-wider text-blue-800 uppercase">
                                                            {result.type}
                                                        </span>
                                                        {result.date && (
                                                            <>
                                                                <span>
                                                                    &middot;
                                                                </span>
                                                                <time
                                                                    dateTime={
                                                                        result.date
                                                                    }
                                                                >
                                                                    {new Date(
                                                                        result.date,
                                                                    ).toLocaleDateString(
                                                                        undefined,
                                                                        {
                                                                            year: 'numeric',
                                                                            month: 'long',
                                                                            day: 'numeric',
                                                                        },
                                                                    )}
                                                                </time>
                                                            </>
                                                        )}
                                                    </div>
                                                    <h3 className="mt-2 text-xl font-bold text-slate-900 hover:text-blue-800">
                                                        <Link href={result.url}>
                                                            {result.title}
                                                        </Link>
                                                    </h3>
                                                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
                                                        {result.description}
                                                    </p>
                                                    <div className="mt-3">
                                                        <Link
                                                            href={result.url}
                                                            className="text-sm font-medium text-blue-800 hover:text-blue-600 hover:underline"
                                                        >
                                                            Read more
                                                            <span aria-hidden="true">
                                                                {' '}
                                                                &rarr;
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </article>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
}
