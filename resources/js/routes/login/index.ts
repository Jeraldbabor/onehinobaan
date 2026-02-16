import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::store
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:58
 * @route '/login'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::store
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:58
 * @route '/login'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::store
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:58
 * @route '/login'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::store
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:58
 * @route '/login'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Laravel\Fortify\Http\Controllers\AuthenticatedSessionController::store
 * @see vendor/laravel/fortify/src/Http/Controllers/AuthenticatedSessionController.php:58
 * @route '/login'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
 * @see routes/web.php:22
 * @route '/portal-admin-1x6114'
 */
export const portal = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: portal.url(options),
    method: 'get',
})

portal.definition = {
    methods: ["get","head"],
    url: '/portal-admin-1x6114',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:22
 * @route '/portal-admin-1x6114'
 */
portal.url = (options?: RouteQueryOptions) => {
    return portal.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:22
 * @route '/portal-admin-1x6114'
 */
portal.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: portal.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:22
 * @route '/portal-admin-1x6114'
 */
portal.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: portal.url(options),
    method: 'head',
})

    /**
 * @see routes/web.php:22
 * @route '/portal-admin-1x6114'
 */
    const portalForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: portal.url(options),
        method: 'get',
    })

            /**
 * @see routes/web.php:22
 * @route '/portal-admin-1x6114'
 */
        portalForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: portal.url(options),
            method: 'get',
        })
            /**
 * @see routes/web.php:22
 * @route '/portal-admin-1x6114'
 */
        portalForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: portal.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    portal.form = portalForm
const login = {
    store: Object.assign(store, store),
portal: Object.assign(portal, portal),
}

export default login