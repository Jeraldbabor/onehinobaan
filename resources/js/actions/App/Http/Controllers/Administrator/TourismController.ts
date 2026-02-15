import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Administrator\TourismController::index
 * @see app/Http/Controllers/Administrator/TourismController.php:44
 * @route '/dashboard/tourism/attraction'
 */
const index41ef28566d7d941ff3774508a9d967a0 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index41ef28566d7d941ff3774508a9d967a0.url(options),
    method: 'get',
})

index41ef28566d7d941ff3774508a9d967a0.definition = {
    methods: ["get","head"],
    url: '/dashboard/tourism/attraction',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\TourismController::index
 * @see app/Http/Controllers/Administrator/TourismController.php:44
 * @route '/dashboard/tourism/attraction'
 */
index41ef28566d7d941ff3774508a9d967a0.url = (options?: RouteQueryOptions) => {
    return index41ef28566d7d941ff3774508a9d967a0.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\TourismController::index
 * @see app/Http/Controllers/Administrator/TourismController.php:44
 * @route '/dashboard/tourism/attraction'
 */
index41ef28566d7d941ff3774508a9d967a0.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index41ef28566d7d941ff3774508a9d967a0.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\TourismController::index
 * @see app/Http/Controllers/Administrator/TourismController.php:44
 * @route '/dashboard/tourism/attraction'
 */
index41ef28566d7d941ff3774508a9d967a0.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index41ef28566d7d941ff3774508a9d967a0.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Administrator\TourismController::index
 * @see app/Http/Controllers/Administrator/TourismController.php:44
 * @route '/dashboard/tourism/attraction'
 */
    const index41ef28566d7d941ff3774508a9d967a0Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index41ef28566d7d941ff3774508a9d967a0.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Administrator\TourismController::index
 * @see app/Http/Controllers/Administrator/TourismController.php:44
 * @route '/dashboard/tourism/attraction'
 */
        index41ef28566d7d941ff3774508a9d967a0Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index41ef28566d7d941ff3774508a9d967a0.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Administrator\TourismController::index
 * @see app/Http/Controllers/Administrator/TourismController.php:44
 * @route '/dashboard/tourism/attraction'
 */
        index41ef28566d7d941ff3774508a9d967a0Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index41ef28566d7d941ff3774508a9d967a0.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index41ef28566d7d941ff3774508a9d967a0.form = index41ef28566d7d941ff3774508a9d967a0Form
    /**
* @see \App\Http\Controllers\Administrator\TourismController::index
 * @see app/Http/Controllers/Administrator/TourismController.php:44
 * @route '/dashboard/tourism/resorts'
 */
const index04383fd9c1919941e1a4425a1adc36e8 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index04383fd9c1919941e1a4425a1adc36e8.url(options),
    method: 'get',
})

index04383fd9c1919941e1a4425a1adc36e8.definition = {
    methods: ["get","head"],
    url: '/dashboard/tourism/resorts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\TourismController::index
 * @see app/Http/Controllers/Administrator/TourismController.php:44
 * @route '/dashboard/tourism/resorts'
 */
index04383fd9c1919941e1a4425a1adc36e8.url = (options?: RouteQueryOptions) => {
    return index04383fd9c1919941e1a4425a1adc36e8.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\TourismController::index
 * @see app/Http/Controllers/Administrator/TourismController.php:44
 * @route '/dashboard/tourism/resorts'
 */
index04383fd9c1919941e1a4425a1adc36e8.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index04383fd9c1919941e1a4425a1adc36e8.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\TourismController::index
 * @see app/Http/Controllers/Administrator/TourismController.php:44
 * @route '/dashboard/tourism/resorts'
 */
index04383fd9c1919941e1a4425a1adc36e8.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index04383fd9c1919941e1a4425a1adc36e8.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Administrator\TourismController::index
 * @see app/Http/Controllers/Administrator/TourismController.php:44
 * @route '/dashboard/tourism/resorts'
 */
    const index04383fd9c1919941e1a4425a1adc36e8Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index04383fd9c1919941e1a4425a1adc36e8.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Administrator\TourismController::index
 * @see app/Http/Controllers/Administrator/TourismController.php:44
 * @route '/dashboard/tourism/resorts'
 */
        index04383fd9c1919941e1a4425a1adc36e8Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index04383fd9c1919941e1a4425a1adc36e8.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Administrator\TourismController::index
 * @see app/Http/Controllers/Administrator/TourismController.php:44
 * @route '/dashboard/tourism/resorts'
 */
        index04383fd9c1919941e1a4425a1adc36e8Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index04383fd9c1919941e1a4425a1adc36e8.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index04383fd9c1919941e1a4425a1adc36e8.form = index04383fd9c1919941e1a4425a1adc36e8Form
    /**
* @see \App\Http\Controllers\Administrator\TourismController::index
 * @see app/Http/Controllers/Administrator/TourismController.php:44
 * @route '/dashboard/tourism/festivals'
 */
const index16bb4c8d0ff5438fef9ac3dca19be6bc = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index16bb4c8d0ff5438fef9ac3dca19be6bc.url(options),
    method: 'get',
})

index16bb4c8d0ff5438fef9ac3dca19be6bc.definition = {
    methods: ["get","head"],
    url: '/dashboard/tourism/festivals',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Administrator\TourismController::index
 * @see app/Http/Controllers/Administrator/TourismController.php:44
 * @route '/dashboard/tourism/festivals'
 */
index16bb4c8d0ff5438fef9ac3dca19be6bc.url = (options?: RouteQueryOptions) => {
    return index16bb4c8d0ff5438fef9ac3dca19be6bc.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\TourismController::index
 * @see app/Http/Controllers/Administrator/TourismController.php:44
 * @route '/dashboard/tourism/festivals'
 */
index16bb4c8d0ff5438fef9ac3dca19be6bc.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index16bb4c8d0ff5438fef9ac3dca19be6bc.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Administrator\TourismController::index
 * @see app/Http/Controllers/Administrator/TourismController.php:44
 * @route '/dashboard/tourism/festivals'
 */
index16bb4c8d0ff5438fef9ac3dca19be6bc.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index16bb4c8d0ff5438fef9ac3dca19be6bc.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Administrator\TourismController::index
 * @see app/Http/Controllers/Administrator/TourismController.php:44
 * @route '/dashboard/tourism/festivals'
 */
    const index16bb4c8d0ff5438fef9ac3dca19be6bcForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index16bb4c8d0ff5438fef9ac3dca19be6bc.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Administrator\TourismController::index
 * @see app/Http/Controllers/Administrator/TourismController.php:44
 * @route '/dashboard/tourism/festivals'
 */
        index16bb4c8d0ff5438fef9ac3dca19be6bcForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index16bb4c8d0ff5438fef9ac3dca19be6bc.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Administrator\TourismController::index
 * @see app/Http/Controllers/Administrator/TourismController.php:44
 * @route '/dashboard/tourism/festivals'
 */
        index16bb4c8d0ff5438fef9ac3dca19be6bcForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index16bb4c8d0ff5438fef9ac3dca19be6bc.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index16bb4c8d0ff5438fef9ac3dca19be6bc.form = index16bb4c8d0ff5438fef9ac3dca19be6bcForm

export const index = {
    '/dashboard/tourism/attraction': index41ef28566d7d941ff3774508a9d967a0,
    '/dashboard/tourism/resorts': index04383fd9c1919941e1a4425a1adc36e8,
    '/dashboard/tourism/festivals': index16bb4c8d0ff5438fef9ac3dca19be6bc,
}

/**
* @see \App\Http\Controllers\Administrator\TourismController::store
 * @see app/Http/Controllers/Administrator/TourismController.php:79
 * @route '/dashboard/tourism/attraction'
 */
const store41ef28566d7d941ff3774508a9d967a0 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store41ef28566d7d941ff3774508a9d967a0.url(options),
    method: 'post',
})

store41ef28566d7d941ff3774508a9d967a0.definition = {
    methods: ["post"],
    url: '/dashboard/tourism/attraction',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Administrator\TourismController::store
 * @see app/Http/Controllers/Administrator/TourismController.php:79
 * @route '/dashboard/tourism/attraction'
 */
store41ef28566d7d941ff3774508a9d967a0.url = (options?: RouteQueryOptions) => {
    return store41ef28566d7d941ff3774508a9d967a0.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\TourismController::store
 * @see app/Http/Controllers/Administrator/TourismController.php:79
 * @route '/dashboard/tourism/attraction'
 */
store41ef28566d7d941ff3774508a9d967a0.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store41ef28566d7d941ff3774508a9d967a0.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Administrator\TourismController::store
 * @see app/Http/Controllers/Administrator/TourismController.php:79
 * @route '/dashboard/tourism/attraction'
 */
    const store41ef28566d7d941ff3774508a9d967a0Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store41ef28566d7d941ff3774508a9d967a0.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\TourismController::store
 * @see app/Http/Controllers/Administrator/TourismController.php:79
 * @route '/dashboard/tourism/attraction'
 */
        store41ef28566d7d941ff3774508a9d967a0Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store41ef28566d7d941ff3774508a9d967a0.url(options),
            method: 'post',
        })
    
    store41ef28566d7d941ff3774508a9d967a0.form = store41ef28566d7d941ff3774508a9d967a0Form
    /**
* @see \App\Http\Controllers\Administrator\TourismController::store
 * @see app/Http/Controllers/Administrator/TourismController.php:79
 * @route '/dashboard/tourism/resorts'
 */
const store04383fd9c1919941e1a4425a1adc36e8 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store04383fd9c1919941e1a4425a1adc36e8.url(options),
    method: 'post',
})

store04383fd9c1919941e1a4425a1adc36e8.definition = {
    methods: ["post"],
    url: '/dashboard/tourism/resorts',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Administrator\TourismController::store
 * @see app/Http/Controllers/Administrator/TourismController.php:79
 * @route '/dashboard/tourism/resorts'
 */
store04383fd9c1919941e1a4425a1adc36e8.url = (options?: RouteQueryOptions) => {
    return store04383fd9c1919941e1a4425a1adc36e8.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\TourismController::store
 * @see app/Http/Controllers/Administrator/TourismController.php:79
 * @route '/dashboard/tourism/resorts'
 */
store04383fd9c1919941e1a4425a1adc36e8.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store04383fd9c1919941e1a4425a1adc36e8.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Administrator\TourismController::store
 * @see app/Http/Controllers/Administrator/TourismController.php:79
 * @route '/dashboard/tourism/resorts'
 */
    const store04383fd9c1919941e1a4425a1adc36e8Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store04383fd9c1919941e1a4425a1adc36e8.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\TourismController::store
 * @see app/Http/Controllers/Administrator/TourismController.php:79
 * @route '/dashboard/tourism/resorts'
 */
        store04383fd9c1919941e1a4425a1adc36e8Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store04383fd9c1919941e1a4425a1adc36e8.url(options),
            method: 'post',
        })
    
    store04383fd9c1919941e1a4425a1adc36e8.form = store04383fd9c1919941e1a4425a1adc36e8Form
    /**
* @see \App\Http\Controllers\Administrator\TourismController::store
 * @see app/Http/Controllers/Administrator/TourismController.php:79
 * @route '/dashboard/tourism/festivals'
 */
const store16bb4c8d0ff5438fef9ac3dca19be6bc = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store16bb4c8d0ff5438fef9ac3dca19be6bc.url(options),
    method: 'post',
})

store16bb4c8d0ff5438fef9ac3dca19be6bc.definition = {
    methods: ["post"],
    url: '/dashboard/tourism/festivals',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Administrator\TourismController::store
 * @see app/Http/Controllers/Administrator/TourismController.php:79
 * @route '/dashboard/tourism/festivals'
 */
store16bb4c8d0ff5438fef9ac3dca19be6bc.url = (options?: RouteQueryOptions) => {
    return store16bb4c8d0ff5438fef9ac3dca19be6bc.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\TourismController::store
 * @see app/Http/Controllers/Administrator/TourismController.php:79
 * @route '/dashboard/tourism/festivals'
 */
store16bb4c8d0ff5438fef9ac3dca19be6bc.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store16bb4c8d0ff5438fef9ac3dca19be6bc.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Administrator\TourismController::store
 * @see app/Http/Controllers/Administrator/TourismController.php:79
 * @route '/dashboard/tourism/festivals'
 */
    const store16bb4c8d0ff5438fef9ac3dca19be6bcForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store16bb4c8d0ff5438fef9ac3dca19be6bc.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\TourismController::store
 * @see app/Http/Controllers/Administrator/TourismController.php:79
 * @route '/dashboard/tourism/festivals'
 */
        store16bb4c8d0ff5438fef9ac3dca19be6bcForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store16bb4c8d0ff5438fef9ac3dca19be6bc.url(options),
            method: 'post',
        })
    
    store16bb4c8d0ff5438fef9ac3dca19be6bc.form = store16bb4c8d0ff5438fef9ac3dca19be6bcForm

export const store = {
    '/dashboard/tourism/attraction': store41ef28566d7d941ff3774508a9d967a0,
    '/dashboard/tourism/resorts': store04383fd9c1919941e1a4425a1adc36e8,
    '/dashboard/tourism/festivals': store16bb4c8d0ff5438fef9ac3dca19be6bc,
}

/**
* @see \App\Http\Controllers\Administrator\TourismController::update
 * @see app/Http/Controllers/Administrator/TourismController.php:128
 * @route '/dashboard/tourism/attraction/{id}'
 */
const update28fec01d66f15b6227011c5fb39c8f09 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update28fec01d66f15b6227011c5fb39c8f09.url(args, options),
    method: 'put',
})

update28fec01d66f15b6227011c5fb39c8f09.definition = {
    methods: ["put"],
    url: '/dashboard/tourism/attraction/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Administrator\TourismController::update
 * @see app/Http/Controllers/Administrator/TourismController.php:128
 * @route '/dashboard/tourism/attraction/{id}'
 */
update28fec01d66f15b6227011c5fb39c8f09.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update28fec01d66f15b6227011c5fb39c8f09.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\TourismController::update
 * @see app/Http/Controllers/Administrator/TourismController.php:128
 * @route '/dashboard/tourism/attraction/{id}'
 */
update28fec01d66f15b6227011c5fb39c8f09.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update28fec01d66f15b6227011c5fb39c8f09.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Administrator\TourismController::update
 * @see app/Http/Controllers/Administrator/TourismController.php:128
 * @route '/dashboard/tourism/attraction/{id}'
 */
    const update28fec01d66f15b6227011c5fb39c8f09Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update28fec01d66f15b6227011c5fb39c8f09.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\TourismController::update
 * @see app/Http/Controllers/Administrator/TourismController.php:128
 * @route '/dashboard/tourism/attraction/{id}'
 */
        update28fec01d66f15b6227011c5fb39c8f09Form.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update28fec01d66f15b6227011c5fb39c8f09.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update28fec01d66f15b6227011c5fb39c8f09.form = update28fec01d66f15b6227011c5fb39c8f09Form
    /**
* @see \App\Http\Controllers\Administrator\TourismController::update
 * @see app/Http/Controllers/Administrator/TourismController.php:128
 * @route '/dashboard/tourism/resorts/{id}'
 */
const updateef6526e7dad67ec99630a237c554485d = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateef6526e7dad67ec99630a237c554485d.url(args, options),
    method: 'put',
})

updateef6526e7dad67ec99630a237c554485d.definition = {
    methods: ["put"],
    url: '/dashboard/tourism/resorts/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Administrator\TourismController::update
 * @see app/Http/Controllers/Administrator/TourismController.php:128
 * @route '/dashboard/tourism/resorts/{id}'
 */
updateef6526e7dad67ec99630a237c554485d.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updateef6526e7dad67ec99630a237c554485d.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\TourismController::update
 * @see app/Http/Controllers/Administrator/TourismController.php:128
 * @route '/dashboard/tourism/resorts/{id}'
 */
updateef6526e7dad67ec99630a237c554485d.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateef6526e7dad67ec99630a237c554485d.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Administrator\TourismController::update
 * @see app/Http/Controllers/Administrator/TourismController.php:128
 * @route '/dashboard/tourism/resorts/{id}'
 */
    const updateef6526e7dad67ec99630a237c554485dForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateef6526e7dad67ec99630a237c554485d.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\TourismController::update
 * @see app/Http/Controllers/Administrator/TourismController.php:128
 * @route '/dashboard/tourism/resorts/{id}'
 */
        updateef6526e7dad67ec99630a237c554485dForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateef6526e7dad67ec99630a237c554485d.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateef6526e7dad67ec99630a237c554485d.form = updateef6526e7dad67ec99630a237c554485dForm
    /**
* @see \App\Http\Controllers\Administrator\TourismController::update
 * @see app/Http/Controllers/Administrator/TourismController.php:128
 * @route '/dashboard/tourism/festivals/{id}'
 */
const updatedea0f0fd5c817eb0c32f49791f4324a5 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatedea0f0fd5c817eb0c32f49791f4324a5.url(args, options),
    method: 'put',
})

updatedea0f0fd5c817eb0c32f49791f4324a5.definition = {
    methods: ["put"],
    url: '/dashboard/tourism/festivals/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Administrator\TourismController::update
 * @see app/Http/Controllers/Administrator/TourismController.php:128
 * @route '/dashboard/tourism/festivals/{id}'
 */
updatedea0f0fd5c817eb0c32f49791f4324a5.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updatedea0f0fd5c817eb0c32f49791f4324a5.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\TourismController::update
 * @see app/Http/Controllers/Administrator/TourismController.php:128
 * @route '/dashboard/tourism/festivals/{id}'
 */
updatedea0f0fd5c817eb0c32f49791f4324a5.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updatedea0f0fd5c817eb0c32f49791f4324a5.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Administrator\TourismController::update
 * @see app/Http/Controllers/Administrator/TourismController.php:128
 * @route '/dashboard/tourism/festivals/{id}'
 */
    const updatedea0f0fd5c817eb0c32f49791f4324a5Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updatedea0f0fd5c817eb0c32f49791f4324a5.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\TourismController::update
 * @see app/Http/Controllers/Administrator/TourismController.php:128
 * @route '/dashboard/tourism/festivals/{id}'
 */
        updatedea0f0fd5c817eb0c32f49791f4324a5Form.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updatedea0f0fd5c817eb0c32f49791f4324a5.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updatedea0f0fd5c817eb0c32f49791f4324a5.form = updatedea0f0fd5c817eb0c32f49791f4324a5Form

export const update = {
    '/dashboard/tourism/attraction/{id}': update28fec01d66f15b6227011c5fb39c8f09,
    '/dashboard/tourism/resorts/{id}': updateef6526e7dad67ec99630a237c554485d,
    '/dashboard/tourism/festivals/{id}': updatedea0f0fd5c817eb0c32f49791f4324a5,
}

/**
* @see \App\Http\Controllers\Administrator\TourismController::destroyImage
 * @see app/Http/Controllers/Administrator/TourismController.php:196
 * @route '/dashboard/tourism/attraction/images/{imageId}'
 */
const destroyImage53b0e08a277e95d6ae2bbd7f95039db7 = (args: { imageId: string | number } | [imageId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyImage53b0e08a277e95d6ae2bbd7f95039db7.url(args, options),
    method: 'delete',
})

destroyImage53b0e08a277e95d6ae2bbd7f95039db7.definition = {
    methods: ["delete"],
    url: '/dashboard/tourism/attraction/images/{imageId}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Administrator\TourismController::destroyImage
 * @see app/Http/Controllers/Administrator/TourismController.php:196
 * @route '/dashboard/tourism/attraction/images/{imageId}'
 */
destroyImage53b0e08a277e95d6ae2bbd7f95039db7.url = (args: { imageId: string | number } | [imageId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { imageId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    imageId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        imageId: args.imageId,
                }

    return destroyImage53b0e08a277e95d6ae2bbd7f95039db7.definition.url
            .replace('{imageId}', parsedArgs.imageId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\TourismController::destroyImage
 * @see app/Http/Controllers/Administrator/TourismController.php:196
 * @route '/dashboard/tourism/attraction/images/{imageId}'
 */
destroyImage53b0e08a277e95d6ae2bbd7f95039db7.delete = (args: { imageId: string | number } | [imageId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyImage53b0e08a277e95d6ae2bbd7f95039db7.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Administrator\TourismController::destroyImage
 * @see app/Http/Controllers/Administrator/TourismController.php:196
 * @route '/dashboard/tourism/attraction/images/{imageId}'
 */
    const destroyImage53b0e08a277e95d6ae2bbd7f95039db7Form = (args: { imageId: string | number } | [imageId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyImage53b0e08a277e95d6ae2bbd7f95039db7.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\TourismController::destroyImage
 * @see app/Http/Controllers/Administrator/TourismController.php:196
 * @route '/dashboard/tourism/attraction/images/{imageId}'
 */
        destroyImage53b0e08a277e95d6ae2bbd7f95039db7Form.delete = (args: { imageId: string | number } | [imageId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyImage53b0e08a277e95d6ae2bbd7f95039db7.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyImage53b0e08a277e95d6ae2bbd7f95039db7.form = destroyImage53b0e08a277e95d6ae2bbd7f95039db7Form
    /**
* @see \App\Http\Controllers\Administrator\TourismController::destroyImage
 * @see app/Http/Controllers/Administrator/TourismController.php:196
 * @route '/dashboard/tourism/resorts/images/{imageId}'
 */
const destroyImagee9fefd4453298993a61e62788db4fb3e = (args: { imageId: string | number } | [imageId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyImagee9fefd4453298993a61e62788db4fb3e.url(args, options),
    method: 'delete',
})

destroyImagee9fefd4453298993a61e62788db4fb3e.definition = {
    methods: ["delete"],
    url: '/dashboard/tourism/resorts/images/{imageId}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Administrator\TourismController::destroyImage
 * @see app/Http/Controllers/Administrator/TourismController.php:196
 * @route '/dashboard/tourism/resorts/images/{imageId}'
 */
destroyImagee9fefd4453298993a61e62788db4fb3e.url = (args: { imageId: string | number } | [imageId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { imageId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    imageId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        imageId: args.imageId,
                }

    return destroyImagee9fefd4453298993a61e62788db4fb3e.definition.url
            .replace('{imageId}', parsedArgs.imageId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\TourismController::destroyImage
 * @see app/Http/Controllers/Administrator/TourismController.php:196
 * @route '/dashboard/tourism/resorts/images/{imageId}'
 */
destroyImagee9fefd4453298993a61e62788db4fb3e.delete = (args: { imageId: string | number } | [imageId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyImagee9fefd4453298993a61e62788db4fb3e.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Administrator\TourismController::destroyImage
 * @see app/Http/Controllers/Administrator/TourismController.php:196
 * @route '/dashboard/tourism/resorts/images/{imageId}'
 */
    const destroyImagee9fefd4453298993a61e62788db4fb3eForm = (args: { imageId: string | number } | [imageId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyImagee9fefd4453298993a61e62788db4fb3e.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\TourismController::destroyImage
 * @see app/Http/Controllers/Administrator/TourismController.php:196
 * @route '/dashboard/tourism/resorts/images/{imageId}'
 */
        destroyImagee9fefd4453298993a61e62788db4fb3eForm.delete = (args: { imageId: string | number } | [imageId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyImagee9fefd4453298993a61e62788db4fb3e.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyImagee9fefd4453298993a61e62788db4fb3e.form = destroyImagee9fefd4453298993a61e62788db4fb3eForm
    /**
* @see \App\Http\Controllers\Administrator\TourismController::destroyImage
 * @see app/Http/Controllers/Administrator/TourismController.php:196
 * @route '/dashboard/tourism/festivals/images/{imageId}'
 */
const destroyImagea6434bc4e35f00c7430a10777d99069c = (args: { imageId: string | number } | [imageId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyImagea6434bc4e35f00c7430a10777d99069c.url(args, options),
    method: 'delete',
})

destroyImagea6434bc4e35f00c7430a10777d99069c.definition = {
    methods: ["delete"],
    url: '/dashboard/tourism/festivals/images/{imageId}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Administrator\TourismController::destroyImage
 * @see app/Http/Controllers/Administrator/TourismController.php:196
 * @route '/dashboard/tourism/festivals/images/{imageId}'
 */
destroyImagea6434bc4e35f00c7430a10777d99069c.url = (args: { imageId: string | number } | [imageId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { imageId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    imageId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        imageId: args.imageId,
                }

    return destroyImagea6434bc4e35f00c7430a10777d99069c.definition.url
            .replace('{imageId}', parsedArgs.imageId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\TourismController::destroyImage
 * @see app/Http/Controllers/Administrator/TourismController.php:196
 * @route '/dashboard/tourism/festivals/images/{imageId}'
 */
destroyImagea6434bc4e35f00c7430a10777d99069c.delete = (args: { imageId: string | number } | [imageId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyImagea6434bc4e35f00c7430a10777d99069c.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Administrator\TourismController::destroyImage
 * @see app/Http/Controllers/Administrator/TourismController.php:196
 * @route '/dashboard/tourism/festivals/images/{imageId}'
 */
    const destroyImagea6434bc4e35f00c7430a10777d99069cForm = (args: { imageId: string | number } | [imageId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyImagea6434bc4e35f00c7430a10777d99069c.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\TourismController::destroyImage
 * @see app/Http/Controllers/Administrator/TourismController.php:196
 * @route '/dashboard/tourism/festivals/images/{imageId}'
 */
        destroyImagea6434bc4e35f00c7430a10777d99069cForm.delete = (args: { imageId: string | number } | [imageId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyImagea6434bc4e35f00c7430a10777d99069c.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyImagea6434bc4e35f00c7430a10777d99069c.form = destroyImagea6434bc4e35f00c7430a10777d99069cForm

export const destroyImage = {
    '/dashboard/tourism/attraction/images/{imageId}': destroyImage53b0e08a277e95d6ae2bbd7f95039db7,
    '/dashboard/tourism/resorts/images/{imageId}': destroyImagee9fefd4453298993a61e62788db4fb3e,
    '/dashboard/tourism/festivals/images/{imageId}': destroyImagea6434bc4e35f00c7430a10777d99069c,
}

/**
* @see \App\Http\Controllers\Administrator\TourismController::destroy
 * @see app/Http/Controllers/Administrator/TourismController.php:181
 * @route '/dashboard/tourism/attraction/{id}'
 */
const destroy28fec01d66f15b6227011c5fb39c8f09 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy28fec01d66f15b6227011c5fb39c8f09.url(args, options),
    method: 'delete',
})

destroy28fec01d66f15b6227011c5fb39c8f09.definition = {
    methods: ["delete"],
    url: '/dashboard/tourism/attraction/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Administrator\TourismController::destroy
 * @see app/Http/Controllers/Administrator/TourismController.php:181
 * @route '/dashboard/tourism/attraction/{id}'
 */
destroy28fec01d66f15b6227011c5fb39c8f09.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy28fec01d66f15b6227011c5fb39c8f09.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\TourismController::destroy
 * @see app/Http/Controllers/Administrator/TourismController.php:181
 * @route '/dashboard/tourism/attraction/{id}'
 */
destroy28fec01d66f15b6227011c5fb39c8f09.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy28fec01d66f15b6227011c5fb39c8f09.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Administrator\TourismController::destroy
 * @see app/Http/Controllers/Administrator/TourismController.php:181
 * @route '/dashboard/tourism/attraction/{id}'
 */
    const destroy28fec01d66f15b6227011c5fb39c8f09Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy28fec01d66f15b6227011c5fb39c8f09.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\TourismController::destroy
 * @see app/Http/Controllers/Administrator/TourismController.php:181
 * @route '/dashboard/tourism/attraction/{id}'
 */
        destroy28fec01d66f15b6227011c5fb39c8f09Form.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy28fec01d66f15b6227011c5fb39c8f09.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy28fec01d66f15b6227011c5fb39c8f09.form = destroy28fec01d66f15b6227011c5fb39c8f09Form
    /**
* @see \App\Http\Controllers\Administrator\TourismController::destroy
 * @see app/Http/Controllers/Administrator/TourismController.php:181
 * @route '/dashboard/tourism/resorts/{id}'
 */
const destroyef6526e7dad67ec99630a237c554485d = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyef6526e7dad67ec99630a237c554485d.url(args, options),
    method: 'delete',
})

destroyef6526e7dad67ec99630a237c554485d.definition = {
    methods: ["delete"],
    url: '/dashboard/tourism/resorts/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Administrator\TourismController::destroy
 * @see app/Http/Controllers/Administrator/TourismController.php:181
 * @route '/dashboard/tourism/resorts/{id}'
 */
destroyef6526e7dad67ec99630a237c554485d.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroyef6526e7dad67ec99630a237c554485d.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\TourismController::destroy
 * @see app/Http/Controllers/Administrator/TourismController.php:181
 * @route '/dashboard/tourism/resorts/{id}'
 */
destroyef6526e7dad67ec99630a237c554485d.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyef6526e7dad67ec99630a237c554485d.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Administrator\TourismController::destroy
 * @see app/Http/Controllers/Administrator/TourismController.php:181
 * @route '/dashboard/tourism/resorts/{id}'
 */
    const destroyef6526e7dad67ec99630a237c554485dForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyef6526e7dad67ec99630a237c554485d.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\TourismController::destroy
 * @see app/Http/Controllers/Administrator/TourismController.php:181
 * @route '/dashboard/tourism/resorts/{id}'
 */
        destroyef6526e7dad67ec99630a237c554485dForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyef6526e7dad67ec99630a237c554485d.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyef6526e7dad67ec99630a237c554485d.form = destroyef6526e7dad67ec99630a237c554485dForm
    /**
* @see \App\Http\Controllers\Administrator\TourismController::destroy
 * @see app/Http/Controllers/Administrator/TourismController.php:181
 * @route '/dashboard/tourism/festivals/{id}'
 */
const destroydea0f0fd5c817eb0c32f49791f4324a5 = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroydea0f0fd5c817eb0c32f49791f4324a5.url(args, options),
    method: 'delete',
})

destroydea0f0fd5c817eb0c32f49791f4324a5.definition = {
    methods: ["delete"],
    url: '/dashboard/tourism/festivals/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Administrator\TourismController::destroy
 * @see app/Http/Controllers/Administrator/TourismController.php:181
 * @route '/dashboard/tourism/festivals/{id}'
 */
destroydea0f0fd5c817eb0c32f49791f4324a5.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroydea0f0fd5c817eb0c32f49791f4324a5.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Administrator\TourismController::destroy
 * @see app/Http/Controllers/Administrator/TourismController.php:181
 * @route '/dashboard/tourism/festivals/{id}'
 */
destroydea0f0fd5c817eb0c32f49791f4324a5.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroydea0f0fd5c817eb0c32f49791f4324a5.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Administrator\TourismController::destroy
 * @see app/Http/Controllers/Administrator/TourismController.php:181
 * @route '/dashboard/tourism/festivals/{id}'
 */
    const destroydea0f0fd5c817eb0c32f49791f4324a5Form = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroydea0f0fd5c817eb0c32f49791f4324a5.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Administrator\TourismController::destroy
 * @see app/Http/Controllers/Administrator/TourismController.php:181
 * @route '/dashboard/tourism/festivals/{id}'
 */
        destroydea0f0fd5c817eb0c32f49791f4324a5Form.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroydea0f0fd5c817eb0c32f49791f4324a5.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroydea0f0fd5c817eb0c32f49791f4324a5.form = destroydea0f0fd5c817eb0c32f49791f4324a5Form

export const destroy = {
    '/dashboard/tourism/attraction/{id}': destroy28fec01d66f15b6227011c5fb39c8f09,
    '/dashboard/tourism/resorts/{id}': destroyef6526e7dad67ec99630a237c554485d,
    '/dashboard/tourism/festivals/{id}': destroydea0f0fd5c817eb0c32f49791f4324a5,
}

const TourismController = { index, store, update, destroyImage, destroy }

export default TourismController