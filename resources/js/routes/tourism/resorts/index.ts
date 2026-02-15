import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Administrator\TourismController::edit
 * @see app/Http/Controllers/Administrator/TourismController.php:44
 * @route '/dashboard/tourism/resorts'
 */
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/dashboard/tourism/resorts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\TourismController::edit
 * @see app/Http/Controllers/Administrator/TourismController.php:44
 * @route '/dashboard/tourism/resorts'
 */
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\TourismController::edit
 * @see app/Http/Controllers/Administrator/TourismController.php:44
 * @route '/dashboard/tourism/resorts'
 */
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\TourismController::edit
 * @see app/Http/Controllers/Administrator/TourismController.php:44
 * @route '/dashboard/tourism/resorts'
 */
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Administrator\TourismController::store
 * @see app/Http/Controllers/Administrator/TourismController.php:79
 * @route '/dashboard/tourism/resorts'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/tourism/resorts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Administrator\TourismController::store
 * @see app/Http/Controllers/Administrator/TourismController.php:79
 * @route '/dashboard/tourism/resorts'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\TourismController::store
 * @see app/Http/Controllers/Administrator/TourismController.php:79
 * @route '/dashboard/tourism/resorts'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Administrator\TourismController::update
 * @see app/Http/Controllers/Administrator/TourismController.php:128
 * @route '/dashboard/tourism/resorts/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/tourism/resorts/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Administrator\TourismController::update
 * @see app/Http/Controllers/Administrator/TourismController.php:128
 * @route '/dashboard/tourism/resorts/{id}'
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
* @see \App\Http\Controllers\Administrator\TourismController::update
 * @see app/Http/Controllers/Administrator/TourismController.php:128
 * @route '/dashboard/tourism/resorts/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Administrator\TourismController::destroyImage
 * @see app/Http/Controllers/Administrator/TourismController.php:196
 * @route '/dashboard/tourism/resorts/images/{imageId}'
 */
export const destroyImage = (args: { imageId: string | number } | [imageId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyImage.url(args, options),
    method: 'delete',
})

destroyImage.definition = {
    methods: ["delete"],
    url: '/dashboard/tourism/resorts/images/{imageId}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Administrator\TourismController::destroyImage
 * @see app/Http/Controllers/Administrator/TourismController.php:196
 * @route '/dashboard/tourism/resorts/images/{imageId}'
 */
destroyImage.url = (args: { imageId: string | number } | [imageId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { imageId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    imageId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        imageId: args.imageId,
                }

    return destroyImage.definition.url
            .replace('{imageId}', parsedArgs.imageId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\TourismController::destroyImage
 * @see app/Http/Controllers/Administrator/TourismController.php:196
 * @route '/dashboard/tourism/resorts/images/{imageId}'
 */
destroyImage.delete = (args: { imageId: string | number } | [imageId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyImage.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Administrator\TourismController::destroy
 * @see app/Http/Controllers/Administrator/TourismController.php:181
 * @route '/dashboard/tourism/resorts/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/tourism/resorts/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Administrator\TourismController::destroy
 * @see app/Http/Controllers/Administrator/TourismController.php:181
 * @route '/dashboard/tourism/resorts/{id}'
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
* @see \App\Http\Controllers\Administrator\TourismController::destroy
 * @see app/Http/Controllers/Administrator/TourismController.php:181
 * @route '/dashboard/tourism/resorts/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const resorts = {
    edit: Object.assign(edit, edit),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroyImage: Object.assign(destroyImage, destroyImage),
destroy: Object.assign(destroy, destroy),
}

export default resorts