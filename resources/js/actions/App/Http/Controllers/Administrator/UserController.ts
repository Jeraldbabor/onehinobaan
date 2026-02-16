import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'

/**
* @see \App\Http\Controllers\Administrator\UserController::index
 * @see app/Http/Controllers/Administrator/UserController.php:14
 * @route '/dashboard/users'
 */
const index2311e151090a9e1d5e6fab0894d5561d = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index2311e151090a9e1d5e6fab0894d5561d.url(options),
    method: 'get',
})

index2311e151090a9e1d5e6fab0894d5561d.definition = {
    methods: ["get", "head"],
    url: '/dashboard/users',
} satisfies RouteDefinition<["get", "head"]>

/**
* @see \App\Http\Controllers\Administrator\UserController::index
 * @see app/Http/Controllers/Administrator/UserController.php:14
 * @route '/dashboard/users'
 */
index2311e151090a9e1d5e6fab0894d5561d.url = (options?: RouteQueryOptions) => {
    return index2311e151090a9e1d5e6fab0894d5561d.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\UserController::index
 * @see app/Http/Controllers/Administrator/UserController.php:14
 * @route '/dashboard/users'
 */
index2311e151090a9e1d5e6fab0894d5561d.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index2311e151090a9e1d5e6fab0894d5561d.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\UserController::index
 * @see app/Http/Controllers/Administrator/UserController.php:14
 * @route '/dashboard/users'
 */
index2311e151090a9e1d5e6fab0894d5561d.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index2311e151090a9e1d5e6fab0894d5561d.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Administrator\UserController::index
* @see app/Http/Controllers/Administrator/UserController.php:14
* @route '/dashboard/users'
*/
const index2311e151090a9e1d5e6fab0894d5561dForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index2311e151090a9e1d5e6fab0894d5561d.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Administrator\UserController::index
* @see app/Http/Controllers/Administrator/UserController.php:14
* @route '/dashboard/users'
*/
index2311e151090a9e1d5e6fab0894d5561dForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index2311e151090a9e1d5e6fab0894d5561d.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\UserController::index
* @see app/Http/Controllers/Administrator/UserController.php:14
* @route '/dashboard/users'
*/
index2311e151090a9e1d5e6fab0894d5561dForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index2311e151090a9e1d5e6fab0894d5561d.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index2311e151090a9e1d5e6fab0894d5561d.form = index2311e151090a9e1d5e6fab0894d5561dForm
/**
* @see \App\Http\Controllers\Administrator\UserController::index
* @see app/Http/Controllers/Administrator/UserController.php:14
* @route '/settings/accounts'
*/
const index7e3316c8efdb400bfbbf5b52551d501c = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index7e3316c8efdb400bfbbf5b52551d501c.url(options),
    method: 'get',
})

index7e3316c8efdb400bfbbf5b52551d501c.definition = {
    methods: ["get", "head"],
    url: '/settings/accounts',
} satisfies RouteDefinition<["get", "head"]>

/**
* @see \App\Http\Controllers\Administrator\UserController::index
 * @see app/Http/Controllers/Administrator/UserController.php:14
 * @route '/settings/accounts'
 */
index7e3316c8efdb400bfbbf5b52551d501c.url = (options?: RouteQueryOptions) => {
    return index7e3316c8efdb400bfbbf5b52551d501c.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\UserController::index
 * @see app/Http/Controllers/Administrator/UserController.php:14
 * @route '/settings/accounts'
 */
index7e3316c8efdb400bfbbf5b52551d501c.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index7e3316c8efdb400bfbbf5b52551d501c.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\UserController::index
 * @see app/Http/Controllers/Administrator/UserController.php:14
 * @route '/settings/accounts'
 */
index7e3316c8efdb400bfbbf5b52551d501c.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index7e3316c8efdb400bfbbf5b52551d501c.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Administrator\UserController::index
* @see app/Http/Controllers/Administrator/UserController.php:14
* @route '/settings/accounts'
*/
const index7e3316c8efdb400bfbbf5b52551d501cForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index7e3316c8efdb400bfbbf5b52551d501c.url(options),
    method: 'get',
})

/**
* @see \App\Http\Controllers\Administrator\UserController::index
* @see app/Http/Controllers/Administrator/UserController.php:14
* @route '/settings/accounts'
*/
index7e3316c8efdb400bfbbf5b52551d501cForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index7e3316c8efdb400bfbbf5b52551d501c.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\UserController::index
* @see app/Http/Controllers/Administrator/UserController.php:14
* @route '/settings/accounts'
*/
index7e3316c8efdb400bfbbf5b52551d501cForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
    action: index7e3316c8efdb400bfbbf5b52551d501c.url({
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'HEAD',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'get',
})

index7e3316c8efdb400bfbbf5b52551d501c.form = index7e3316c8efdb400bfbbf5b52551d501cForm

export const index = {
    '/dashboard/users': index2311e151090a9e1d5e6fab0894d5561d,
    '/settings/accounts': index7e3316c8efdb400bfbbf5b52551d501c,
}

/**
* @see \App\Http\Controllers\Administrator\UserController::store
 * @see app/Http/Controllers/Administrator/UserController.php:31
 * @route '/dashboard/users'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/users',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Administrator\UserController::store
 * @see app/Http/Controllers/Administrator/UserController.php:31
 * @route '/dashboard/users'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\UserController::store
 * @see app/Http/Controllers/Administrator/UserController.php:31
 * @route '/dashboard/users'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Administrator\UserController::store
* @see app/Http/Controllers/Administrator/UserController.php:31
* @route '/dashboard/users'
*/
const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Administrator\UserController::store
* @see app/Http/Controllers/Administrator/UserController.php:31
* @route '/dashboard/users'
*/
storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: store.url(options),
    method: 'post',
})

store.form = storeForm
/**
* @see \App\Http\Controllers\Administrator\UserController::update
 * @see app/Http/Controllers/Administrator/UserController.php:55
 * @route '/dashboard/users/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/users/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Administrator\UserController::update
 * @see app/Http/Controllers/Administrator/UserController.php:55
 * @route '/dashboard/users/{id}'
 */
update.url = (args: { id: string | number } | [id: string | number] | string | number, options?: RouteQueryOptions) => {
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
* @see \App\Http\Controllers\Administrator\UserController::update
 * @see app/Http/Controllers/Administrator/UserController.php:55
 * @route '/dashboard/users/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\Administrator\UserController::update
* @see app/Http/Controllers/Administrator/UserController.php:55
* @route '/dashboard/users/{id}'
*/
const updateForm = (args: { id: string | number } | [id: string | number] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: update.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'PUT',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Administrator\UserController::update
* @see app/Http/Controllers/Administrator/UserController.php:55
* @route '/dashboard/users/{id}'
*/
updateForm.put = (args: { id: string | number } | [id: string | number] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Administrator\UserController::destroy
 * @see app/Http/Controllers/Administrator/UserController.php:79
 * @route '/dashboard/users/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/users/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Administrator\UserController::destroy
 * @see app/Http/Controllers/Administrator/UserController.php:79
 * @route '/dashboard/users/{id}'
 */
destroy.url = (args: { id: string | number } | [id: string | number] | string | number, options?: RouteQueryOptions) => {
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
* @see \App\Http\Controllers\Administrator\UserController::destroy
 * @see app/Http/Controllers/Administrator/UserController.php:79
 * @route '/dashboard/users/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

/**
* @see \App\Http\Controllers\Administrator\UserController::destroy
* @see app/Http/Controllers/Administrator/UserController.php:79
* @route '/dashboard/users/{id}'
*/
const destroyForm = (args: { id: string | number } | [id: string | number] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Administrator\UserController::destroy
* @see app/Http/Controllers/Administrator/UserController.php:79
* @route '/dashboard/users/{id}'
*/
destroyForm.delete = (args: { id: string | number } | [id: string | number] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: destroy.url(args, {
        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
            _method: 'DELETE',
            ...(options?.query ?? options?.mergeQuery ?? {}),
        }
    }),
    method: 'post',
})

destroy.form = destroyForm
/**
* @see \App\Http\Controllers\Administrator\UserController::resetPassword
 * @see app/Http/Controllers/Administrator/UserController.php:96
 * @route '/dashboard/users/{id}/reset-password'
 */
export const resetPassword = (args: { id: string | number } | [id: string | number] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resetPassword.url(args, options),
    method: 'post',
})

resetPassword.definition = {
    methods: ["post"],
    url: '/dashboard/users/{id}/reset-password',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Administrator\UserController::resetPassword
 * @see app/Http/Controllers/Administrator/UserController.php:96
 * @route '/dashboard/users/{id}/reset-password'
 */
resetPassword.url = (args: { id: string | number } | [id: string | number] | string | number, options?: RouteQueryOptions) => {
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

    return resetPassword.definition.url
        .replace('{id}', parsedArgs.id.toString())
        .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\UserController::resetPassword
 * @see app/Http/Controllers/Administrator/UserController.php:96
 * @route '/dashboard/users/{id}/reset-password'
 */
resetPassword.post = (args: { id: string | number } | [id: string | number] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resetPassword.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Administrator\UserController::resetPassword
* @see app/Http/Controllers/Administrator/UserController.php:96
* @route '/dashboard/users/{id}/reset-password'
*/
const resetPasswordForm = (args: { id: string | number } | [id: string | number] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: resetPassword.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Administrator\UserController::resetPassword
* @see app/Http/Controllers/Administrator/UserController.php:96
* @route '/dashboard/users/{id}/reset-password'
*/
resetPasswordForm.post = (args: { id: string | number } | [id: string | number] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
    action: resetPassword.url(args, options),
    method: 'post',
})

resetPassword.form = resetPasswordForm
const UserController = { index, store, update, destroy, resetPassword }

export default UserController