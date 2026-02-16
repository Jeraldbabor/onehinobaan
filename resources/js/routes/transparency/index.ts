import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
 * @see routes/web.php:147
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
 * @see routes/web.php:147
 * @route '/transparency/full-disclosure'
 */
fullDisclosure.url = (options?: RouteQueryOptions) => {
    return fullDisclosure.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:147
 * @route '/transparency/full-disclosure'
 */
fullDisclosure.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: fullDisclosure.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:147
 * @route '/transparency/full-disclosure'
 */
fullDisclosure.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: fullDisclosure.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:147
 * @route '/transparency/full-disclosure'
 */
    const fullDisclosureForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: fullDisclosure.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:147
 * @route '/transparency/full-disclosure'
 */
        fullDisclosureForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: fullDisclosure.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:147
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
/**
 * @see routes/web.php:151
 * @route '/transparency/citizens-charter'
 */
export const citizensCharter = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: citizensCharter.url(options),
    method: 'get',
})

citizensCharter.definition = {
    methods: ["get","head"],
    url: '/transparency/citizens-charter',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:151
 * @route '/transparency/citizens-charter'
 */
citizensCharter.url = (options?: RouteQueryOptions) => {
    return citizensCharter.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:151
 * @route '/transparency/citizens-charter'
 */
citizensCharter.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: citizensCharter.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:151
 * @route '/transparency/citizens-charter'
 */
citizensCharter.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: citizensCharter.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:151
 * @route '/transparency/citizens-charter'
 */
    const citizensCharterForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: citizensCharter.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:151
 * @route '/transparency/citizens-charter'
 */
        citizensCharterForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: citizensCharter.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:151
 * @route '/transparency/citizens-charter'
 */
        citizensCharterForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: citizensCharter.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    citizensCharter.form = citizensCharterForm
const transparency = {
    fullDisclosure: Object.assign(fullDisclosure, fullDisclosure),
citizensCharter: Object.assign(citizensCharter, citizensCharter),
}

export default transparency