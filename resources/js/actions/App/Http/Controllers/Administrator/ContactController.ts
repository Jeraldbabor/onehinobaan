import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Administrator\ContactController::show
 * @see app/Http/Controllers/Administrator/ContactController.php:44
 * @route '/contact'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/contact',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\ContactController::show
 * @see app/Http/Controllers/Administrator/ContactController.php:44
 * @route '/contact'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\ContactController::show
 * @see app/Http/Controllers/Administrator/ContactController.php:44
 * @route '/contact'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\ContactController::show
 * @see app/Http/Controllers/Administrator/ContactController.php:44
 * @route '/contact'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Administrator\ContactController::edit
 * @see app/Http/Controllers/Administrator/ContactController.php:64
 * @route '/dashboard/contact'
 */
export const edit = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/dashboard/contact',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\ContactController::edit
 * @see app/Http/Controllers/Administrator/ContactController.php:64
 * @route '/dashboard/contact'
 */
edit.url = (options?: RouteQueryOptions) => {
    return edit.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\ContactController::edit
 * @see app/Http/Controllers/Administrator/ContactController.php:64
 * @route '/dashboard/contact'
 */
edit.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\ContactController::edit
 * @see app/Http/Controllers/Administrator/ContactController.php:64
 * @route '/dashboard/contact'
 */
edit.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Administrator\ContactController::update
 * @see app/Http/Controllers/Administrator/ContactController.php:76
 * @route '/dashboard/contact'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/contact',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Administrator\ContactController::update
 * @see app/Http/Controllers/Administrator/ContactController.php:76
 * @route '/dashboard/contact'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\ContactController::update
 * @see app/Http/Controllers/Administrator/ContactController.php:76
 * @route '/dashboard/contact'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})
const ContactController = { show, edit, update }

export default ContactController