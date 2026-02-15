import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Administrator\GeneralSettingsController::edit
 * @see app/Http/Controllers/Administrator/GeneralSettingsController.php:24
 * @route '/dashboard/general-settings'
 */
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/dashboard/general-settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\GeneralSettingsController::edit
 * @see app/Http/Controllers/Administrator/GeneralSettingsController.php:24
 * @route '/dashboard/general-settings'
 */
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\GeneralSettingsController::edit
 * @see app/Http/Controllers/Administrator/GeneralSettingsController.php:24
 * @route '/dashboard/general-settings'
 */
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\GeneralSettingsController::edit
 * @see app/Http/Controllers/Administrator/GeneralSettingsController.php:24
 * @route '/dashboard/general-settings'
 */
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Administrator\GeneralSettingsController::update
 * @see app/Http/Controllers/Administrator/GeneralSettingsController.php:45
 * @route '/dashboard/general-settings'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/dashboard/general-settings',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Administrator\GeneralSettingsController::update
 * @see app/Http/Controllers/Administrator/GeneralSettingsController.php:45
 * @route '/dashboard/general-settings'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\GeneralSettingsController::update
 * @see app/Http/Controllers/Administrator/GeneralSettingsController.php:45
 * @route '/dashboard/general-settings'
 */
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})
const GeneralSettingsController = { edit, update }

export default GeneralSettingsController