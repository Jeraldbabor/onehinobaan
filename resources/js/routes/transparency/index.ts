import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
 * @see routes/web.php:143
 * @route '/transparency/full-disclosure'
 */
export const fullDisclosure = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: fullDisclosure.url(options),
    method: 'get',
})

fullDisclosure.definition = {
    methods: ["get","head"],
    url: '/transparency/full-disclosure',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:143
 * @route '/transparency/full-disclosure'
 */
fullDisclosure.url = (options?: RouteQueryOptions) => {
    return fullDisclosure.definition.url + queryParams(options)
}

/**
 * @see routes/web.php:143
 * @route '/transparency/full-disclosure'
 */
fullDisclosure.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: fullDisclosure.url(options),
    method: 'get',
})
/**
 * @see routes/web.php:143
 * @route '/transparency/full-disclosure'
 */
fullDisclosure.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: fullDisclosure.url(options),
    method: 'head',
})
const transparency = {
    fullDisclosure: Object.assign(fullDisclosure, fullDisclosure),
}

export default transparency