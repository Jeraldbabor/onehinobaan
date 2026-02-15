import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Administrator\TourismController::edit
 * @see app/Http/Controllers/Administrator/TourismController.php:44
 * @route '/dashboard/tourism/festivals'
 */
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/dashboard/tourism/festivals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\TourismController::edit
 * @see app/Http/Controllers/Administrator/TourismController.php:44
 * @route '/dashboard/tourism/festivals'
 */
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\TourismController::edit
 * @see app/Http/Controllers/Administrator/TourismController.php:44
 * @route '/dashboard/tourism/festivals'
 */
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\TourismController::edit
 * @see app/Http/Controllers/Administrator/TourismController.php:44
 * @route '/dashboard/tourism/festivals'
 */
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Administrator\TourismController::edit
 * @see app/Http/Controllers/Administrator/TourismController.php:44
 * @route '/dashboard/tourism/festivals'
 */
    const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Administrator\TourismController::edit
 * @see app/Http/Controllers/Administrator/TourismController.php:44
 * @route '/dashboard/tourism/festivals'
 */
        editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Administrator\TourismController::edit
 * @see app/Http/Controllers/Administrator/TourismController.php:44
 * @route '/dashboard/tourism/festivals'
 */
        editForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Administrator\TourismController::store
 * @see app/Http/Controllers/Administrator/TourismController.php:79
 * @route '/dashboard/tourism/festivals'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/tourism/festivals',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Administrator\TourismController::store
 * @see app/Http/Controllers/Administrator/TourismController.php:79
 * @route '/dashboard/tourism/festivals'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\TourismController::store
 * @see app/Http/Controllers/Administrator/TourismController.php:79
 * @route '/dashboard/tourism/festivals'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Administrator\TourismController::store
 * @see app/Http/Controllers/Administrator/TourismController.php:79
 * @route '/dashboard/tourism/festivals'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\TourismController::store
 * @see app/Http/Controllers/Administrator/TourismController.php:79
 * @route '/dashboard/tourism/festivals'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Administrator\TourismController::update
 * @see app/Http/Controllers/Administrator/TourismController.php:128
 * @route '/dashboard/tourism/festivals/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/tourism/festivals/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Administrator\TourismController::update
 * @see app/Http/Controllers/Administrator/TourismController.php:128
 * @route '/dashboard/tourism/festivals/{id}'
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
 * @route '/dashboard/tourism/festivals/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Administrator\TourismController::update
 * @see app/Http/Controllers/Administrator/TourismController.php:128
 * @route '/dashboard/tourism/festivals/{id}'
 */
    const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\TourismController::update
 * @see app/Http/Controllers/Administrator/TourismController.php:128
 * @route '/dashboard/tourism/festivals/{id}'
 */
        updateForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Administrator\TourismController::destroyImage
 * @see app/Http/Controllers/Administrator/TourismController.php:196
 * @route '/dashboard/tourism/festivals/images/{imageId}'
 */
export const destroyImage = (args: { imageId: string | number } | [imageId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyImage.url(args, options),
    method: 'delete',
})

destroyImage.definition = {
    methods: ["delete"],
    url: '/dashboard/tourism/festivals/images/{imageId}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Administrator\TourismController::destroyImage
 * @see app/Http/Controllers/Administrator/TourismController.php:196
 * @route '/dashboard/tourism/festivals/images/{imageId}'
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
 * @route '/dashboard/tourism/festivals/images/{imageId}'
 */
destroyImage.delete = (args: { imageId: string | number } | [imageId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyImage.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Administrator\TourismController::destroyImage
 * @see app/Http/Controllers/Administrator/TourismController.php:196
 * @route '/dashboard/tourism/festivals/images/{imageId}'
 */
    const destroyImageForm = (args: { imageId: string | number } | [imageId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyImage.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\TourismController::destroyImage
 * @see app/Http/Controllers/Administrator/TourismController.php:196
 * @route '/dashboard/tourism/festivals/images/{imageId}'
 */
        destroyImageForm.delete = (args: { imageId: string | number } | [imageId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyImage.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyImage.form = destroyImageForm
/**
* @see \App\Http\Controllers\Administrator\TourismController::destroy
 * @see app/Http/Controllers/Administrator/TourismController.php:181
 * @route '/dashboard/tourism/festivals/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/tourism/festivals/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Administrator\TourismController::destroy
 * @see app/Http/Controllers/Administrator/TourismController.php:181
 * @route '/dashboard/tourism/festivals/{id}'
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
 * @route '/dashboard/tourism/festivals/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Administrator\TourismController::destroy
 * @see app/Http/Controllers/Administrator/TourismController.php:181
 * @route '/dashboard/tourism/festivals/{id}'
 */
    const destroyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\TourismController::destroy
 * @see app/Http/Controllers/Administrator/TourismController.php:181
 * @route '/dashboard/tourism/festivals/{id}'
 */
        destroyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const festivals = {
    edit: Object.assign(edit, edit),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroyImage: Object.assign(destroyImage, destroyImage),
destroy: Object.assign(destroy, destroy),
}

export default festivals