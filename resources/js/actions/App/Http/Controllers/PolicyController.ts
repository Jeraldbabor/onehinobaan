import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PolicyController::privacy
 * @see app/Http/Controllers/PolicyController.php:11
 * @route '/privacy'
 */
export const privacy = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: privacy.url(options),
    method: 'get',
})

privacy.definition = {
    methods: ["get","head"],
    url: '/privacy',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PolicyController::privacy
 * @see app/Http/Controllers/PolicyController.php:11
 * @route '/privacy'
 */
privacy.url = (options?: RouteQueryOptions) => {
    return privacy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PolicyController::privacy
 * @see app/Http/Controllers/PolicyController.php:11
 * @route '/privacy'
 */
privacy.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: privacy.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PolicyController::privacy
 * @see app/Http/Controllers/PolicyController.php:11
 * @route '/privacy'
 */
privacy.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: privacy.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PolicyController::privacy
 * @see app/Http/Controllers/PolicyController.php:11
 * @route '/privacy'
 */
    const privacyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: privacy.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PolicyController::privacy
 * @see app/Http/Controllers/PolicyController.php:11
 * @route '/privacy'
 */
        privacyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: privacy.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PolicyController::privacy
 * @see app/Http/Controllers/PolicyController.php:11
 * @route '/privacy'
 */
        privacyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: privacy.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    privacy.form = privacyForm
/**
* @see \App\Http\Controllers\PolicyController::accessibility
 * @see app/Http/Controllers/PolicyController.php:21
 * @route '/accessibility'
 */
export const accessibility = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: accessibility.url(options),
    method: 'get',
})

accessibility.definition = {
    methods: ["get","head"],
    url: '/accessibility',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PolicyController::accessibility
 * @see app/Http/Controllers/PolicyController.php:21
 * @route '/accessibility'
 */
accessibility.url = (options?: RouteQueryOptions) => {
    return accessibility.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PolicyController::accessibility
 * @see app/Http/Controllers/PolicyController.php:21
 * @route '/accessibility'
 */
accessibility.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: accessibility.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PolicyController::accessibility
 * @see app/Http/Controllers/PolicyController.php:21
 * @route '/accessibility'
 */
accessibility.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: accessibility.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PolicyController::accessibility
 * @see app/Http/Controllers/PolicyController.php:21
 * @route '/accessibility'
 */
    const accessibilityForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: accessibility.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PolicyController::accessibility
 * @see app/Http/Controllers/PolicyController.php:21
 * @route '/accessibility'
 */
        accessibilityForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: accessibility.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PolicyController::accessibility
 * @see app/Http/Controllers/PolicyController.php:21
 * @route '/accessibility'
 */
        accessibilityForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: accessibility.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    accessibility.form = accessibilityForm
/**
* @see \App\Http\Controllers\PolicyController::cookies
 * @see app/Http/Controllers/PolicyController.php:31
 * @route '/cookies'
 */
export const cookies = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cookies.url(options),
    method: 'get',
})

cookies.definition = {
    methods: ["get","head"],
    url: '/cookies',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PolicyController::cookies
 * @see app/Http/Controllers/PolicyController.php:31
 * @route '/cookies'
 */
cookies.url = (options?: RouteQueryOptions) => {
    return cookies.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PolicyController::cookies
 * @see app/Http/Controllers/PolicyController.php:31
 * @route '/cookies'
 */
cookies.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cookies.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PolicyController::cookies
 * @see app/Http/Controllers/PolicyController.php:31
 * @route '/cookies'
 */
cookies.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cookies.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PolicyController::cookies
 * @see app/Http/Controllers/PolicyController.php:31
 * @route '/cookies'
 */
    const cookiesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: cookies.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PolicyController::cookies
 * @see app/Http/Controllers/PolicyController.php:31
 * @route '/cookies'
 */
        cookiesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: cookies.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PolicyController::cookies
 * @see app/Http/Controllers/PolicyController.php:31
 * @route '/cookies'
 */
        cookiesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: cookies.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    cookies.form = cookiesForm
const PolicyController = { privacy, accessibility, cookies }

export default PolicyController