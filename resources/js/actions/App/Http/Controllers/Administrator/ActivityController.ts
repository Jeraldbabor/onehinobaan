import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Administrator\ActivityController::index
 * @see app/Http/Controllers/Administrator/ActivityController.php:20
 * @route '/dashboard/activities'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/activities',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\ActivityController::index
 * @see app/Http/Controllers/Administrator/ActivityController.php:20
 * @route '/dashboard/activities'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\ActivityController::index
 * @see app/Http/Controllers/Administrator/ActivityController.php:20
 * @route '/dashboard/activities'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\ActivityController::index
 * @see app/Http/Controllers/Administrator/ActivityController.php:20
 * @route '/dashboard/activities'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Administrator\ActivityController::create
 * @see app/Http/Controllers/Administrator/ActivityController.php:40
 * @route '/dashboard/activities/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/dashboard/activities/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\ActivityController::create
 * @see app/Http/Controllers/Administrator/ActivityController.php:40
 * @route '/dashboard/activities/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\ActivityController::create
 * @see app/Http/Controllers/Administrator/ActivityController.php:40
 * @route '/dashboard/activities/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\ActivityController::create
 * @see app/Http/Controllers/Administrator/ActivityController.php:40
 * @route '/dashboard/activities/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Administrator\ActivityController::store
 * @see app/Http/Controllers/Administrator/ActivityController.php:47
 * @route '/dashboard/activities'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/activities',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Administrator\ActivityController::store
 * @see app/Http/Controllers/Administrator/ActivityController.php:47
 * @route '/dashboard/activities'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\ActivityController::store
 * @see app/Http/Controllers/Administrator/ActivityController.php:47
 * @route '/dashboard/activities'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Administrator\ActivityController::edit
 * @see app/Http/Controllers/Administrator/ActivityController.php:87
 * @route '/dashboard/activities/{id}/edit'
 */
export const edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/dashboard/activities/{id}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\ActivityController::edit
 * @see app/Http/Controllers/Administrator/ActivityController.php:87
 * @route '/dashboard/activities/{id}/edit'
 */
edit.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\ActivityController::edit
 * @see app/Http/Controllers/Administrator/ActivityController.php:87
 * @route '/dashboard/activities/{id}/edit'
 */
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\ActivityController::edit
 * @see app/Http/Controllers/Administrator/ActivityController.php:87
 * @route '/dashboard/activities/{id}/edit'
 */
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Administrator\ActivityController::update
 * @see app/Http/Controllers/Administrator/ActivityController.php:109
 * @route '/dashboard/activities/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/activities/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Administrator\ActivityController::update
 * @see app/Http/Controllers/Administrator/ActivityController.php:109
 * @route '/dashboard/activities/{id}'
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
* @see \App\Http\Controllers\Administrator\ActivityController::update
 * @see app/Http/Controllers/Administrator/ActivityController.php:109
 * @route '/dashboard/activities/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Administrator\ActivityController::destroy
 * @see app/Http/Controllers/Administrator/ActivityController.php:173
 * @route '/dashboard/activities/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/activities/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Administrator\ActivityController::destroy
 * @see app/Http/Controllers/Administrator/ActivityController.php:173
 * @route '/dashboard/activities/{id}'
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
* @see \App\Http\Controllers\Administrator\ActivityController::destroy
 * @see app/Http/Controllers/Administrator/ActivityController.php:173
 * @route '/dashboard/activities/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const ActivityController = { index, create, store, edit, update, destroy }

export default ActivityController