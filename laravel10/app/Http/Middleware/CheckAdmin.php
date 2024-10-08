<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if the user is authenticated
        if (auth()->check()) {
            // Check if the user is an admin
            if (auth()->user()->admin == 1) {
                return $next($request);
            }

            // User is authenticated but not an admin
            if (auth()->user()->admin == 0) {
                // Check if the request expects a JSON response
                if ($request->expectsJson()) {
                    return response()->json(['error' => 'You do not have admin access'], 403);
                }

                // Fallback for non-JSON requests
                return redirect()->route('home')->with('error', 'You do not have admin access');
            }
        }

        // User is not authenticated
        if ($request->expectsJson()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Fallback for non-JSON requests
        return redirect()->route('login')->with('error', 'You need to be logged in');
    }

}
