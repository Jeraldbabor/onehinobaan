import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Administrator\VisionMissionController::show
 * @see app/Http/Controllers/Administrator/VisionMissionController.php:23
 * @route '/about/vision-mission'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/about/vision-mission',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\VisionMissionController::show
 * @see app/Http/Controllers/Administrator/VisionMissionController.php:23
 * @route '/about/vision-mission'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\VisionMissionController::show
 * @see app/Http/Controllers/Administrator/VisionMissionController.php:23
 * @route '/about/vision-mission'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\VisionMissionController::show
 * @see app/Http/Controllers/Administrator/VisionMissionController.php:23
 * @route '/about/vision-mission'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Administrator\VisionMissionController::show
 * @see app/Http/Controllers/Administrator/VisionMissionController.php:23
 * @route '/about/vision-mission'
 */
    const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Administrator\VisionMissionController::show
 * @see app/Http/Controllers/Administrator/VisionMissionController.php:23
 * @route '/about/vision-mission'
 */
        showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Administrator\VisionMissionController::show
 * @see app/Http/Controllers/Administrator/VisionMissionController.php:23
 * @route '/about/vision-mission'
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
* @see \App\Http\Controllers\Administrator\VisionMissionController::edit
 * @see app/Http/Controllers/Administrator/VisionMissionController.php:46
 * @route '/dashboard/vision-mission'
 */
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/dashboard/vision-mission',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\VisionMissionController::edit
 * @see app/Http/Controllers/Administrator/VisionMissionController.php:46
 * @route '/dashboard/vision-mission'
 */
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\VisionMissionController::edit
 * @see app/Http/Controllers/Administrator/VisionMissionController.php:46
 * @route '/dashboard/vision-mission'
 */
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\VisionMissionController::edit
 * @see app/Http/Controllers/Administrator/VisionMissionController.php:46
 * @route '/dashboard/vision-mission'
 */
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Administrator\VisionMissionController::edit
 * @see app/Http/Controllers/Administrator/VisionMissionController.php:46
 * @route '/dashboard/vision-mission'
 */
    const editForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Administrator\VisionMissionController::edit
 * @see app/Http/Controllers/Administrator/VisionMissionController.php:46
 * @route '/dashboard/vision-mission'
 */
        editForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Administrator\VisionMissionController::edit
 * @see app/Http/Controllers/Administrator/VisionMissionController.php:46
 * @route '/dashboard/vision-mission'
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
* @see \App\Http\Controllers\Administrator\VisionMissionController::update
 * @see app/Http/Controllers/Administrator/VisionMissionController.php:66
 * @route '/dashboard/vision-mission'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/vision-mission',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Administrator\VisionMissionController::update
 * @see app/Http/Controllers/Administrator/VisionMissionController.php:66
 * @route '/dashboard/vision-mission'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\VisionMissionController::update
 * @see app/Http/Controllers/Administrator/VisionMissionController.php:66
 * @route '/dashboard/vision-mission'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Administrator\VisionMissionController::update
 * @see app/Http/Controllers/Administrator/VisionMissionController.php:66
 * @route '/dashboard/vision-mission'
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
* @see \App\Http\Controllers\Administrator\VisionMissionController::update
 * @see app/Http/Controllers/Administrator/VisionMissionController.php:66
 * @route '/dashboard/vision-mission'
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
const visionMission = {
    show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
}

export default visionMission