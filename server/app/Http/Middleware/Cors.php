<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // return $next($request)
        //     ->header('Access-Control-Allow-Origin', '*')
        //     ->header('Access-Control-Allow-Methods', '*')
        //     ->header('Access-Control-Allow-Credentials', true)
        //     ->header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,X-Token-Auth,Authorization')
        //     ->header('Accept', 'application/json');

        $response = $next($request);

        $response->headers->set('Access-Control-Allow-Origin', 'http://localhost:3000/');
        $response->headers->set('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type');
        $response->headers->set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        $response->headers->set('Access-Control-Allow-Credentials', true);
        $response->headers->set('Access-Control-Expose-Headers', 'Content-Encoding, Kuma-Revision');
        $response->headers->set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,X-Token-Auth,Authorization');
        $response->headers->set('Accept', 'application/json');

        //add more headers here
        return $response;
    }
}
