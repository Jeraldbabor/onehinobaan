import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
import manage from './manage'
/**
* @see \App\Http\Controllers\ActivityListController::index
 * @see app/Http/Controllers/ActivityListController.php:16
 * @route '/activities'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/activities',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ActivityListController::index
 * @see app/Http/Controllers/ActivityListController.php:16
 * @route '/activities'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ActivityListController::index
 * @see app/Http/Controllers/ActivityListController.php:16
 * @route '/activities'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ActivityListController::index
 * @see app/Http/Controllers/ActivityListController.php:16
 * @route '/activities'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\ActivityListController::show
 * @see app/Http/Controllers/ActivityListController.php:43
 * @route '/activities/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/activities/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ActivityListController::show
 * @see app/Http/Controllers/ActivityListController.php:43
 * @route '/activities/{id}'
 */
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ActivityListController::show
 * @see app/Http/Controllers/ActivityListController.php:43
 * @route '/activities/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ActivityListController::show
 * @see app/Http/Controllers/ActivityListController.php:43
 * @route '/activities/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})
const activities = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
manage: Object.assign(manage, manage),
}

export default activities