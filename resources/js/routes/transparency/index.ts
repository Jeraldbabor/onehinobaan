import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
 * @see routes/web.php:143
 * @route '/transparency/full-disclosure'
 */
export const fullDisclosure = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: fullDisclosure.url(options),
    method: 'get',
})

fullDisclosure.definition = {
    methods: ["get","head"],
    url: '/transparency/full-disclosure',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:143
 * @route '/transparency/full-disclosure'
 */
fullDisclosure.url = (options?: RouteQueryOptions) => {
    return fullDisclosure.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:143
 * @route '/transparency/full-disclosure'
 */
fullDisclosure.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: fullDisclosure.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:143
 * @route '/transparency/full-disclosure'
 */
fullDisclosure.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: fullDisclosure.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:143
 * @route '/transparency/full-disclosure'
 */
    const fullDisclosureForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: fullDisclosure.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:143
 * @route '/transparency/full-disclosure'
 */
        fullDisclosureForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: fullDisclosure.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:143
 * @route '/transparency/full-disclosure'
 */
        fullDisclosureForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: fullDisclosure.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    fullDisclosure.form = fullDisclosureForm
const transparency = {
    fullDisclosure: Object.assign(fullDisclosure, fullDisclosure),
}

export default transparency