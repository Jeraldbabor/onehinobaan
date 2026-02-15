import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Administrator\BarangayController::store
 * @see app/Http/Controllers/Administrator/BarangayController.php:200
 * @route '/dashboard/barangay/{id}/officials'
 */
export const store = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/barangay/{id}/officials',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Administrator\BarangayController::store
 * @see app/Http/Controllers/Administrator/BarangayController.php:200
 * @route '/dashboard/barangay/{id}/officials'
 */
store.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return store.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\BarangayController::store
 * @see app/Http/Controllers/Administrator/BarangayController.php:200
 * @route '/dashboard/barangay/{id}/officials'
 */
store.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Administrator\BarangayController::store
 * @see app/Http/Controllers/Administrator/BarangayController.php:200
 * @route '/dashboard/barangay/{id}/officials'
 */
    const storeForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\BarangayController::store
 * @see app/Http/Controllers/Administrator/BarangayController.php:200
 * @route '/dashboard/barangay/{id}/officials'
 */
        storeForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Administrator\BarangayController::destroy
 * @see app/Http/Controllers/Administrator/BarangayController.php:227
 * @route '/dashboard/barangay/officials/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/barangay/officials/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Administrator\BarangayController::destroy
 * @see app/Http/Controllers/Administrator/BarangayController.php:227
 * @route '/dashboard/barangay/officials/{id}'
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
 * @see app/Http/Controllers/Administrator/BarangayController.php:227
 * @route '/dashboard/barangay/officials/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Administrator\BarangayController::destroy
 * @see app/Http/Controllers/Administrator/BarangayController.php:227
 * @route '/dashboard/barangay/officials/{id}'
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
* @see \App\Http\Controllers\Administrator\BarangayController::destroy
 * @see app/Http/Controllers/Administrator/BarangayController.php:227
 * @route '/dashboard/barangay/officials/{id}'
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
const officials = {
    store: Object.assign(store, store),
destroy: Object.assign(destroy, destroy),
}

export default officials