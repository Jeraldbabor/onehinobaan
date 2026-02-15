import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Administrator\BarangayController::show
 * @see app/Http/Controllers/Administrator/BarangayController.php:26
 * @route '/about/barangay'
 */
export const show = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/about/barangay',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\BarangayController::show
 * @see app/Http/Controllers/Administrator/BarangayController.php:26
 * @route '/about/barangay'
 */
show.url = (options?: RouteQueryOptions) => {
    return show.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\BarangayController::show
 * @see app/Http/Controllers/Administrator/BarangayController.php:26
 * @route '/about/barangay'
 */
show.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\BarangayController::show
 * @see app/Http/Controllers/Administrator/BarangayController.php:26
 * @route '/about/barangay'
 */
show.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Administrator\BarangayController::show
 * @see app/Http/Controllers/Administrator/BarangayController.php:26
 * @route '/about/barangay'
 */
    const showForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Administrator\BarangayController::show
 * @see app/Http/Controllers/Administrator/BarangayController.php:26
 * @route '/about/barangay'
 */
        showForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Administrator\BarangayController::show
 * @see app/Http/Controllers/Administrator/BarangayController.php:26
 * @route '/about/barangay'
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
* @see \App\Http\Controllers\Administrator\BarangayController::showDetail
 * @see app/Http/Controllers/Administrator/BarangayController.php:50
 * @route '/about/barangay/{id}'
 */
export const showDetail = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showDetail.url(args, options),
    method: 'get',
})

showDetail.definition = {
    methods: ["get","head"],
    url: '/about/barangay/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\BarangayController::showDetail
 * @see app/Http/Controllers/Administrator/BarangayController.php:50
 * @route '/about/barangay/{id}'
 */
showDetail.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return showDetail.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\BarangayController::showDetail
 * @see app/Http/Controllers/Administrator/BarangayController.php:50
 * @route '/about/barangay/{id}'
 */
showDetail.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showDetail.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\BarangayController::showDetail
 * @see app/Http/Controllers/Administrator/BarangayController.php:50
 * @route '/about/barangay/{id}'
 */
showDetail.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showDetail.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Administrator\BarangayController::showDetail
 * @see app/Http/Controllers/Administrator/BarangayController.php:50
 * @route '/about/barangay/{id}'
 */
    const showDetailForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showDetail.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Administrator\BarangayController::showDetail
 * @see app/Http/Controllers/Administrator/BarangayController.php:50
 * @route '/about/barangay/{id}'
 */
        showDetailForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showDetail.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Administrator\BarangayController::showDetail
 * @see app/Http/Controllers/Administrator/BarangayController.php:50
 * @route '/about/barangay/{id}'
 */
        showDetailForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showDetail.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showDetail.form = showDetailForm
/**
* @see \App\Http\Controllers\Administrator\BarangayController::index
 * @see app/Http/Controllers/Administrator/BarangayController.php:78
 * @route '/dashboard/barangay'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/barangay',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\BarangayController::index
 * @see app/Http/Controllers/Administrator/BarangayController.php:78
 * @route '/dashboard/barangay'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\BarangayController::index
 * @see app/Http/Controllers/Administrator/BarangayController.php:78
 * @route '/dashboard/barangay'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\BarangayController::index
 * @see app/Http/Controllers/Administrator/BarangayController.php:78
 * @route '/dashboard/barangay'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Administrator\BarangayController::index
 * @see app/Http/Controllers/Administrator/BarangayController.php:78
 * @route '/dashboard/barangay'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Administrator\BarangayController::index
 * @see app/Http/Controllers/Administrator/BarangayController.php:78
 * @route '/dashboard/barangay'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Administrator\BarangayController::index
 * @see app/Http/Controllers/Administrator/BarangayController.php:78
 * @route '/dashboard/barangay'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\Administrator\BarangayController::store
 * @see app/Http/Controllers/Administrator/BarangayController.php:107
 * @route '/dashboard/barangay'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/barangay',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Administrator\BarangayController::store
 * @see app/Http/Controllers/Administrator/BarangayController.php:107
 * @route '/dashboard/barangay'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\BarangayController::store
 * @see app/Http/Controllers/Administrator/BarangayController.php:107
 * @route '/dashboard/barangay'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Administrator\BarangayController::store
 * @see app/Http/Controllers/Administrator/BarangayController.php:107
 * @route '/dashboard/barangay'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\BarangayController::store
 * @see app/Http/Controllers/Administrator/BarangayController.php:107
 * @route '/dashboard/barangay'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Administrator\BarangayController::update
 * @see app/Http/Controllers/Administrator/BarangayController.php:141
 * @route '/dashboard/barangay/{id}'
 */
const update293654085ff70c1cc372c8d6ea984220 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update293654085ff70c1cc372c8d6ea984220.url(args, options),
    method: 'post',
})

update293654085ff70c1cc372c8d6ea984220.definition = {
    methods: ["post"],
    url: '/dashboard/barangay/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Administrator\BarangayController::update
 * @see app/Http/Controllers/Administrator/BarangayController.php:141
 * @route '/dashboard/barangay/{id}'
 */
update293654085ff70c1cc372c8d6ea984220.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update293654085ff70c1cc372c8d6ea984220.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\BarangayController::update
 * @see app/Http/Controllers/Administrator/BarangayController.php:141
 * @route '/dashboard/barangay/{id}'
 */
update293654085ff70c1cc372c8d6ea984220.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update293654085ff70c1cc372c8d6ea984220.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Administrator\BarangayController::update
 * @see app/Http/Controllers/Administrator/BarangayController.php:141
 * @route '/dashboard/barangay/{id}'
 */
    const update293654085ff70c1cc372c8d6ea984220Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update293654085ff70c1cc372c8d6ea984220.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\BarangayController::update
 * @see app/Http/Controllers/Administrator/BarangayController.php:141
 * @route '/dashboard/barangay/{id}'
 */
        update293654085ff70c1cc372c8d6ea984220Form.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update293654085ff70c1cc372c8d6ea984220.url(args, options),
            method: 'post',
        })
    
    update293654085ff70c1cc372c8d6ea984220.form = update293654085ff70c1cc372c8d6ea984220Form
    /**
* @see \App\Http\Controllers\Administrator\BarangayController::update
 * @see app/Http/Controllers/Administrator/BarangayController.php:141
 * @route '/dashboard/barangay/{id}'
 */
const update293654085ff70c1cc372c8d6ea984220 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update293654085ff70c1cc372c8d6ea984220.url(args, options),
    method: 'put',
})

update293654085ff70c1cc372c8d6ea984220.definition = {
    methods: ["put"],
    url: '/dashboard/barangay/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Administrator\BarangayController::update
 * @see app/Http/Controllers/Administrator/BarangayController.php:141
 * @route '/dashboard/barangay/{id}'
 */
update293654085ff70c1cc372c8d6ea984220.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update293654085ff70c1cc372c8d6ea984220.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\BarangayController::update
 * @see app/Http/Controllers/Administrator/BarangayController.php:141
 * @route '/dashboard/barangay/{id}'
 */
update293654085ff70c1cc372c8d6ea984220.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update293654085ff70c1cc372c8d6ea984220.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Administrator\BarangayController::update
 * @see app/Http/Controllers/Administrator/BarangayController.php:141
 * @route '/dashboard/barangay/{id}'
 */
    const update293654085ff70c1cc372c8d6ea984220Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update293654085ff70c1cc372c8d6ea984220.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\BarangayController::update
 * @see app/Http/Controllers/Administrator/BarangayController.php:141
 * @route '/dashboard/barangay/{id}'
 */
        update293654085ff70c1cc372c8d6ea984220Form.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update293654085ff70c1cc372c8d6ea984220.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update293654085ff70c1cc372c8d6ea984220.form = update293654085ff70c1cc372c8d6ea984220Form

export const update = {
    '/dashboard/barangay/{id}': update293654085ff70c1cc372c8d6ea984220,
    '/dashboard/barangay/{id}': update293654085ff70c1cc372c8d6ea984220,
}

/**
* @see \App\Http\Controllers\Administrator\BarangayController::destroy
 * @see app/Http/Controllers/Administrator/BarangayController.php:177
 * @route '/dashboard/barangay/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/barangay/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Administrator\BarangayController::destroy
 * @see app/Http/Controllers/Administrator/BarangayController.php:177
 * @route '/dashboard/barangay/{id}'
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
 * @see app/Http/Controllers/Administrator/BarangayController.php:177
 * @route '/dashboard/barangay/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Administrator\BarangayController::destroy
 * @see app/Http/Controllers/Administrator/BarangayController.php:177
 * @route '/dashboard/barangay/{id}'
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
 * @see app/Http/Controllers/Administrator/BarangayController.php:177
 * @route '/dashboard/barangay/{id}'
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
/**
* @see \App\Http\Controllers\Administrator\BarangayController::storeOfficial
 * @see app/Http/Controllers/Administrator/BarangayController.php:200
 * @route '/dashboard/barangay/{id}/officials'
 */
export const storeOfficial = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeOfficial.url(args, options),
    method: 'post',
})

storeOfficial.definition = {
    methods: ["post"],
    url: '/dashboard/barangay/{id}/officials',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Administrator\BarangayController::storeOfficial
 * @see app/Http/Controllers/Administrator/BarangayController.php:200
 * @route '/dashboard/barangay/{id}/officials'
 */
storeOfficial.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return storeOfficial.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\BarangayController::storeOfficial
 * @see app/Http/Controllers/Administrator/BarangayController.php:200
 * @route '/dashboard/barangay/{id}/officials'
 */
storeOfficial.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeOfficial.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Administrator\BarangayController::storeOfficial
 * @see app/Http/Controllers/Administrator/BarangayController.php:200
 * @route '/dashboard/barangay/{id}/officials'
 */
    const storeOfficialForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeOfficial.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\BarangayController::storeOfficial
 * @see app/Http/Controllers/Administrator/BarangayController.php:200
 * @route '/dashboard/barangay/{id}/officials'
 */
        storeOfficialForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeOfficial.url(args, options),
            method: 'post',
        })
    
    storeOfficial.form = storeOfficialForm
/**
* @see \App\Http\Controllers\Administrator\BarangayController::destroyOfficial
 * @see app/Http/Controllers/Administrator/BarangayController.php:227
 * @route '/dashboard/barangay/officials/{id}'
 */
export const destroyOfficial = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyOfficial.url(args, options),
    method: 'delete',
})

destroyOfficial.definition = {
    methods: ["delete"],
    url: '/dashboard/barangay/officials/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Administrator\BarangayController::destroyOfficial
 * @see app/Http/Controllers/Administrator/BarangayController.php:227
 * @route '/dashboard/barangay/officials/{id}'
 */
destroyOfficial.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroyOfficial.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\BarangayController::destroyOfficial
 * @see app/Http/Controllers/Administrator/BarangayController.php:227
 * @route '/dashboard/barangay/officials/{id}'
 */
destroyOfficial.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyOfficial.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Administrator\BarangayController::destroyOfficial
 * @see app/Http/Controllers/Administrator/BarangayController.php:227
 * @route '/dashboard/barangay/officials/{id}'
 */
    const destroyOfficialForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyOfficial.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\BarangayController::destroyOfficial
 * @see app/Http/Controllers/Administrator/BarangayController.php:227
 * @route '/dashboard/barangay/officials/{id}'
 */
        destroyOfficialForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyOfficial.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyOfficial.form = destroyOfficialForm
const BarangayController = { show, showDetail, index, store, update, destroy, storeOfficial, destroyOfficial }

export default BarangayController