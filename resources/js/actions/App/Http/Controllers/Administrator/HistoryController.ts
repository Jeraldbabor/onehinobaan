import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Administrator\HistoryController::show
 * @see app/Http/Controllers/Administrator/HistoryController.php:17
 * @route '/about/history'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/about/history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\HistoryController::show
 * @see app/Http/Controllers/Administrator/HistoryController.php:17
 * @route '/about/history'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\HistoryController::show
 * @see app/Http/Controllers/Administrator/HistoryController.php:17
 * @route '/about/history'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\HistoryController::show
 * @see app/Http/Controllers/Administrator/HistoryController.php:17
 * @route '/about/history'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Administrator\HistoryController::show
 * @see app/Http/Controllers/Administrator/HistoryController.php:17
 * @route '/about/history'
 */
    const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Administrator\HistoryController::show
 * @see app/Http/Controllers/Administrator/HistoryController.php:17
 * @route '/about/history'
 */
        showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Administrator\HistoryController::show
 * @see app/Http/Controllers/Administrator/HistoryController.php:17
 * @route '/about/history'
 */
        showForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Administrator\HistoryController::edit
 * @see app/Http/Controllers/Administrator/HistoryController.php:32
 * @route '/dashboard/history'
 */
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/dashboard/history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\HistoryController::edit
 * @see app/Http/Controllers/Administrator/HistoryController.php:32
 * @route '/dashboard/history'
 */
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\HistoryController::edit
 * @see app/Http/Controllers/Administrator/HistoryController.php:32
 * @route '/dashboard/history'
 */
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\HistoryController::edit
 * @see app/Http/Controllers/Administrator/HistoryController.php:32
 * @route '/dashboard/history'
 */
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Administrator\HistoryController::edit
 * @see app/Http/Controllers/Administrator/HistoryController.php:32
 * @route '/dashboard/history'
 */
    const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Administrator\HistoryController::edit
 * @see app/Http/Controllers/Administrator/HistoryController.php:32
 * @route '/dashboard/history'
 */
        editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Administrator\HistoryController::edit
 * @see app/Http/Controllers/Administrator/HistoryController.php:32
 * @route '/dashboard/history'
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
* @see \App\Http\Controllers\Administrator\HistoryController::update
 * @see app/Http/Controllers/Administrator/HistoryController.php:46
 * @route '/dashboard/history'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/history',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Administrator\HistoryController::update
 * @see app/Http/Controllers/Administrator/HistoryController.php:46
 * @route '/dashboard/history'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\HistoryController::update
 * @see app/Http/Controllers/Administrator/HistoryController.php:46
 * @route '/dashboard/history'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Administrator\HistoryController::update
 * @see app/Http/Controllers/Administrator/HistoryController.php:46
 * @route '/dashboard/history'
 */
    const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\HistoryController::update
 * @see app/Http/Controllers/Administrator/HistoryController.php:46
 * @route '/dashboard/history'
 */
        updateForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const HistoryController = { show, edit, update }

export default HistoryController