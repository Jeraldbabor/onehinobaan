import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults, validateParameters } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Administrator\OfficialsController::show
 * @see app/Http/Controllers/Administrator/OfficialsController.php:35
 * @route '/about/officials/{section?}'
 */
export const show = (args?: { section?: string | number } | [section: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/about/officials/{section?}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\OfficialsController::show
 * @see app/Http/Controllers/Administrator/OfficialsController.php:35
 * @route '/about/officials/{section?}'
 */
show.url = (args?: { section?: string | number } | [section: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { section: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    section: args[0],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "section",
        ])

    const parsedArgs = {
                        section: args?.section,
                }

    return show.definition.url
            .replace('{section?}', parsedArgs.section?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\OfficialsController::show
 * @see app/Http/Controllers/Administrator/OfficialsController.php:35
 * @route '/about/officials/{section?}'
 */
show.get = (args?: { section?: string | number } | [section: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\OfficialsController::show
 * @see app/Http/Controllers/Administrator/OfficialsController.php:35
 * @route '/about/officials/{section?}'
 */
show.head = (args?: { section?: string | number } | [section: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Administrator\OfficialsController::index
 * @see app/Http/Controllers/Administrator/OfficialsController.php:51
 * @route '/dashboard/officials'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/officials',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\OfficialsController::index
 * @see app/Http/Controllers/Administrator/OfficialsController.php:51
 * @route '/dashboard/officials'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\OfficialsController::index
 * @see app/Http/Controllers/Administrator/OfficialsController.php:51
 * @route '/dashboard/officials'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\OfficialsController::index
 * @see app/Http/Controllers/Administrator/OfficialsController.php:51
 * @route '/dashboard/officials'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Administrator\OfficialsController::updateMayor
 * @see app/Http/Controllers/Administrator/OfficialsController.php:65
 * @route '/dashboard/officials/mayor'
 */
export const updateMayor = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateMayor.url(options),
    method: 'put',
})

updateMayor.definition = {
    methods: ["put"],
    url: '/dashboard/officials/mayor',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Administrator\OfficialsController::updateMayor
 * @see app/Http/Controllers/Administrator/OfficialsController.php:65
 * @route '/dashboard/officials/mayor'
 */
updateMayor.url = (options?: RouteQueryOptions) => {
    return updateMayor.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\OfficialsController::updateMayor
 * @see app/Http/Controllers/Administrator/OfficialsController.php:65
 * @route '/dashboard/officials/mayor'
 */
updateMayor.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateMayor.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Administrator\OfficialsController::updateViceMayor
 * @see app/Http/Controllers/Administrator/OfficialsController.php:100
 * @route '/dashboard/officials/vice-mayor'
 */
export const updateViceMayor = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateViceMayor.url(options),
    method: 'put',
})

updateViceMayor.definition = {
    methods: ["put"],
    url: '/dashboard/officials/vice-mayor',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Administrator\OfficialsController::updateViceMayor
 * @see app/Http/Controllers/Administrator/OfficialsController.php:100
 * @route '/dashboard/officials/vice-mayor'
 */
updateViceMayor.url = (options?: RouteQueryOptions) => {
    return updateViceMayor.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\OfficialsController::updateViceMayor
 * @see app/Http/Controllers/Administrator/OfficialsController.php:100
 * @route '/dashboard/officials/vice-mayor'
 */
updateViceMayor.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateViceMayor.url(options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Administrator\OfficialsController::storeSbMember
 * @see app/Http/Controllers/Administrator/OfficialsController.php:135
 * @route '/dashboard/officials/sb-members'
 */
export const storeSbMember = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeSbMember.url(options),
    method: 'post',
})

storeSbMember.definition = {
    methods: ["post"],
    url: '/dashboard/officials/sb-members',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Administrator\OfficialsController::storeSbMember
 * @see app/Http/Controllers/Administrator/OfficialsController.php:135
 * @route '/dashboard/officials/sb-members'
 */
storeSbMember.url = (options?: RouteQueryOptions) => {
    return storeSbMember.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\OfficialsController::storeSbMember
 * @see app/Http/Controllers/Administrator/OfficialsController.php:135
 * @route '/dashboard/officials/sb-members'
 */
storeSbMember.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeSbMember.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Administrator\OfficialsController::updateSbMember
 * @see app/Http/Controllers/Administrator/OfficialsController.php:166
 * @route '/dashboard/officials/sb-members/{id}'
 */
export const updateSbMember = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateSbMember.url(args, options),
    method: 'put',
})

updateSbMember.definition = {
    methods: ["put"],
    url: '/dashboard/officials/sb-members/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Administrator\OfficialsController::updateSbMember
 * @see app/Http/Controllers/Administrator/OfficialsController.php:166
 * @route '/dashboard/officials/sb-members/{id}'
 */
updateSbMember.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateSbMember.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\OfficialsController::updateSbMember
 * @see app/Http/Controllers/Administrator/OfficialsController.php:166
 * @route '/dashboard/officials/sb-members/{id}'
 */
updateSbMember.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateSbMember.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Administrator\OfficialsController::destroySbMember
 * @see app/Http/Controllers/Administrator/OfficialsController.php:211
 * @route '/dashboard/officials/sb-members/{id}'
 */
export const destroySbMember = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroySbMember.url(args, options),
    method: 'delete',
})

destroySbMember.definition = {
    methods: ["delete"],
    url: '/dashboard/officials/sb-members/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Administrator\OfficialsController::destroySbMember
 * @see app/Http/Controllers/Administrator/OfficialsController.php:211
 * @route '/dashboard/officials/sb-members/{id}'
 */
destroySbMember.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroySbMember.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\OfficialsController::destroySbMember
 * @see app/Http/Controllers/Administrator/OfficialsController.php:211
 * @route '/dashboard/officials/sb-members/{id}'
 */
destroySbMember.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroySbMember.url(args, options),
    method: 'delete',
})
const OfficialsController = { show, index, updateMayor, updateViceMayor, storeSbMember, updateSbMember, destroySbMember }

export default OfficialsController