<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectLoginToSecretUrl
{
    /**
     * Block GET /login and GET /register with 404 so they are only reachable via the secret portal URL.
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->isMethod('GET')) {
            $path = $request->path();
            if ($path === 'login' || $path === 'register') {
                abort(404);
            }
        }

        return $next($request);
    }
}
