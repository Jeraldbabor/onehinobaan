import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AnnouncementListController::news
 * @see app/Http/Controllers/AnnouncementListController.php:32
 * @route '/news'
 */
export const news = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: news.url(options),
    method: 'get',
})

news.definition = {
    methods: ["get","head"],
    url: '/news',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AnnouncementListController::news
 * @see app/Http/Controllers/AnnouncementListController.php:32
 * @route '/news'
 */
news.url = (options?: RouteQueryOptions) => {
    return news.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AnnouncementListController::news
 * @see app/Http/Controllers/AnnouncementListController.php:32
 * @route '/news'
 */
news.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: news.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AnnouncementListController::news
 * @see app/Http/Controllers/AnnouncementListController.php:32
 * @route '/news'
 */
news.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: news.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AnnouncementListController::showNews
 * @see app/Http/Controllers/AnnouncementListController.php:95
 * @route '/news/{id}'
 */
export const showNews = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showNews.url(args, options),
    method: 'get',
})

showNews.definition = {
    methods: ["get","head"],
    url: '/news/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AnnouncementListController::showNews
 * @see app/Http/Controllers/AnnouncementListController.php:95
 * @route '/news/{id}'
 */
showNews.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return showNews.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AnnouncementListController::showNews
 * @see app/Http/Controllers/AnnouncementListController.php:95
 * @route '/news/{id}'
 */
showNews.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showNews.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AnnouncementListController::showNews
 * @see app/Http/Controllers/AnnouncementListController.php:95
 * @route '/news/{id}'
 */
showNews.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showNews.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AnnouncementListController::updates
 * @see app/Http/Controllers/AnnouncementListController.php:53
 * @route '/updates'
 */
export const updates = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: updates.url(options),
    method: 'get',
})

updates.definition = {
    methods: ["get","head"],
    url: '/updates',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AnnouncementListController::updates
 * @see app/Http/Controllers/AnnouncementListController.php:53
 * @route '/updates'
 */
updates.url = (options?: RouteQueryOptions) => {
    return updates.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AnnouncementListController::updates
 * @see app/Http/Controllers/AnnouncementListController.php:53
 * @route '/updates'
 */
updates.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: updates.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AnnouncementListController::updates
 * @see app/Http/Controllers/AnnouncementListController.php:53
 * @route '/updates'
 */
updates.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: updates.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AnnouncementListController::showUpdate
 * @see app/Http/Controllers/AnnouncementListController.php:103
 * @route '/updates/{id}'
 */
export const showUpdate = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showUpdate.url(args, options),
    method: 'get',
})

showUpdate.definition = {
    methods: ["get","head"],
    url: '/updates/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AnnouncementListController::showUpdate
 * @see app/Http/Controllers/AnnouncementListController.php:103
 * @route '/updates/{id}'
 */
showUpdate.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return showUpdate.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AnnouncementListController::showUpdate
 * @see app/Http/Controllers/AnnouncementListController.php:103
 * @route '/updates/{id}'
 */
showUpdate.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showUpdate.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AnnouncementListController::showUpdate
 * @see app/Http/Controllers/AnnouncementListController.php:103
 * @route '/updates/{id}'
 */
showUpdate.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showUpdate.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AnnouncementListController::announcements
 * @see app/Http/Controllers/AnnouncementListController.php:74
 * @route '/announcements'
 */
export const announcements = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: announcements.url(options),
    method: 'get',
})

announcements.definition = {
    methods: ["get","head"],
    url: '/announcements',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AnnouncementListController::announcements
 * @see app/Http/Controllers/AnnouncementListController.php:74
 * @route '/announcements'
 */
announcements.url = (options?: RouteQueryOptions) => {
    return announcements.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AnnouncementListController::announcements
 * @see app/Http/Controllers/AnnouncementListController.php:74
 * @route '/announcements'
 */
announcements.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: announcements.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AnnouncementListController::announcements
 * @see app/Http/Controllers/AnnouncementListController.php:74
 * @route '/announcements'
 */
announcements.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: announcements.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\AnnouncementListController::showAnnouncement
 * @see app/Http/Controllers/AnnouncementListController.php:111
 * @route '/announcements/{id}'
 */
export const showAnnouncement = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showAnnouncement.url(args, options),
    method: 'get',
})

showAnnouncement.definition = {
    methods: ["get","head"],
    url: '/announcements/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\AnnouncementListController::showAnnouncement
 * @see app/Http/Controllers/AnnouncementListController.php:111
 * @route '/announcements/{id}'
 */
showAnnouncement.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return showAnnouncement.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\AnnouncementListController::showAnnouncement
 * @see app/Http/Controllers/AnnouncementListController.php:111
 * @route '/announcements/{id}'
 */
showAnnouncement.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showAnnouncement.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\AnnouncementListController::showAnnouncement
 * @see app/Http/Controllers/AnnouncementListController.php:111
 * @route '/announcements/{id}'
 */
showAnnouncement.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showAnnouncement.url(args, options),
    method: 'head',
})
const AnnouncementListController = { news, showNews, updates, showUpdate, announcements, showAnnouncement }

export default AnnouncementListController