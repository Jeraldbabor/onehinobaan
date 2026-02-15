import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::index
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:23
 * @route '/dashboard/announcements'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/announcements',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::index
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:23
 * @route '/dashboard/announcements'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::index
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:23
 * @route '/dashboard/announcements'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::index
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:23
 * @route '/dashboard/announcements'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::create
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:47
 * @route '/dashboard/announcements/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/dashboard/announcements/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::create
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:47
 * @route '/dashboard/announcements/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::create
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:47
 * @route '/dashboard/announcements/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::create
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:47
 * @route '/dashboard/announcements/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::store
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:57
 * @route '/dashboard/announcements'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/announcements',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::store
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:57
 * @route '/dashboard/announcements'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::store
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:57
 * @route '/dashboard/announcements'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::edit
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:92
 * @route '/dashboard/announcements/{id}/edit'
 */
export const edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/dashboard/announcements/{id}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::edit
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:92
 * @route '/dashboard/announcements/{id}/edit'
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
* @see \App\Http\Controllers\Administrator\AnnouncementController::edit
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:92
 * @route '/dashboard/announcements/{id}/edit'
 */
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::edit
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:92
 * @route '/dashboard/announcements/{id}/edit'
 */
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::update
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:113
 * @route '/dashboard/announcements/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/announcements/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::update
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:113
 * @route '/dashboard/announcements/{id}'
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
* @see \App\Http\Controllers\Administrator\AnnouncementController::update
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:113
 * @route '/dashboard/announcements/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::destroy
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:157
 * @route '/dashboard/announcements/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/announcements/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::destroy
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:157
 * @route '/dashboard/announcements/{id}'
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
* @see \App\Http\Controllers\Administrator\AnnouncementController::destroy
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:157
 * @route '/dashboard/announcements/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const AnnouncementController = { index, create, store, edit, update, destroy }

export default AnnouncementController