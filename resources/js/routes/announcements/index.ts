import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\AnnouncementListController::list
 * @see app/Http/Controllers/AnnouncementListController.php:74
 * @route '/announcements'
 */
export const list = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})

list.definition = {
    methods: ["get","head"],
    url: '/announcements',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AnnouncementListController::list
 * @see app/Http/Controllers/AnnouncementListController.php:74
 * @route '/announcements'
 */
list.url = (options?: RouteQueryOptions) => {
    return list.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AnnouncementListController::list
 * @see app/Http/Controllers/AnnouncementListController.php:74
 * @route '/announcements'
 */
list.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: list.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AnnouncementListController::list
 * @see app/Http/Controllers/AnnouncementListController.php:74
 * @route '/announcements'
 */
list.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: list.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AnnouncementListController::list
 * @see app/Http/Controllers/AnnouncementListController.php:74
 * @route '/announcements'
 */
    const listForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: list.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AnnouncementListController::list
 * @see app/Http/Controllers/AnnouncementListController.php:74
 * @route '/announcements'
 */
        listForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: list.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AnnouncementListController::list
 * @see app/Http/Controllers/AnnouncementListController.php:74
 * @route '/announcements'
 */
        listForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: list.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    list.form = listForm
/**
* @see \App\Http\Controllers\AnnouncementListController::show
 * @see app/Http/Controllers/AnnouncementListController.php:111
 * @route '/announcements/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/announcements/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AnnouncementListController::show
 * @see app/Http/Controllers/AnnouncementListController.php:111
 * @route '/announcements/{id}'
 */
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AnnouncementListController::show
 * @see app/Http/Controllers/AnnouncementListController.php:111
 * @route '/announcements/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AnnouncementListController::show
 * @see app/Http/Controllers/AnnouncementListController.php:111
 * @route '/announcements/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\AnnouncementListController::show
 * @see app/Http/Controllers/AnnouncementListController.php:111
 * @route '/announcements/{id}'
 */
    const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\AnnouncementListController::show
 * @see app/Http/Controllers/AnnouncementListController.php:111
 * @route '/announcements/{id}'
 */
        showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\AnnouncementListController::show
 * @see app/Http/Controllers/AnnouncementListController.php:111
 * @route '/announcements/{id}'
 */
        showForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::index
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:23
 * @route '/dashboard/announcements'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/announcements',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::index
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:23
 * @route '/dashboard/announcements'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::index
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:23
 * @route '/dashboard/announcements'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::index
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:23
 * @route '/dashboard/announcements'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Administrator\AnnouncementController::index
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:23
 * @route '/dashboard/announcements'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Administrator\AnnouncementController::index
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:23
 * @route '/dashboard/announcements'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Administrator\AnnouncementController::index
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:23
 * @route '/dashboard/announcements'
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
* @see \App\Http\Controllers\Administrator\AnnouncementController::create
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:47
 * @route '/dashboard/announcements/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/dashboard/announcements/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::create
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:47
 * @route '/dashboard/announcements/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::create
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:47
 * @route '/dashboard/announcements/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::create
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:47
 * @route '/dashboard/announcements/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Administrator\AnnouncementController::create
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:47
 * @route '/dashboard/announcements/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Administrator\AnnouncementController::create
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:47
 * @route '/dashboard/announcements/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Administrator\AnnouncementController::create
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:47
 * @route '/dashboard/announcements/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::store
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:57
 * @route '/dashboard/announcements'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/announcements',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::store
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:57
 * @route '/dashboard/announcements'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::store
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:57
 * @route '/dashboard/announcements'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Administrator\AnnouncementController::store
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:57
 * @route '/dashboard/announcements'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\AnnouncementController::store
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:57
 * @route '/dashboard/announcements'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::edit
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:92
 * @route '/dashboard/announcements/{id}/edit'
 */
export const edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/dashboard/announcements/{id}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::edit
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:92
 * @route '/dashboard/announcements/{id}/edit'
 */
edit.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::edit
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:92
 * @route '/dashboard/announcements/{id}/edit'
 */
edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::edit
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:92
 * @route '/dashboard/announcements/{id}/edit'
 */
edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Administrator\AnnouncementController::edit
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:92
 * @route '/dashboard/announcements/{id}/edit'
 */
    const editForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Administrator\AnnouncementController::edit
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:92
 * @route '/dashboard/announcements/{id}/edit'
 */
        editForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Administrator\AnnouncementController::edit
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:92
 * @route '/dashboard/announcements/{id}/edit'
 */
        editForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::update
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:113
 * @route '/dashboard/announcements/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/announcements/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::update
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:113
 * @route '/dashboard/announcements/{id}'
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
* @see \App\Http\Controllers\Administrator\AnnouncementController::update
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:113
 * @route '/dashboard/announcements/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Administrator\AnnouncementController::update
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:113
 * @route '/dashboard/announcements/{id}'
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
* @see \App\Http\Controllers\Administrator\AnnouncementController::update
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:113
 * @route '/dashboard/announcements/{id}'
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
* @see \App\Http\Controllers\Administrator\AnnouncementController::destroy
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:157
 * @route '/dashboard/announcements/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/announcements/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Administrator\AnnouncementController::destroy
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:157
 * @route '/dashboard/announcements/{id}'
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
* @see \App\Http\Controllers\Administrator\AnnouncementController::destroy
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:157
 * @route '/dashboard/announcements/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Administrator\AnnouncementController::destroy
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:157
 * @route '/dashboard/announcements/{id}'
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
* @see \App\Http\Controllers\Administrator\AnnouncementController::destroy
 * @see app/Http/Controllers/Administrator/AnnouncementController.php:157
 * @route '/dashboard/announcements/{id}'
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
const announcements = {
    list: Object.assign(list, list),
show: Object.assign(show, show),
index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default announcements