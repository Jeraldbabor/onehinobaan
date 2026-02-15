import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import attraction from './attraction'
import resorts from './resorts'
import festivals from './festivals'
/**
* @see \App\Http\Controllers\TourismController::item
 * @see app/Http/Controllers/TourismController.php:51
 * @route '/tourism/{type}/{id}'
 */
export const item = (args: { type: string | number, id: string | number } | [type: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: item.url(args, options),
    method: 'get',
})

item.definition = {
    methods: ["get","head"],
    url: '/tourism/{type}/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TourismController::item
 * @see app/Http/Controllers/TourismController.php:51
 * @route '/tourism/{type}/{id}'
 */
item.url = (args: { type: string | number, id: string | number } | [type: string | number, id: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    type: args[0],
                    id: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        type: args.type,
                                id: args.id,
                }

    return item.definition.url
            .replace('{type}', parsedArgs.type.toString())
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismController::item
 * @see app/Http/Controllers/TourismController.php:51
 * @route '/tourism/{type}/{id}'
 */
item.get = (args: { type: string | number, id: string | number } | [type: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: item.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TourismController::item
 * @see app/Http/Controllers/TourismController.php:51
 * @route '/tourism/{type}/{id}'
 */
item.head = (args: { type: string | number, id: string | number } | [type: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: item.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TourismController::item
 * @see app/Http/Controllers/TourismController.php:51
 * @route '/tourism/{type}/{id}'
 */
    const itemForm = (args: { type: string | number, id: string | number } | [type: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: item.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TourismController::item
 * @see app/Http/Controllers/TourismController.php:51
 * @route '/tourism/{type}/{id}'
 */
        itemForm.get = (args: { type: string | number, id: string | number } | [type: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: item.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TourismController::item
 * @see app/Http/Controllers/TourismController.php:51
 * @route '/tourism/{type}/{id}'
 */
        itemForm.head = (args: { type: string | number, id: string | number } | [type: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: item.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    item.form = itemForm
/**
* @see \App\Http\Controllers\TourismController::show
 * @see app/Http/Controllers/TourismController.php:15
 * @route '/tourism/{type}'
 */
export const show = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/tourism/{type}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TourismController::show
 * @see app/Http/Controllers/TourismController.php:15
 * @route '/tourism/{type}'
 */
show.url = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { type: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    type: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        type: args.type,
                }

    return show.definition.url
            .replace('{type}', parsedArgs.type.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TourismController::show
 * @see app/Http/Controllers/TourismController.php:15
 * @route '/tourism/{type}'
 */
show.get = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TourismController::show
 * @see app/Http/Controllers/TourismController.php:15
 * @route '/tourism/{type}'
 */
show.head = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TourismController::show
 * @see app/Http/Controllers/TourismController.php:15
 * @route '/tourism/{type}'
 */
    const showForm = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TourismController::show
 * @see app/Http/Controllers/TourismController.php:15
 * @route '/tourism/{type}'
 */
        showForm.get = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TourismController::show
 * @see app/Http/Controllers/TourismController.php:15
 * @route '/tourism/{type}'
 */
        showForm.head = (args: { type: string | number } | [type: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const tourism = {
    item: Object.assign(item, item),
show: Object.assign(show, show),
attraction: Object.assign(attraction, attraction),
resorts: Object.assign(resorts, resorts),
festivals: Object.assign(festivals, festivals),
}

export default tourism