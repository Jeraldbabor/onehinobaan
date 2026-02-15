import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
import officials from './officials'
/**
* @see \App\Http\Controllers\Administrator\BarangayController::show
 * @see app/Http/Controllers/Administrator/BarangayController.php:26
 * @route '/about/barangay'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/about/barangay',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\BarangayController::show
 * @see app/Http/Controllers/Administrator/BarangayController.php:26
 * @route '/about/barangay'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\BarangayController::show
 * @see app/Http/Controllers/Administrator/BarangayController.php:26
 * @route '/about/barangay'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\BarangayController::show
 * @see app/Http/Controllers/Administrator/BarangayController.php:26
 * @route '/about/barangay'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Administrator\BarangayController::detail
 * @see app/Http/Controllers/Administrator/BarangayController.php:50
 * @route '/about/barangay/{id}'
 */
export const detail = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: detail.url(args, options),
    method: 'get',
})

detail.definition = {
    methods: ["get","head"],
    url: '/about/barangay/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\BarangayController::detail
 * @see app/Http/Controllers/Administrator/BarangayController.php:50
 * @route '/about/barangay/{id}'
 */
detail.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return detail.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\BarangayController::detail
 * @see app/Http/Controllers/Administrator/BarangayController.php:50
 * @route '/about/barangay/{id}'
 */
detail.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: detail.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\BarangayController::detail
 * @see app/Http/Controllers/Administrator/BarangayController.php:50
 * @route '/about/barangay/{id}'
 */
detail.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: detail.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Administrator\BarangayController::index
 * @see app/Http/Controllers/Administrator/BarangayController.php:78
 * @route '/dashboard/barangay'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/barangay',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\BarangayController::index
 * @see app/Http/Controllers/Administrator/BarangayController.php:78
 * @route '/dashboard/barangay'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\BarangayController::index
 * @see app/Http/Controllers/Administrator/BarangayController.php:78
 * @route '/dashboard/barangay'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\BarangayController::index
 * @see app/Http/Controllers/Administrator/BarangayController.php:78
 * @route '/dashboard/barangay'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Administrator\BarangayController::store
 * @see app/Http/Controllers/Administrator/BarangayController.php:107
 * @route '/dashboard/barangay'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/barangay',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Administrator\BarangayController::store
 * @see app/Http/Controllers/Administrator/BarangayController.php:107
 * @route '/dashboard/barangay'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\BarangayController::store
 * @see app/Http/Controllers/Administrator/BarangayController.php:107
 * @route '/dashboard/barangay'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Administrator\BarangayController::update
 * @see app/Http/Controllers/Administrator/BarangayController.php:141
 * @route '/dashboard/barangay/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/dashboard/barangay/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Administrator\BarangayController::update
 * @see app/Http/Controllers/Administrator/BarangayController.php:141
 * @route '/dashboard/barangay/{id}'
 */
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\BarangayController::update
 * @see app/Http/Controllers/Administrator/BarangayController.php:141
 * @route '/dashboard/barangay/{id}'
 */
update.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Administrator\BarangayController::update
 * @see app/Http/Controllers/Administrator/BarangayController.php:141
 * @route '/dashboard/barangay/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/barangay/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Administrator\BarangayController::update
 * @see app/Http/Controllers/Administrator/BarangayController.php:141
 * @route '/dashboard/barangay/{id}'
 */
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\BarangayController::update
 * @see app/Http/Controllers/Administrator/BarangayController.php:141
 * @route '/dashboard/barangay/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Administrator\BarangayController::destroy
 * @see app/Http/Controllers/Administrator/BarangayController.php:177
 * @route '/dashboard/barangay/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/barangay/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Administrator\BarangayController::destroy
 * @see app/Http/Controllers/Administrator/BarangayController.php:177
 * @route '/dashboard/barangay/{id}'
 */
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\BarangayController::destroy
 * @see app/Http/Controllers/Administrator/BarangayController.php:177
 * @route '/dashboard/barangay/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const barangay = {
    show: Object.assign(show, show),
detail: Object.assign(detail, detail),
index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
officials: Object.assign(officials, officials),
}

export default barangay