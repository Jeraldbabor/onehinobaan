import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
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
const VisionMissionController = { show, edit, update }

export default VisionMissionController