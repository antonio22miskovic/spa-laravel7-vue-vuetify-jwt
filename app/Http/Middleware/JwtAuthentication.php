<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;

class JwtAuthentication
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        try {

            $user = JWTAuth::parseToken()->authenticate();

        } catch (JWTException $e) {

            if ($e instanceof TokenExpiredException) {

                $newToken = JWTAuth::parseToken()->refresh();

                 $request->headers->set('Authorization', 'Bearer' . $newToken);

                return response()->json(['mensaje' => 'se ah renovado el token con exito',
                                          'token' => $newToken],401);

            }else if ($e instanceof TokenInvalidException) {

                  return response()->json(['mensaje' => 'token no valido','status' => 401],401);

            }else{

                 return response()->json(['mensaje' => 'no existe el token','status' => 401],401);

            }

        }

        return $next($request);

    }

}
